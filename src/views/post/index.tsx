import * as React from "react";
import QueueAnim from "rc-queue-anim";

import { Route, match } from "react-router-dom";
import { Radio, Input, Button } from "antd";
import * as service from "src/service/index";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PostDetail from "@/components/postdetail";

import "./index.less";

export interface PostProps {
  location: any;
}
let flag = false;

export default class Post extends React.Component<PostProps, any> {
  public render() {
    let params = new URLSearchParams(this.props.location.search);
    const postId = params.get("postId");

    const siteBaseInfo = service.siteBaseInfo();
    const postDetail = service.postDetail(postId);

    return (
      <div>
        <QueueAnim
          type={["top", "bottom"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          <Header
            key="header"
            title={siteBaseInfo.title}
            description={siteBaseInfo.description}
          />
          <PostDetail key="body" postDetail={postDetail} />
          <Footer
            key="footer"
            copyright={siteBaseInfo.copyright}
            expire={siteBaseInfo.expire}
          />
        </QueueAnim>
      </div>
    );
  }
}
