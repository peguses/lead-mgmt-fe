import {
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import useViewport from "../hooks/useViewport";
import { useDispatch } from "react-redux";
import { setViewport } from "../redux/common.slice";
import styled from "@emotion/styled";
import usePermission from "../hooks/usePermission";
import { Permission } from "../redux/role.slice";

interface Menu {
  id: number;
  selected: boolean;
}

export const ApplicationDrawerComponent: React.FC<any> = ({
  open,
  setOpen,
}) => {
  const StyledButton = styled(Button)({
    textTransform: "none",
    color: "#1E3A5F",
    "& .MuiTypography-root": {
      fontWeight: 700,
    },
    "&:hover": {
      backgroundColor: "#F0F8FF",
      color: "#1E3A5F",
      fontWeight: 700,
    },
    "& .MuiListItemIcon-root": {
      color: "#1E3A5F",
      fontWeight: 700,
    },
    borderRadius: "0px"
  });

  const [selectedMenu, setSelectedMenu] = useState<Menu[]>([
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
  ]);

  const viewPort = useViewport();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState<boolean>(open);

  const [smallDevice, setSmallDevice] = useState<boolean>(open);

  const { hasPermission } = usePermission();

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

  const setSelectedMenuItem = (step: number, state: boolean) => {
    const steps = selectedMenu.map((s: Menu) => {
      if (s.id === step) {
        return { ...s, selected: state };
      }
      return { ...s, selected: false };
    });
    setSelectedMenu(steps);
  };

  const isSelectedMenu = (step: number): boolean | undefined => {
    return selectedMenu.find((s) => s.id === step)?.selected;
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
            color: "#1E3A5F"
          }}
        >
          {menuOpen ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </IconButton>
      )}
      <List sx={{ marginTop: "80px" }}>
        <ListItem
          component={StyledButton}
          onClick={() => {
            navigate("/");
            setSelectedMenuItem(1, true);
          }}
          disableRipple
          sx={
            isSelectedMenu(1)
              ? {
                  backgroundColor: "#B0C4DE",
                  color: "white",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#B0C4DE",
                    color: "white",
                    fontWeight: 700,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                    fontWeight: 700,
                  },
                }
              : {}
          }
        >
          <ListItemIcon>
            <HomeOutlinedIcon/>
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Home" />}
        </ListItem>

        <ListItem
          component={StyledButton}
          onClick={() => {
            navigate("/status");
            setSelectedMenuItem(2, true);
          }}
          disableRipple
          sx={
            isSelectedMenu(2)
              ? {
                  backgroundColor: "#B0C4DE",
                  color: "white",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#B0C4DE",
                    color: "white",
                    fontWeight: 700,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                    fontWeight: 700,
                  },
                }
              : {}
          }
        >
          <ListItemIcon>
            <HelpOutlineOutlinedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Inquiry Status" />}
        </ListItem>

        {hasPermission ([Permission.VIEW_APPLICATIONS]) && (<ListItem
          component={StyledButton}
          onClick={() => {
            navigate("/applications");
            setSelectedMenuItem(3, true);
          }}
          disableRipple
          sx={
            isSelectedMenu(3)
              ? {
                  backgroundColor: "#B0C4DE",
                  color: "white",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#B0C4DE",
                    color: "white",
                    fontWeight: 700,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                    fontWeight: 700,
                  },
                }
              : {}
          }
        >
          <ListItemIcon>
            <NotificationsNoneRoundedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Applications" />}
        </ListItem>
        )}

        {hasPermission ([Permission.VIEW_USERS]) && (<ListItem
          component={StyledButton}
          onClick={() => {
            navigate("/users");
            setSelectedMenuItem(4, true);
          }}
          disableRipple
          sx={
            isSelectedMenu(4)
              ? {
                  backgroundColor: "#B0C4DE",
                  color: "white",
                  fontWeight: 700,
                  "& .MuiTypography-root": {
                    fontWeight: 700,
                  },
                  "&:hover": {
                    backgroundColor: "#B0C4DE",
                    color: "white",
                    fontWeight: 700,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                    fontWeight: 700,
                  },
                }
              : {}
          }
        >
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          {menuOpen && <ListItemText primary="Users" />}
        </ListItem>
        )}
      </List>
    </SwipeableDrawer>
  );
};
