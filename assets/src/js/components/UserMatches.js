import React from "react";
import { Component } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class UserMatches extends Component {

    state = {
        matches: null
    }

    componentDidMount() {
        this.getUserMatches()
    }

    getUserMatches = () => {
        axios.get('http://localhost:8000/matches/api/matches/')
        .then(res => {
            console.log(res.data)
            this.setState({
                matches: res.data
            })      
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const matches = this.state.matches ? 
                        (
                            this.state.matches.map((match) => {
                                const match_link = '/matches/' + match.id + '/'
                                return (
                                    <div>
                                        <div class="divider"></div>
                                        <div class="section">
                                            <h5><NavLink to={match_link}>{match.name}</NavLink></h5>
                                            <p>Date: {match.match_date}</p>
                                            <p>Time: {match.match_time}</p>
                                            <p>Location: {match.location}</p>
                                            <p>Quantity of players: {match.quantity_of_players}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )
                        :
                        <div>Loading</div>
                            
                        
        return (
            <div className="container">
                {matches}
            </div>
        )
    }
}

export default UserMatches;