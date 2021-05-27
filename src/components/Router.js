import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Graph from './Graph'
import NotFound from './NotFound'


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component = { App }/>
            <Route exact path="/graphs/:username" component = { Graph }/>
            <Route component = { NotFound }/>
        </Switch>
    </BrowserRouter>
);

export default Router