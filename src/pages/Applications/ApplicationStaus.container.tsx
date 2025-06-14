import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchApplicationAsync,
  ManagedApplication,
  resetApplication,
  resetApplicationSubmitError,
  Status,
} from "../../shared/redux/application.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import { FilterList } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLocation, useNavigate } from "react-router-dom";
import { findStatus } from "../../shared/utils/find.application.status.util";
import moment from "moment";
import UploadIcon from "@mui/icons-material/Upload";
import { FileUploadModal } from "../../shared/components/FileUpload.modal";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { ApplicationUser } from "../../shared/redux/application.user.slice";
import { DocumentListComponent } from "../../shared/components/DocumentList.component";

export const ApplicationStatusContainer: React.FC<any> = () => {

  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  const [viewStatusModelOpen, setViewStatusModelOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const applicationId = queryParams.get("applicationId");

  const state = queryParams.get("state");

  const [uploadDocumentModelOpen, setUploadDocumentModelOpen] =
    useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      filerKey: "",
      filterValue: "",
    },
  });

  const dispatch = useAppDispatch();

  const filters = [
    // { code: "email", name: "By Email" },
    // { code: "mobile", name: "By Mobile" },
    { code: "applicationId", name: "By Application Id" },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const application = useAppSelector((state): ManagedApplication => {
    return state?.managedApplication;
  });

  const currentUser = useAppSelector((state): ApplicationUser | undefined => {
    return state?.applicationUser;
  });

  const handleFilter = async ({ filerKey, filterValue }) => {
    dispatch(resetApplicationSubmitError());
    if (filerKey === "applicationId") {
      dispatch(fetchApplicationAsync({ applicationId: filterValue })).then(
        (message: any) => {
          if (!message.error) {
            setViewStatusModelOpen(false);
          }
        }
      );
    }
  };

  const onFiledUploaded = () => {
    handleFilter({ filerKey: "applicationId", filterValue: applicationId || application.application.applicationId });
    setUploadDocumentModelOpen(false);
  }

  useEffect(() => {
    dispatch(resetApplication());
  }, [dispatch]);

  const formatUpdatedDateTime = (status: Status | undefined) => {
    findStatus(application.application.applicationStatus)
    return status?.createDateTime
      ? moment(status.createDateTime).format("yyyy-MM-DD:HH:hh")
      : "";
  };

  useEffect(() => {
    if (applicationId) {
      handleFilter({ filerKey: "applicationId", filterValue: applicationId });
    }
  }, [applicationId]);

  const document = () => {
    return {
      applicationId: application.application.applicationId,
      userId: currentUser?.user?.id,
    };
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid size={{ xl: 5, lg: 5, md: 8, sm: 12, xs: 12 }}>
          <Typography
            sx={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}
          >
            Inquiry Status
          </Typography>
          <>
            <TextField
              size="small"
              label="Inquiry Status"
              variant={"filled"}
              fullWidth
              value={
                findStatus(application.application.applicationStatus)?.status
              }
              disabled={true}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                ".MuiInputLabel-outlined": {
                  lineHeight: "70px",
                },
              }}
            />

            <TextField
              size="small"
              label="Last updated"
              variant={"filled"}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={formatUpdatedDateTime(
                findStatus(application.application.applicationStatus)
              )}
              disabled={true}
            />

            <TextField
              size="small"
              label="Processing officer"
              variant={"filled"}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={application.application.processingOfficer}
              disabled={true}
            />

            <TextField
              size="small"
              label="Your referrer"
              variant={"filled"}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={application.application.referrer}
              disabled={true}
            />

            <TextField
              size="small"
              multiline
              label="Note"
              rows={2}
              variant={"filled"}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
              value={
                findStatus(application.application.applicationStatus)?.note
              }
              disabled={true}
            />
          </>
          {!isSmallScreen && (
            <Grid container sx={{ marginTop: "20px" }} size={12}>
              {!application?.isLoading &&
                application.application?.documents?.length !== 0 ?  (
                  <DocumentListComponent documents={application.application?.documents}/>
                ): (
                  <Backdrop
                    className="diagnose-loader"
                    sx={{
                      color: "primary.main",
                      marginRight: "20%",
                      position: "absolute",
                      inset: "0",
                      zIndex: "10",
                      backgroundColor: "primary.contrastText",
                    }}
                    open={application?.isLoading || false}
                  >
                    <CircularProgress
                      color="inherit"
                      sx={{ marginLeft: {xl: "250px", lg: "250px", md: "250px", sm: "100px", xs: "100px"}, textAlign: "center" }}
                    />
                  </Backdrop>
                )}
            </Grid>
          )}
          <Grid container sx={{ marginTop: "10px" }} spacing={2}>
            {!applicationId && (
              <Grid size={{ xl: 4, lg: 6, md: 12, sm: 12, xs: 12 }}>
                <Button
                  onClick={() => {
                    dispatch(resetApplicationSubmitError());
                    setViewStatusModelOpen(true);
                  }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<CheckCircleOutlineOutlinedIcon />}
                >
                  VIEW STATUS
                </Button>
              </Grid>
            )}
            {application.application.applicationId !== undefined &&
              !application.isLoading && (
                <Grid size={{ xl: 4, lg: 6, md: 12, sm: 12, xs: 12 }}>
                  <Button
                    onClick={() => setUploadDocumentModelOpen(true)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<UploadIcon />}
                  >
                    UPLOAD DOCUMENT
                  </Button>
                </Grid>
              )}
          </Grid>
        </Grid>

        <Modal
          open={viewStatusModelOpen}
          onClose={() => {}}
          aria-labelledby="upload document"
          aria-describedby="upload document"
        >
          <Grid
            container
            sx={style}
            size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
          >
            <Grid size={12}>
              <Typography
                id="upload-document-title"
                variant="h6"
                component="h2"
              >
                View my application
              </Typography>
            </Grid>
            <Grid size={12}>
              {application.errorMessageIfFailed && (
                <Alert
                  severity="error"
                  sx={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {application.errorMessageIfFailed}
                </Alert>
              )}
            </Grid>
            <Grid size={12} sx={{ marginTop: "10px" }}>
              <FormControl
                variant={"outlined"}
                fullWidth
                size="small"
                error={Boolean(errors.filerKey)}
              >
                <InputLabel htmlFor="filerKey-label" id="filerKey" shrink>
                  Filer By
                </InputLabel>
                <Controller
                  name="filerKey"
                  control={control}
                  defaultValue={""}
                  rules={{ required: "Filer is required" }}
                  render={({ field }) => (
                    <Select
                      id="filerKey"
                      labelId="filerKey-label"
                      label="Filer By"
                      {...field}
                      displayEmpty
                      onChange={(e) => {
                        clearErrors("filerKey");
                        field.onChange(e);
                      }}
                    >
                      {filters?.map((stateObj) => (
                        <MenuItem key={stateObj.name} value={stateObj.code}>
                          {stateObj.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.filerKey && (
                  <FormHelperText>
                    {String(errors.filerKey?.message)}
                  </FormHelperText>
                )}
              </FormControl>

              <TextField
                variant={"outlined"}
                size="small"
                fullWidth
                label="Filter"
                defaultValue={""}
                {...register("filterValue", {
                  required: "Filter value is required",
                })}
                error={!!errors.filterValue}
                helperText={
                  errors.filterValue ? String(errors.filterValue.message) : ""
                }
                placeholder={"Filter value"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterList />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "20px",
                    },
                  },
                }}
                sx={{
                  ".MuiInputLabel-outlined": {
                    lineHeight: "70px",
                  },
                }}
              />
            </Grid>
            <Grid
              size={12}
              container
              justifyContent={"flex-start"}
              spacing={2}
              sx={{ marginTop: "10px" }}
            >
              <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
                <Button
                  onClick={handleSubmit(handleFilter)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!isValid}
                  startIcon={<FilterList />}
                >
                  Filter
                </Button>
              </Grid>
              <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
                <Button
                  onClick={() => {
                    setViewStatusModelOpen(false);
                    navigate("/applications");
                  }}
                  variant="outlined"
                  fullWidth
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
        <FileUploadModal onClose={onFiledUploaded} data={document()} open={uploadDocumentModelOpen} />
      </Grid>
    </>
  );
};
