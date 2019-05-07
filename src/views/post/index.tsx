import * as React from "react";
import QueueAnim from "rc-queue-anim";

var moment = require("moment-timezone");

import Header from "@/components/header";
import Footer from "@/components/footer";
import PostDetail from "@/components/postdetail";

let b = moment("2019-05-07T16:25:36.000Z").format("YY-MM-DD, h:mm:ss a");
let a = new Date("2019-05-08 00:25:36");
console.log(a);

import * as service from "src/service/index";

import "./index.less";

export interface PostProps {
  location: any;
}

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
