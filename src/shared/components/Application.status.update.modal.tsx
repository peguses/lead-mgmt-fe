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
import { Application, createApplicationStatusAsync } from "../redux/application.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ApplicationStatues } from "../redux/application.status.slice";
import { Controller, useForm } from "react-hook-form";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { findStatus } from "../utils/find.application.status.util";
import { useState } from "react";
import { ApplicationUser } from "../redux/application.user.slice";

interface ApplicationStatusUpdateModalProps {
  open: boolean;
  application?: Application;
  onClose: () => void
}

export const ApplicationStatusUpdateModal: React.FC<
  ApplicationStatusUpdateModalProps
> = ({ open, application, onClose }) => {

  const [defaultNote, setDefaultNote] = useState<string>();

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state): ApplicationUser | undefined => {
    return state?.applicationUser;
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "onSubmit",
    defaultValues: {
      status: 0,
      note: "",
    },
  });

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

  const defaultNoteById = (id: number): string | undefined => {
    return applicationStatuses?.applicationStatuses.find((status) => status.id === id)?.note
  }

  const onSubmit = async (data: any) => {
    if (application?.applicationId && currentUser?.user?.id) {
      await Promise.all([dispatch(
        createApplicationStatusAsync({
          applicationId: application?.applicationId,
          statusId: data.status,
          userId: currentUser?.user?.id,
          note: data?.note,
        })
      )])

      onClose();

    }
  };

  const applicantsName = () => {
    const primaryApplicant = `${application?.primaryApplicant?.personalInformation?.firstName} ${application?.primaryApplicant?.personalInformation?.lastName}`;
    const secondaryApplicant = application?.secondaryApplicant ? `${application?.secondaryApplicant?.personalInformation?.firstName} ${application?.secondaryApplicant?.personalInformation?.lastName}` : "";
    return `${primaryApplicant} ${secondaryApplicant ? ` and ${secondaryApplicant}` : ""}`;
  };

  return (
    <>
      <Modal open={open} onClose={() => {}}>
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
        >
          <TextField
            variant={"filled"}
            size="small"
            fullWidth
            value={applicantsName()}
            disabled={true}
            label="Applicant(s)"
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
            variant={"filled"}
            size="small"
            fullWidth
            value={
              findStatus(application?.applicationStatus)?.status
            }
            disabled={true}
            label="Current status"
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
            variant={"filled"}
            size="small"
            fullWidth
            multiline
            rows={4}
            value={
              findStatus(application?.applicationStatus)?.note
            }
            disabled={true}
            label="Current note"
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
                    setDefaultNote(defaultNoteById(e.target.value));
                    field.onChange(e);
                  }}
                >
                  {applicationStatuses &&
                    !applicationStatuses?.isLoading &&
                    applicationStatuses?.applicationStatuses?.map((stateObj) => (
                      <MenuItem key={stateObj.id} value={stateObj.id}>
                        {stateObj.status}
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
            defaultValue={defaultNote}
            sx={{ marginTop: "5px" }}
            {...register("note", {
              required: "Note is required",
            })}
            error={!!errors.note}
            helperText={
              errors.note ? String(errors.note.message) : ""
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
              disabled={!isValid}
              startIcon={<CheckCircle />}
            >
              UPDATE
            </Button>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1 }}
          >
            <Button
              onClick={() => {
                onClose();
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
