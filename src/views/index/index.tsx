import * as React from "react";
import { Radio, Input, Button } from "antd";

import "./index.css";

import site = require("src/public/generate/index.json");
import summary = require("@/public/generate/summary.json");

import Header from "@/components/header";
import Content from "@/components/content";
import Footer from "@/components/footer";

import * as service from "@/service/post";
export interface IHomeProps {}

export default class IHome extends React.Component<IHomeProps, any> {
  state: any = {
    postList: []
  };
  componentDidMount() {
    this.setState({
      postList: service.filterPost(summary.fileMap)
    });
  }
  public render() {
    return (
      <div>
        <Header title={site.siteTitle} description={site.description} />

        <Content postList={service.filterPost(summary.fileMap)} />

        <Footer copyright={site.copyright} expire={site.expire} />
      </div>
    );
  }
}
