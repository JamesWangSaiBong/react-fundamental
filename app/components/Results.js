'use strict';

var React = require('react');
var QueryString = require('query-string');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');


function Profile (props) {
  var info = props.profile;
  
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

function Player(props) {
  return (
    <div className='column'>
      {props.label}
      <Profile profile={props.profile} />
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  
  componentDidMount() {
    var players = QueryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(results => {
      if(results === null) {
        this.setState(function() {
          return {
            error: 'Error: Please check that both users exist on Github',
            loading: false
          };
        });
      }
      
      this.setState(function() {
        return {
          error: '',
          loading: false,
          winner: results[0],
          loser: results[1]
        };
      });
    });
  }
  
  render() {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;
    
    if(loading) {
      return <p>Loading...</p>;
    }
    
    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }
    
    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}

module.exports = Results;