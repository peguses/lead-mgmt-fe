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
import { setViewport } from "../redux/common.slice";
import styled from "@emotion/styled";
import usePermission from "../hooks/usePermission";
import { Permission } from "../redux/role.slice";
import { useAppDispatch } from "../redux/hooks";
import { resetApplication } from "../redux/application.slice";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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

  const dispatch = useAppDispatch();

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
            boxShadow: 10,
            zIndex: (theme) => theme.zIndex.snackbar,
            overflowY: "clip",
            color: "black",
          }}
        >
          {menuOpen ? (
            <ChevronLeft
              sx={{
                borderRadius: "50%",
                height: "36px",
                width: "36px",
                backgroundColor: "#1E3A5F",
                color: "white",
              }}
            />
          ) : (
            <ChevronRight
              sx={{
                borderRadius: "50%",
                height: "36px",
                width: "36px",
                backgroundColor: "#1E3A5F",
                color: "white",
              }}
            />
          )}
        </IconButton>
      )}
      <List sx={{ marginTop: "80px" }}>
        <ListItem
          component={StyledButton}
          onClick={() => {
            dispatch(resetApplication());
            setSelectedMenuItem(1, true);
            navigate("/");
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
            setSelectedMenuItem(2, true);
            dispatch(resetApplication());
            navigate("/status");
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
              setSelectedMenuItem(3, true);
              navigate("/applications");
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
              setSelectedMenuItem(4, true);
              navigate("/users");
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
