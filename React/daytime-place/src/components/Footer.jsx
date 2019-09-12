import React from "react";

import "./Footer.scss";
import { Link } from "./NavBar";

const Footer = () => (
  <div className="Footer">
    <div className="Footer__links">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/catering">Catering</Link>
      <Link href="/hours">Hours</Link>
    </div>
    <div>Daytime Place 2019&copy;</div>
  </div>
)

export default Footer;