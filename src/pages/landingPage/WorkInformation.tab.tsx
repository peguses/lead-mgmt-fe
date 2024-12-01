import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Business, LocationOn, MailOutline } from "@mui/icons-material";
import { AustralienState } from "../../shared/constants/AustralienState.constant";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppSelector } from "../../shared/redux/hooks";
import { WorkInformation } from "../../shared/redux/applicant.slice";

interface WorkInforamtionTab {
  applicant: number;
  onSubmit: (data: any) => void;
  onValid: (isValid: boolean) => void;
}

const WorkInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid }: WorkInforamtionTab, ref) => {
    const workInformation = useAppSelector(
      (state): WorkInformation | undefined => {
        return state?.application?.workInformations?.find(
          (app) => app.applicantId === applicant
        );
      }
    );

    const {
      control,
      register,
      handleSubmit,
      formState: { errors, isValid },
      clearErrors,
    } = useForm<any>({
      mode: "all",
      defaultValues: workInformation,
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

    const triggerSubmit = () => {
      handleSubmit(onSubmit)();
    };

    useImperativeHandle(ref, () => ({
      triggerSubmit,
    }));

    useEffect(() => {
      onValid(isValid && !!errors);
    }, [isValid, errors]);

    return (
      <>
        <FormControl
          fullWidth
          size="small"
          sx={{ marginTop: "20px" }}
          error={Boolean(errors.employementType)}
        >
          <InputLabel htmlFor="employementType-label" id="employementType">
            Employement type
          </InputLabel>
          <Controller
            name="employementType"
            control={control}
            defaultValue=""
            rules={{ required: "Employement type is requried" }}
            render={({ field }) => (
              <Select
                id="employementType"
                labelId="employementType-label"
                label="Employement type"
                {...field}
                displayEmpty
                style={{ height: "36px" }}
                onChange={(e) => {
                  clearErrors("state");
                  field.onChange(e);
                }}
              >
                {employmentTypes.map((stateObj) => (
                  <MenuItem key={stateObj.code} value={stateObj.code}>
                    {stateObj.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.employementType && (
            <FormHelperText>
              {String(errors.employementType?.message)}
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          variant="outlined"
          fullWidth
           size="small"
          label="Occupation"
          {...register("occupation", {
            required: "Occupation is required",
          })}
          error={!!errors.occupation}
          helperText={
            errors.occupation ? String(errors.occupation.message) : ""
          }
          placeholder={"Occupation"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
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

        <TextField
          variant="outlined"
          fullWidth
           size="small"
          label="Employer contact name"
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

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label="Business name"
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

        <TextField
          variant="outlined"
          fullWidth
           size="small"
          label="Employer phone number"
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

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label="Email"
          {...register("employerEmail", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          error={!!errors.employerEmail}
          helperText={
            errors.employerEmail ? String(errors?.employerEmail.message) : ""
          }
          placeholder={"Email"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
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

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label="Australien ABN"
          {...register("employerABN", {
            required: "Australien ABN is required",
            pattern: {
              value: /^\d{11}$/,
              message: "Entered value does not match ABN format",
            },
          })}
          error={!!errors.employerABN}
          helperText={
            errors.employerABN ? String(errors.employerABN.message) : ""
          }
          placeholder={"Australien ABN"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Business />
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

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label="Employer Address"
          {...register("employerAddress", {
            required: "Employee address is requried",
          })}
          error={!!errors.employerAddress}
          helperText={
            errors.employerAddress ? String(errors.employerAddress.message) : ""
          }
          placeholder={"Employer Address"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
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

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label="Employer suburb"
          {...register("employerSuburb", {
            required: "Employee suburb is requried",
          })}
          error={!!errors.employerSuburb}
          helperText={
            errors.employerSuburb ? String(errors.employerSuburb.message) : ""
          }
          placeholder={"Employer suburb"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon />
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
        <FormControl
          fullWidth
          size="small"
          sx={{ marginTop: "20px" }}
          error={Boolean(errors.employerState)}
        >
          <InputLabel htmlFor="employerState-label" id="employerState" shrink>
            Employer State
          </InputLabel>
          <Controller
            name="employerState"
            control={control}
            defaultValue=""
            rules={{ required: "Employer state is required" }}
            render={({ field }) => (
              <Select
                labelId="employerState-label"
                id="employerState"
                label = "Employer State"
                {...field}
                displayEmpty
                style={{ height: "36px" }}
                onChange={(e) => {
                  clearErrors("employerState");
                  field.onChange(e);
                }}
              >
                {AustralienState.map((stateObj) => (
                  <MenuItem key={stateObj.code} value={stateObj.code}>
                    {stateObj.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.employerState && (
            <FormHelperText>
              {String(errors.employerState?.message)}
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          {...register("employerPostCode", {
            required: "Post code is requried",
          })}
          error={!!errors.employerPostCode}
          helperText={
            errors.employerPostCode
              ? String(errors.employerPostCode.message)
              : ""
          }
          placeholder={"Post code"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
              sx: {
                marginTop: "20px",
              },
            },
          }}
        />
        <FormControl
          fullWidth
          size="small"
          sx={{ marginTop: "20px" }}
          error={Boolean(errors.currentEmployementStartDate)}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              defaultValue=""
              name="currentEmployementStartDate"
              control={control}
              rules={{ required: "Employement start date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Employement start date"
                  value={field.value}
                  onChange={(e) => {
                    clearErrors("currentEmployementStartDate");
                    field.onChange(e);
                  }}
                />
              )}
            />
            {errors.currentEmployementStartDate && (
              <FormHelperText>
                {String(errors.currentEmployementStartDate?.message)}
              </FormHelperText>
            )}
          </LocalizationProvider>
        </FormControl>
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Probaton
        </Typography>
        <FormControl error={Boolean(errors.probationaryEmployee)}>
          <Controller
            name="probationaryEmployee"
            control={control}
            rules={{ required: "Please select Yes/No" }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="probationaryEmployee"
                onChange={(e) => {
                  clearErrors("probationaryEmployee");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.probationaryEmployee && (
            <FormHelperText>
              {String(errors.probationaryEmployee.message)}
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);
export default WorkInformationTab;
