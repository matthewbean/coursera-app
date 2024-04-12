import React from "react";
import basket from "../assets/basket.png";
import lemon from "../assets/lemon.png";
import hamburger from "../assets/hamburger.png";

function nav() {
  return (
    <nav className="nav">
      <img src={hamburger} alt="Show menu icon" srcset="" />
      <img src={lemon} alt="Little lemon logo" srcset="" />
      <img src={basket} alt="shopping cart" srcset="" />
    </nav>
  );
}

export default nav;
