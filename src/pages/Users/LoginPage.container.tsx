import {
  Alert,
  Button,
  Grid2 as Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { loginAsync } from "../../shared/redux/application.user.slice";
import { useAppDispatch } from "../../shared/redux/hooks";
import styled from "@emotion/styled";

export const LoginPageContainer: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string | undefined>();

  const StyledTextField = styled(TextField)({
    ".MuiInputLabel-outlined": {
      lineHeight: "70px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.7)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(255, 255, 255, 1)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#6e6f6f",
    },
    "& .MuiOutlinedInput-root.Mui-error": {
      "& fieldset": {
        borderColor: "#f28f8f",
      },
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "#f28f8f",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#f28f8f",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = (data) => {
    dispatch(loginAsync(data)).then((err: any) => {
      if (!err.error) {
        navigate("/applications");
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
      >
        <Grid
          size={{ xl: 4, lg: 6, md: 6, sm: 12, xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
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
              height: "100%",
              backgroundColor: "#1E3A5F",
            }}
          >
            <Grid size={10}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Login
              </Typography>
            </Grid>
            <Grid size={10}>
              {message && (
                <Alert
                  severity="error"
                  sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
                >
                  {message}
                </Alert>
              )}
              <Grid size={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      variant={"outlined"}
                      fullWidth
                      size="small"
                      label="Email"
                      error={!!errors.email}
                      helperText={
                        errors.email ? String(errors.email.message) : ""
                      }
                      placeholder={"Email"}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment sx={{ marginRight: "5px"}} position="start">
                              <EmailOutlinedIcon sx={{ color: "white"}} />
                            </InputAdornment>
                          ),
                          sx: {
                            marginTop: "20px",
                            color: "white",
                            fontWeight: 700,
                            // userSelect: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      variant={"outlined"}
                      fullWidth
                      size="small"
                      label="Password"
                      error={!!errors.password}
                      placeholder={"Password"}
                      autoComplete="off"
                      tabIndex={-1}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <div onClick={handleClickShowPassword}>
                                {showPassword ? (
                                  <Visibility sx={{ color: "white" }} />
                                ) : (
                                  <VisibilityOff sx={{ color: "white" }} />
                                )}
                              </div>
                            </InputAdornment>
                          ),
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon sx={{ color: "white" }} />
                            </InputAdornment>
                          ),
                          sx: {
                            marginTop: "20px",
                            fontWeight: 700,
                            color: "white",
                          },
                        },
                      }}
                      // Styled Text filed not has tab issue need investigation
                      sx={{
                        ".MuiInputLabel-outlined": {
                          lineHeight: "70px",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.5)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.7)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "rgba(255, 255, 255, 1)",
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "#6e6f6f",
                        },
                        "& .MuiOutlinedInput-root.Mui-error": {
                          "& fieldset": {
                            borderColor: "#f28f8f",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-error": {
                          color: "#f28f8f",
                        },
                        "& .MuiFormHelperText-root.Mui-error": {
                          color: "#f28f8f",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                <Grid size={12}>
                  <Button
                    onClick={handleSubmit(login)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid}
                    sx={{
                      backgroundColor: "#abccf7",
                      color: "#1E3A5F",
                      "&:hover": {
                        backgroundColor: "#91a5bf",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#6e6f6f",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#555757",
                        },
                      },
                    }}
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
