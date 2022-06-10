import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import MuiAlert from "@mui/material/Alert";
import {Snackbar, Stack} from "@mui/material";
// import {AuthContext} from "../../context/authcontext";
import "./styles/index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://excelegal.in/">
                Excelegal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function LoginPage() {

    useEffect(()=>{
        const auth_token = localStorage.getItem("auth_token");
        fetch(`http://${process.env.REACT_APP_BASE_URL}/users/info/`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth_token}`
            },
        })
            .then((res)=> {
                if (res.ok){
                    window.location.pathname="/";
                }
            })
    },[])


    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [loginError, setLoginError] = useState('');

    const snackbar = () =>{
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {loginError}
                    </Alert>
                </Snackbar>
            </Stack>
        );
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser= async ()=>{
        console.log(email, password)
        fetch(`http://${process.env.REACT_APP_BASE_URL}/auth/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "password": password })
        })
            .then((res) => {
                if(!res.ok){
                    const err = new Error("Error");
                    err.response = res;
                    throw err.response.json();
                }
                return res.json();
            })
            .then((data)=> {
                localStorage.setItem("auth_token", data.accessToken);
            })
            .then(()=> window.location.pathname= "/")
            .catch((err)=>{
                console.log(err)
                setOpen(true);
                err.then((data)=> {
                    setLoginError(data.errors);
                });
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/*<LockOutlinedIcon />*/}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={loginUser}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/*<Grid item xs>*/}
                                {/*    <Link href="/forgotpassword" variant="body2">*/}
                                {/*        Forgot password?*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
            {snackbar()}
        </>
    );
}