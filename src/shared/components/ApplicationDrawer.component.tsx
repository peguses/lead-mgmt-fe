import {
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import useViewport from "../hooks/useViewport";
import { useDispatch } from "react-redux";
import { setViewport } from "../redux/common.slice";

export const ApplicationDrawerComponent: React.FC<any> = ({
  open,
  setOpen,
}) => {
  const viewPort = useViewport();

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState<boolean>(open);

  const [smallDevice, setSmallDevice] = useState<boolean>(open);

  useEffect(() => {
    dispatch(setViewport({ viewPort }));

    if (viewPort.width < 900 || !open) {
      setOpen(false);
      setMenuOpen(false);
      setSmallDevice(true);
    } else {
      setOpen(true);
      setMenuOpen(true);
      setSmallDevice(false);
    }
  }, [viewPort]);

  const toggleSidebar = () => {
    if (menuOpen && smallDevice) {
      setMenuOpen(false);
    }
    setMenuOpen(!menuOpen);
    setOpen(!menuOpen);
    dispatch(setViewport({ ...viewPort, menuOpen: !menuOpen }));
  };

  return (
    <SwipeableDrawer
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          boxSizing: "border-box",
          overflowY: "clip",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
      onClose={function (event: SyntheticEvent<{}, Event>): void {
        throw new Error("Function not implemented.");
      }}
      onOpen={function (event: SyntheticEvent<{}, Event>): void {
        throw new Error("Function not implemented.");
      }}
    >
      {viewPort.width > 900 && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            height: "24px",
            width: "24px",
            position: "fixed",
            top: "75px",
            left: open ? "227px" : "47px",
            boxShadow: 3,
            zIndex: (theme) => theme.zIndex.snackbar,
            overflowY: "clip",
          }}
        >
          {menuOpen ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </IconButton>
      )}
      <List sx={{ marginTop: "80px" }}>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Home" />}
        </ListItem>

        <ListItem component={Link} to="/inquery-status">
          <ListItemIcon>
            <HelpOutlineOutlinedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Inquery Status" />}
        </ListItem>

        <ListItem component={Link} to="/lead-view">
          <ListItemIcon>
            <NotificationsNoneRoundedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Leads" />}
        </ListItem>

        <ListItem component={Link} to="/referal-manager-view">
          <ListItemIcon>
            <FavoriteBorderSharpIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Referals" />}
        </ListItem>

        <ListItem component={Link} to="/user-view">
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Users" />}
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};
