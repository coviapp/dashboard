import {React} from "react"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
        fontSize: 25,
        fontWeight: "bold"
    },
    appbarNegative: {
        backgroundColor: "#00C9BC",
        borderRadius: 6,
        fontWeight: "bold",
    },
        appbarPositive: {
        backgroundColor: "#ff0028",
        borderRadius: 6,
        fontWeight: "bold",
    },
})

export default function Appbar(props) {
    const classes = useStyles()
    const {covid, name} = props
    return(
        <AppBar position="static" className={covid.toLowerCase().trim() === 'yes' ? classes.appbarPositive: classes.appbarNegative}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Currently monitoring {name}
            </Typography>
          </Toolbar>
        </AppBar>
    )
}