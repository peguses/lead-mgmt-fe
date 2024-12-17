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
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import FinancialInformationTab from "../../shared/components/FinancialInformation.tab";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import {
  fetchApplicationAsync,
  ManagedApplication,
} from "../../shared/redux/application.slice";
import { ApplicationStatusUpdateModal } from "../../shared/components/Application.status.update.modal";
import { PersonalInformationTab } from "../../shared/components/PersonalInformation.tab";
import usePermission from "../../shared/hooks/usePermission";
import { Permission } from "../../shared/redux/role.slice";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface Step {
  id: number;
  completed: boolean;
}

export const ApplicationViewContainer: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { hasPermission } = usePermission();

  const { applicationId } = useParams();

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const [canUpdate, setCanUpdate] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchApplicationAsync({ applicationId }));
  }, [applicationId]);

  const application = useAppSelector(
    (state): ManagedApplication | undefined => {
      return state?.managedApplication;
    }
  );

  const [activeStep, setActiveStep] = useState<number>(0);

  const jointLoan = useAppSelector((state) => {
    return state.managedApplication.application.jointLoan;
  });

  const applicantStatus = [
    { code: "1APP", name: "1 Applicant" },
    { code: "2APP", name: "2 Applicants" },
  ];

  useEffect(() => {
    setCanUpdate(hasPermission([Permission.UPDATE_APPLICATION]));
  }, [hasPermission]);

  const handleUpdate = () => {
    setOpenUpdateModal(true);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/applications");
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid container size={12} justifyContent={"center"}>
      <Grid
        size={
          jointLoan && activeStep !== 2
            ? { xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }
            : { xl: 4, lg: 4, md: 12, sm: 12, xs: 12 }
        }
        sx={{ marginTop: "5px", marginBottom: "20px" }}
      >
        <Grid size={12}>
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
        <Grid sx={{ marginTop: "5px" }} size={12}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
              sx={{
                textTransform: "none",
                color: "#1E3A5F",
                fontWeight: 700
              }}
              startIcon={
                <ChevronLeft 
                sx={{
                    height: "26px",
                    width: "26px",
                    boxShadow: 4,
                    borderRadius: "50%",
                    backgroundColor: "#1E3A5F",
                    color: "white"
                }}
                />
              }
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
            <Button
              sx={{
                textTransform: "none",
                color: "#1E3A5F",
                fontWeight: 700
              }}
              endIcon={
                <ChevronRight
                  sx={{
                    height: "26px",
                    width: "26px",
                    boxShadow: 4,
                    borderRadius: "50%",
                    backgroundColor: activeStep === 2 ? "#908c8c": "#1E3A5F",
                    color: "white"
                  }}
                />
              }
              variant="text"
              disableRipple
              onClick={handleNext}
              disabled={activeStep === 2}
            >
              Next
            </Button>
          </Box>
        </Grid>
        {!application?.isLoading && (
          <Grid sx={{ marginTop: "20px" }} size={12}>
            {activeStep === 0 && (
              <Fragment>
                <Grid size={12}>
                  <FormControl
                    fullWidth
                    sx={{ marginTop: "5px" }}
                    size="small"
                    variant={"filled"}
                  >
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
                  <Grid container size={12} spacing={2}>
                    <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                      <PersonalInformationTab
                        applicant={"primaryApplicant"}
                        readonly={true}
                        nextNotification={""}
                      />
                    </Grid>
                    <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                      <PersonalInformationTab
                        applicant={"secondaryApplicant"}
                        readonly={true}
                        nextNotification={""}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <PersonalInformationTab
                    applicant={"primaryApplicant"}
                    readonly={true}
                    nextNotification={""}
                  />
                )}
              </Fragment>
            )}
            {activeStep === 1 && (
              <Fragment>
                {jointLoan ? (
                  <Grid container size={12} spacing={2}>
                    <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                      <FinancialInformationTab
                        key={1}
                        applicant={"primaryApplicant"}
                        readonly={true}
                      />
                    </Grid>
                    <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
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
              </Fragment>
            )}
            {activeStep === 2 && (
              <Fragment>
                <GeneralInformationTab readonly={true} alert={undefined} />
              </Fragment>
            )}
            {canUpdate && (
              <Grid container justifyContent={"end"}>
                <Grid
                  size={{ xl: 3, lg: 3, md: 6, sm: 12, xs: 12 }}
                  sx={{ marginTop: "20px" }}
                >
                  <Button
                    onClick={handleUpdate}
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      <ApplicationStatusUpdateModal
        open={openUpdateModal}
        application={application?.application}
        onClose={() => setOpenUpdateModal(false)}
      />
    </Grid>
  );
};
