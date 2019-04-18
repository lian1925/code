import * as React from "react";
import { Link } from "react-router-dom";
import "./index.less";
export interface HeaderProps {
  title: string;
  description?: string;
}
const navData = [
  {
    link: "/",
    icon: '<i class="iconfont">&#xe7d4;</i>',
    text: "首页"
  },
  {
    link: "/",
    icon: '<i class="iconfont">&#xe627;</i>',
    text: "分类"
  },
  {
    link: "/",
    icon: '<i class="iconfont">&#xe752;</i>',
    text: "标签"
  },
  {
    link: "/",
    icon: '<i class="iconfont">&#xe606;</i>',
    text: "归档"
  },
  {
    link: "/",
    icon: '<i class="iconfont">&#xe601;</i>',
    text: "关于"
  }
];
export const Header = (props: HeaderProps) => (
  <div className="component-header">
    <div className="inner">
      <Link to="/" className="brand">
        <h1>
          {" "}
          <i className="iconfont">&#xee3b;</i> {props.title}
        </h1>
      </Link>

      <h2>{props.description}</h2>
      <div className="nav">
        {navData.map(item => (
          <Link to={item.link} key={item.text} className="item">
            <div dangerouslySetInnerHTML={{ __html: item.icon }} />
            <div>{item.text}</div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Header;
