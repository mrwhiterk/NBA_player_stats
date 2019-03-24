import React, { Component } from 'react';
import serverUrl from '../constants';
import axios from 'axios';

import './MyTeamList.css';
import HomePhotos from '../HomePhotos/HomePhotos';
import PlayerSearchForm from '../PlayerSearchForm/PlayerSearchForm';
import { Link } from 'react-router-dom';

class MyTeamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamList: [],
      searchTerm: '',
    };

    this.getTeams = this.getTeams.bind(this);
    this.searchTeam = this.searchTeam.bind(this);
    this.teams = [];
  }

  getTeams() {
    axios
      .get(serverUrl + '/teams')
      .then(res => {
        this.setState({ teamList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchTeam(term) {
    this.setState({ searchTerm: term.toLowerCase() });
  }

  componentDidMount() {
    this.getTeams();
  }

  render() {
    if (this.state.searchTerm) {
      this.teams = this.state.teamList.filter(team => {
        return team.fullName.toLowerCase().includes(this.state.searchTerm);
      });
    } else {
      this.teams = this.state.teamList;
    }

    return (
      this.props.isLoggedIn === true && (
        <div className='row'>
          <HomePhotos />
          <div className='col-6'>
            <div className='player-title-show'>
              <h1 className='search-title'>My Team List</h1>
            </div>
            <PlayerSearchForm searchTeam={this.searchTeam} />
            <Link to='/newTeam'>
              <button className='btn btn-info'>Create New Team</button>
            </Link>
            {this.teams.map((team, i) => {
              return (
                <div className='list-group' key={i}>
                  <div className='list-group-item list-group-item-action'>
                    <Link to={`/team/${team._id}`}>
                      <h4 className='list-group-item-name flex-item'>
                        {team.fullName}
                      </h4>
                    </Link>
                    <span />
                    <Link to={`/team/${team._id}`}>
                      <h4 className='flex-item'>
                        <span
                          role='img'
                          aria-label='basketball'
                          aria-labelledby='team'>
                          🏀
                        </span>
                      </h4>
                    </Link>
                    &nbsp;
                    <h4 className='list-group-item-name flex-item'>
                      {team.teamRoster.length}/12 players
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    );
  }
}

export default MyTeamList;
