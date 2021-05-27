import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import BarChart from './BarChart'
import LineChart from './LineChart'
import NotFound from './NotFound'


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component = { App }/>
            <Route exact path="/BarChart/:username" component = { BarChart }/>
            <Route exact path="/LineChart/:username" component = { LineChart }/>
            <Route component = { NotFound }/>
        </Switch>
    </BrowserRouter>
);

export default Router