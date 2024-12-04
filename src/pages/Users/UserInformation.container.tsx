import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { fetchRolesAsync, Role } from "../../shared/redux/role.slice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface UserInformationProps {
  readonly?: boolean;
}

export const UserInformationContainer: React.FC<UserInformationProps> = ({readonly = false}) => {

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, []);

  const roles = useAppSelector((state): Role[] | undefined => {
    return state?.roles.roles;
  });

  const onSubmit = () => {};

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid size={4}>
          <TextField
            variant={readonly ? "filled" : "outlined"}
            size="small"
            fullWidth
            disabled={readonly}
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
            })}
            error={!!errors.firstName}
            helperText={
              errors.firstName ? String(errors.firstName.message) : ""
            }
            placeholder={"First Name"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
                sx: {
                  marginTop: !readonly ? "20px" : "",
                },
              },
            }}
            sx={{
              ".MuiInputLabel-outlined": {
                lineHeight: "70px",
              },
            }}
          />
          <TextField
            variant={readonly ? "filled" : "outlined"}
            fullWidth
            size="small"
            label="Last Name"
            disabled={readonly}
            placeholder={"Last Name"}
            {...register("lastName", {
              required: "Last name is required",
            })}
            error={!!errors.lastName}
            helperText={errors.lastName ? String(errors.lastName.message) : ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
                sx: {
                  marginTop: !readonly ? "20px" : "",
                },
              },
            }}
            sx={{
              ".MuiInputLabel-outlined": {
                lineHeight: "70px",
              },
            }}
          />
          <TextField
            variant={readonly ? "filled" : "outlined"}
            fullWidth
            size="small"
            label="Email"
            disabled={readonly}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
            placeholder={"Email"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
                sx: {
                  marginTop: !readonly ? "20px" : "",
                },
              },
            }}
            sx={{
              ".MuiInputLabel-outlined": {
                lineHeight: "70px",
              },
            }}
          />

          <FormControl
            variant={readonly ? "filled" : "outlined"}
            fullWidth
            size="small"
            sx={{ marginTop: !readonly ? "20px" : "" }}
            error={Boolean(errors.role)}
          >
            <InputLabel htmlFor="role-label" id="role" shrink>
              Role
            </InputLabel>
            <Controller
              name="role"
              control={control}
              disabled={readonly}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  id="role"
                  labelId="role-label"
                  label="Role"
                  {...field}
                  displayEmpty
                  onChange={(e) => {
                    clearErrors("role");
                    field.onChange(e);
                  }}
                >
                  {roles?.map((stateObj) => (
                    <MenuItem key={stateObj.name} value={stateObj.role}>
                      {stateObj.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.role && (
              <FormHelperText>{String(errors.role?.message)}</FormHelperText>
            )}
          </FormControl>
          <Grid size={3} offset={9} sx={{ marginTop: "20px" }}>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<CheckCircleIcon />}
              disabled={!isValid}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
