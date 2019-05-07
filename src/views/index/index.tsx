import * as React from "react";
import QueueAnim from "rc-queue-anim";

import Header from "@/components/header";
import Content from "@/components/content";
import Footer from "@/components/footer";

import * as service from "@/service/index";

import "./index.less";

let temp = service.searchPostList("");
console.log(temp);

export interface IHomeProps {}

export default class IHome extends React.Component<IHomeProps, any> {
  public render() {
    const postList = service.homePostList(10, 1);
    console.log(postList);

    const siteInfo = service.siteBaseInfo();
    return (
      <div>
        <QueueAnim
          type={["top", "bottom"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          <Header
            key="a"
            title={siteInfo.title}
            description={siteInfo.description}
          />
          <Content key="b" postList={postList} />
          <Footer
            key="c"
            copyright={siteInfo.copyright}
            expire={siteInfo.expire}
          />
        </QueueAnim>
      </div>
    );
  }
}
