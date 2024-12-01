import {
  Alert,
  AlertTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";

interface GeneralInformationProps {
  applicant: number;
  onSubmit: (data: any) => void;
  onValid: (isValid: boolean) => void;
}

const GeneralInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid }: GeneralInformationProps, ref) => {
    const [hasOfferForProperty, setHasOfferForProperty] =
      useState<boolean>(false);

    const {
      control,
      register,
      formState: { errors, isValid },
      clearErrors,
    } = useForm<any>({
      mode: "all",
      defaultValues: {},
    });

    return (
      <>
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Number of dependents between applicants*
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("numberOfDependants", {
            required: "Number of dependant is required",
          })}
          error={!!errors.numberOfDependants}
          helperText={
            errors.numberOfDependants
              ? String(errors.numberOfDependants.message)
              : ""
          }
          placeholder={"Number of dependant"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <GroupIcon />
                </InputAdornment>
              ),
              sx: {
                marginTop: "-10px",
              },
            },
          }}
        />

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Have you already made an offer on a property? If yes, please
          elaborate:*
        </Typography>

        <FormControl sx={{marginTop: "5px"}} error={Boolean(errors.hasPropertyOffer)}>
          <Controller
            name="hasPropertyOffer"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="hasPropertyOffer"
                onChange={(e) => {
                  clearErrors("hasPropertyOffer");
                  setHasOfferForProperty(false);
                  if (e.target.value === "yes") {
                    setHasOfferForProperty(true);
                  }
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.hasPropertyOffer && (
            <FormHelperText>
              {String(errors.hasPropertyOffer.message)}
            </FormHelperText>
          )}
        </FormControl>
        {hasOfferForProperty && (
          <TextField
            variant="outlined"
            size="small"
            multiline
            rows={2}
            fullWidth
            {...register("hasPropertyOfferElaboration", {
              required: hasOfferForProperty,
            })}
            error={!!errors.hasPropertyOfferElaboration}
            helperText={
              errors.hasPropertyOfferElaboration
                ? String(errors.hasPropertyOfferElaboration.message)
                : ""
            }
            placeholder={"Elaborate your offer on property"}
          />
        )}
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Is there anything else about your current situation you would like to
          share?
        </Typography>

        <TextField
          sx={{marginTop: "5px"}}
          variant="outlined"
          size="small"
          multiline
          rows={2}
          fullWidth
          {...register("applicantOptionalNote", {
            required: false,
          })}
          placeholder={"Applicant optional note"}
        />
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          How did you hear about us?*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{marginTop: "5px"}}
          {...register("referalOption", {
            required: "Who refer us to you is required",
          })}
          error={!!errors.referalOption}
          helperText={
            errors.referalOption ? String(errors.referalOption.message) : ""
          }
          placeholder={"How did you hear about us"}
        />

        <Alert
          severity="error"
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          <AlertTitle>Important</AlertTitle>
          It is important for you to know that any information provided to you
          by Fenix Capital is not to be considered Financial or Credit Advice.
          You must read the following Fenix Capital Privacy statement before
          submitting your Enquiry Form to understand how your information is
          used, collected and shared.
        </Alert>
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Are you agree with terms & privacy conditions? *
        </Typography>

        <FormControl error={Boolean(errors.applicantAgreedOnConditions)}>
          <Controller
            name="applicantAgreedOnConditions"
            control={control}
            rules={{ required: "Please select Yes/No" }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="applicantAgreedOnConditions"
                onChange={(e) => {
                  clearErrors("applicantAgreedOnConditions");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.applicantAgreedOnConditions && (
            <FormHelperText>
              {String(errors.applicantAgreedOnConditions.message)}
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);

export default GeneralInformationTab;
