import { Home, Settings, AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { SwipeableDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styled from "@emotion/styled";

export const ApplicationDrawerComponent: React.FC<any> = ({open, setOpen }) => {
    const toggleSidebar = () => setOpen(!open);

    return (
        <SwipeableDrawer
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? 240 : 60,
                    boxSizing: 'border-box',
                    overflowY: "clip"
                },
            }}
            variant="persistent"
            anchor="left"
            open={true} onClose={function (event: SyntheticEvent<{}, Event>): void {
                throw new Error("Function not implemented.");
            } } onOpen={function (event: SyntheticEvent<{}, Event>): void {
                throw new Error("Function not implemented.");
            } }        
        >
        <IconButton
            onClick={toggleSidebar}
            sx={{
                height: "24px",
                width: "24px",
                position: 'fixed',
                top: '75px',
                left: open ? '227px' : '47px',
                boxShadow: 3,
                zIndex: (theme) => theme.zIndex.snackbar,
                overflowY: "clip",
            }}
        >
        { open ? <ArrowCircleLeftIcon /> :  <ArrowCircleRightIcon />}
      </IconButton>
          <List sx={{ marginTop: '80px' }}>
            <ListItem component={Link} to="/">
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItem>
    
            <ListItem component={Link} to="/inquery-status">
              <ListItemIcon>
                <HelpOutlineOutlinedIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Inquery Status" />}
            </ListItem>
    
            <ListItem component={Link} to="/lead-view">
              <ListItemIcon>
                <NotificationsNoneRoundedIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Leads" />}
            </ListItem>

            <ListItem component={Link} to="/referal-manager-view">
              <ListItemIcon>
                <FavoriteBorderSharpIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Referals" />}
            </ListItem>

            <ListItem component={Link} to="/user-view">
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              {open && <ListItemText 
              primary="Users" />}
            </ListItem>
          </List>
        </SwipeableDrawer>
      );
}