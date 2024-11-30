import { FormControl, FormControlLabel, FormHelperText, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { AttachMoney, AccessTime } from "@mui/icons-material";

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
      handleSubmit,
      formState: { errors, isValid },
      clearErrors,
    } = useForm<any>({
      mode: "all",
      defaultValues: {},
    });

    return (
      <>
        <TextField
          variant="outlined"
          label="Annual income (before taxes)"
          fullWidth
          margin="normal"
          {...register("annualIncome", {
            required: "Annual income (before taxes)",
          })}
          error={!!errors.annualIncome}
          helperText={
            errors.annualIncome ? String(errors.annualIncome.message) : ""
          }
          placeholder={"Annual income (before taxes) is required"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
              sx: {
                height: "36px",
                marginTop: "20px",
                ".MuiInputLabel-outlined": {
                    lineHeight: "4em"
                }
              },
            },
          }}
          sx={{
            ".MuiInputLabel-outlined": {
                    lineHeight: "70px"
            }
          }}
        />

        <TextField
          variant="outlined"
          id="outlined-required"
          label="Length of employment"
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
                height: "36px",
                marginTop: "20px",
              },
            },
          }}
          sx={{
            ".MuiInputLabel-outlined": {
                    lineHeight: "70px"
            }
          }}
        />

        <TextField
          variant="outlined"
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
                  <AccessTime />
                </InputAdornment>
              ),
              sx: {
                height: "36px",
                marginTop: "20px",
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
      </>
    );
  }
);
export default FinantialInformationTab;
