import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Redirect } from "react-router-dom"
import Axios from "axios"

class Login extends React.Component {

  constructor() {
    super()
    let loggedIn = false

    // token stores if logged in...
    const token = localStorage.getItem("token")
    if (token) loggedIn = true
    // todo: verify the tokens!

    this.state = {
      email: "",
      password: "",
      loggedIn,
      error: ""
    }

    this.onChange = this.onChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    // binding the functions so that we can access using a this pointer!
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  async formSubmit(event) {
    // 1. Prevent the form from submitting!
    event.preventDefault()

    try {
      const res = await Axios.post("https://reqres.in/api/login", { email: this.state.email, password: this.state.password })
      // study what await is!
      // also read up about axios!

      const jwtToken = res.data['token']
      // console.log(jwtToken)
      
      localStorage.setItem("token", jwtToken)
      // setting the token!

      this.setState({
        loggedIn: true
      })
    } catch (err) {
      this.setState({
        error: err.message
      })
    }
  }

  render() {

    if (this.state.loggedIn === true) {
      return <Redirect to="/dashboard" />
    }
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          
          <Typography component="h1" variant="h5" align="center">
            Sign in
          </Typography>

          <form noValidate>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.formSubmit}
            >
              Sign In
            </Button>
          </form>

          {this.state.error}      
          {/* Why are we doing this ? */}
        </div>
      </Container>
    );
  }
}

export default Login;