import * as React from "react";
import { Link } from "react-router-dom";
import * as date from "@/utils/date";
import { Pagination } from "antd";

import "./index.less";

export interface ContentProps {
  postList: PostList[];
  meta?: string;
}

export const Content = (props: ContentProps) => (
  <div className="component-content">
    <div className="inner">
      <div>
        {props.postList.map(item => (
          <div className="post" key={item.title}>
            <h2 className="post-title">{item.title}</h2>

            <div className="post-meta">
              发表于 {date.formatDateTime(item.createAt)} | 分类于{" "}
              <Link to="/tag">{item.tags}</Link>
            </div>

            <div className="post-body">{item.preview}</div>
          </div>
        ))}
        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  </div>
);

export default Content;
