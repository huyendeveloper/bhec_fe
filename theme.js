import {createMuiTheme} from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1188,
      xl: 1920,
    },
  },
  palette: {
    red: {
      light: '#da4c5c',
      main: '#ba2636',
      dark: '#8b1c28',
    },
    black: {
      default: '#000000',
    },
    yellow: {
      light: '#ecc659',
      main: '#e6b422',
      dark: '#b18914',
    },
    black: {
      main: '#000000'
    },
    white: {
      main: '#ffffff'
    },
    grey: {
      light: '#ededed',
      main: '#C4C4C4'
    },
    green: {
      main: '#54c0c0',
    },
    background: {
      default: '#fff'
    },
    body: {
      textColor: '#2e2e2e',
    },
  },
  blockContact: {
    borderColor: '#d8d8d8',
  },
  topBanner: {
    textColor: '#fff',
  },
  selectBox: {
    borderColor: '#444',
    textColor: '#333',
  },
  productWidget: {
    tag: {
      backgroundColor: '#8a8a8a',
      textColor: '#f1f1f1',
      highlightColor: '#54c0c0',
    },
    seller: {
      sepColor: '#f1ebdf',
      textColor: '#000',
    },
  },
  styledForm: {
    formControl: {
      borderColor: '#bebebe',
      hoveredBorderColor: '#444',
      focusedBorderColor: '#4050b5',
      errorTextColor: '#f44336',
    },
  },
  footer: {
    borderTopColor: '#e3e3e3',
  },
});

export default theme;
