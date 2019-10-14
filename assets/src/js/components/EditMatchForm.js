import React from "react";
import { Component } from "react";
import { DatePickerInput } from 'rc-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-datepicker/lib/style.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import axios from 'axios';


class EditMatchForm extends Component {

    state = {
        match: null,
        match_id: this.props.match.params.match_id
    }

    componentDidMount() {
        this.getMatch(this.props.match.params.match_id)
    }

    getMatch = (match_id) => {
        axios.get('http://localhost:8000/matches/api/matches/' + match_id + '/')
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

    updateMatch = (match_id) => {
        axios.put('http://localhost:8000/matches/api/matches/' + match_id + '/', this.state.match)
        .then(res => {
            console.log(res)         
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        const name = e.target.name
        this.setState({
            ...this.state,
            match: {
                ...this.state.match,
                [name]: e.target.value
            }
        })
    }

    handleTime = (time) => {
        let hours = time._d.getHours()
        let min = time._d.getMinutes()
        this.setState({ 
            ...this.state,
            match: {
                ...this.state.match,
                match_time: hours + ':' + min
            }
        })
    }

    handleDate = (jsDate, dateString) => {
        this.setState({
            ...this.state.match,
            match : {
                ...this.state.match,
                match_date: dateString 
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.updateMatch(this.state.match_id)
    }

    render() {
        
        const match = this.state.match ? (
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div class="input-field col s12">
                        <input disabled id="match_name" name="match_name" type="text" class="validate" defaultValue={this.state.match.name} onChange={this.handleChange}/>
                        <label className="active" for="match_name">Match Name</label>
                    </div> 
                </div>
                <div className="row">
                    <div class="input-field col s6">
                        <label className="active" for="match_date">Date</label>
                        <br/>
                        <DatePickerInput id="match_date" name="match_date" displayFormat="YYYY-MM-DD" returnFormat="YYYY-MM-DD" value={this.state.match.match_date} className='my-custom-datepicker-component' onChange={this.handleDate}/>
                    </div>
                    <div class="input-field col s6">
                        <TimePicker format="HH:mm" showSecond={false} name="match_time" defaultValue={moment(this.state.match.match_time, "HH:mm")} onChange={this.handleTime}/>
                        <label className="active" for="match_time">Time</label>
                    </div> 
                </div>             
                <div className="row">
                    <div class="input-field col s12">
                        <input id="quantity_of_players" name="quantity_of_players" type="text" class="validate" defaultValue={this.state.match.quantity_of_players} onChange={this.handleChange}/>
                        <label className="active" for="quantity_of_players">Quantity of players</label>
                    </div> 
                </div>
                <div className="row">
                    <div class="input-field col s12">
                        <input id="location" name="location" type="text" class="validate" defaultValue={this.state.match.location} onChange={this.handleChange}/>
                        <label className="active" for="location">Location</label>
                    </div> 
                </div>
                <div className="row">
                    <button class="btn waves-effect waves-light" type="submit">Edit
                        <i class="material-icons right">send</i>
                    </button> 
                </div>
            </form>
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
                {match}
            </div>
        )
    }
}

export default EditMatchForm;