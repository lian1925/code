import * as React from "react";
import { Link } from "react-router-dom";
import * as utils from "@/utils";
import { Pagination } from "antd";

import "./index.less";

export interface ContentProps {
  postList: {
    postList: PostList[];
    pageNo: number;
    pageSize: number;
    total: number;
  };
  meta?: string;
}

export const Content = (props: ContentProps) => (
  <div className="component-content">
    <div className="inner">
      <div>
        {props.postList.postList.map(item => (
          <div className="post" key={item.title}>
            <Link to={`/post?postId=${item.postId}`}>
              <h2 className="post-title">{item.title}</h2>
            </Link>

            <div className="post-meta">
              发表于 {utils.formatDateTime(item.createAt)} | 分类于{" "}
              <Link to="/tag">{item.tags}</Link>
            </div>

            <div className="post-body">
              <div
                dangerouslySetInnerHTML={{
                  __html: utils.renderWithMarkdown(item.preview)
                }}
              />
            </div>
          </div>
        ))}
        <div className="pagination">
          <Pagination
            current={props.postList.pageNo}
            total={props.postList.total}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Content;
