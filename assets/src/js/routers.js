import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import UserDetails from "./components/UserDetails"
import CreateMachForm from "./components/CreateMatchForm"
import UserMatches from "./components/UserMatches"
import Match from "./components/Match"


const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login}/>{" "}    
    <Route exact path="/signup/" component={Signup}/>{" "}
    <Route exact path="/userdetail/" component={UserDetails}/>{" "}
    <Route exact path="/create_match/" component={CreateMachForm}/>{" "}
    <Route exact path="/user_matches/" component={UserMatches}/>{" "}
    <Route exact path="/matches/:match_id/" component={Match}/>{" "}
  </div>
);

export default BaseRouter;