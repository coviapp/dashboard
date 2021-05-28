import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Graph from './Graph'
import NotFound from './NotFound'


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component = { Login }/>
            <Route exact path="/dashboard" component = { Dashboard }/>
            <Route exact path="/graphs/:username" component = { Graph }/>
            <Route component = { NotFound }/>
        </Switch>
    </BrowserRouter>
);

export default Router