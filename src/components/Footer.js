import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
 
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    backgroundColor: 'black',
  },
  footer: {
    backgroundColor: 'black',
    marginTop: theme.spacing.unit ,
    padding: `${theme.spacing.unit * 4}px 0`,
    borderRadius: 6
  },
  textProps: {
      color: 'White'
  }
});
 
function Footer(props) {
  const { classes } = props;
 
  return (
    <footer className={classes.footer}>
      <Paper className={classes.root} elevation={1}>
        <Typography align="center" className={classes.textProps}>
        &copy;<a href="https://github.com/coviapp">CoviApp Organization</a>, All rights reserved
        </Typography>
      </Paper>
    </footer>
  );
}
 
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Footer);