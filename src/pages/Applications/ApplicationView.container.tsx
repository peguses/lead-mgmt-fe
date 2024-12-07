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
import PersonalInformationTab from "../../shared/components/PersonalInformation.tab";
import GeneralInformationTab from "../../shared/components/GeneralInformation.tab";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import FinancialInformationTab from "../../shared/components/FinancialInformation.tab"
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { Application, fetchApplicationAsync } from "../../shared/redux/application.slice";
import { ApplicationStatusUpdateModal } from "../../shared/components/application.status.update.modal";

interface Step {
  id: number;
  completed: boolean;
}

export const ApplicationViewContainer: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { applicationId } = useParams();

  useEffect(() => {
      dispatch(fetchApplicationAsync({ applicationId }))
  }, [applicationId]);

  const application = useAppSelector(
    (state): Application | undefined => {
      return state?.managedApplication.application;
    }
  );

  const [activeStep, setActiveStep] = useState<number>(0);

  const jointLoan = useAppSelector((state) => {
    return state.managedApplication.application.jointLoan
  });

  const applicantStatus = [
    { code: "1APP", name: "1 Applicant" },
    { code: "2APP", name: "2 Applicants" },
  ];

  const handleSubmit = () => {
   
  };

  const handleNext = () => {
    setActiveStep(activeStep+1);
  }

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/applications");
    }
    setActiveStep(activeStep-1);
  }

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
          <Step key={"personal"} completed={true}>
            <StepLabel
              icon={<PersonIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Personal
            </StepLabel>
          </Step>
          <Step key={"financial"} completed={true}>
            <StepLabel
              icon={<AttachMoneyIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Financial
            </StepLabel>
          </Step>
          <Step key={"general"} completed={true}>
            <StepLabel
              icon={<InfoIcon />}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
              textTransform: 'none',
              color: 'primary.main'
            }}
            startIcon={<ArrowCircleLeftOutlinedIcon />} 
            variant="text"
            disableRipple
            // disabled={activeStep === 0}
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
          <Button 
             sx={{
              textTransform: 'none',
              color: 'primary.main'
            }}
            endIcon={<ArrowCircleRightOutlinedIcon />} 
            variant="text"
            disableRipple
            onClick={handleNext}
            disabled={activeStep === 2}
            >
          Next
          </Button>
        </Box>
      </Grid>
      {!application?.isLoading && (<Grid
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
              <FormControl fullWidth sx={{ marginTop: "5px" }} size="small" variant={"filled"}>
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
                  disabled={true}
                  sx={{ 
                    height: "36px",
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CheckCircleOutlineOutlinedIcon />}
              >
                Update
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
                    readonly={true}
                  />
                </Grid>
                <Grid size={5.5} offset={1}>
                  <FinancialInformationTab
                    key={2}
                    applicant={"secondaryApplicant"}
                    readonly={true}
                  />
                </Grid>
              </Grid>
            ) : (
              <FinancialInformationTab
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CheckCircleOutlineOutlinedIcon />}
              >
                Update
              </Button>
            </Grid>
          </Fragment>
        )}
        {activeStep === 2 && (
          <Fragment>
            <GeneralInformationTab readonly={true}/>
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
                Update
              </Button>
            </Grid>
          </Fragment>
        )}
      </Grid>)}
      <ApplicationStatusUpdateModal open={true} application={undefined}/>
    </Grid>
  );
};
