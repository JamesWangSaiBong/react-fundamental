'use strict';

var Badge = require('./Badge');
var Popular = require('./Popular');
var React = require('react');

class App extends React.Component {
  render() {
    return (
      <div>
        <Popular />
        <Badge 
          img='https://avatars0.githubusercontent.com/u/2933430?v=3&s=460'
          name='Tyler McGinnis'
          username='tylermcginnis'
        />
      </div>
    );
  }
}

module.exports = App;