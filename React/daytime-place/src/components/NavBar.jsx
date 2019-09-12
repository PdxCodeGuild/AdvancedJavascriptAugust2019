import React from "react";

import "./NavBar.scss";

export const Link = (props) => (
  <a className="Link" href={props.href || "#"}>
    {props.children}
  </a>
)

export const NavBar = () => (
  <div className="NavBar">
    <div className="NavBar__logo">
      Daytime Place
    </div>
    <div className="NavBar__links">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/catering">Catering</Link>
      <Link href="/hours">Hours</Link>
    </div>
  </div>
)