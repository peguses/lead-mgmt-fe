import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./shared/redux/store";
import { createTheme, ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-disabled.Mui-checked': {
            color: '#0d0d1a'
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },

    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input.Mui-disabled": {
            fontWeight: 700,
            color: "#0d0d1a",
            "-webkit-text-fill-color": "#0d0d1a",
            marginTop:"5px"
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiSelect-filled.Mui-disabled": {
            fontWeight: 700,
            color: "#0d0d1a",
            "-webkit-text-fill-color": "#0d0d1a",
             marginTop:"5px"
          },
        },
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
