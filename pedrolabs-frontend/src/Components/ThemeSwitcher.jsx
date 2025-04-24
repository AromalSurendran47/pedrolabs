import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThemeSwitcher.css";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply the selected theme to the document
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    // Switch theme based on toggle state
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <Form.Check
        type="switch"
        id="theme-switch"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="theme-switch-wrapper"
      />
      <div className="mode-icons">
        <i className="gg-sun"></i>
        <i className="gg-moon"></i>
      </div>
    </>
  );
}

export default ThemeSwitcher;
