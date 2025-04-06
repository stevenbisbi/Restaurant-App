import React from "react";
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import fondo from "../assets/img/hamburgesa1.jpg";

export const SignIn = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Sección de la imagen */}
      <Grid
        classname="bg-signin"
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          backgroundImage: "url(/hamburgesa1.jpg)", // Ruta desde public
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></Grid>

      {/* Sección de formulario */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ maxWidth: 400, width: "100%" }}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
            Parcha2
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 4 }}>
            ¡Bienvenidos!
          </Typography>

          <Box component="form" noValidate>
            <TextField
              fullWidth
              margin="normal"
              required
              label="Email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              fullWidth
              margin="normal"
              required
              label="Contraseña"
              type="password"
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox color="primary" />
                <Typography variant="body2">Recordar</Typography>
              </Box>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
