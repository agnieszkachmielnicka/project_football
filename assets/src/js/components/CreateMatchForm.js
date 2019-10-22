import React from "react";
import { Component } from "react";
import { DatePickerInput } from 'rc-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-datepicker/lib/style.css';
import 'rc-time-picker/assets/index.css';
import axios from 'axios';


class CreateMatchForm extends Component {

    state = {
        match_name: "",
        match_date: null,
        match_time: null,
        quantity_of_players: "",
        location: "",
        if_private: false,
    }


    createMatch = (data) => {
        console.log(data)
        axios.post('http://localhost:8000/matches/api/matches/', {
            name: data.match_name,
            match_date: data.match_date,
            match_time: data.match_time,
            creator: localStorage.getItem('user'),
            quantity_of_players: data.quantity_of_players,
            location: data.location,
            if_private: data.if_private
        })
        .then(res => {
            console.log(res)         
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value;
        this.setState({
            [name] : value
        })
    }

    handleTime = (time) => {
        let hours = time._d.getHours()
        let min = time._d.getMinutes()
        console.log(hours + ':' + min)
        
        this.setState({ 
            match_time: hours + ':' + min
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        this.createMatch(this.state)
    }

    render() {
        return (
            <div className="container">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div class="input-field col s12">
                            <input id="match_name" name="match_name" type="text" class="validate" defaultValue={this.state.match_name} onChange={this.handleChange}/>
                            <label for="match_name">Match Name</label>
                        </div> 
                    </div>
                    <div className="row">
                        <div class="input-field col s6">
                            <label className="active" for="match_date">Date</label>
                            <br/>
                            <DatePickerInput id="match_date" name="match_date" displayFormat="YYYY-MM-DD" returnFormat="YYYY-MM-DD" value={this.state.match_date} className='my-custom-datepicker-component' onChange={(jsDate, dateString) => this.setState({ match_date: dateString })}/>
                        </div>
                        <div class="input-field col s6">
                            <TimePicker showSecond={false} name="match_time" defaultValue={this.state.match_time} onChange={this.handleTime}/>
                            <label className="active" for="match_time">Time</label>
                        </div> 
                    </div>
                    <div className="row">
                        <div class="input-field col s12">
                            <input id="quantity_of_players" name="quantity_of_players" type="text" class="validate" defaultValue={this.state.quantity_of_players} onChange={this.handleChange}/>
                            <label for="quantity_of_players">Quantity of players</label>
                        </div> 
                    </div>
                    <div className="row">
                        <div class="input-field col s12">
                            <input id="location" name="location" type="text" class="validate" defaultValue={this.state.location} onChange={this.handleChange}/>
                            <label for="location">Location</label>
                        </div> 
                    </div>
                    <div className="row" id="if-private">              
                        <div class="col s6">
                            <label>
                                <input type="radio" class="filled-in" name="if_private" value="true" defaultChecked={this.state.if_private} onChange={this.handleChange}/>
                                <span>Private</span>
                            </label>
                        </div>
                        <div class="col s6">
                            <label>
                                <input type="radio" class="filled-in" name="if_private" value="false" defaultChecked={this.state.if_private === false} onChange={this.handleChange}/>
                                <span>Public</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <button class="btn waves-effect waves-light" type="submit">Create
                            <i class="material-icons right">send</i>
                        </button> 
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateMatchForm;