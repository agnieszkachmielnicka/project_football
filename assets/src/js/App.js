import React from 'react';
import {connect, compose} from 'react-redux';
import * as actions from '../store/actions/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routers';
import Navbar from './components/Navbar'


class App extends React.Component {
  

    componentDidMount() {
      this.props.onTryAutoSignup();
    }

    render () {

      return (
          <div>
            <Router>             
              <div {...this.props}>
                <Navbar isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} username={this.props.username} /> 
                <BaseRouter/>
              </div>
            </Router>
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
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState()),
      logout: () => dispatch(actions.logout()),
    }
  }  

  export default connect(mapStateToProps, mapDispatchToProps)(App);