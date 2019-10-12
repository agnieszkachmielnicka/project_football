import React from "react";
import { Component } from "react";
import axios from 'axios';


class Match extends Component {


    render() {
        return (
            <div>
                {this.props.match.params.match_id}
            </div>
        )
    }
}

export default Match; 