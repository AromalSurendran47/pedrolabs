import React, { useEffect } from "react";
import "./Strength.css";

import { motion } from "framer-motion";

function Strength() {
  useEffect(() => {
    const animateCounters = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = document.querySelectorAll(".timer");
          counters.forEach((counter) => {
            const updateCount = () => {
              const target = +counter.getAttribute("data-target");
              const count = +counter.innerText;
              const speed = 200;
              const increment = target / speed;

              if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
              } else {
                counter.innerText = target;
              }
            };

            updateCount();
          });
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(animateCounters, {
      threshold: 0.5,
    });

    const counterSection = document.querySelector(".counter-section");
    if (counterSection) {
      observer.observe(counterSection);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const leftToRightitemVariants = {
    hidden: { opacity: 0, x: -100 }, // Initial state
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, // Animation state
  };

  const opacityItemVariants = {
    hidden: { opacity: 0 }, // Initial state
    visible: { opacity: 1, transition: { duration: 0.8 } }, // Animation state
  };

  return (
    <div className="faqContainer ">
      <section id="counter" className="counter-section content-section">
        <div className="container ">
          <div className="row justify-content-center align-items-center strength-row">
            <motion.div
              className="col-md-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={leftToRightitemVariants}
            >
              <h2 className="white">Your Trust, Our Priority</h2>
            </motion.div>

            {[
              { target: "2000", label: "ORDERS", icon: "fa-cart-shopping" },
              { target: "200", label: "TEAM", icon: "fa-users" },
              { target: "100", label: "BRANDS", icon: "fa-tags" },
              { target: "5000", label: "CUSTOMERS", icon: "fa-user-check" },
            ].map((item, index) => (
              <motion.div
                className="col counter-wrap"
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={opacityItemVariants}
              >
                <div className="counter-icon-text">
                  <i className={`fa-solid ${item.icon} counter-icon`}></i>
                  <div className="counter-content">
                    <strong>
                      <span className="timer" data-target={item.target}>
                        0
                      </span>
                      +
                    </strong>
                    <span className="count-description">{item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Strength;
