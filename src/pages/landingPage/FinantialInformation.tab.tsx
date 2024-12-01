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

interface WorkInforamtionTab {
  applicant: number;
  onSubmit: (data: any) => void;
  onValid: (isValid: boolean) => void;
}

const FinantialInformationTab = forwardRef(
  ({ applicant, onSubmit, onValid }: WorkInforamtionTab, ref) => {
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
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          {...register("annualIncome", {
            required: "Annual income (before taxes)",
          })}
          error={!!errors.annualIncome}
          helperText={
            errors.annualIncome ? String(errors.annualIncome.message) : ""
          }
          placeholder={"Annual income (before taxes)"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
              sx: {
                marginTop: "5px",
              },
            },
          }}
        />
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("lengthOfEmployment", {
            required: "Length of employment is required",
          })}
          error={!!errors.lengthOfEmployment}
          helperText={
            errors.lengthOfEmployment
              ? String(errors.lengthOfEmployment.message)
              : ""
          }
          placeholder={"Length of employment"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime />
                </InputAdornment>
              ),
              sx: {
                marginTop: "5px",
              },
            },
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalAmountSaved", {
            required: "Total amount saved is required",
          })}
          error={!!errors.totalAmountSaved}
          helperText={
            errors.totalAmountSaved
              ? String(errors.totalAmountSaved.message)
              : ""
          }
          placeholder={"Total amount saved"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SavingsIcon />
                </InputAdornment>
              ),
              sx: {
                marginTop: "5px",
              },
            },
          }}
        />
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
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalLoanAmount", {
            required: "Total loans amount is required",
          })}
          error={!!errors.totalLoanAmount}
          helperText={
            errors.totalLoanAmount ? String(errors.totalLoanAmount.message) : ""
          }
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total repayment amount per month on any personal loans and car loans*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalLoanRepayments", {
            required: "Total loans repayments is required",
          })}
          error={!!errors.totalLoanRepayments}
          helperText={
            errors.totalLoanRepayments
              ? String(errors.totalLoanRepayments.message)
              : ""
          }
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total balance of any HELP (HECS) debt*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("helpDebtTotalAmount", {
            required: "Total help debt amount is required",
          })}
          error={!!errors.helpDebtTotalAmount}
          helperText={
            errors.helpDebtTotalAmount
              ? String(errors.helpDebtTotalAmount.message)
              : ""
          }
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total balance of any existing home loans*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalExistingHomeLoanAmount", {
            required: "Total existing home loan amount is required",
          })}
          error={!!errors.totalExistingHomeLoanAmount}
          helperText={
            errors.totalExistingHomeLoanAmount
              ? String(errors.totalExistingHomeLoanAmount.message)
              : ""
          }
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total repayment amount per month on any existing home loans*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalExistingHomeRepaymentAmt", {
            required: "Total existing home loan repayment amount is required",
          })}
          error={!!errors.totalExistingHomeRepaymentAmt}
          helperText={
            errors.totalExistingHomeRepaymentAmt
              ? String(errors.totalExistingHomeRepaymentAmt.message)
              : ""
          }
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total estimated value of property currently owned*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalPropertyValue", {
            required: "Total estimated property value is required",
          })}
          error={!!errors.totalPropertyValue}
          helperText={
            errors.totalPropertyValue
              ? String(errors.totalPropertyValue.message)
              : ""
          }
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Total credit card limits*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("totalCreditCardLimits", {
            required: "Total credit card limits is required",
          })}
          error={!!errors.totalCreditCardLimits}
          helperText={
            errors.totalCreditCardLimits
              ? String(errors.totalCreditCardLimits.message)
              : ""
          }
          placeholder={"Total credit card limits"}
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
        <Typography
          sx={{ marginTop: "20px", fontSize: "14px", fontWeight: 700 }}
        >
          Monthly living expenses (excludes rent, personal loans, car loans,
          HECS debt)*
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          {...register("livinExpenses", {
            required: "Living expenses is required",
          })}
          error={!!errors.livinExpenses}
          helperText={
            errors.livinExpenses ? String(errors.livinExpenses.message) : ""
          }
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
                  if (field.value === "yes") {
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
              required: "Defalted reason is required",
            })}
            error={!!errors.defaltedReason}
            helperText={
              errors.defaltedReason ? String(errors.defaltedReason.message) : ""
            }
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
      </>
    );
  }
);
export default FinantialInformationTab;
