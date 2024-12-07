import {
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { ManagedApplication } from "../redux/application.slice";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { ApplicationStatues } from "../redux/application.status.slice";
import { Controller, useForm } from "react-hook-form";
import CheckCircle from '@mui/icons-material/CheckCircle';
import CancelIcon from "@mui/icons-material/Cancel";

interface ApplicationStatusUpdateModalProps {
  open: boolean;
  application?: ManagedApplication;
}

export const ApplicationStatusUpdateModal: React.FC<
  ApplicationStatusUpdateModalProps
> = ({ open, application }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      status: "",
      note: ""
    },
  });

  const [
    openApplicationStatusUpdateModal,
    setOpenApplicationStatusUpdateModal,
  ] = useState<boolean>(open);

  const applicationStatuses = useAppSelector(
    (state): ApplicationStatues | undefined => {
      return state?.applicationStatuses;
    }
  );

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

  const onSubmit = () => {

  }

  return (
    <>
      <Modal open={openApplicationStatusUpdateModal} onClose={() => {}}>
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
        >
          <FormControl
            variant={"outlined"}
            fullWidth
            size="small"
            sx={{ marginTop: "20px" }}
            error={Boolean(errors.status)}
          >
            <InputLabel htmlFor="status-label" id="role" shrink>
              Status
            </InputLabel>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select
                  id="status"
                  labelId="status-label"
                  label="Status"
                  {...field}
                  displayEmpty
                  onChange={(e) => {
                    clearErrors("status");
                    field.onChange(e);
                  }}
                >
                  {applicationStatuses &&
                    !applicationStatuses?.isLoading &&
                    applicationStatuses.applicationStatuses?.map((stateObj) => (
                      <MenuItem key={stateObj.status} value={stateObj.status}>
                        {stateObj.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {errors.status && (
              <FormHelperText>{String(errors.status?.message)}</FormHelperText>
            )}
          </FormControl>

          <TextField
            variant={"outlined"}
            size="small"
            fullWidth
            multiline
            rows={5}
            sx={{ marginTop: "5px" }}
            {...register("note", {
              required: "Note is required",
            })}
            error={!!errors.referralOption}
            helperText={
              errors.referralOption ? String(errors.referralOption.message) : ""
            }
            placeholder={"How did you hear about us"}
          />
           <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 3, lg: 3, md: 3, sm: 3 }}
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
              fullWidth
              disabled={ !isValid }
              startIcon={<CheckCircle />}
            >
              UPLOAD
            </Button>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1 }}
          >
            <Button
              onClick={() => {
                setOpenApplicationStatusUpdateModal(false);
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
    </>
  );
};
