import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/';
import './index.css';
import App from './App';
import {RecoilRoot} from 'recoil';
import DebugObserver from "./debug/DebugObserver";
import {adaptV4Theme, createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";

const customTheme = createTheme(adaptV4Theme({
    typography: {
        fontFamily: 'Roboto Condensed'
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#da3301',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#888'
        },
        background: {
            default: '#fff',
        }
    },
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xs: 0,
            sm: 500,
            md: 900,
            lg: 1280,
            xl: 1920
        }
    },
    theme: {
        mixins: {
            toolbar: {
                minHeight: 58
            }
        }
    }
}));

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
        <DebugObserver />
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={customTheme} >
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
