import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Navbar = (props) => {

    return (     
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <a className="brand-logo">football app</a> 
                    {
                        props.isAuthenticated ?

                            <ul className="right">
                                <li><Link to='/userdetail/'>{props.username}</Link></li>
                                <li onClick={props.logout}><Link to="/">Logout</Link></li>
                            </ul>
                        :
                            <ul className="right">
                                <li><NavLink to='/login/'>Login</NavLink></li>
                                <li><NavLink to='/signup/'>SignUp</NavLink></li>
                            </ul>
                    }
                    <ul className="right">
                        <li><Link to="/">Home</Link></li>
                    </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar);