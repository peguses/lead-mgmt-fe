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
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useAppDispatch } from "../../shared/redux/hooks";
import { Role } from "../../shared/redux/role.slice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  createUserAsync,
  dropUserAsync,
  updateUserAsync,
  UserManagedAction,
} from "../../shared/redux/managed.user.slice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyIcon from "@mui/icons-material/Key";
import { User } from "../interfaces/user.interface";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

interface UserInformationProps {
  readonly?: boolean;
  roles: Role[];
  user?: User;
  userManagementAction: UserManagedAction;
}

export const UserInformationComponent: React.FC<UserInformationProps> = ({
  readonly = false,
  roles,
  user,
  userManagementAction,
}) => {

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

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: user
      ? { ...user, role: user.role.role }
      : {
          id: 1,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        },
  });

  const onSubmit = (data: User) => {
    dispatch(createUserAsync({...data})).then(() => navigate("/users"));
  };
  
  const onUpdate = (data: User) => {
      dispatch(updateUserAsync(data)).then(() => navigate("/users"));
  }

  const onDelete = (userId: number | undefined) => {
    if (userId) {
      dispatch(dropUserAsync(userId)).then(() => navigate("/users"));
    }
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const hidden = () => {
    return readonly || userManagementAction === UserManagedAction.UPDATE_USER;
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid size={4}>
          <TextField
            variant={hidden() ? "filled" : "outlined"}
            size="small"
            fullWidth
            disabled={hidden()}
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
                  marginTop: !hidden() ? "20px" : "",
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
            variant={hidden() ? "filled" : "outlined"}
            fullWidth
            size="small"
            label="Last Name"
            disabled={hidden()}
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
                  marginTop: !hidden() ? "20px" : "",
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
            variant={hidden() ? "filled" : "outlined"}
            fullWidth
            size="small"
            label="Email"
            disabled={hidden()}
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
                  marginTop: !hidden() ? "20px" : "",
                },
              },
            }}
            sx={{
              ".MuiInputLabel-outlined": {
                lineHeight: "70px",
              },
            }}
          />

          {userManagementAction === UserManagedAction.CREATE_USER ||
            (userManagementAction === UserManagedAction.UPDATE_USER && (
              <TextField
                type={showPassword ? "text" : "password"}
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
                      <InputAdornment
                        position="end"
                        onClick={handleClickShowPassword}
                      >
                        <div onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </div>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
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
            ))}

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
            {userManagementAction === UserManagedAction.CREATE_USER && (
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
            )}
            {userManagementAction === UserManagedAction.UPDATE_USER && (
              <Button
                onClick={handleSubmit(onUpdate)}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CheckCircleIcon />}
                disabled={!isValid}
              >
                Update
              </Button>
            )}
             {userManagementAction === UserManagedAction.DELETE_USER && (
              <Button
                onClick={() => setOpenDelete(true)}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CheckCircleIcon />}
                disabled={!isValid}
              >
                DELETE
              </Button>
            )}
          </Grid>
        </Grid>
        <Modal
        open={openDelete}
        onClose={() => {}}
        aria-labelledby="Delete model"
        aria-describedby="Are you sure you want to delete this lead ?"
      >
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
        >
          <Grid size={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this lead ?
            </Typography>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 4, lg: 4, md: 3, sm: 3, xs: 1 }}
          >
            <Button
              onClick={() => onDelete(user?.id)}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Button
              onClick={() => {
                setOpenDelete(false);
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