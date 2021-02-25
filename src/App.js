import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Footer from './components/Footer';
import Tags from './components/Tags';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">

        <div style={{ display: 'flex' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Devopics
        </Typography>
          <Button style={{
            margin: '8px',
            maxHeight: '36px',
            color: '#fff',
            backgroundColor: '#2ecc71'
          }}>Suggest</Button>
        </div>

        <Typography variant="h5" component="h2" gutterBottom>
          {'The most useful links about trending tech topics, driven by developers.'}
        </Typography>
        <Tags />
      </Container>
      <Footer />
    </div>
  );
}
