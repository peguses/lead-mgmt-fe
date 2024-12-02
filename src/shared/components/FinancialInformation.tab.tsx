import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AttachMoney, AccessTime } from "@mui/icons-material";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NumericFormat } from "react-number-format";
import { FinancialInformation } from "../redux/application.slice";
import { useAppSelector } from "../redux/hooks";

interface FinancialInformationProps {
  applicant: string;
  onSubmit: (data: any) => void;
  onValid: (isValid: boolean) => void;
  readonly?: boolean
}

const FinancialInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid, readonly = false }: FinancialInformationProps, ref) => {

    const financialInformation = useAppSelector(
      (state): FinancialInformation | undefined => {
        return state?.application?.[applicant].financialInformation;
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
      defaultValues: financialInformation,
    });

    const [hasDefaulted, setHasDefaulted] = useState<boolean>(false);

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
        <FormControl fullWidth error={Boolean(errors.annualIncome)}>
          <Controller
            name="annualIncome"
            control={control}
            rules={{ required: "Annual income (before taxes) is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                variant="outlined"
                size="small"
                disabled={readonly}
                thousandSeparator=","
                decimalScale={2}
                customInput={TextField}
                fullWidth
                label="Annual income (before taxes)"
                error={!!errors.annualIncome}
                placeholder={"Annual income (before taxes)"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          {errors.annualIncome && (
            <FormHelperText>
              {String(errors.annualIncome.message)}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(errors.lengthOfEmployment)}>
          <Controller
            name="lengthOfEmployment"
            control={control}
            rules={{ required: "Length of employment is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                size="small"
                variant="outlined"
                disabled={readonly}
                fullWidth
                label="Length of employment"
                error={!!errors.lengthOfEmployment}
                placeholder={"Length of employment"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime />
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
            )}
          />
          {errors.lengthOfEmployment && (
            <FormHelperText>
              {String(errors.lengthOfEmployment.message)}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(errors.totalAmountSaved)}>
          <Controller
            name="totalAmountSaved"
            control={control}
            rules={{ required: "Total amount saved is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                label="Total amount saved"
                error={!!errors.totalAmountSaved}
                placeholder={"Total amount saved"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SavingsIcon />
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
            )}
          />
          {errors.totalAmountSaved && (
            <FormHelperText>
              {String(errors.totalAmountSaved.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Do you have a Parent willing to go Guarantor?
        </Typography>
        <FormControl error={Boolean(errors.parentWillBeGuarantors)}>
          <Controller
            name="parentWillBeGuarantors"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            disabled={readonly}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="parentWillBeGuarantors"
                onChange={(e) => {
                  clearErrors("parentWillBeGuarantors");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.parentWillBeGuarantors && (
            <FormHelperText>
              {String(errors.parentWillBeGuarantors.message)}
            </FormHelperText>
          )}
        </FormControl>
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          The total balance of any personal loans and car loans*
        </Typography>

        <FormControl fullWidth error={Boolean(errors.totalLoanAmount)}>
          <Controller
            name="totalLoanAmount"
            control={control}
            rules={{ required: "Total loans amount is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                thousandSeparator=","
                decimalScale={2}
                error={!!errors.totalLoanAmount}
                placeholder={"Total loans amount"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.totalLoanAmount && (
            <FormHelperText>
              {String(errors.totalLoanAmount.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total repayment amount per month on any personal loans and car loans*
        </Typography>

        <FormControl fullWidth error={Boolean(errors.totalLoanRepayments)}>
          <Controller
            name="totalLoanRepayments"
            control={control}
            rules={{ required: "Total loans amount is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                disabled={readonly}
                fullWidth
                error={!!errors.totalLoanRepayments}
                placeholder={"Total loans repayments"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.totalLoanRepayments && (
            <FormHelperText>
              {String(errors.totalLoanRepayments.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total balance of any HELP (HECS) debt*
        </Typography>

        <FormControl fullWidth error={Boolean(errors.helpDebtTotalAmount)}>
          <Controller
            name="helpDebtTotalAmount"
            control={control}
            rules={{ required: "Total help debt amount is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                disabled={readonly}
                error={!!errors.helpDebtTotalAmount}
                placeholder={"Total help debt amount"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.helpDebtTotalAmount && (
            <FormHelperText>
              {String(errors.helpDebtTotalAmount.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total balance of any existing home loans*
        </Typography>

        <FormControl
          fullWidth
          error={Boolean(errors.totalExistingHomeLoanAmount)}
        >
          <Controller
            name="totalExistingHomeLoanAmount"
            control={control}
            rules={{ required: "Total existing home loan amount is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                error={!!errors.totalExistingHomeLoanAmount}
                placeholder={"Total existing home loan amount"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.totalExistingHomeLoanAmount && (
            <FormHelperText>
              {String(errors.totalExistingHomeLoanAmount.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total repayment amount per month on any existing home loans*
        </Typography>

        <FormControl
          fullWidth
          error={Boolean(errors.totalExistingHomeLoanRepaymentAmt)}
        >
          <Controller
            name="totalExistingHomeLoanRepaymentAmt"
            control={control}
            rules={{
              required: "Total existing home loan repayment is required",
            }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                error={!!errors.totalExistingHomeLoanRepaymentAmt}
                placeholder={"Total existing home loan repayments"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.totalExistingHomeLoanRepaymentAmt && (
            <FormHelperText>
              {String(errors.totalExistingHomeLoanRepaymentAmt.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total estimated value of property currently owned*
        </Typography>

        <FormControl fullWidth error={Boolean(errors.totalPropertyValue)}>
          <Controller
            name="totalPropertyValue"
            control={control}
            rules={{ required: "Total estimated property value is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                error={!!errors.totalPropertyValue}
                placeholder={"Total estimated property value"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.totalPropertyValue && (
            <FormHelperText>
              {String(errors.totalPropertyValue.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total credit card limits*
        </Typography>

        <FormControl fullWidth error={Boolean(errors.totalCreditCardLimits)}>
          <Controller
            name="totalCreditCardLimits"
            control={control}
            rules={{ required: "Total credit card limit is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                error={!!errors.totalCreditCardLimits}
                placeholder={"Total credit card limit"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.totalCreditCardLimits && (
            <FormHelperText>
              {String(errors.totalCreditCardLimits.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Monthly living expenses (excludes rent, personal loans, car loans,
          HECS debt)*
        </Typography>

        <FormControl fullWidth error={Boolean(errors.livingExpenses)}>
          <Controller
            name="livingExpenses"
            control={control}
            rules={{ required: "Living expenses is required" }}
            render={({ field }) => (
              <NumericFormat
                {...field}
                customInput={TextField}
                thousandSeparator=","
                decimalScale={2}
                variant="outlined"
                size="small"
                fullWidth
                disabled={readonly}
                error={!!errors.livingExpenses}
                placeholder={"Living expenses"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ShoppingCartIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      marginTop: "5px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.livingExpenses && (
            <FormHelperText>
              {String(errors.livingExpenses.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Have you declared bankruptcy in the past 3 years?*
        </Typography>

        <FormControl error={Boolean(errors.wereBankrupted)}>
          <Controller
            name="wereBankrupted"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            disabled={readonly}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="wereBankrupted"
                onChange={(e) => {
                  clearErrors("wereBankrupted");
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.wereBankrupted && (
            <FormHelperText>
              {String(errors.wereBankrupted.message)}
            </FormHelperText>
          )}
        </FormControl>

        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Have you ever had any bad credit history or defaults? If yes, please
          elaborate below.*
        </Typography>

        <FormControl error={Boolean(errors.hasDefaulted)}>
          <Controller
            name="hasDefaulted"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            disabled={readonly}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="hasDefaulted"
                onChange={(e) => {
                  clearErrors("hasDefaulted");
                  setHasDefaulted(false);
                  if (e.target.value === "yes") {
                    setHasDefaulted(true);
                  }
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.hasDefaulted && (
            <FormHelperText>
              {String(errors.hasDefaulted.message)}
            </FormHelperText>
          )}
        </FormControl>
        {hasDefaulted && (
          <TextField
            variant="outlined"
            size="small"
            multiline
            rows={2}
            fullWidth
            disabled={readonly}
            {...register("defaultedReason", {
              required: hasDefaulted,
            })}
            error={!!errors.defaltedReason}
            helperText={
              errors.defaultedReason ? String(errors.defaultedReason.message) : ""
            }
            placeholder={"Credit history or defaults reason"}
          />
        )}
      </>
    );
  }
);
export default FinancialInformationTab;
