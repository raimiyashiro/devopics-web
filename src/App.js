import React, { useState, useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './components/Footer';
import Tags from './components/Tags';
import FormModal from './components/FormModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();

  const [event, setEvent] = useState(0);

  const handleEvent = () => {
    setEvent(Math.random());
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <FormModal event={event} />

        <div style={{ display: 'flex' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {'Devopics'}
          </Typography>
          <Button
            onClick={handleEvent}
            style={{
              margin: '8px',
              maxHeight: '36px',
              color: '#fff',
              backgroundColor: '#2ecc71'
            }}
          >
            {'Suggest'}
          </Button>
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
