import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import './App.css';
import { useState } from 'react';
import { ApplicationNavbarComponent } from "./shared/components/ApplicationNavbar.componenet";
import { ApplicationDrawerComponent } from "./shared/components/ApplicationDrawer.component";
import { LandingPageContainer } from "./pages/LandingPage.container";
import { InqueryStatusViewContainer } from "./pages/InqueryStatusView.container";
import { LeadViewContainer } from "./pages/LeadView.container";
import { UserViewContainer } from "./pages/UserView.container";
import { ReferalManagerViewContainer } from "./pages/ReferalManagerView.container";

function App() {
  const [open, setOpen] = useState(true);
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}
        <ApplicationNavbarComponent />
        <ApplicationDrawerComponent open={open} setOpen={setOpen}  />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 ,  marginTop: "64px", zIndex: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPageContainer />} />
            <Route path="/inquery-status" element={<InqueryStatusViewContainer />} />
            <Route path="/lead-view" element={<LeadViewContainer />} />
            <Route path="/user-view" element={<UserViewContainer />} />
            <Route path="/referal-manager-view" element={<ReferalManagerViewContainer />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
