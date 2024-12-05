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
import { Applications } from "../../shared/redux/applications.slice";

export const ApplicationStatusContainer: React.FC<any> = () => {
  const [openAssign, setOpenAssign] = useState<boolean>(true);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: {},
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
      setOpenAssign(false);
    }
  }, [application.isLoading, application]);

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid size={4}>
          {!application.isLoading && (
            <Typography sx={{ marginTop: "20px" }}>
              {application.applicationStatus}
            </Typography>
          )}
        </Grid>

        <Modal
          open={openAssign}
          onClose={() => {}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            container
            sx={style}
            size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
          >
            <Grid size={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
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
                  setOpenAssign(false);
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
      </Grid>
    </>
  );
};
