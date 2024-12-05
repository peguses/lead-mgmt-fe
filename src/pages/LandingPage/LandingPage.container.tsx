import {
  Box,
  Button,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import WorkInformationTab from "../../shared/components/WorkInformation.tab";
import PersonalInformationTab from "../../shared/components/PersonalInformation.tab";
import { batch, useDispatch } from "react-redux";
import GeneralInformationTab from "../../shared/components/GeneralInformation.tab";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import FinancialInformationTab from "../../shared/components/FinancialInformation.tab";
import { SubscriptionComponent } from "../../shared/components/Subscription.component";
import {
  addOrUpdateGeneralInformation,
  addOrUpdatePrimaryApplicantFinancialInformation,
  addOrUpdatePrimaryApplicantPersonalInformation,
  addOrUpdatePrimaryApplicantWorkInformation,
  addOrUpdateSecondaryApplicantFinancialInformation,
  addOrUpdateSecondaryApplicantPersonalInformation,
  addOrUpdateSecondaryApplicantWorkInformation,
  FinancialInformation,
  GeneralInformation,
  PersonalInformation,
  removeGeneralInformation,
  removeSecondaryApplicant,
  setJoinLoanApplication,
  WorkInformation,
} from "../../shared/redux/application.slice";
import { useAppSelector } from "../../shared/redux/hooks";

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

  const [applicationOneFinancialValid, setApplicationOneFinancialValid] =
    useState<boolean>(false);

  const [applicationTwoFinancialValid, setApplicationTwoFinancialValid] =
    useState<boolean>(false);

  const [applicationGeneralInfoValid, setApplicationGeneralInfoValid] =
    useState<boolean>(false);

  const [allowWorkTab, setAllowWorkTab] = useState<boolean>(false);

  const [allowFinancialTab, setAllowFinancialTab] = useState<boolean>(false);

  const [allowGeneralTab, setAllowGeneralTab] = useState<boolean>(false);

  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

  const applicantOnePersonalInformationRef = useRef<any>();

  const applicantTwoPersonalInformationRef = useRef<any>();

  const applicantOneWorkInfoRef = useRef<any>();

  const applicantTwoWorkInfoRef = useRef<any>();

  const applicationOneFinancialInfoRef = useRef<any>();

  const applicationTwoFinancialInfoRef = useRef<any>();

  const applicationGeneralInfoRef = useRef<any>();

  const [completed, setCompleted] = useState<Step[]>([
    { id: 0, completed: false },
    { id: 1, completed: false },
    { id: 2, completed: false },
    { id: 3, completed: false },
  ]);

  const applicantInformation = useAppSelector(
    (state): PersonalInformation | undefined => {
      return state?.managedApplication.application.primaryApplicant?.personalInformation
    }
  );

  useEffect(() => {
    console.log(applicantInformation);
  },[applicantInformation]);

  useEffect(() => {
    setAllowSubmit(applicationGeneralInfoValid);
    setCompletedStep(2, applicationGeneralInfoValid);
  }, [applicationGeneralInfoValid]);

  useEffect(() => {
    if (jointLoan) {
      const valid =
        applicationOneFinancialValid && applicationTwoFinancialValid;
      setAllowGeneralTab(valid);
      setCompletedStep(1, valid);
    } else {
      setAllowGeneralTab(applicationOneFinancialValid);
      setCompletedStep(1, applicationOneFinancialValid);
    }
  }, [applicationOneFinancialValid, applicationTwoFinancialValid, jointLoan]);

  useEffect(() => {
    if (jointLoan) {
      const valid = applicantOneWorkInfoValid && applicantTwoWorkInfoValid;
      setAllowFinancialTab(valid);
      setCompletedStep(5, valid);
    } else {
      setCompletedStep(5, applicantOneWorkInfoValid);
      setAllowFinancialTab(applicantOneWorkInfoValid);
    }
  }, [applicantOneWorkInfoValid, applicantTwoWorkInfoValid, jointLoan]);

  useEffect(() => {
    if (jointLoan) {
      const valid =
        applicantOnePersonalInfoValid && applicantTwoPersonalInfoValid;
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

  const handlePersonalInformationSubmit = () => {
    batch(() => {
      if (applicantOnePersonalInformationRef?.current) {
        applicantOnePersonalInformationRef.current.triggerSubmit();
      }

      if (applicantTwoPersonalInformationRef?.current) {
        applicantTwoPersonalInformationRef.current.triggerSubmit();
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

    setActiveStep(5);
  };

  const handleFinancialInformationSubmit = () => {
    batch(() => {
      if (applicationOneFinancialInfoRef?.current) {
        applicationOneFinancialInfoRef.current.triggerSubmit();
      }

      if (applicationTwoFinancialInfoRef?.current) {
        applicationTwoFinancialInfoRef.current.triggerSubmit();
      }
    });

    setActiveStep(2);
  };

  const setCompletedStep = (step: number, state: boolean) => {
    const steps = completed.map((s: Step) => {
      if (s.id === step) {
        return { ...s, completed: state };
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

  const onPrimaryPersonalInformationSubmit = (data: PersonalInformation) => {
    dispatch(addOrUpdatePrimaryApplicantPersonalInformation(data));
  };

  const onPrimaryWorkInfoSubmit = (data: WorkInformation) => {
    dispatch(addOrUpdatePrimaryApplicantWorkInformation(data));
  };

  const onPrimaryFinancialInfoSubmit = (data: FinancialInformation) => {
    dispatch(addOrUpdatePrimaryApplicantFinancialInformation(data));
  };

  const onGeneralInfoInfoSubmit = (data: GeneralInformation) => {
    dispatch(addOrUpdateGeneralInformation(data));
  };

  const onSecondaryPersonalInformationSubmit = (data: PersonalInformation) => {
    dispatch(addOrUpdateSecondaryApplicantPersonalInformation(data));
  };

  const onSecondaryWorkInfoSubmit = (data: WorkInformation) => {
    dispatch(addOrUpdateSecondaryApplicantWorkInformation(data));
  };

  const onSecondaryFinancialInfoSubmit = (data: FinancialInformation) => {
    dispatch(addOrUpdateSecondaryApplicantFinancialInformation(data));
  };

  const handleSingleApplication = () => {
    setJointLoan(false);
    setApplicantOnePersonalInfoValid(false);
    setApplicantTwoPersonalInfoValid(true);
    setApplicantOneWorkInfoValid(false);
    setApplicantTwoWorkInfoValid(true);
    setApplicationOneFinancialValid(false);
    setApplicationTwoFinancialValid(true);
    dispatch(setJoinLoanApplication(false));
    dispatch(removeSecondaryApplicant());
    dispatch(removeGeneralInformation());
  };

  const handleJointApplication = () => {
    setJointLoan(true);
    setApplicantTwoPersonalInfoValid(false);
    setApplicantOnePersonalInfoValid(false);
    setApplicantOneWorkInfoValid(false);
    setApplicantTwoWorkInfoValid(false);
    setApplicationOneFinancialValid(false);
    setApplicationTwoFinancialValid(false);
    dispatch(setJoinLoanApplication(true));
    dispatch(removeGeneralInformation());
  };

  const handleBack = () => {
    setActiveStep(activeStep !== 0 ? activeStep - 1 : 0);
  };

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

  const isStepCompleted = (step: number): boolean | undefined => {
    return completed.find((s) => s.id === step)?.completed;
  };

  return (
    <Grid container size={jointLoan ? 12 : 4} offset={jointLoan ? 12 : 4}>
      <Grid
        size={
          jointLoan && activeStep !== 2
            ? 7.5
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan && activeStep !== 2
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
          {/* <Step key={"work"} completed={isStepCompleted(1)}>
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
          </Step> */}
          <Step key={"financial"} completed={isStepCompleted(1)}>
            <StepLabel
              icon={<AttachMoneyIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...stepColor(1),
              }}
            >
              Financial
            </StepLabel>
          </Step>
          <Step key={"general"} completed={isStepCompleted(2)}>
            <StepLabel
              icon={<InfoIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...stepColor(2),
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
          jointLoan && activeStep !== 2
            ? 7.5
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan && activeStep !== 2
            ? 2.25
            : { xl: 3.5, lg: 3, md: 3, sm: 2, xs: 2 }
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Button
            sx={{
              textTransform: "none",
              color: "primary.main",
            }}
            startIcon={<ArrowCircleLeftOutlinedIcon />}
            variant="text"
            disableRipple
            onClick={handleBack}
            disabled={activeStep === 0}
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
          jointLoan && activeStep !== 2
            ? 12
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan && activeStep !== 2
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
                      handleSingleApplication();
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
                    applicant={"primaryApplicant"}
                    onValid={(isValid) =>
                      setApplicantOnePersonalInfoValid(isValid)
                    }
                    onSubmit={(data) =>
                      onPrimaryPersonalInformationSubmit(data)
                    }
                    ref={applicantOnePersonalInformationRef}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <PersonalInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                    onValid={(isValid) =>
                      setApplicantTwoPersonalInfoValid(isValid)
                    }
                    onSubmit={(data) =>
                      onSecondaryPersonalInformationSubmit(data)
                    }
                    ref={applicantTwoPersonalInformationRef}
                  />
                </Grid>
              </Grid>
            ) : (
              <PersonalInformationTab
                applicant={"primaryApplicant"}
                onValid={(isValid) => setApplicantOnePersonalInfoValid(isValid)}
                onSubmit={(data) => onPrimaryPersonalInformationSubmit(data)}
                ref={applicantOnePersonalInformationRef}
              />
            )}
            <Grid
              size={jointLoan ? 2 : 3}
              offset={jointLoan ? 7.5 : 9}
              sx={{ marginTop: "20px" }}
            >
              <Button
                onClick={handlePersonalInformationSubmit}
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
        {activeStep === 5 && (
          <Fragment>
            {jointLoan ? (
              <Grid container size={8} offset={1.5}>
                <Grid size={5.5}>
                  <WorkInformationTab
                    key={1}
                    applicant={"primaryApplicant"}
                    onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
                    onSubmit={(data) => onPrimaryWorkInfoSubmit(data)}
                    ref={applicantOneWorkInfoRef}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <WorkInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                    onValid={(isValid) => setApplicantTwoWorkInfoValid(isValid)}
                    onSubmit={(data) => onSecondaryWorkInfoSubmit(data)}
                    ref={applicantTwoWorkInfoRef}
                  />
                </Grid>
              </Grid>
            ) : (
              <WorkInformationTab
                applicant={"primaryApplicant"}
                onValid={(isValid) => setApplicantOneWorkInfoValid(isValid)}
                onSubmit={(data) => onPrimaryWorkInfoSubmit(data)}
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
        {activeStep === 1 && (
          <Fragment>
            {jointLoan ? (
              <Grid container size={8} offset={1.5}>
                <Grid size={5.5}>
                  <FinancialInformationTab
                    key={1}
                    applicant={"primaryApplicant"}
                    onValid={(isValid) =>
                      setApplicationOneFinancialValid(isValid)
                    }
                    onSubmit={(data) => onPrimaryFinancialInfoSubmit(data)}
                    ref={applicationOneFinancialInfoRef}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <FinancialInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                    onValid={(isValid) =>
                      setApplicationTwoFinancialValid(isValid)
                    }
                    onSubmit={(data) => onSecondaryFinancialInfoSubmit(data)}
                    ref={applicationTwoFinancialInfoRef}
                  />
                </Grid>
              </Grid>
            ) : (
              <FinancialInformationTab
                applicant={"primaryApplicant"}
                onValid={(isValid) => setApplicationOneFinancialValid(isValid)}
                onSubmit={(data) => onPrimaryFinancialInfoSubmit(data)}
                ref={applicationOneFinancialInfoRef}
              />
            )}
            <Grid
              size={jointLoan ? 2 : 3}
              offset={jointLoan ? 7.5 : 9}
              sx={{ marginTop: "20px" }}
            >
              <Button
                onClick={handleFinancialInformationSubmit}
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
        {activeStep === 2 && (
          <Fragment>
            <GeneralInformationTab
              onValid={(isValid) => setApplicationGeneralInfoValid(isValid)}
              onSubmit={(data) => onGeneralInfoInfoSubmit(data)}
              ref={applicationGeneralInfoRef}
            />
            <Grid
              size={jointLoan ? 2 : 3}
              offset={jointLoan ? 10 : 9}
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
        <SubscriptionComponent />
      </Grid>
    </Grid>
  );
};
