import {createMuiTheme} from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    red: {
      light: '#da4c5c',
      main: '#ba2636',
      dark: '#8b1c28',
    },
    yellow: {
      light: '#ecc659',
      main: '#e6b422',
      dark: '#b18914',
    },
    background: {
      default: '#fff',
    },
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
});

export default theme;
