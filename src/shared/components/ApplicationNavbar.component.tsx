import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useAppSelector } from "../redux/hooks";
import { User } from "../interfaces/user.interface";
import { useNavigate } from "react-router-dom";

export const ApplicationNavbarComponent: React.FC<any> = () => {
  
  const navigate = useNavigate();

  const user = useAppSelector((state): User | undefined => {
    return state?.applicationUser.user;
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseMenu();
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      handleCloseMenu();
    }
  }, [user]);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#1E3A5F",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} />
        {isLoggedIn ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{ marginRight: 2, color: "FFFFF", fontWeight: 700 }}
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
    </AppBar>
  );
};
