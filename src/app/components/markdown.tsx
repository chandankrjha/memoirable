/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, IndexLink, Link } from 'react-router';
declare function require(name:string);
var mdc = require('markdown-core/markdown-core-node');

export class Markdown extends React.Component<{}, any> {
  outputHTML: any;
  inputText: string;

  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.inputText = event.target.value;
    this.outputHTML = mdc.render(this.inputText);
    document.getElementById("markdown-output").innerHTML = this.outputHTML;
    this.setState({value: event.target.value});
  }

  _navigateBack() {
    browserHistory.goBack();
  }

  render() {
    return (
      <div className="row">
        <div className="markdown-left">
          <textarea className="mardown-textarea" type="text" value={this.state.value} onChange={this.handleChange}></textarea>
        </div>
        <div className="markdown-right">
          <div id="markdown-output" className="markdown-output-wrapper"></div>
        </div>
      </div>
    );
  }
}
