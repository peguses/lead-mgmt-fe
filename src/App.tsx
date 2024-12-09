import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import './App.css';
import { useEffect, useState } from 'react';
import { ApplicationDrawerComponent } from "./shared/components/ApplicationDrawer.component";
import { LandingPageContainer } from "./pages/LandingPage/LandingPage.container";
import { ApplicationListContainer } from "./pages/Applications/ApplicationList.container";
import { ApplicationNavbarComponent } from "./shared/components/ApplicationNavbar.component";
import { ApplicationFooterComponent } from "./shared/components/ApplicationFooter.component";
import { ApplicationViewContainer } from "./pages/Applications/ApplicationView.container";
import { removeGeneralInformation, removePrimaryApplicant, removeSecondaryApplicant, resetApplication } from "./shared/redux/application.slice";
import { UsersListContainer } from "./pages/Users/UsersList.container";
import { UserInformationContainer } from "./pages/Users/UserInformation.container";
import { ApplicationStatusContainer } from "./pages/Applications/ApplicationStaus.container";
import { fetchStatusesAsync } from "./shared/redux/application.status.slice";
import { useAppDispatch } from "./shared/redux/hooks";
import { resetManagedUser } from "./shared/redux/managed.user.slice";

function App() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeSecondaryApplicant());
    dispatch(removePrimaryApplicant());
    dispatch(removeGeneralInformation());
    dispatch(resetApplication());
    dispatch(resetManagedUser())
    // dispatch(fetchStatusesAsync())
  }, [dispatch]);

  
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <ApplicationNavbarComponent />
        <ApplicationDrawerComponent open={open} setOpen={setOpen}  />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 ,  marginTop: "74px", marginBottom: "74px", zIndex: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPageContainer />} />
            <Route path="/applications/status" element={<ApplicationStatusContainer />} />
            <Route path="/applications" element={<ApplicationListContainer />} />
            <Route path="/applications/:applicationId" element={<ApplicationViewContainer />} />
            <Route path="/users" element={<UsersListContainer />} />
            <Route path="/users/user" element={<UserInformationContainer />} />
            <Route path="/users/user/:userId" element={<UserInformationContainer />} />
          </Routes>
        </Box>
        <ApplicationFooterComponent/>
      </Box>
    </Router>
  );
}

export default App;
