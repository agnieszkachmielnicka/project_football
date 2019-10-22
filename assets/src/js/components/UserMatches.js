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
        const token = `Token ` + localStorage.getItem('token')
        console.log(token)
        const headers = {
            'Authorization': token
        }
        axios.get('http://localhost:8000/matches/api/matches/', {"headers": headers})
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
                                            <p>Created by: {match.creator}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )
                        :
                        (
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
                        )
                            
                        
        return (
            <div className="container">
                {matches}
            </div>
        )
    }
}

export default UserMatches;