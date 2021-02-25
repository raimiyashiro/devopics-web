import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';


import { makeStyles } from '@material-ui/core/styles';

export default function Footer() {
    const useStyles = makeStyles((theme) => ({
        footer: {
            padding: theme.spacing(3, 2),
            marginTop: 'auto',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        },
    }));

    const classes = useStyles();


    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">This beautiful website comes from @material-ui/core.</Typography>
                <Typography variant="body2" color="textSecondary">
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/raimiyashiro/devopics">
                        devopics
        </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </footer>
    );
}