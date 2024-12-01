import { AccountCircle, PhoneAndroid } from "@mui/icons-material";
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
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useAppSelector } from "../../shared/redux/hooks";
import { PersonalInformation } from "../../shared/redux/applicant.slice";
import { AustralienState } from "../../shared/constants/AustralienState.constant";

interface PersonalInformationTab {
  applicant: number;
  onSubmit: (data: any) => void;
  onValid: (isValid: boolean) => void;
}

const PersonalInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid }: PersonalInformationTab, ref) => {
    const applicantInformation = useAppSelector(
      (state): PersonalInformation | undefined => {
        return state?.application?.personalInforamtions?.find(
          (app) => app.applicantId === applicant
        );
      }
    );

    const {
      control,
      register,
      handleSubmit,
      formState: { errors, isValid, isDirty },
      clearErrors,
    } = useForm<any>({
      mode: "all",
      defaultValues: applicantInformation,
    });

    const residancyStatus = [
      { code: "AC", name: "Austrailen Citizen" },
      { code: "PR", name: "Permanent Resident" },
    ];

    const investmentTypes = [
      {
        code: "buy_established_home_to_live",
        name: "Buy an established home to live in",
      },
      {
        code: "buy_land_and_build_new_home",
        name: "Buy land and build a new home to live",
      },
      { code: "buy_investment_property", name: "Buy an investment property" },
      {
        code: "refinance_existing_mortgage",
        name: "Refinancing an exsting mortgage",
      },
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Applicant {applicant} Details
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="First Name"
          {...register("firstName", {
            required: "First name is required",
          })}
          error={!!errors.firstName}
          helperText={errors.firstName ? String(errors.firstName.message) : ""}
          placeholder={"First Name"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
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
          label="Last Name"
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
          size="small"
          fullWidth
          label="Mobile"
          placeholder={"Mobile"}
          {...register("mobile", {
            required: "Mobile is required",
            pattern: {
              value: /^(04\d{8}|(02|03|07|08)\d{8})$/,
              message: "Enter valied australien mobile number",
            },
          })}
          error={!!errors.mobile}
          helperText={errors.mobile ? String(errors.mobile.message) : ""}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroid />
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
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            marginTop: "20px",
          }}
          error={Boolean(errors.state)}
        >
          <InputLabel htmlFor="state-label" id="state"  shrink>
            State
          </InputLabel>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <Select
                labelId="state-label"
                id="state"
                label={"State"}
                {...field}
                displayEmpty
                onChange={(e) => {
                  clearErrors("state");
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
          {errors.state && (
            <FormHelperText>{String(errors.state?.message)}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          size="small"
          sx={{ marginTop: "20px" }}
          error={Boolean(errors.residancyStatus)}
        >
          <InputLabel htmlFor="residancyStatus-label" id="residancyStatus" shrink>
            Select Residency Status
          </InputLabel>
          <Controller
            name="residancyStatus"
            control={control}
            defaultValue=""
            rules={{ required: "Residancy status is required" }}
            render={({ field }) => (
              <Select
                id="residancyStatus"
                labelId="residancyStatus-label"
                label="Select Residency Status"
                {...field}
                displayEmpty
                onChange={(e) => {
                  clearErrors("residancyStatus");
                  field.onChange(e);
                }}
              >
                {residancyStatus.map((stateObj) => (
                  <MenuItem key={stateObj.code} value={stateObj.code}>
                    {stateObj.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.residancyStatus && (
            <FormHelperText>
              {String(errors.residancyStatus?.message)}
            </FormHelperText>
          )}
        </FormControl>
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Are you buying a home to live in, an investment property or
          refinanceing an exising mortgage ?
        </Typography>

        <FormControl
          fullWidth
          size="small"
          sx={{ marginTop: "20px" }}
          error={Boolean(errors.investmentType)}
        >
          <InputLabel htmlFor="investmentType-label" id="investmentType" shrink>
            Select Residency Status
          </InputLabel>
          <Controller
            name="investmentType"
            control={control}
            defaultValue=""
            rules={{ required: "Investment type is required" }}
            render={({ field }) => (
              <Select
                id="investmentType"
                labelId="investmentType-label"
                label="Select Residency Status"
                {...field}
                displayEmpty
                onChange={(e) => {
                  clearErrors("investmentType");
                  field.onChange(e);
                }}
              >
                {investmentTypes.map((stateObj) => (
                  <MenuItem key={stateObj.code} value={stateObj.code}>
                    {stateObj.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.investmentType && (
            <FormHelperText>
              {String(errors.investmentType?.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Are you a first time home buyer
        </Typography>

        <FormControl error={Boolean(errors.firstTimeBuyer)}>
          <Controller
            name="firstTimeBuyer"
            control={control}
            rules={{ required: "Please select Yes/No" }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="firstTimeBuyer"
                onChange={(e) => {
                  clearErrors("firstTimeBuyer");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.firstTimeBuyer && (
            <FormHelperText>
              {String(errors.firstTimeBuyer.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Are you planning to buy in a State Capital City(Perth, Adelaide,
          Melbourne, Hobart, Canberra, Sydney or Brisbane) ?
        </Typography>

        <FormControl error={Boolean(errors.stateCapitalCityBuyer)}>
          <Controller
            name="stateCapitalCityBuyer"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="stateCapitalCityBuyer"
                onChange={(e) => {
                  clearErrors("stateCapitalCityBuyer");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.stateCapitalCityBuyer && (
            <FormHelperText>
              {String(errors.stateCapitalCityBuyer.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Would you like to be connected with an Adviser who can find you and
          income protection and/or a life insurance policy suited to your needs
          ?
        </Typography>

        <FormControl error={Boolean(errors.buyerAgreedToConnectWithAgent)}>
          <Controller
            name="buyerAgreedToConnectWithAgent"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="buyerAgreedToConnectWithAgent"
                onChange={(e) => {
                  clearErrors("buyerAgreedToConnectWithAgent");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.buyerAgreedToConnectWithAgent && (
            <FormHelperText>
              {String(errors.buyerAgreedToConnectWithAgent.message)}
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);

export default PersonalInformationTab;
