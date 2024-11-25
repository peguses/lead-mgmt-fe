import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react"
import { Menu as MenuIcon } from "@mui/icons-material";

export const ApplicationNavbarComponent: React.FC<any> = () => {
    return (
        <AppBar position="fixed" sx={{ boxShadow: "none", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#ebeded"}}>
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}/>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ marginRight: 2, color: "blue", fontWeight: 700 }}>
                John Doe
              </Typography>
              <Avatar alt="User" src="/user.jpg" />
            </Box>
          </Toolbar>
        </AppBar>
      );
}