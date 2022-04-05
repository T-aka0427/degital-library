import React, {useContext} from "react";
import { useNavigate, Navigate } from "react-router-dom";
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

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase/firebase";
import { AuthContext } from "../../../auth/AuthProvider";
import { useLogin } from "../../../hooks/useLogin";
import { loginSchema } from "./validationSchema";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const { hasError, error }= useLogin();
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
    {currentUser?
      <Navigate to="/top" />
      :
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
              Sign In
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  signInWithEmailAndPassword(auth, values.email, values.password)
                  .then(() => {
                    navigate("/top");
                  })
                  .catch((e) => {
                    console.log(e + ":エラーが発生しました。")
                    hasError();
                  });
                  setSubmitting(false);
                }, 400);
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              <Form autoComplete="off">
                <Grid container spacing={2}>
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
                  <Grid>
                    <Box sx={{ 
                      ml: 2, 
                      mt: 1, 
                      fontSize: 12, 
                      color: "error.main" 
                    }}>
                    {error && 
                      "登録情報と一致しません。"
                    }
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    }
    </>
  );
};

export default Login;
