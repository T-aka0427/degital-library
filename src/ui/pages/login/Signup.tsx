import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";


import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "formik-mui";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createUserWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential, deleteUser } from "firebase/auth";

import { auth } from "../../../firebase/firebase";
import { setUser } from "../../../firebase/firestore";
import { signupSchema } from "../../../validation/loginSchema";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">
        Degital Library
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Signup = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign up
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                try {
                  createUserWithEmailAndPassword(auth, values.email, values.password)
                  .then(() => {
                      onAuthStateChanged(auth, async(user) => {
                        if (user) {
                          await setUser(user.uid, values.name);
                          navigate("/top");
                        } else {
                          throw new Error("登録に失敗しました")
                        }
                      });
                  })
                  setSubmitting(false);
                } catch(e: unknown) {
                  if( e instanceof Error) {
                    if (auth.currentUser) {
                      deleteUser(auth.currentUser);
                    }
                    alert("Error" + e.message)
                  }
                }
              }, 200);
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    label="name"
                    type="text"
                    placeholder="User Name"
                    fullWidth
                    component={TextField}  
                  />            
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    label="email"
                    type="text"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    label="password"
                    type="password"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="confirmPassword"
                    label="confirmPassword"
                    type="password"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Signup;