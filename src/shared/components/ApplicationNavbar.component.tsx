import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AccountCircle } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginAsync } from "../redux/application.user.slice";
import { User } from "../interfaces/user.interface";

export const ApplicationNavbarComponent: React.FC<any> = () => {

  const dispatch = useAppDispatch();
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>();

  const user = useAppSelector(
    (state): User | undefined => {
      return state?.applicationUser.user;
    }
  );

  const [openLogin, setOpenLogin] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setOpenLogin(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseMenu();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = (data) => {
    dispatch(loginAsync(data)).then((data) => {
      setOpenLogin(false);
    });
  };

  useEffect(() => {
      if (user) {
        setOpenLogin(false);
        setIsLoggedIn(true);
        handleCloseMenu();
      }
  }, [user])

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ebeded",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} />
        {isLoggedIn ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{ marginRight: 2, color: "blue", fontWeight: 700 }}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
            <IconButton onClick={handleMenuClick}>
              <Avatar>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <IconButton onClick={handleLogin}>
            <Avatar sx={{ backgroundColor: "gray", width: 40, height: 40 }}>
              <Typography variant="h6" sx={{ color: "white" }}>
                ?
              </Typography>
            </Avatar>
          </IconButton>
        )}
      </Toolbar>
      <Modal
        open={openLogin}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
        >
          <Grid size={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Login
            </Typography>
          </Grid>
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
          <Grid
            sx={{ marginTop: "20px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 5, lg: 4, md: 3, sm: 3, xs: 1 }}
          >
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
          <Grid
            sx={{ marginTop: "20px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Button
              onClick={() => {
                setOpenLogin(false);
              }}
              variant="outlined"
              fullWidth
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </AppBar>
  );
};
