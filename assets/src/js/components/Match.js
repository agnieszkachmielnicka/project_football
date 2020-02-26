import React from "react";
import { Component } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';


class Match extends Component {

    state = {
        match: null
    }

    componentDidMount() {
        this.getMatch(this.props.match.params.match_id)
    }

    getMatch = (match_id) => {
        const token = `Token ` + localStorage.getItem('token')
        console.log(token)
        const headers = {
            'Authorization': token
        }
        axios.get('http://localhost:8000/matches/api/matches/' + match_id + '/', {"headers": headers})
        .then(res => {
            console.log(res.data)
            this.setState({
                match: res.data
            })      
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        const match_url = "/matches/edit/" + this.props.match.params.match_id + "/"
        const match = this.state.match ?
                      (
                          <div className="center">
                              <h3>{this.state.match.name}  <NavLink to={match_url}><i class="small material-icons">edit</i></NavLink></h3>
                              <p>Date: {this.state.match.match_date}</p>
                              <p>Time: {this.state.match.match_time}</p>
                              <p>Location: {this.state.match.location}</p>
                              <p>Quantity of players: {this.state.match.quantity_of_players}</p>
                              <p>Players: </p>
                              {this.state.match.players.map(player => {
                                  return <p>{player}</p>
                              })}
                          </div>
                      )
                      :
                      <div className="container center">
                        <div class="preloader-wrapper small active">
                            <div class="spinner-layer spinner-green-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                      </div>
        return (
            <div className="container">
                {match}
            </div>
        )
    }
}

export default Match; 