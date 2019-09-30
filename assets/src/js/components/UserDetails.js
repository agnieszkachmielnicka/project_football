import React from 'react';
import {Select} from 'react-select';
import axios from 'axios';
import {CountryDropdown} from 'react-country-region-selector';


const selectStyle = {
    'height': 150,
    'margin-top': 10
}

class UserDetails extends React.Component {

    state = {
        username: localStorage.getItem('user'),
        user: null,
        positions: null
    }

    getUserDetails = (username) => {
            axios.get('http://localhost:8000/accounts/api/users/' + username)
            .then(res => {
                console.log(res.data)
                this.setState({
                    user: res.data
                })      
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateUserDetails = (username) => {
        console.log("UPDATE")
        console.log(this.state.user)
        axios.put('http://localhost:8000/accounts/api/users/' + username + '/', this.state.user)
        .then(res => {
            console.log(res)         
        })
        .catch(err => {
            console.log(err)
        })
    }

    getPositions = () => {
        axios.get('http://localhost:8000/accounts/api/positions/')
            .then(res => {
                console.log(res.data)
                this.setState({
                    positions: res.data
                })      
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.updateUserDetails(this.state.username)
    }

    handleChange = (e) => {
        const name = e.target.name
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: e.target.value
            }
            
        })
    }

    selectCountry = (val) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                country: val
            }
        })
    }

    handlePositions = (e) => {
        var positions = []
        for (var i = 0; i < e.target.selectedOptions.length; i++) {
            positions.push({id: e.target.selectedOptions[i].id, name: e.target.selectedOptions[i].value})
        }
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                positions: positions
            }
        })
    }

    componentDidMount() {    
        this.getUserDetails(this.state.username)
        this.getPositions()
    }

    render() {
        
        let options = this.state.positions && this.state.user ? this.state.positions.map((position) =>
                <option id={position.id} value={position.name}>
                    {position.name}
                </option>
                )
                :
                <option></option>


        const user = this.state.user ? 
        <form class="col s12" onSubmit={this.handleSubmit}>
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="text" class="validate" name="first_name" value={this.state.user.first_name} onChange={this.handleChange}/>
                    <label className="active" for="icon_prefix">First Name</label>                      
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="text" class="validate" name="second_name" value={this.state.user.second_name} onChange={this.handleChange}/>
                    <label className="active" for="icon_prefix">Second Name</label> 
                </div>
            </div>
            <div className="row">
                <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input disabled id="email" type="email" class="validate" name="email" value={this.state.user.email}/>
                    <label className="active" for="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div class="input-field col s12">
                    <i class="material-icons prefix">date_range</i>
                    <input value={this.state.user.age} id="age" type="text" class="validate" name="age" onChange={this.handleChange}/>
                    <label className="active" for="age">Age</label>
                </div>
            </div>
            <div className="row">
                <div class="input-field col s12">
                    <i class="material-icons prefix">star</i>
                    <input value={this.state.user.favourite_team} id="favourite_team" type="text" class="validate" name="favourite_team" onChange={this.handleChange}/>
                    <label className="active" for="favourite_team">Favourite team</label>
                </div>
            </div>
            <label className="active" for="gender">Gender</label>
            <div className="row" id="gender">              
                <div class="col s6">
                    <label>
                        <input type="radio" class="filled-in" value="M" name="gender" defaultChecked={this.state.user.gender === 'M'} onChange={this.handleChange}/>
                        <span>Male</span>
                    </label>
                </div>
                <div class="col s6">
                    <label>
                        <input type="radio" class="filled-in" value="F" name="gender" defaultChecked={this.state.user.gender === 'F'} onChange={this.handleChange}/>
                        <span>Female</span>
                    </label>
                </div>
            </div> 
            <div className="row">
                <label className="active" for="country">Country</label>
                <CountryDropdown id="country" className="browser-default" name="country" value={this.state.user.country} onChange={(val) => this.selectCountry(val)} />
            </div>
            <div className="row">
                <div class="input-field col s12">
                    <input id="city" type="text" class="validate" name="city" value={this.state.user.city} onChange={this.handleChange}/>
                    <label className="active" for="city">City</label>
                </div>
            </div>
            <div className="row">
                <div class="input-field col s12">
                    <label className="active" for="positions">Positions</label>
                    <select style={selectStyle} className="browser-default" name="positions" id="positions" multiple={true} defaultValue={this.state.user.positions.map((pos) => pos.name)} onChange={this.handlePositions}>
                        {options}
                    </select>
                </div>
            </div>
            <div className="row">                
                <button class="btn waves-effect waves-light" type="submit">Save
                    <i class="material-icons right">send</i>
                </button> 
            </div>  
        </form>
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
                <div className="row">
                    {user}
                </div>
            </div>
        )
    }
}

export default UserDetails;