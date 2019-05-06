import * as React from "react";
import QueueAnim from "rc-queue-anim";

import "./index.css";

import site = require("src/public/generate/index.json");
import summary = require("@/public/generate/summary.json");

import Header from "@/components/header";
import Content from "@/components/content";
import Footer from "@/components/footer";

import * as service from "@/service/post";
import * as mdService from "@/service/index";

// console.log("service", mdService.postList({ pageNo: 2, pageSize: 1 }));
console.log(
  "detail",
  mdService.postDetail("./src/public/generate/tech/lian/es7.json")
);

export interface IHomeProps {}

export default class IHome extends React.Component<IHomeProps, any> {
  state: any = {
    postList: [],
    show: true
  };
  componentDidMount() {
    this.setState({
      postList: service.filterPost(summary.fileMap)
    });
  }
  public render() {
    const postList = mdService.postList({ pageSize: 10, pageNo: 1 });
    console.log("list", postList);

    return (
      <div>
        <QueueAnim
          type={["top", "bottom"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {this.state.show
            ? [
                <Header
                  key="a"
                  title={site.siteTitle}
                  description={site.description}
                />,

                <Content key="b" postList={postList} />,

                <Footer
                  key="c"
                  copyright={site.copyright}
                  expire={site.expire}
                />
              ]
            : null}
        </QueueAnim>
      </div>
    );
  }
}
