import {
  Box,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const ApplicationFooterComponent: React.FC<any> = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "20px",
        width: "100%",
      }}
    >
      <Grid container size={12}>
        <Grid
          container
          size={{ xl: 4, lg: 4, md: 3, sm: 4, xs: 4 }}
          offset={{ xl: 4, lg: 4, md: 2, sm: 4, xs: 4 }}
        >
          <Grid size={6} offset={3} sx={{ display: "flex" }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                display: { xl: "block", lg: "block", md: "block" },
                whiteSpace: "nowrap",
                marginLeft: "10px",
                textDecoration: "none",
                color: "inherit",
                ":hover": {
                  textDecoration: "none",
                  color: "inherit",
                },
                ":focus": {
                  outline: "none",
                },
              }}
            >
              <span style={{ fontSize: "16px", marginRight: "2px" }}>
                &copy;
              </span>
              Brand. Inc
            </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "none",
                  sm: "none",
                  xs: "none",
                },
                marginLeft: "10px",
                textDecoration: "none",
                color: "inherit",
                ":hover": {
                  textDecoration: "none",
                  color: "inherit",
                },
                ":focus": {
                  outline: "none",
                },
              }}
            >
              <span style={{ fontSize: "16px", marginRight: "2px" }}>•</span>
              Privacy
            </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "none",
                  sm: "none",
                  xs: "none",
                },
                marginLeft: "5px",
                textDecoration: "none",
                color: "inherit",
                ":hover": {
                  textDecoration: "none",
                  color: "inherit",
                },
                ":focus": {
                  outline: "none",
                },
              }}
            >
              <span style={{ fontSize: "16px", marginRight: "2px" }}>•</span>
              Terms
            </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "none",
                  sm: "none",
                  xs: "none",
                },
                marginLeft: "10px",
                textDecoration: "none",
                color: "inherit",
                ":hover": {
                  textDecoration: "none",
                  color: "inherit",
                },
                ":focus": {
                  outline: "none",
                },
              }}
            >
              <span style={{ fontSize: "16px", marginRight: "2px" }}>•</span>
              Sitemap
            </Typography>
          </Grid>
        </Grid>
        <Grid
          size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 4 }}
          sx={{
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
            justifyContent: "end",
            paddingRight: "30px",
            alignItems: "center",
          }}
        >
          <IconButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 1200 1227"
              fill="none"
            >
              <g clipPath="url(#clip0_1_2)">
                <path
                  d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_2">
                  <rect width="1200" height="1227" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
          <IconButton>
            <svg
              data-name="Layer 1"
              id="Layer_1"
              width="16"
              height="16"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224c0,111.8,81.9,204.47,189,221.29V322.12H164.11V257.35H221V208c0-56.13,33.45-87.16,84.61-87.16,24.51,0,50.15,4.38,50.15,4.38v55.13H327.5c-27.81,0-36.51,17.26-36.51,35v42h62.12l-9.92,64.77H291V478.66C398.1,461.85,480,369.18,480,257.35Z"
                fillRule="evenodd"
              />
            </svg>
          </IconButton>
          <IconButton>
            <svg width="16" height="16" viewBox="0 0 512 512">
              <path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-288.985,423.278l0,-225.717l-75.04,0l0,225.717l75.04,0Zm270.539,0l0,-129.439c0,-69.333 -37.018,-101.586 -86.381,-101.586c-39.804,0 -57.634,21.891 -67.617,37.266l0,-31.958l-75.021,0c0.995,21.181 0,225.717 0,225.717l75.02,0l0,-126.056c0,-6.748 0.486,-13.492 2.474,-18.315c5.414,-13.475 17.767,-27.434 38.494,-27.434c27.135,0 38.007,20.707 38.007,51.037l0,120.768l75.024,0Zm-307.552,-334.556c-25.674,0 -42.448,16.879 -42.448,39.002c0,21.658 16.264,39.002 41.455,39.002l0.484,0c26.165,0 42.452,-17.344 42.452,-39.002c-0.485,-22.092 -16.241,-38.954 -41.943,-39.002Z" />
            </svg>
          </IconButton>
          <IconButton>
            <svg width="16" height="16" viewBox="0 0 512 512">
              <path d="M501.303,132.765c-5.887,-22.03 -23.235,-39.377 -45.265,-45.265c-39.932,-10.7 -200.038,-10.7 -200.038,-10.7c0,0 -160.107,0 -200.039,10.7c-22.026,5.888 -39.377,23.235 -45.264,45.265c-10.697,39.928 -10.697,123.238 -10.697,123.238c0,0 0,83.308 10.697,123.232c5.887,22.03 23.238,39.382 45.264,45.269c39.932,10.696 200.039,10.696 200.039,10.696c0,0 160.106,0 200.038,-10.696c22.03,-5.887 39.378,-23.239 45.265,-45.269c10.696,-39.924 10.696,-123.232 10.696,-123.232c0,0 0,-83.31 -10.696,-123.238Zm-296.506,200.039l0,-153.603l133.019,76.802l-133.019,76.801Z" />
            </svg>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
