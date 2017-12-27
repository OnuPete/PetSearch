import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Main extends Component {
  render() {
      return (
        <div>Start</div>
      );
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
