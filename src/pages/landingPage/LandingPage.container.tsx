import {
  Button,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { SubscriptionComponenet } from "../../shared/components/Subscription.component";
import { TabPanel } from "../../shared/components/TabPanel.component";
import WorkInformationTab from "./WorkInformation.tab";
import {
  addOrUpdatePersonalInforamtions,
  addOrUpdateWorkInformation,
  PersonalInformation,
  removePersonalInformation,
  setJoinLoanApplication,
  WorkInformation,
} from "../../shared/redux/applicant.slice";
import PersonalInformationTab from "./PersonalInformation.tab";
import { batch, useDispatch } from "react-redux";
import { useAppSelector } from "../../shared/redux/hooks";
import FinantialInformationTab from "./FinantialInformation.tab";
import GeneralInformationTab from "./GeneralInformation.tab";

export const LandingPageContainer: React.FC<any> = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<number>(1);

  const [jointLoan, setJointLoan] = useState<boolean>(false);

  const [applicantOnePersonalInfoValid, setApplicantOnePersonalInfoValid] =
    useState<boolean>(false);

  const [applicantTwoPersonalInfoValid, setApplicantTwoPersonalInfoValid] =
    useState<boolean>(false);

  const [applicantOneWorkInfoValid, setApplicantOneWorkInfoValid] =
    useState<boolean>(false);

  const [applicantTwoWorkInfoValid, setApplicantTwoWorkInfoValid] =
    useState<boolean>(false);

  const [allowWorkTab, setAllowWorkTab] = useState<boolean>(false);

  const [allowFinancialTab, setAllowFinancialTab] = useState<boolean>(false);

  const applicantOnePersonalInforamtionRef = useRef<any>();

  const applicantTwoPersonalInforamtionRef = useRef<any>();

  const applicantOneWorkInfoRef = useRef<any>();

  const applicantTwoWorkInfoRef = useRef<any>();

  const applicants = useAppSelector((state): WorkInformation[] => {
    return state.application.workInformations;
  });

  useEffect(() => {
    console.log(applicants);
  }, [applicants]);

  useEffect(() => {
    if (jointLoan) {
      setAllowFinancialTab(
        applicantOneWorkInfoValid && applicantTwoWorkInfoValid
      );
    } else {
      setAllowFinancialTab(applicantOneWorkInfoValid);
    }
  }, [applicantOneWorkInfoValid, applicantTwoWorkInfoValid, jointLoan]);

  useEffect(() => {
    if (jointLoan) {
      setAllowWorkTab(
        applicantOnePersonalInfoValid && applicantTwoPersonalInfoValid
      );
    } else {
      setAllowWorkTab(applicantOnePersonalInfoValid);
    }
  }, [applicantOnePersonalInfoValid, applicantTwoPersonalInfoValid, jointLoan]);

  const applicantStatus = [
    { code: "1APP", name: "1 Applicant" },
    { code: "2APP", name: "2 Applicants" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleWorkInformationSubmit = () => {
    batch(() => {
      if (applicantOneWorkInfoRef?.current) {
        applicantOneWorkInfoRef.current.triggerSubmit();
      }

      if (applicantTwoWorkInfoRef?.current) {
        applicantTwoWorkInfoRef.current.triggerSubmit();
      }
    });

    setValue(3);
  };

  const handlePersonalInforamtionSubmit = () => {
    batch(() => {
      if (applicantOnePersonalInforamtionRef?.current) {
        applicantOnePersonalInforamtionRef.current.triggerSubmit();
      }

      if (applicantTwoPersonalInforamtionRef?.current) {
        applicantTwoPersonalInforamtionRef.current.triggerSubmit();
      }
    });
    setValue(2);
  };

  const onPersonalInformationSubmit = (
    applicant: number,
    data: PersonalInformation
  ) => {
    dispatch(addOrUpdatePersonalInforamtions({ applicantId: applicant, data }));
  };

  const onWorkInfoSubmit = (applicant: number, data: WorkInformation) => {
    dispatch(addOrUpdateWorkInformation({ applicantId: applicant, data }));
  };

  const handleSingleApplicantio = () => {
    setJointLoan(false);
    setApplicantOnePersonalInfoValid(false);
    setApplicantTwoPersonalInfoValid(true);
    setApplicantOneWorkInfoValid(false);
    setApplicantTwoWorkInfoValid(true);
    dispatch(setJoinLoanApplication(false));
    dispatch(removePersonalInformation({ applicantId: 2 }));
  };

  const handleJointApplication = () => {
    setJointLoan(true);
    setApplicantTwoPersonalInfoValid(false);
    setApplicantOnePersonalInfoValid(false);
    setApplicantOneWorkInfoValid(false);
    setApplicantTwoWorkInfoValid(false);
    dispatch(setJoinLoanApplication(true));
  };

  return (
    <Grid container size={jointLoan ? 12 : 4} offset={jointLoan ? 12 : 4}>
      <Grid size={12} sx={{ marginTop: "5px", marginBottom: "20px" }}>
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab
            sx={{
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: 700,
            }}
            label="Personal"
            value={1}
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: 700,
            }}
            label="Work"
            value={2}
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: 700,
            }}
            label="Financial"
            value={3}
          />
           <Tab
            sx={{
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: 700,
            }}
            label="General"
            value={4}
          />
        </Tabs>
      </Grid>
      <Grid
        size={jointLoan ? 12 : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }}
        offset={jointLoan ? 1 : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <TabPanel value={value} index={1}>
          <Grid
            size={jointLoan ? 8 : { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            offset={jointLoan ? 1.5 : { xl: 0, lg: 0, md: 0, sm: 0, xs: 0 }}
          >
            <FormControl fullWidth sx={{ marginTop: "5px" }} size="small">
              <InputLabel htmlFor="applicantStatus-label" id="applicantStatus">
                Applicants
              </InputLabel>
              <Select
                id="applicantStatus"
                label="Applicants"
                labelId="applicantStatus-label"
                value={jointLoan === true ? "2APP" : "1APP"}
                displayEmpty
                style={{ height: "36px" }}
                onChange={(event) => {
                  if (event.target.value === "2APP") {
                    handleJointApplication();
                  } else {
                    handleSingleApplicantio();
                  }
                }}
              >
                {applicantStatus.map((stateObj) => (
                  <MenuItem key={stateObj.code} value={stateObj.code}>
                    {stateObj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {jointLoan ? (
            <Grid container size={8} offset={1.5}>
              <Grid size={5.5}>
                <PersonalInformationTab
                  key={1}
                  applicant={1}
                  onValid={(isValid) =>
                    setApplicantOnePersonalInfoValid(isValid)
                  }
                  onSubmit={(data) => onPersonalInformationSubmit(1, data)}
                  ref={applicantOnePersonalInforamtionRef}
                />
              </Grid>
              <Grid size={5.5} offset={1}>
                <PersonalInformationTab
                  key={2}
                  applicant={2}
                  onValid={(isValid) =>
                    setApplicantTwoPersonalInfoValid(isValid)
                  }
                  onSubmit={(data) => onPersonalInformationSubmit(2, data)}
                  ref={applicantTwoPersonalInforamtionRef}
                />
              </Grid>
            </Grid>
          ) : (
            <PersonalInformationTab
              applicant={1}
              onValid={(isValid) => setApplicantOnePersonalInfoValid(isValid)}
              onSubmit={(data) => onPersonalInformationSubmit(1, data)}
              ref={applicantOnePersonalInforamtionRef}
            />
          )}
          <Grid
            size={jointLoan ? 2 : 3}
            offset={jointLoan ? 7.5 : 9}
            sx={{ marginTop: "20px" }}
          >
            <Button
              onClick={handlePersonalInforamtionSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!allowWorkTab}
            >
              Next
            </Button>
          </Grid>
        </TabPanel>
      </Grid>
      <Grid
        size={jointLoan ? 12 : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }}
        offset={jointLoan ? 1 : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <TabPanel value={value} index={2}>
          {jointLoan ? (
            <Grid container size={8} offset={1.5}>
              <Grid size={5.5}>
                <WorkInformationTab
                  key={1}
                  applicant={1}
                  onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
                  onSubmit={(data) => onWorkInfoSubmit(1, data)}
                  ref={applicantOneWorkInfoRef}
                />
              </Grid>
              <Grid size={5.5} offset={1}>
                <WorkInformationTab
                  key={2}
                  applicant={2}
                  onValid={(isValid) => setApplicantTwoWorkInfoValid(isValid)}
                  onSubmit={(data) => onWorkInfoSubmit(2, data)}
                  ref={applicantTwoWorkInfoRef}
                />
              </Grid>
            </Grid>
          ) : (
            <WorkInformationTab
              applicant={1}
              onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
              onSubmit={(data) => onWorkInfoSubmit(1, data)}
              ref={applicantOneWorkInfoRef}
            />
          )}
          <Grid
            size={jointLoan ? 2 : 3}
            offset={jointLoan ? 7.5 : 9}
            sx={{ marginTop: "20px" }}
          >
            <Button
              onClick={handleWorkInformationSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!allowFinancialTab}
            >
              Next
            </Button>
          </Grid>
        </TabPanel>
      </Grid>

      <Grid 
        size={jointLoan ? 12 : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }}
        offset={jointLoan ? 1 : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <TabPanel value={value} index={3}>
          {jointLoan ? (
            <Grid container size={8} offset={1.5}>
              <Grid size={5.5}>
                <FinantialInformationTab
                  key={1}
                  applicant={1}
                  onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
                  onSubmit={(data) => onWorkInfoSubmit(1, data)}
                  ref={applicantOneWorkInfoRef}
                />
              </Grid>
              <Grid size={5.5} offset={1}>
                <FinantialInformationTab
                  key={2}
                  applicant={2}
                  onValid={(isValid) => setApplicantTwoWorkInfoValid(isValid)}
                  onSubmit={(data) => onWorkInfoSubmit(2, data)}
                  ref={applicantTwoWorkInfoRef}
                />
              </Grid>
            </Grid>
          ) : (
            <FinantialInformationTab
              applicant={1}
              onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
              onSubmit={(data) => onWorkInfoSubmit(1, data)}
              ref={applicantOneWorkInfoRef}
            />
          )}
           <Grid
            size={jointLoan ? 2 : 3}
            offset={jointLoan ? 7.5 : 9}
            sx={{ marginTop: "20px" }}
          >
            <Button
              onClick={handleWorkInformationSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!allowFinancialTab}
            >
              Next
            </Button>
          </Grid>
        </TabPanel>
      </Grid>

      <Grid 
        size={jointLoan ? 12 : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }}
        offset={jointLoan ? 1 : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }}
      >
        <TabPanel value={value} index={4}>
          <GeneralInformationTab
            applicant={1}
            onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
            onSubmit={(data) => onWorkInfoSubmit(1, data)}
            ref={applicantOneWorkInfoRef}
          />
           <Grid
            size={jointLoan ? 2 : 3}
            offset={jointLoan ? 7.5 : 9}
            sx={{ marginTop: "20px" }}
          >
            <Button
              onClick={handleWorkInformationSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!allowFinancialTab}
            >
              Submit
            </Button>
          </Grid>
        </TabPanel>
      </Grid>
      <Grid size={12} offset={1}>
        <SubscriptionComponenet />
      </Grid>
    </Grid>
  );
};
