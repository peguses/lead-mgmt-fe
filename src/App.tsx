import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import './App.css';
import { useEffect, useState } from 'react';
import { ApplicationDrawerComponent } from "./shared/components/ApplicationDrawer.component";
import { LandingPageContainer } from "./pages/LandingPage/LandingPage.container";
import { ApplicationListContainer } from "./pages/Applications/ApplicationList.container";
import { useDispatch } from "react-redux";
import { InquiryStatusViewContainer } from "./pages/InquiryStatusView.container";
import { ReferralManagerViewContainer } from "./pages/ReferralManagerView.container";
import { ApplicationNavbarComponent } from "./shared/components/ApplicationNavbar.component";
import { ApplicationFooterComponent } from "./shared/components/ApplicationFooter.component";
import { ApplicationViewContainer } from "./pages/Applications/ApplicationView.container";
import { removeGeneralInformation, removePrimaryApplicant, removeSecondaryApplicant } from "./shared/redux/application.slice";
import { UsersListContainer } from "./pages/Users/UsersList.container";

function App() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeSecondaryApplicant());
    dispatch(removePrimaryApplicant());
    dispatch(removeGeneralInformation())
  }, [dispatch]);

  
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <ApplicationNavbarComponent />
        <ApplicationDrawerComponent open={open} setOpen={setOpen}  />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 ,  marginTop: "74px", marginBottom: "74px", zIndex: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPageContainer />} />
            <Route path="/inquiry-status" element={<InquiryStatusViewContainer />} />
            <Route path="/lead-view" element={<ApplicationListContainer />} />
            <Route path="/lead-view/application-view/:applicationId" element={<ApplicationViewContainer />} />
            <Route path="/user-view" element={<UsersListContainer />} />
            <Route path="/referral-manager-view" element={<ReferralManagerViewContainer />} />
          </Routes>
        </Box>
        <ApplicationFooterComponent/>
      </Box>
    </Router>
  );
}

export default App;
