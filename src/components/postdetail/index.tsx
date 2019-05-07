import * as React from "react";
import { Link } from "react-router-dom";
import * as utils from "@/utils";

import "./index.less";

export interface ContentProps {
  postDetail: PostDetail;
}

export const Content = (props: ContentProps) => (
  <div className="component-content">
    <div className="inner">
      <div>
        {
          <div className="post">
            <h2 className="post-title">{props.postDetail.title}</h2>

            <div className="post-meta">
              发表于 {utils.formatDateTime(props.postDetail.createAt)} | 分类于{" "}
              <Link to="/tag">{props.postDetail.tags}</Link>
            </div>

            <div className="post-body">
              <div
                dangerouslySetInnerHTML={{
                  __html: utils.renderWithMarkdown(props.postDetail.content)
                }}
              />
            </div>
          </div>
        }
      </div>
    </div>
  </div>
);

export default Content;
