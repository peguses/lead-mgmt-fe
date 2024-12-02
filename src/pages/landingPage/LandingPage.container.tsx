import {
  Box,
  Button,
  FormControl,
  Grid2 as Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { SubscriptionComponenet } from "../../shared/components/Subscription.component";
import WorkInformationTab from "./WorkInformation.tab";
import {
  addOrUpdateFinantialInformation,
  addOrUpdateGeneralInformation,
  addOrUpdatePersonalInforamtions,
  addOrUpdateWorkInformation,
  PersonalInformation,
  removePersonalInformation,
  removeWorkInformation,
  resetGeneralInformation,
  setJoinLoanApplication,
  WorkInformation,
} from "../../shared/redux/applicant.slice";
import PersonalInformationTab from "./PersonalInformation.tab";
import { batch, useDispatch } from "react-redux";
import { useAppSelector } from "../../shared/redux/hooks";
import FinantialInformationTab from "./FinantialInformation.tab";
import GeneralInformationTab from "./GeneralInformation.tab";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";

interface Step {
  id: number;
  completed: boolean;
}

export const LandingPageContainer: React.FC<any> = () => {
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState<number>(0);

  const [jointLoan, setJointLoan] = useState<boolean>(false);

  const [applicantOnePersonalInfoValid, setApplicantOnePersonalInfoValid] =
    useState<boolean>(false);

  const [applicantTwoPersonalInfoValid, setApplicantTwoPersonalInfoValid] =
    useState<boolean>(false);

  const [applicantOneWorkInfoValid, setApplicantOneWorkInfoValid] =
    useState<boolean>(false);

  const [applicantTwoWorkInfoValid, setApplicantTwoWorkInfoValid] =
    useState<boolean>(false);

  const [applicationOneFinantialValid, setApplicationOneFinantialValid] =
    useState<boolean>(false);

  const [applicationTwoFinantialValid, setApplicationTwoFinantialValid] =
    useState<boolean>(false);

  const [applicationGeneralInfoValid, setApplicationGeneralInfoValid] =
    useState<boolean>(false);

  const [allowWorkTab, setAllowWorkTab] = useState<boolean>(false);

  const [allowFinancialTab, setAllowFinancialTab] = useState<boolean>(false);

  const [allowGeneralTab, setAllowGeneralTab] = useState<boolean>(false);

  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

  const applicantOnePersonalInforamtionRef = useRef<any>();

  const applicantTwoPersonalInforamtionRef = useRef<any>();

  const applicantOneWorkInfoRef = useRef<any>();

  const applicantTwoWorkInfoRef = useRef<any>();

  const applicationOneFinantialInfoRef = useRef<any>();

  const applicationTwoFinantialInfoRef = useRef<any>();

  const applicationGeneralInfoRef = useRef<any>();

  const [completed, setCompleted] = useState<Step[]>(
    [{id: 0, completed: false}, {id: 1, completed: false}, {id: 2, completed: false}, {id: 3, completed: false}]
  );

  useEffect(() => {
    setAllowSubmit(applicationGeneralInfoValid);
    setCompletedStep(3, applicationGeneralInfoValid);
  }, [applicationGeneralInfoValid]);

  useEffect(() => {
    if (jointLoan) {
      const valid = applicationOneFinantialValid && applicationTwoFinantialValid
      setAllowGeneralTab(valid);
      setCompletedStep(2, valid);
    } else {
      setAllowGeneralTab(applicationOneFinantialValid);
      setCompletedStep(2, applicationOneFinantialValid);
    }
  }, [applicationOneFinantialValid, applicationTwoFinantialValid, jointLoan]);

  useEffect(() => {
    if (jointLoan) {
      const valid = applicantOneWorkInfoValid && applicantTwoWorkInfoValid;
      setAllowFinancialTab(valid);
      setCompletedStep(1, valid);
    } else {
      setCompletedStep(1, applicantOneWorkInfoValid);
      setAllowFinancialTab(applicantOneWorkInfoValid);
    }
  }, [applicantOneWorkInfoValid, applicantTwoWorkInfoValid, jointLoan]);

  useEffect(() => {
    if (jointLoan) {
      const valid = applicantOnePersonalInfoValid && applicantTwoPersonalInfoValid
      setAllowWorkTab(valid);
      setCompletedStep(0, valid);
    } else {
      setCompletedStep(0, applicantOnePersonalInfoValid);
      setAllowWorkTab(applicantOnePersonalInfoValid);
    }
  }, [applicantOnePersonalInfoValid, applicantTwoPersonalInfoValid, jointLoan]);

  const applicantStatus = [
    { code: "1APP", name: "1 Applicant" },
    { code: "2APP", name: "2 Applicants" },
  ];

  const handlePersonalInforamtionSubmit = () => {
    batch(() => {
      if (applicantOnePersonalInforamtionRef?.current) {
        applicantOnePersonalInforamtionRef.current.triggerSubmit();
      }

      if (applicantTwoPersonalInforamtionRef?.current) {
        applicantTwoPersonalInforamtionRef.current.triggerSubmit();
      }
    });
    setActiveStep(1);
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

    setActiveStep(2);
  };

  const handleFinantialInformationSubmit = () => {
    batch(() => {
      if (applicationOneFinantialInfoRef?.current) {
        applicationOneFinantialInfoRef.current.triggerSubmit();
      }

      if (applicationTwoFinantialInfoRef?.current) {
        applicationTwoFinantialInfoRef.current.triggerSubmit();
      }
    });

    setActiveStep(3);
  };

  const setCompletedStep = (step: number, state: boolean) => {
    const steps = completed.map((s: Step) => {
      if (s.id === step) {
        return {...s, completed: state};
      }
      return s;
    });
    setCompleted(steps);
  };

  const handleSubmit = () => {
    batch(() => {
      if (applicationGeneralInfoRef?.current) {
        applicationGeneralInfoRef.current.triggerSubmit();
      }
    });
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

  const onFinantialInfoSubmit = (applicant: number, data: WorkInformation) => {
    dispatch(addOrUpdateFinantialInformation({ applicantId: applicant, data }));
  };

  const onGeneralInfoInfoSubmit = (data: WorkInformation) => {
    dispatch(addOrUpdateGeneralInformation(data));
  };

  const handleSingleApplicantio = () => {
    setJointLoan(false);
    setApplicantOnePersonalInfoValid(false);
    setApplicantTwoPersonalInfoValid(true);
    setApplicantOneWorkInfoValid(false);
    setApplicantTwoWorkInfoValid(true);
    setApplicationOneFinantialValid(false);
    setApplicationTwoFinantialValid(true);
    dispatch(setJoinLoanApplication(false));
    dispatch(removePersonalInformation({ applicantId: 2 }));
    dispatch(removeWorkInformation({ applicantId: 2 }));
    dispatch(resetGeneralInformation());
  };

  const handleJointApplication = () => {
    setJointLoan(true);
    setApplicantTwoPersonalInfoValid(false);
    setApplicantOnePersonalInfoValid(false);
    setApplicantOneWorkInfoValid(false);
    setApplicantTwoWorkInfoValid(false);
    setApplicationOneFinantialValid(false);
    setApplicationTwoFinantialValid(false);
    dispatch(setJoinLoanApplication(true));
    dispatch(resetGeneralInformation());
  };

  const handleBack = () => {
    setActiveStep(activeStep !== 0 ? activeStep-1 : 0);
  }

  const stepColor = (step: number) => {
    let color: string = "text.secondary";
    if (activeStep === step) {
      color = "primary.main";
    }

    if (isStepCompleted(step)) {
      color = "success.main";
    }

    return {
      color,
      ".MuiStepLabel-label.Mui-active": {
        color,
      },
      ".MuiStepLabel-label.Mui-completed": {
        color,
      },
    };
  };

  const isStepCompleted =(step: number): boolean | undefined => {
    return completed.find((s) => s.id === step)?.completed;
  }

  return (
    <Grid container size={jointLoan ? 12 : 4} offset={jointLoan ? 12 : 4}>
      <Grid
        size={
          jointLoan && activeStep !== 3
            ? 7.5
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan && activeStep !== 3
            ? 2.25
            : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }
        }
        sx={{ marginTop: "5px", marginBottom: "20px" }}
      >
        <Stepper nonLinear activeStep={activeStep}>
          <Step key={"personal"} completed={isStepCompleted(0)}>
            <StepLabel
              icon={<PersonIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...stepColor(0),
              }}
            >
              Personal
            </StepLabel>
          </Step>
          <Step key={"work"} completed={isStepCompleted(1)}>
            <StepLabel
              icon={<WorkIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...stepColor(1),
              }}
            >
              Work
            </StepLabel>
          </Step>
          <Step key={"finantial"} completed={isStepCompleted(2)}>
            <StepLabel
              icon={<AttachMoneyIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...stepColor(2),
              }}
            >
              Financial
            </StepLabel>
          </Step>
          <Step key={"general"} completed={isStepCompleted(3)}>
            <StepLabel
              icon={<InfoIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...stepColor(3),
              }}
            >
              General
            </StepLabel>
          </Step>
        </Stepper>
      </Grid>
      <Grid
        sx={{ marginTop: "5px" }}
        size={
          jointLoan
            ? 7.5
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan
            ? 2.25
            : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Button 
             sx={{
              textTransform: 'none',
              color: 'primary.main'
            }}
            startIcon={<ArrowCircleLeftOutlinedIcon />} 
            variant="text"
            disableRipple
            onClick={handleBack}
            >
          Back
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              height: "1px",
              backgroundColor: "gray",
            }}
          />
        </Box>
      </Grid>
      <Grid
        sx={{ marginTop: "20px" }}
        size={
          jointLoan && activeStep !== 3
            ? 12
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan && activeStep !== 3
            ? 1
            : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }
        }
      >
        {activeStep === 0 && (
          <Fragment>
            <Grid
              size={jointLoan ? 8 : { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
              offset={jointLoan ? 1.5 : { xl: 0, lg: 0, md: 0, sm: 0, xs: 0 }}
            >
              <FormControl fullWidth sx={{ marginTop: "5px" }} size="small">
                <InputLabel
                  htmlFor="applicantStatus-label"
                  id="applicantStatus"
                >
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
                endIcon={<ArrowCircleRightOutlinedIcon />}
                disabled={!allowWorkTab}
              >
                Next
              </Button>
            </Grid>
          </Fragment>
        )}
        {activeStep === 1 && (
          <Fragment>
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
                endIcon={<ArrowCircleRightOutlinedIcon />}
                disabled={!allowFinancialTab}
              >
                Next
              </Button>
            </Grid>
          </Fragment>
        )}
        {activeStep === 2 && (
          <Fragment>
            {jointLoan ? (
              <Grid container size={8} offset={1.5}>
                <Grid size={5.5}>
                  <FinantialInformationTab
                    key={1}
                    applicant={1}
                    onValid={(isValid) =>
                      setApplicationOneFinantialValid(isValid)
                    }
                    onSubmit={(data) => onFinantialInfoSubmit(1, data)}
                    ref={applicationOneFinantialInfoRef}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <FinantialInformationTab
                    key={2}
                    applicant={2}
                    onValid={(isValid) =>
                      setApplicationTwoFinantialValid(isValid)
                    }
                    onSubmit={(data) => onFinantialInfoSubmit(2, data)}
                    ref={applicationTwoFinantialInfoRef}
                  />
                </Grid>
              </Grid>
            ) : (
              <FinantialInformationTab
                applicant={1}
                onValid={(isValid) => setApplicationOneFinantialValid(isValid)}
                onSubmit={(data) => onFinantialInfoSubmit(1, data)}
                ref={applicationOneFinantialInfoRef}
              />
            )}
            <Grid
              size={jointLoan ? 2 : 3}
              offset={jointLoan ? 7.5 : 9}
              sx={{ marginTop: "20px" }}
            >
              <Button
                onClick={handleFinantialInformationSubmit}
                variant="contained"
                color="primary"
                fullWidth
                endIcon={<ArrowCircleRightOutlinedIcon />}
                disabled={!allowGeneralTab}
              >
                Next
              </Button>
            </Grid>
          </Fragment>
        )}
        {activeStep === 3 && (
          <Fragment>
            <GeneralInformationTab
              applicant={1}
              onValid={(isValid) => setApplicationGeneralInfoValid(isValid)}
              onSubmit={(data) => onGeneralInfoInfoSubmit(data)}
              ref={applicationGeneralInfoRef}
            />
            <Grid
              size={jointLoan ? 2 : 3}
              offset={jointLoan ? 7.5 : 9}
              sx={{ marginTop: "20px" }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CheckCircleOutlineOutlinedIcon />}
                disabled={!allowSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Fragment>
        )}
      </Grid>
      <Grid size={12} offset={1}>
        <SubscriptionComponenet />
      </Grid>
    </Grid>
  );
};
