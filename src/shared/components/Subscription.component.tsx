import {
  Box,
  Button,
  Grid2 as Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useAppSelector } from "../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

export const SubscriptionComponent: React.FC<any> = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const viewPort = useAppSelector((state: any) => {
    return state.common.viewPort;
  });

  return (
    <Grid container spacing={0} sx={{ flexGrow: 1 }}>
      <Grid
        size={12}
        offset={{ xl: viewPort?.menuOpen ? 4 : 5, lg: 4, md: 4, sm: 3, xs: 2 }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Subscribe to our newslatter
        </Typography>
      </Grid>
      <Grid
        container
        size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
        sx={{ marginTop: "20px" }}
      >
        <Grid size={{ xl: 12, lg: 12 }} offset={{ xl: 5, lg: 4, md: 2 }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder={"Input your email"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
                sx: {
                  height: "36px",
                  marginTop: "20px",
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
        sx={{ marginTop: "20px" }}
      >
        <Grid size={{ xl: 12, lg: 12 }} offset={{ xl: 5, lg: 4, md: 2 }}>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Subscribe
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ xl: 4, lg: 4, md: 6, sm: 12, xs: 12 }}
        sx={{ marginTop: "20px" }}
        offset={{ xl: 2, lg: 2 }}
      >
        <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }}>
          <Box sx={{ fontSize: "16px", fontWeight: 700, marginTop: "20px" }}>
            Product
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Features
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Pricing
          </Box>
        </Grid>
        <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }}>
          <Box sx={{ fontSize: "16px", fontWeight: 700, marginTop: "20px" }}>
            Resources
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Blog
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            User guides
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Webinars
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ xl: 4, lg: 4, md: 6, sm: 12, xs: 12 }}
        sx={{ marginTop: "20px" }}
      >
        <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }}>
          <Box sx={{ fontSize: "16px", fontWeight: 700, marginTop: "20px" }}>
            Company
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            About us
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Contact us
          </Box>
        </Grid>
        <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }}>
          <Box sx={{ fontSize: "16px", fontWeight: 700, marginTop: "20px" }}>
            Planing & Pricing
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Personal
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Start up
          </Box>
          <Box sx={{ fontSize: "14px", fontWeight: 400, marginTop: "20px" }}>
            Organization
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
