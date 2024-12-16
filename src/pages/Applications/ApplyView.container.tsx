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
import React, { Fragment, useEffect, useState } from "react";
import GeneralInformationTab from "../../shared/components/GeneralInformation.tab";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import FinancialInformationTab from "../../shared/components/FinancialInformation.tab";
import {
  addOrUpdateGeneralInformation,
  addOrUpdatePrimaryApplicantFinancialInformation,
  addOrUpdatePrimaryApplicantPersonalInformation,
  addOrUpdateSecondaryApplicantFinancialInformation,
  addOrUpdateSecondaryApplicantPersonalInformation,
  Application,
  createApplicationAsync,
  FinancialInformation,
  GeneralInformation,
  ManagedApplication,
  PersonalInformation,
  removeGeneralInformation,
  removePrimaryApplicant,
  removeSecondaryApplicant,
  resetApplication,
  resetApplicationSubmitError,
  setJoinLoanApplication,
  setReferrerId,
} from "../../shared/redux/application.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { PersonalInformationTab } from "../../shared/components/PersonalInformation.tab";

interface Step {
  id: number;
  completed: boolean;
  currentStep: boolean;
}

export const ApplyViewContainer: React.FC<any> = () => {

  const navigate = useNavigate();
  
  const [personalInfoStateUUID, setPersonalInfoStateUUID] = useState("1");

  const [financialInfoStateUUID, setFinancialInfoStateUUID] = useState("1");

  const [generalInfoStateUUID, setGeneralInfoStateUUID] = useState("1");

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const referrerToken = queryParams.get("referrerToken");

  const dispatch = useAppDispatch();

  const [current, setCurrentStep] = useState<number>(0);

  const [jointLoan, setJointLoan] = useState<boolean>(false);

  const [allowNextStep, setAllowNextStep] = useState<boolean>(false);

  const [back, setBack] = useState<boolean>(false);

  const [forward, setForward] = useState<boolean>(false);

  const [alert, setAlert] = useState<string | undefined>(undefined);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [completed, setCompleted] = useState<Step[]>([
    { id: 0, completed: false, currentStep: true },
    { id: 1, completed: false, currentStep: false },
    { id: 2, completed: false, currentStep: false },
  ]);

  const application = useAppSelector((state): Application | undefined => {
    return state?.managedApplication.application;
  });

  const managedApplication = useAppSelector(
    (state): ManagedApplication | undefined => {
      return state?.managedApplication;
    }
  );

  const applicantStatus = [
    { code: "1APP", name: "1 Applicant" },
    { code: "2APP", name: "2 Applicants" },
  ];

  const handlePersonalInformationSubmit = () => {
    setPersonalInfoStateUUID(uuidv4());
    setForward(true);
    setBack(false);
  };

  const handleFinancialInformationSubmit = () => {
    setFinancialInfoStateUUID(uuidv4());
    setForward(true);
    setBack(false);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setGeneralInfoStateUUID(uuidv4());
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

  const setActiveStep = (step: number) => {
    const steps = completed.map((s: Step) => {
      if (s.id === step) {
        return { ...s, currentStep: true };
      }
      return { ...s, currentStep: false };
    });

    setCompleted(steps);
  };

  useEffect(() => {
    setCurrentStep(activeStep(completed));
  }, [completed]);

  useEffect(() => {
    if (back || forward) {
      return;
    }
    dispatch(resetApplication());
    dispatch(resetApplicationSubmitError());
    dispatch(removeSecondaryApplicant());
    dispatch(removePrimaryApplicant());
    dispatch(removeGeneralInformation());
  }, []);

  useEffect(() => {
    if (
      managedApplication?.loadingFailed &&
      managedApplication?.errorMessageIfFailed
    ) {
      setAlert(managedApplication.errorMessageIfFailed);
    } else {
      setAlert(undefined);
    }
  }, [
    managedApplication?.errorMessageIfFailed,
    managedApplication?.loadingFailed,
  ]);

  const onPrimaryPersonalInformationSubmit = (data: PersonalInformation) => {

    if (referrerToken) {
      dispatch(setReferrerId(referrerToken));
    }
    dispatch(addOrUpdatePrimaryApplicantPersonalInformation(data));
    if (!jointLoan && forward) setActiveStep(1);
  };

  const onSecondaryPersonalInformationSubmit = (data: PersonalInformation) => {
    dispatch(addOrUpdateSecondaryApplicantPersonalInformation(data));
    if (jointLoan && forward) setActiveStep(1);
  };

  const onPrimaryFinancialInfoSubmit = (data: FinancialInformation) => {
    console.log(data);
    dispatch(addOrUpdatePrimaryApplicantFinancialInformation(data));
    if (!jointLoan && forward) setActiveStep(2);
  };

  const onSecondaryFinancialInfoSubmit = (data: FinancialInformation) => {
    dispatch(addOrUpdateSecondaryApplicantFinancialInformation(data));
    if (jointLoan && forward) setActiveStep(2);
  };

  const onGeneralInfoInfoSubmit = (data: GeneralInformation) => {
    dispatch(addOrUpdateGeneralInformation(data));
    dispatch(resetApplicationSubmitError());

    if (application && submitting) {
      dispatch(
        createApplicationAsync({
          ...application,
          generalInformation: data,
          secondaryApplicant: application.jointLoan
            ? application.secondaryApplicant
            : undefined,
        })
      ).then((response: any) => {
        if (!response.error) {
          navigate(`/status?applicationId=${response.payload.application.applicationId}&state="success"`);
        }
      });
    }
  };

  const handleSingleApplication = () => {
    setJointLoan(false);
    dispatch(setJoinLoanApplication(false));
    dispatch(removeSecondaryApplicant());
    dispatch(removeGeneralInformation());
  };

  const handleJointApplication = () => {
    setJointLoan(true);
    dispatch(setJoinLoanApplication(true));
    dispatch(removeGeneralInformation());
  };

  const backStep = () => {
    return activeStep(completed).id !== 0 ? activeStep(completed) - 1 : 0;
  };

  const handleBack = () => {
    setActiveStep(backStep());
    setForward(false);
    setBack(true);
    dispatch(resetApplicationSubmitError());
    setSubmitting(false);
  };

  const stepColor = (step: number) => {
    let color: string = "text.secondary";
    if (current === step) {
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

  const activeStep = (completed: any[]) => {
    return completed.find((s) => s.currentStep)?.id;
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid
        container
        justifyContent={"center"}
        size={
          jointLoan && current !== 2
            ? { xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }
            : { xl: 4, lg: 4, md: 12, sm: 12, xs: 12 }
        }
        sx={{ marginTop: "5px", marginBottom: "20px" }}
      >
        <Grid size={12}>
          <Stepper nonLinear activeStep={current}>
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
        <Grid size={12}>
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
              disabled={current === 0}
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
        <Grid size={12}>
          {current === 0 && (
            <Fragment>
              <Grid>
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
                <Grid container size={12} spacing={2}>
                  <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <PersonalInformationTab
                      applicant={"primaryApplicant"}
                      onSubmit={(data) =>
                        onPrimaryPersonalInformationSubmit(data)
                      }
                      nextNotification={personalInfoStateUUID}
                      allowNext={(allow: boolean) => {}}
                    />
                  </Grid>
                  <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <PersonalInformationTab
                      applicant={"secondaryApplicant"}
                      onSubmit={(data) =>
                        onSecondaryPersonalInformationSubmit(data)
                      }
                      nextNotification={personalInfoStateUUID}
                      allowNext={(allow: boolean) => {
                        setAllowNextStep(allow);
                        setCompletedStep(0, allow);
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <PersonalInformationTab
                  applicant={"primaryApplicant"}
                  onSubmit={(data) => onPrimaryPersonalInformationSubmit(data)}
                  nextNotification={personalInfoStateUUID}
                  allowNext={(allow: boolean) => {
                    setAllowNextStep(allow);
                    setCompletedStep(0, allow);
                  }}
                />
              )}
              <Grid container justifyContent={"end"}>
                <Grid
                  size={{ xl: 3, lg: 3, md: 6, sm: 12, xs: 12 }}
                  sx={{ marginTop: "20px" }}
                >
                  <Button
                    onClick={handlePersonalInformationSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowCircleRightOutlinedIcon />}
                    disabled={!allowNextStep}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          )}
          {current === 1 && (
            <Fragment>
              {jointLoan ? (
                <Grid container size={12} spacing={2}>
                  <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <FinancialInformationTab
                      applicant={"primaryApplicant"}
                      onSubmit={(data) => onPrimaryFinancialInfoSubmit(data)}
                      nextNotification={financialInfoStateUUID}
                      allowNext={(allow: boolean) => {}}
                    />
                  </Grid>
                  <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <FinancialInformationTab
                      applicant={"secondaryApplicant"}
                      onSubmit={(data) => onSecondaryFinancialInfoSubmit(data)}
                      nextNotification={financialInfoStateUUID}
                      allowNext={(allow: boolean) => {
                        setAllowNextStep(allow);
                        setCompletedStep(1, allow);
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <FinancialInformationTab
                  applicant={"primaryApplicant"}
                  onSubmit={(data) => onPrimaryFinancialInfoSubmit(data)}
                  nextNotification={financialInfoStateUUID}
                  allowNext={(allow: boolean) => {
                    setAllowNextStep(allow);
                    setCompletedStep(1, allow);
                  }}
                />
              )}
              <Grid container justifyContent={"end"}>
                <Grid
                  size={{ xl: 3, lg: 3, md: 6, sm: 12, xs: 12 }}
                  sx={{ marginTop: "20px" }}
                >
                  <Button
                    onClick={handleFinancialInformationSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowCircleRightOutlinedIcon />}
                    disabled={!allowNextStep}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          )}
          {current === 2 && (
            <Fragment>
              <GeneralInformationTab
                onSubmit={(data) => onGeneralInfoInfoSubmit(data)}
                nextNotification={generalInfoStateUUID}
                allowNext={(allow: boolean) => {
                  setAllowNextStep(allow);
                  setCompletedStep(2, allow);
                }}
                alert={alert}
              />
              <Grid container justifyContent={"end"}>
                <Grid
                  size={{ xl: 3, lg: 3, md: 6, sm: 12, xs: 12 }}
                  sx={{ marginTop: "20px" }}
                >
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                    disabled={!allowNextStep}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
