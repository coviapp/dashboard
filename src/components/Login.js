import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useForm from './useForm'

import { Redirect } from "react-router-dom"

const Login = () => { 
  let loggedIn = false

  const token = localStorage.getItem("token")
  if (token) loggedIn = true
  // todo: verify the tokens!

  const [ state, handleChange, formSubmit ] = useForm({
    email: "",
    password: "",
    loggedIn: loggedIn,
    error: ""
  });

  if (state.loggedIn === true) {
    return <Redirect to="/dashboard" />
  }
  
  let content =  (
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
            value={state.email}
            autoFocus
            onChange={handleChange}
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
            value={state.password}
            autoComplete="current-password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={formSubmit}
          >
            Sign In
          </Button>
        </form>

        <div>
          {state.error}      
        </div>
        
      </div>
    </Container>
  );

  return content
}

export default Login