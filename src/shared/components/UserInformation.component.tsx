import { AccountCircle } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { fetchRolesAsync, IRole, Role } from "../../shared/redux/role.slice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { User } from "../../interfaces/user.interface";
import { createUserAsync } from "../../shared/redux/managed.user.slice";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';

interface UserInformationProps {
  readonly?: boolean;
}

export const UserInformationComponent: React.FC<UserInformationProps> = ({
  readonly = false,
}) => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      id: 1,
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      role: {
        name: "",
        role: IRole.referrer,
        permissions: [],
      },
    },
  });

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, []);

  const roles = useAppSelector((state): Role[] | undefined => {
    return state?.roles.roles;
  });

  const onSubmit = (data: User) => {
    dispatch(createUserAsync(data));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

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

          <TextField
            type={showPassword ? 'text' : 'password'}
            variant={readonly ? "filled" : "outlined"}
            fullWidth
            size="small"
            label="Password"
            disabled={readonly}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters, contain one uppercase letter, one number, and one special character.",
              },
            })}
            error={!!errors.password}
            placeholder={"Password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" onClick={handleClickShowPassword}>
                    <div onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </div>
                  </InputAdornment>
                ),
                startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon/>
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

          {errors.password && (
            <Alert
              severity="error"
              sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
            >
              <AlertTitle>Important</AlertTitle>
              {String(errors.password.message)}
            </Alert>
          )}

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
          <Grid
            size={{ xl: 3, lg: 3, md: 6, sm: 6, xs: 6 }}
            offset={{ xl: 9, lg: 9, md: 6 }}
            sx={{ marginTop: "20px" }}
          >
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
