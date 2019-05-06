import * as React from "react";

import { Radio, Input, Button } from "antd";

import "./index.css";

import data = require("src/public/index.json");
export interface IHomeProps {}

export default class IHome extends React.Component<IHomeProps, any> {
  public render() {
    return (
      <div>
        Hello world!
        <p>{JSON.stringify(data)}</p>
        <Button type="primary">click</Button>
      </div>
    );
  }
}
