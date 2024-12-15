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
import { useNavigate } from "react-router-dom";
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
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';


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
    color: "white",
    "& .MuiTypography-root": {
      fontWeight: 700,
    },
    "&:hover": {
      backgroundColor: "#939292",
      color: "#ebebed",
      fontWeight: 700,
    },
    "& .MuiListItemIcon-root": {
      color: "white",
      fontWeight: 700,
    },
    borderRadius: "0px",
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
          backgroundColor: "#454545",
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
            height: "36px",
            width: "36px",
            position: "fixed",
            top: "75px",
            left: open ? "223px" : "43px",
            boxShadow: 4,
            zIndex: (theme) => theme.zIndex.snackbar,
            overflowY: "clip",
            color: "black",
          }}
        >
          {menuOpen ? (
            <ArrowCircleLeftRoundedIcon sx={{ height: "36px", width: "36px"}} />
          ) : (
            <ArrowCircleRightRoundedIcon sx={{ height: "36px", width: "36px"}}/>
          )}
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
                  backgroundColor: "#737171",
                  color: "white",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#737171",
                    color: "#ebebed",
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
            <HomeOutlinedIcon />
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
                  backgroundColor: "#737171",
                  color: "white",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#737171",
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

        {hasPermission([Permission.VIEW_APPLICATIONS]) && (
          <ListItem
            component={StyledButton}
            onClick={() => {
              navigate("/applications");
              setSelectedMenuItem(3, true);
            }}
            disableRipple
            sx={
              isSelectedMenu(3)
                ? {
                    backgroundColor: "#737171",
                    color: "white",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "#737171",
                      color: "#ebebed",
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

        {hasPermission([Permission.VIEW_USERS]) && (
          <ListItem
            component={StyledButton}
            onClick={() => {
              navigate("/users");
              setSelectedMenuItem(4, true);
            }}
            disableRipple
            sx={
              isSelectedMenu(4)
                ? {
                    backgroundColor: "#737171",
                    color: "white",
                    fontWeight: 700,
                    "& .MuiTypography-root": {
                      fontWeight: 700,
                    },
                    "&:hover": {
                      backgroundColor: "#737171",
                      color: "#ebebed",
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
