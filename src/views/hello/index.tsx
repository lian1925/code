import * as React from "react";

import "./index.less";

export interface IHomeProps {}

export default class IHome extends React.Component<IHomeProps, any> {
  public render() {
    return <div className="hello">Hello world!</div>;
  }
}
