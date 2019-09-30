import React from "react";
import { Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import UserDetails from "./components/UserDetails"

const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login}/>{" "}    
    <Route exact path="/signup/" component={Signup}/>{" "}
    <Route exact path="/userdetail/" component={UserDetails}/>{" "}
  </div>
);

export default BaseRouter;