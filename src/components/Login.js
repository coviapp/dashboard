import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import useForm from './useForm'
import { Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import Background from '../imgs/bcrth.jpg'

const useStyles = makeStyles({
  sep: {
    margin: 20
  },
  header: {
    paddingTop: 40,
    textAlign: "center",
    color: "black",
    fontSize: 40,
    fontWeight: "bold"
  }
})

const Login = () => { 
  let loggedIn = false
  const classes = useStyles()

  const token = localStorage.getItem("token")
  if (token) loggedIn = true
  // todo: verify the tokens!

  const [ state, handleChange, formSubmit ] = useForm({
    username: "",
    password: "",
    loggedIn: loggedIn,
    error: ""
  });

  if (state.loggedIn === true) {
    return <Redirect to="/dashboard" />
  }
  
  let content =  (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        height: '100vh',
        margin: 0
      }}
    >
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div>
        
        <div className={classes.header}>
          Sign in
        </div>

        <form noValidate>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={state.username}
            autoFocus
            onChange={handleChange}
            InputLabelProps={{style: {fontSize: 21, fontWeight: "bold"}}}
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
            InputLabelProps={{style: {fontSize: 21, fontWeight: "bold"}}}
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
    </div>
  )

  return content
}

export default Login