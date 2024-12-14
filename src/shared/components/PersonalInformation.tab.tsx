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
import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { PersonalInformation } from "../redux/application.slice";
import { AustralianState } from "../constants/AustralianState.constant";

interface PersonalInformationProps {
  applicant: string;
  onSubmit?: (data: any) => void;
  readonly?: boolean;
  nextNotification?: string
  allowNext?: (allow: boolean) => void
}

const PersonalInformationTab: React.FC<PersonalInformationProps> = ({
  applicant,
  onSubmit,
  readonly = false,
  nextNotification,
  allowNext
}: PersonalInformationProps) => {
  
  const applicantInformation = useAppSelector(
    (state): PersonalInformation | undefined => {
      return state?.managedApplication?.application?.[applicant]
        ?.personalInformation;
    }
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "onSubmit",
    defaultValues: applicantInformation
      ? applicantInformation
      : {
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          state: "",
          residencyStatus: "",
          investmentType: "",
          firstTimeBuyer: '',
          stateCapitalCityBuyer: false,
          buyerAgreedToConnectWithAgent: false,
        },
  });

  useEffect(() => {
    if (allowNext) allowNext(isValid);
  }, [isValid]);

  const residencyStatus = [
    { code: "AC", name: "Australian Citizen" },
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
      name: "Refinancing an existing mortgage",
    },
  ];

  const applicantText = (code: string) => {
    return code === "primaryApplicant"
      ? "primary applicant"
      : "secondary applicant";
  };

  const transformData = (data: any): PersonalInformation => {

    return {
      ...data,
        firstTimeBuyer: data.firstTimeBuyer === undefined ? false : true,
        stateCapitalCityBuyer:
          data.stateCapitalCityBuyer === undefined ? false : true,
        buyerAgreedToConnectWithAgent:
          data.buyerAgreedToConnectWithAgent === undefined ? false : true,
    }
  }


  useEffect(() => {
    if (!readonly && onSubmit && nextNotification!== "1") {
      handleSubmit((data) => { onSubmit(transformData(data))})()
    }
  }, [nextNotification])

  return (
    <>
      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Applicant {applicantText(applicant)} details
      </Typography>
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
        size="small"
        fullWidth
        label="Mobile"
        disabled={readonly}
        placeholder={"Mobile"}
        {...register("mobile", {
          required: "Mobile is required",
          pattern: {
            value: /^(04\d{8}|(02|03|07|08)\d{8})$/,
            message: "Enter valid australian mobile number",
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
        size="small"
        fullWidth
        sx={{
          marginTop: !readonly ? "20px" : "",
        }}
        error={Boolean(errors.state)}
      >
        <InputLabel htmlFor="state-label" id="state" shrink>
          State
        </InputLabel>
        <Controller
          name="state"
          control={control}
          disabled={readonly}
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
              {AustralianState.map((stateObj) => (
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
        variant={readonly ? "filled" : "outlined"}
        fullWidth
        size="small"
        sx={{ marginTop: !readonly ? "20px" : "" }}
        error={Boolean(errors.residencyStatus)}
      >
        <InputLabel htmlFor="residencyStatus-label" id="residencyStatus" shrink>
          Residency Status
        </InputLabel>
        <Controller
          name="residencyStatus"
          control={control}
          disabled={readonly}
          rules={{ required: "Residency status is required" }}
          render={({ field }) => (
            <Select
              id="residencyStatus"
              labelId="residencyStatus-label"
              label="Residency Status"
              {...field}
              displayEmpty
              onChange={(e) => {
                clearErrors("residencyStatus");
                field.onChange(e);
              }}
            >
              {residencyStatus.map((stateObj) => (
                <MenuItem key={stateObj.code} value={stateObj.code}>
                  {stateObj.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.residencyStatus && (
          <FormHelperText>
            {String(errors.residencyStatus?.message)}
          </FormHelperText>
        )}
      </FormControl>
      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Are you buying a home to live in, an investment property or refinancing
        an existing mortgage ?
      </Typography>

      <FormControl
        variant={readonly ? "filled" : "outlined"}
        fullWidth
        size="small"
        sx={{ marginTop: "20px" }}
        error={Boolean(errors.investmentType)}
      >
        <Controller
          name="investmentType"
          control={control}
          disabled={readonly}
          rules={{ required: "Investment type is required" }}
          render={({ field }) => (
            <Select
              id="investmentType"
              labelId="investmentType-label"
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

      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Are you a first time home buyer
      </Typography>

      <FormControl error={Boolean(errors.firstTimeBuyer)}>
        <Controller
          name="firstTimeBuyer"
          control={control}
          disabled={readonly}
          rules={{ required: "Please select Yes/No" }}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              name="firstTimeBuyer"
              defaultValue={true}
              onChange={(e) => {
                clearErrors("firstTimeBuyer");
                field.onChange(e);
              }}
            >
              <FormControlLabel
                value={true}
                control={
                  readonly ? (
                    <Radio
                      checked={applicantInformation?.firstTimeBuyer}
                      disabled={true}
                    />
                  ) : (
                    <Radio />
                  )
                }
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={
                  readonly ? (
                    <Radio
                      checked={!applicantInformation?.firstTimeBuyer}
                      disabled={true}
                    />
                  ) : (
                    <Radio />
                  )
                }
                label="No"
              />
            </RadioGroup>
          )}
        />
        {errors.firstTimeBuyer && (
          <FormHelperText>
            {String(errors.firstTimeBuyer.message)}
          </FormHelperText>
        )}
      </FormControl>

      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Are you planning to buy in a State Capital City(Perth, Adelaide,
        Melbourne, Hobart, Canberra, Sydney or Brisbane) ?
      </Typography>

      <FormControl error={Boolean(errors.stateCapitalCityBuyer)}>
        <Controller
          name="stateCapitalCityBuyer"
          control={control}
          disabled={readonly}

          rules={{ required: "Please select Yes/No" }} // Validation rule
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              defaultValue={false}
              name="stateCapitalCityBuyer"
              onChange={(e) => {
                clearErrors("stateCapitalCityBuyer");
                field.onChange(e);
              }}
            >
              <FormControlLabel
                value={true}
                control={
                  readonly ? (
                    <Radio
                      checked={
                        applicantInformation?.stateCapitalCityBuyer === true
                      }
                      disabled={true}
                    />
                  ) : (
                    <Radio />
                  )
                }
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={
                  readonly ? (
                    <Radio
                      checked={
                        !applicantInformation?.stateCapitalCityBuyer === false
                      }
                      disabled={true}
                    />
                  ) : (
                    <Radio />
                  )
                }
                label="No"
              />
            </RadioGroup>
          )}
        />
        {errors.stateCapitalCityBuyer && (
          <FormHelperText>
            {String(errors.stateCapitalCityBuyer.message)}
          </FormHelperText>
        )}
      </FormControl>

      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Would you like to be connected with an Adviser who can find you and
        income protection and/or a life insurance policy suited to your needs ?
      </Typography>

      <FormControl error={Boolean(errors.buyerAgreedToConnectWithAgent)}>
        <Controller
          name="buyerAgreedToConnectWithAgent"
          control={control}
          rules={{ required: "Please select Yes/No" }}
          disabled={readonly}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              defaultValue={false}
              name="buyerAgreedToConnectWithAgent"
              onChange={(e) => {
                clearErrors("buyerAgreedToConnectWithAgent");
                field.onChange(e);
              }}
            >
              <FormControlLabel
                value={true}
                control={
                  readonly ? (
                    <Radio
                      checked={
                        applicantInformation?.buyerAgreedToConnectWithAgent
                      }
                      disabled={true}
                    />
                  ) : (
                    <Radio/>
                  )
                }
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={
                  readonly ? (
                    <Radio
                      checked={
                        !applicantInformation?.buyerAgreedToConnectWithAgent
                      }
                      disabled={true}
                    />
                  ) : (
                    <Radio />
                  )
                }
                label="No"
              />
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
};

export default PersonalInformationTab;
