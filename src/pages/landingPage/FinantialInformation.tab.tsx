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
import { forwardRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AttachMoney, AccessTime } from "@mui/icons-material";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";

interface FinantialInformationProps {
  applicant: number;
  onSubmit: (data: any) => void;
  onValid: (isValid: boolean) => void;
}

const FinantialInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid }: FinantialInformationProps, ref) => {
    const {
      control,
      register,
      formState: { errors, isValid },
      clearErrors,
    } = useForm<any>({
      mode: "all",
      defaultValues: {},
    });

    const [hasDefalted, setHasDefalted] = useState<boolean>(false);

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

        <FormControl fullWidth error={Boolean(errors.livinExpenses)}>
          <Controller
            name="livinExpenses"
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
                error={!!errors.livinExpenses}
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
          {errors.livinExpenses && (
            <FormHelperText>
              {String(errors.livinExpenses.message)}
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

        <FormControl error={Boolean(errors.hasDefalted)}>
          <Controller
            name="hasDefalted"
            control={control}
            rules={{ required: "Please select Yes/No" }} // Validation rule
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                defaultValue=""
                name="hasDefalted"
                onChange={(e) => {
                  clearErrors("hasDefalted");
                  console.log(field.value);
                  setHasDefalted(false);
                  if (e.target.value === "yes") {
                    setHasDefalted(true);
                  }
                  field.onChange(e);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          {errors.hasDefalted && (
            <FormHelperText>
              {String(errors.hasDefalted.message)}
            </FormHelperText>
          )}
        </FormControl>
        {hasDefalted && (
          <TextField
            variant="outlined"
            size="small"
            multiline
            rows={2}
            fullWidth
            {...register("defaltedReason", {
              required: hasDefalted,
            })}
            error={!!errors.defaltedReason}
            helperText={
              errors.defaltedReason ? String(errors.defaltedReason.message) : ""
            }
            placeholder={"Credit history or defaults reason"}
          />
        )}
      </>
    );
  }
);
export default FinantialInformationTab;
