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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import GroupIcon from "@mui/icons-material/Group";
import { GeneralInformation } from "../redux/application.slice";
import { useAppSelector } from "../redux/hooks";
import React from "react";
import { NumericFormatWrapper } from "./NumericFormatWrapper";

interface GeneralInformationProps {
  onState?: (data: any) => void;
  stateNotification?: string;
  onSubmit?: (data: any) => void;
  nextNotification?: string;
  allowNext?: (allow: boolean) => void;
  alert: string | undefined;
  readonly?: boolean;

}

const GeneralInformationTab: React.FC<GeneralInformationProps> = ({
  onState,
  stateNotification,
  onSubmit,
  readonly = false,
  nextNotification,
  allowNext,
  alert,
}: GeneralInformationProps) => {
  const [hasOfferForProperty, setHasOfferForProperty] =
    useState<boolean>(false);

  const [hasAcceptAgreement, setHasAcceptAgreement] = useState<boolean>(false);

  const generalInformation = useAppSelector(
    (state): GeneralInformation | undefined =>
      state?.managedApplication.application?.generalInformation
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "onSubmit",
    defaultValues: generalInformation
      ? {
          ...generalInformation,
          hasPropertyOffer: generalInformation.hasPropertyOffer
            ? "true"
            : "false",
          applicantAgreedOnConditions: generalInformation.applicantAgreedOnConditions
            ? "true"
            : "false",
        }
      : {
          numberOfDependant: "",
          hasPropertyOffer: false,
          propertyOfferElaboration: "",
          applicantOptionalNote: "",
          referralOption: "",
          applicantAgreedOnConditions: false,
        },
  });

  const transformData = (data: any): GeneralInformation => {
    return {
      ...data,
      hasPropertyOffer: data.hasPropertyOffer === "true" ? true : false,
      applicantAgreedOnConditions:
        data.applicantAgreedOnConditions === "true" ? true : false,
      numberOfDependant: data?.numberOfDependant
        ? parseFloat(String(data?.numberOfDependant)?.replace(/,/g, ""))
        : 0,
    };
  };

  useEffect(() => {
    if (allowNext) allowNext(isValid);
  }, [isValid]);

  useEffect(() => {
    if (!readonly && onSubmit && nextNotification !== "1") {
      handleSubmit((data) => {
        onSubmit(transformData(data));
      })();
    }
  }, [nextNotification]);

  useEffect(() => {
    if (!readonly && onState && stateNotification !== "1") {
      handleSubmit((data) => {
        onState(transformData(data));
      })();
    }
  }, [stateNotification]);

  useEffect(() => {
    setHasOfferForProperty(generalInformation?.hasPropertyOffer || false);
    setHasAcceptAgreement(
      generalInformation?.applicantAgreedOnConditions || false
    );
  }, [generalInformation]);

  return (
    <>
      {alert && (
        <Alert
          severity="error"
          sx={{
            marginTop: "20px",
            marginBottom: "10px",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          <AlertTitle>Important</AlertTitle>
          {alert}
        </Alert>
      )}
      <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
        Number of dependents between applicants*
      </Typography>
      <FormControl fullWidth error={Boolean(errors.numberOfDependant)}>
        <Controller
          name="numberOfDependant"
          control={control}
          rules={{ required: "Number of dependant is required" }}
          render={({ field }) => (
            <NumericFormatWrapper
              {...field}
              variant={readonly ? "filled" : "outlined"}
              size="small"
              decimalScale={0}
              customInput={TextField}
              disabled={readonly}
              error={!!errors.numberOfDependant}
              placeholder={"Number of dependant"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        {errors.numberOfDependant && (
          <FormHelperText>
            {String(errors.numberOfDependant.message)}
          </FormHelperText>
        )}
      </FormControl>

      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Have you already made an offer on a property? If yes, please elaborate:*
      </Typography>

      <FormControl
        sx={{ marginTop: "5px" }}
        error={Boolean(errors.hasPropertyOffer)}
      >
        <Controller
          name="hasPropertyOffer"
          control={control}
          disabled={readonly}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              defaultValue={generalInformation?.hasPropertyOffer ? "true" : "false"}
              name="hasPropertyOffer"
              onChange={(e: any) => {
                clearErrors("hasPropertyOffer");
                setHasOfferForProperty(false);
                if (e.target.value === "true") {
                  setHasOfferForProperty(true);
                }
                field.onChange(e);
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio disabled={readonly} />}
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={readonly} />}
                label="No"
              />
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
          variant={readonly ? "filled" : "outlined"}
          size="small"
          multiline
          rows={2}
          fullWidth
          disabled={readonly}
          {...register("propertyOfferElaboration", {
            required: hasOfferForProperty
              ? "property offer elaboration required"
              : false,
          })}
          error={!!errors.propertyOfferElaboration}
          helperText={
            errors.propertyOfferElaboration
              ? String(errors.propertyOfferElaboration.message)
              : ""
          }
          placeholder={"Elaborate your offer on property"}
        />
      )}
      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Is there anything else about your current situation you would like to
        share?
      </Typography>

      <TextField
        sx={{ marginTop: "5px" }}
        size="small"
        multiline
        rows={2}
        variant={readonly ? "filled" : "outlined"}
        fullWidth
        disabled={readonly}
        {...register("applicantOptionalNote", {
          required: false,
        })}
        placeholder={"Applicant optional note"}
      />

      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        How did you hear about us?*
      </Typography>
      <TextField
        variant={readonly ? "filled" : "outlined"}
        size="small"
        fullWidth
        disabled={readonly}
        sx={{ marginTop: "5px" }}
        {...register("referralOption", {
          required: "Who refer us to you is required",
        })}
        error={!!errors.referralOption}
        helperText={
          errors.referralOption ? String(errors.referralOption.message) : ""
        }
        placeholder={"How did you hear about us"}
      />

      <Alert
        severity="info"
        sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
      >
        <AlertTitle>Important</AlertTitle>
        It is important for you to know that any information provided to you by
        Fenix Capital is not to be considered Financial or Credit Advice. You
        must read the following Fenix Capital Privacy statement before
        submitting your Enquiry Form to understand how your information is used,
        collected and shared.
      </Alert>
      <Typography sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}>
        Are you agree with terms & privacy conditions? *
      </Typography>

      <FormControl error={Boolean(errors.applicantAgreedOnConditions)}>
        <Controller
          name="applicantAgreedOnConditions"
          control={control}
          rules={{ required: "Please select Yes/No" }}
          disabled={readonly}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              defaultValue={generalInformation?.applicantAgreedOnConditions ? "true" : "false"}
              name="applicantAgreedOnConditions"
              onChange={(e) => {
                clearErrors("applicantAgreedOnConditions");
                field.onChange(e);
                setHasAcceptAgreement(false);
                if (e.target.value === "true") {
                  setHasAcceptAgreement(true);
                }
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio disabled={readonly} />}
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={true} />}
                label="No"
              />
            </RadioGroup>
          )}
        />
        {errors.applicantsAgreedOnConditions && (
          <FormHelperText>
            {String(errors.applicantsAgreedOnConditions.message)}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default GeneralInformationTab;
