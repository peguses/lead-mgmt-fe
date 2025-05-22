import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { ApplicationDrawerComponent } from "./shared/components/ApplicationDrawer.component";
import { ApplicationListContainer } from "./pages/Applications/ApplicationList.container";
import { ApplicationNavbarComponent } from "./shared/components/ApplicationNavbar.component";
import { ApplicationFooterComponent } from "./shared/components/ApplicationFooter.component";
import { ApplicationViewContainer } from "./pages/Applications/ApplicationView.container";
import {
  removeGeneralInformation,
  removePrimaryApplicant,
  removeSecondaryApplicant,
  resetApplication,
} from "./shared/redux/application.slice";
import { UsersListContainer } from "./pages/Users/UsersList.container";
import { UserInformationContainer } from "./pages/Users/UserInformation.container";
import { ApplicationStatusContainer } from "./pages/Applications/ApplicationStaus.container";
import { useAppDispatch } from "./shared/redux/hooks";
import { resetManagedUser } from "./shared/redux/managed.user.slice";
import { RequireAuth } from "./shared/components/RequireAuth";
import { LoginPageContainer } from "./pages/Users/LoginPage.container";
import { persistor, store } from "./shared/redux/store";
import httpApiKit from "./shared/helpers/axios-http-kit";
import PermittedRoute from "./shared/components/PermittedRoute";
import { Permission } from "./shared/redux/role.slice";
import { ApplyViewContainer } from "./pages/Applications/ApplyView.container";
import { fetchStatusesAsync } from "./shared/redux/application.status.slice";
import { resetApplicationUser } from "./shared/redux/application.user.slice";


function App() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeSecondaryApplicant());
    dispatch(removePrimaryApplicant());
    dispatch(removeGeneralInformation());
    dispatch(resetApplication());
    dispatch(resetManagedUser());
    dispatch(fetchStatusesAsync())
  }, [dispatch]);

  const cleanReduxPersistData = () => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
  };

  httpApiKit.interceptors.request.use(
    (config) => {
      const token = store.getState().applicationUser.authToken;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  httpApiKit.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        dispatch(resetApplicationUser())
        cleanReduxPersistData()
      }
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <ApplicationNavbarComponent />
        <ApplicationDrawerComponent open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            padding: "24px 24px 48px 24px;",
            marginTop: "64px",
            marginBottom: "64px",
            zIndex: 0,
            // backgroundColor: "blue"
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPageContainer />} />
            <Route path="/" element={<ApplyViewContainer />} />
            <Route path="/status" element={<ApplicationStatusContainer />}/>
            <Route element={<RequireAuth />}>
              <Route
                path="/applications"
                element={
                  <PermittedRoute
                    requestedPermissions={[Permission.VIEW_APPLICATIONS]}
                  >
                    <ApplicationListContainer />
                  </PermittedRoute>
                }
              />
              <Route
                path="/applications/:applicationId"
                element={
                  <PermittedRoute
                    requestedPermissions={[
                      Permission.VIEW_APPLICATIONS,
                      Permission.DELETE_APPLICATION,
                      Permission.UPDATE_APPLICATION,
                    ]}
                  >
                    <ApplicationViewContainer />
                  </PermittedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PermittedRoute
                    requestedPermissions={[Permission.VIEW_USERS]}
                  >
                    <UsersListContainer />
                  </PermittedRoute>
                }
              />
              <Route
                path="/users/user"
                element={
                  <PermittedRoute
                    requestedPermissions={[Permission.CREATE_USER]}
                  >
                    <UserInformationContainer />
                  </PermittedRoute>
                }
              />
              <Route
                path="/users/user/:userId"
                element={
                  <PermittedRoute
                    requestedPermissions={[
                      Permission.DELETE_USER,
                      Permission.VIEW_USERS,
                      Permission.UPDATE_USER,
                    ]}
                  >
                    <UserInformationContainer />
                  </PermittedRoute>
                }
              />
            </Route>
          </Routes>
        </Box>
        <ApplicationFooterComponent />
      </Box>
    </Router>
  );
}

export default App;
