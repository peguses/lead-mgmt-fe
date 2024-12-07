import {
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Application,
  fetchApplicationAsync,
  resetApplication,
} from "../../shared/redux/application.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import { FilterList } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { findLatestStatus } from "../../shared/utils/find.application.status.util";
import moment from "moment";
import UploadIcon from '@mui/icons-material/Upload';
import { FileUploadModal } from "../../shared/components/FileUpload.modal";

export const ApplicationStatusContainer: React.FC<any> = () => {

  const [viewStatusModelOpen, setViewStatusModelOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
      filterValue: ""
    },
  });

  const dispatch = useAppDispatch();

  const filters = [
    { code: "email", name: "By Email" },
    { code: "mobile", name: "By Mobile" },
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

  const application = useAppSelector((state): Application => {
    return state?.managedApplication.application;
  });

  const handleFilter = ({ filerKey, filterValue }) => {
    dispatch(
      fetchApplicationAsync({ filterBy: filerKey, filter: filterValue })
    );
  };

  useEffect(() => {
    dispatch(resetApplication());
  }, []);

  useEffect(() => {
    if (!application.isLoading && application.loaded) {
      setViewStatusModelOpen(false);
    }
  }, [application.isLoading, application]);

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid size={{xl: 5, lg: 5, md: 5, sm: 10, xs: 10}}>
          {!application.isLoading && (
            <>
              <TextField
                size="small"
                label="Inquiry Status"
                variant={"filled"}
                fullWidth
                value={findLatestStatus(application.applicationStatus)?.status.name}
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
                value={moment(
                  findLatestStatus(application.applicationStatus)
                    ?.createDateTime
                ).format("yyyy-MM-DD:HH:hh")}
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
                value={application.processingOfficer}
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
                value={application.referrer}
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
                value={findLatestStatus(application.applicationStatus)?.note}
                disabled={true}
              />
            </>
          )}
          <Grid>

          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 4, lg: 6, md: 12, sm: 12, xs: 12 }}
          >
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
            size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
          >
            <Grid size={12}>
              <Typography id="upload-document-title" variant="h6" component="h2">
                View my application
              </Typography>
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
              sx={{ marginTop: "10px" }}
              size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
              offset={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}
            >
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
            <Grid
              sx={{ marginTop: "10px" }}
              size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
              offset={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Button
                onClick={() => {
                  setViewStatusModelOpen(false);
                  navigate("/");
                }}
                variant="outlined"
                fullWidth
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Modal>
        <FileUploadModal open={uploadDocumentModelOpen}/>
      </Grid>
    </>
  );
};
