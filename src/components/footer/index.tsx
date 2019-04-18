import * as React from "react";
import { Link } from "react-router-dom";
import "./index.less";

export interface FooterProps {
  copyright: string;
  expire: string;
}

export const Footer = (props: FooterProps) => (
  <div className="component-footer">
    <span>
      <i className="iconfont">&#xe6ab;</i>
      {props.expire}
    </span>
    <span>
      <i className="iconfont">&#xe643;</i>
      <Link to="/">{props.copyright}</Link>
    </span>
  </div>
);

export default Footer;
