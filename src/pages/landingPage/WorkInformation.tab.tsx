import { AccountCircle } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const WorkInforamtionTab: React.FC<any> = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: {},
  });

  const employmentTypes = [
    { code: "EMPLOYEE", name: "Employee" },
    { code: "SELF_EMPLOYED", name: "Self-Employed" },
    { code: "FULL_TIME", name: "Full Time" },
    { code: "PART_TIME", name: "Part Time" },
    { code: "CASUAL", name: "Casual" },
    { code: "HOME_DUTIES", name: "Home Duties" },
    { code: "OTHER", name: "Other" },
  ];

  return (
    <>
      <FormControl
        fullWidth
        sx={{ marginTop: "20px" }}
        error={Boolean(errors.employementType)}
      >
        <Controller
          name="employementType"
          control={control}
          defaultValue=""
          rules={{ required: "Employement type is requried" }}
          render={({ field }) => (
            <Select
              labelId="employementType-label"
              {...field}
              displayEmpty
              style={{ height: "36px" }}
              onChange={(e) => {
                clearErrors("state");
                field.onChange(e);
              }}
            >
              <MenuItem value="" disabled>
                Employement type
              </MenuItem>
              {employmentTypes.map((stateObj) => (
                <MenuItem key={stateObj.code} value={stateObj.code}>
                  {stateObj.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.state && (
          <FormHelperText>{String(errors.state?.message)}</FormHelperText>
        )}
      </FormControl>

      <TextField
        variant="outlined"
        fullWidth
        {...register("occupation", {
          required: "Occupation is required",
        })}
        error={!!errors.occupation}
        helperText={errors.occupation ? String(errors.occupation.message) : ""}
        placeholder={"Occupation"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <WorkIcon />
              </InputAdornment>
            ),
            sx: {
              height: "36px",
              marginTop: "20px",
            },
          },
        }}
      />

      <TextField
        variant="outlined"
        fullWidth
        {...register("employerContactName", {
          required: "Employer contact name is required",
        })}
        error={!!errors.employerContactName}
        helperText={
          errors.employerContactName
            ? String(errors.employerContactName.message)
            : ""
        }
        placeholder={"Employer contact name"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
            sx: {
              height: "36px",
              marginTop: "20px",
            },
          },
        }}
      />

      <TextField
        variant="outlined"
        fullWidth
        {...register("businessName", {
          required: "Business name is required",
        })}
        error={!!errors.businessName}
        helperText={
          errors.businessName ? String(errors.businessName.message) : ""
        }
        placeholder={"Business name"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
              </InputAdornment>
            ),
            sx: {
              height: "36px",
              marginTop: "20px",
            },
          },
        }}
      />

      <TextField
        variant="outlined"
        fullWidth
        placeholder={"Employer phone number"}
        {...register("employerPhoneNumber", {
          required: "Employer phone number is required",
          pattern: {
            value: /^(04\d{8}|(02|03|07|08)\d{8})$/,
            message: "Enter valied australien phone number",
          },
        })}
        error={!!errors.employerPhoneNumber}
        helperText={
          errors.employerPhoneNumber
            ? String(errors.employerPhoneNumber.message)
            : ""
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
            sx: {
              height: "36px",
              marginTop: "20px",
            },
          },
        }}
      />

      <TextField
        variant="outlined"
        fullWidth
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
              height: "36px",
              marginTop: "20px",
            },
          },
        }}
      />
    </>
  );
};
