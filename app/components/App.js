'use strict';

var Badge = require('./Badge');
var Popular = require('./Popular');
var React = require('react');

class App extends React.Component {
  render() {
    return (
      <div>
        <Popular />
      </div>
    );
  }
}

module.exports = App;