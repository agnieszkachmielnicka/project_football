import React from 'react'
import {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


class Home extends Component {

    state = {
        public_matches: null
    }

    componentDidMount() {
        this.getPublicMatches()
    }

    getPublicMatches = () => {
        axios.get('http://localhost:8000/matches/api/public_matches/')
        .then(res => {
            console.log(res.data)
            this.setState({
                public_matches: res.data
            })      
        })
        .catch(err => {
            console.log(err)
        })
    }

    joinMatch = (match_id, user) => {
        this.state.public_matches.map(match => {
            match.id === match_id && 
            (!match.players.includes(user) && match.players.push(user))               
        })
        console.log(this.state.public_matches)
        axios.put('http://localhost:8000/matches/api/matches/' + match_id + '/',
        this.state.public_matches)
        .then(res => {
            console.log(res)         
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const public_matches = this.state.public_matches ? 
                                (
                                    this.state.public_matches.map(match => {
                                        const match_link = '/matches/' + match.id + '/'
                                        return (
                                            <div>
                                                <div class="divider"></div>
                                                <div class="row">
                                                    <div class="section col">
                                                        <h5><NavLink to={match_link}>{match.name}</NavLink></h5>
                                                        <p>Date: {match.match_date}</p>
                                                        <p>Time: {match.match_time}</p>
                                                        <p>Location: {match.location}</p>
                                                        <p>Quantity of players: {match.quantity_of_players}</p>
                                                        <p>Created by: {match.creator}</p>
                                                    </div>
                                                    {(this.props.isAuthenticated && (this.props.username !== match.creator)) &&
                                                        <div className="section col">
                                                            <a class="btn-floating btn-medium waves-effect waves-light red" onClick={() => this.joinMatch(match.id, this.props.username)}><i class="material-icons">add</i></a>
                                                        </div>
                                                    }
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
                {public_matches}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      username: localStorage.getItem('user')
    }
  }
 

export default connect(mapStateToProps)(Home);