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
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppSelector } from "../redux/hooks";
import { WorkInformation } from "../redux/application.slice";
import { AustralianState } from "../constants/AustralianState.constant";

interface WorkInformationProps {
  applicant: string;
  onSubmit?: (data: any) => void;
  onValid?: (isValid: boolean) => void;
  readonly?: boolean
}

const WorkInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid, readonly = false }: WorkInformationProps, ref) => {
    const workInformation = useAppSelector(
      (state): WorkInformation | undefined => {
        return state?.loan.application?.[applicant].workInformation;
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
      if (!readonly && onSubmit) {
        handleSubmit(onSubmit)();
      }
    };

    useImperativeHandle(ref, () => ({
      triggerSubmit,
    }));

    useEffect(() => {
      if (!readonly && onValid) {
        onValid(isValid && !!errors);
      }
      
    }, [isValid, errors]);

    return (
      <>
        <FormControl
          fullWidth
          size="small"
          sx={{ marginTop: "20px" }}
          error={Boolean(errors.employmentType)}
        >
          <InputLabel htmlFor="employmentType-label" id="employmentType" shrink>
            Employment type
          </InputLabel>
          <Controller
            name="employmentType"
            control={control}
            disabled = {readonly}
            rules={{ required: "Employment type is required" }}
            render={({ field }) => (
              <Select
                id="employmentType"
                labelId="employmentType-label"
                label="Employment type"
                {...field}
                displayEmpty
                style={{ height: "36px" }}
                onChange={(e) => {
                  clearErrors("employmentType");
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
          {errors.employmentType && (
            <FormHelperText>
              {String(errors.employmentType?.message)}
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          disabled = {readonly}
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
          disabled = {readonly}
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
          disabled = {readonly}
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
          disabled = {readonly}
          label="Employer phone number"
          placeholder={"Employer phone number"}
          {...register("employerPhoneNumber", {
            required: "Employer phone number is required",
            pattern: {
              value: /^(04\d{8}|(02|03|07|08)\d{8})$/,
              message: "Enter valid australian phone number",
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
          disabled = {readonly}
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
          disabled = {readonly}
          label="Australian ABN"
          {...register("employerABN", {
            required: "Australian ABN is required",
            pattern: {
              value: /^\d{11}$/,
              message: "Entered value does not match ABN format",
            },
          })}
          error={!!errors.employerABN}
          helperText={
            errors.employerABN ? String(errors.employerABN.message) : ""
          }
          placeholder={"Australian ABN"}
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
          disabled = {readonly}
          label="Employer Address"
          {...register("employerAddress", {
            required: "Employee address is required",
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
          disabled = {readonly}
          label="Employer suburb"
          {...register("employerSuburb", {
            required: "Employee suburb is required",
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
            disabled = {readonly}
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
                {AustralianState.map((stateObj) => (
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
          disabled = {readonly}
          {...register("employerPostCode", {
            required: "Post code is required",
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
          error={Boolean(errors.currentEmploymentStartDate)}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              defaultValue=""
              name="currentEmploymentStartDate"
              control={control}
              disabled = {readonly}
              rules={{ required: "Employment start date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Employment start date"
                  value={field.value}
                  onChange={(e) => {
                    clearErrors("currentEmploymentStartDate");
                    field.onChange(e);
                  }}
                />
              )}
            />
            {errors.currentEmploymentStartDate && (
              <FormHelperText>
                {String(errors.currentEmploymentStartDate?.message)}
              </FormHelperText>
            )}
          </LocalizationProvider>
        </FormControl>
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Probation
        </Typography>
        <FormControl error={Boolean(errors.probationaryEmployee)}>
          <Controller
            name="probationaryEmployee"
            control={control}
            disabled = {readonly}
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
