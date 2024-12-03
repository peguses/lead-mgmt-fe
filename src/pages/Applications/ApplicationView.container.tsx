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
import { batch } from "react-redux";
import GeneralInformationTab from "../../shared/components/GeneralInformation.tab";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import FinancialInformationTab from "../../shared/components/FinancialInformation.tab"
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { Application, fetchApplicationAsync } from "../../shared/redux/application.slice";

interface Step {
  id: number;
  completed: boolean;
}

export const ApplicationViewContainer: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const { applicationId } = useParams();

  useEffect(() => {
      dispatch(fetchApplicationAsync({ applicationId }))
  }, [applicationId]);

  const application = useAppSelector(
    (state): Application | undefined => {
      return state?.loan.application;
    }
  );

  useEffect(() => {

  }, [application])

  const [activeStep, setActiveStep] = useState<number>(0);

  const jointLoan = useAppSelector((state) => {
    return state.loan.application.jointLoan
  });

  const applicationGeneralInfoRef = useRef<any>();

  const [completed, setCompleted] = useState<Step[]>(
    [{id: 0, completed: false}, {id: 1, completed: false}, {id: 2, completed: false}, {id: 3, completed: false}]
  );

  const applicantStatus = [
    { code: "1APP", name: "1 Applicant" },
    { code: "2APP", name: "2 Applicants" },
  ];

  const handlePersonalInformationSubmit = () => {
    setActiveStep(1);
  };

  const handleWorkInformationSubmit = () => {
    setActiveStep(5);
  };

  const handleFinancialInformationSubmit = () => {
    setActiveStep(2);
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
          jointLoan && activeStep !== 3
            ? 7.5
            : { xl: 5, lg: 6, md: 6, sm: 8, xs: 8 }
        }
        offset={
          jointLoan && activeStep !== 3
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
      {!application?.isLoading && (<Grid
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
                    readonly={true}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <PersonalInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                    readonly={true}
                  />
                </Grid>
              </Grid>
            ) : (
              <PersonalInformationTab
                applicant={"primaryApplicant"}
                readonly={true}
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
                    readonly={true}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <WorkInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                    readonly={true}
                  />
                </Grid>
              </Grid>
            ) : (
              <WorkInformationTab
                applicant={"primaryApplicant"}
                readonly={true}
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
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <FinancialInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                  />
                </Grid>
              </Grid>
            ) : (
              <FinancialInformationTab
                applicant={"primaryApplicant"}
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
              >
                Next
              </Button>
            </Grid>
          </Fragment>
        )}
        {activeStep === 2 && (
          <Fragment>
            <GeneralInformationTab/>
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
              >
                Submit
              </Button>
            </Grid>
          </Fragment>
        )}
      </Grid>)}
    </Grid>
  );
};
