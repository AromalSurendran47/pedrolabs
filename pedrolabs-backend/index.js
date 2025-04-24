const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "aromalpedroaws";
const JWT_EXPIRES_IN = "1h";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MySQL Connection Pool
const pool = mysql.createPool({
  connectionLimit: 10,
  user: "admin",
  host: "mydb.cb0qmoqugx66.ap-south-1.rds.amazonaws.com",
  password: "Admin123",
  database: "pedrolabsdb",
});

// ********** User Registration **********
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  if (!fname || !lname || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const checkEmailQuery = `SELECT * FROM register WHERE email = ?`;
  pool.query(checkEmailQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error." });
    if (results.length > 0)
      return res.status(400).json({ success: false, message: "Email already exists." });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = email === "admin@gmail.com" ? "admin" : "user";

      const sql = `INSERT INTO register (fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?)`;
      pool.query(sql, [fname, lname, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Database error." });
        res.status(200).json({
          success: true,
          message: "User registered successfully.",
          role: role,
        });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error." });
    }
  });
});

// ********** User Login **********
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "All fields are required." });

  pool.query("SELECT * FROM register WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error." });
    if (results.length === 0)
      return res.status(401).json({ success: false, message: "Invalid email or password." });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ success: false, message: "Invalid email or password." });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
      },
    });
  });
});

// ********** Middleware **********
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(403).json({ success: false, message: "Access denied." });

  jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: "Invalid token." });
    req.user = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ success: false, message: "Admin access required." });
  next();
};

// ********** User CRUD **********
app.get("/getusers", verifyToken, verifyAdmin, (req, res) => {
  pool.query("SELECT * FROM register", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.status(200).json({ success: true, data: results });
  });
});

app.delete("/delete/:id", verifyToken, verifyAdmin, (req, res) => {
  pool.query("DELETE FROM register WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json({ success: true, message: "User deleted successfully." });
  });
});

app.put("/update/:id", verifyToken, (req, res) => {
  const { fname, lname, email } = req.body;
  if (!fname || !lname || !email)
    return res.status(400).json({ success: false, message: "All fields are required." });

  pool.query(
    "UPDATE register SET fname = ?, lname = ?, email = ? WHERE id = ?",
    [fname, lname, email, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      if (result.affectedRows === 0)
        return res.status(404).json({ success: false, message: "User not found." });
      res.status(200).json({ success: true, message: "User updated successfully." });
    }
  );
});

// ********** Image Upload **********
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed."), false);
};

const upload = multer({ storage, fileFilter });

// ********** Product Management **********
app.post("/product", upload.single("image"), verifyToken, (req, res) => {
  const { name, details, originalprice, offerprice } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !details || !originalprice || !offerprice || !image)
    return res.status(400).json({ error: "All fields are required." });

  pool.query(
    "INSERT INTO products (name, details, originalprice, offerprice, image) VALUES (?, ?, ?, ?, ?)",
    [name, details, originalprice, offerprice, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to add product", details: err.message });
      res.json({ message: "Product added successfully", productId: result.insertId });
    }
  );
});

app.get("/getproducts", (req, res) => {
  pool.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.status(200).json({ success: true, data: results });
  });
});

app.delete("/deleteproduct/:id", verifyToken, verifyAdmin, (req, res) => {
  pool.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json({ success: true, message: "Product deleted successfully." });
  });
});

app.put("/updateproduct/:id", upload.single("image"), verifyToken, (req, res) => {
  const { name, details, originalprice, offerprice } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !details || !originalprice || !offerprice)
    return res.status(400).json({ success: false, message: "All fields except image are required." });

  pool.query("SELECT image FROM products WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: "Database error." });
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Product not found." });

    const oldImage = rows[0].image;
    const finalImage = image || oldImage;

    pool.query(
      "UPDATE products SET name = ?, details = ?, originalprice = ?, offerprice = ?, image = ? WHERE id = ?",
      [name, details, originalprice, offerprice, finalImage, req.params.id],
      (updateErr, result) => {
        if (updateErr) return res.status(500).json({ success: false, message: "Database error." });
        res.status(200).json({ success: true, message: "Product updated successfully." });
      }
    );
  });
});

app.get("/getproduct/:id", (req, res) => {
  const productId = req.params.id;
  pool.query("SELECT * FROM products WHERE id = ?", [productId], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    if (results.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
});

// ********** Cart **********
app.post("/addtocart", verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.userId;

  if (!productId || !quantity)
    return res.status(400).json({ success: false, message: "Product and quantity are required." });

  pool.query("SELECT * FROM carts WHERE user_id = ? AND product_id = ?", [userId, productId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error." });

    if (results.length > 0) {
      pool.query("UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
        [quantity, userId, productId],
        (updateErr) => {
          if (updateErr) return res.status(500).json({ success: false, message: "Failed to update cart." });
          return res.status(200).json({ success: true, message: "Cart updated successfully." });
        }
      );
    } else {
      pool.query("INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, productId, quantity],
        (insertErr) => {
          if (insertErr) return res.status(500).json({ success: false, message: "Failed to add product to cart." });
          return res.status(200).json({ success: true, message: "Product added to cart successfully." });
        }
      );
    }
  });
});

app.get("/getcart", verifyToken, (req, res) => {
  const userId = req.user.userId;

  pool.query(
    "SELECT p.*, c.quantity FROM carts c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      res.status(200).json({ success: true, cart: results });
    }
  );
});

app.put("/updatecart", verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  pool.query(
    "UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
    [quantity, userId, productId],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      res.status(200).json({ success: true, message: "Cart updated successfully." });
    }
  );
});

app.delete("/removecart/:productId", verifyToken, (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.productId;

  pool.query(
    "DELETE FROM carts WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      res.status(200).json({ success: true, message: "Product removed from cart." });
    }
  );
});

// ********** Start Server **********
app.listen(3001, () => console.log("Running backend server on port 3001"));
