import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid2 as Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AccountCircle } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { loginAsync } from "../../shared/redux/application.user.slice";
import { useAppDispatch } from "../../shared/redux/hooks";

export const LoginPageContainer: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = (data) => {
    dispatch(loginAsync(data)).then((err: any) => {
      if (!err.error) {
        navigate("/users");
      } else {
        setMessage(err.payload);
      }
    });
  };

  return (
    <>
      <Grid
        container
        size={12}
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 200px)"
        sx={{ backgroundColor: "#" }}
      >
        <Grid
          size={{ xl: 4, lg: 6, md: 6, sm: 12, xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            height: "100%",
          }}
        >
          <Grid
            size={12}
            alignItems="center"
            justifyContent="center"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <Grid size={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Login
              </Typography>
            </Grid>
            <Grid size={12}>
              {message && (
                <Alert
                  severity="error"
                  sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
                >
                  {message}
                </Alert>
              )}
              <Grid size={12}>
                <TextField
                  variant={"outlined"}
                  fullWidth
                  size="small"
                  label="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? String(errors.email.message) : ""}
                  placeholder={"Email"}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        marginTop: "20px",
                      },
                    },
                  }}
                  sx={{
                    ".MuiInputLabel-outlined": {
                      lineHeight: "70px",
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  variant={"outlined"}
                  fullWidth
                  size="small"
                  label="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  placeholder={"Password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handleClickShowPassword}
                        >
                          <div onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </div>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        marginTop: "20px",
                      },
                    },
                  }}
                  sx={{
                    ".MuiInputLabel-outlined": {
                      lineHeight: "70px",
                    },
                  }}
                />
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid size={12}>
                  <Button
                    onClick={handleSubmit(login)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid}
                    startIcon={<AssignmentIcon />}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
