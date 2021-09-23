/* eslint-disable linebreak-style */
import {createTheme} from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1188,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      'Meiryo',
      '"ヒラギノ角ゴ Pro W3"',
      '"Hiragino Kaku Gothic Pro"',
      'Osaka',
      '"メイリオ"',
      '"ＭＳ Ｐゴシック"',
      '"MS PGothic"',
      'sans-serif',
    ].join(','),
  },
  expanded: {
    borderColor: '#eee0b5',
  },
  palette: {
    text: {
      primary: '#111111',
    },
    red: {
      light: '#da4c5c',
      main: '#ba2636',
      dark: '#8b1c28',
    },
    black: {
      default: '#000000',
      light: '#333333',
    },
    black3: {
      main: '#333333',
    },
    black4: {
      main: '#444444',
    },
    solidBlack: {
      default: '#333333',
    },
    yellow: {
      light: '#ecc659',
      main: '#e6b422',
      dark: '#b18914',
    },
    white: {
      main: '#ffffff',
    },
    grey: {
      light: '#ededed',
      main: '#c4c4c4',
      dark: '#bebebe',
      shadow: '#0000008a',
    },
    gray: {
      light: '#f8f8f8',
      main: '#dbdbdb',
      dark: '#8a8a8a',
    },
    green: {
      main: '#54c0c0',
      dark: '#297070',
    },
    pink: {
      light: '#faf6ef',
    },
    orange: {
      light: '#eee0b5',
    },
    background: {
      default: '#fff',
    },
    body: {
      textColor: '#2e2e2e',
    },
    buttonLogin: {
      default: '#ba2636',
    },
    border: {
      default: '#c4c4c4',
    },
  },
  line: {
    background: '#00c300',
  },
  cardPayment: {
    background: '#faf6ef',
    borderColor: '#dbdbdb',
  },
  boxStep: {
    background: '#f2f2f2',
  },
  boxProduct: {
    background: '#f8f8f8',
  },
  step: {
    one: {
      color: '#ba2636',
    },
    two: {
      color: '#e6b422',
    },
    three: {
      color: '#54c0c0',
    },
  },
  border: {
    default: '#dbdbdb',
  },
  textDisable: {
    default: '#d8d8d8',
  },
  notifications: {
    boxShadow: 'rgba(0, 0, 0, 0.1)',
  },
  blockContact: {
    borderColor: '#d8d8d8',
  },
  divider: {
    dashCorlor: '#da505f',
  },
  topBanner: {
    textColor: '#fff',
  },
  chipItem: {
    borderColor: '#8a8a8a',
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
  btnFollow: {
    backgroundColor: '#E6B422',
    isFollowing: '#54c0c0',
  },
  styledForm: {
    formControl: {
      borderColor: '#bebebe',
      hoveredBorderColor: '#444',
      focusedBorderColor: '#4050b5',
      errorTextColor: '#f44336',
    },
  },
  steppers: {
    textColor: '#8a8a8a',
    bgColor: '#e2e2e2',
    activeTextColor: '#fff',
    activeBgColor: '#54c0c0',
  },
  footer: {
    borderTopColor: '#e3e3e3',
  },
  font: {
    default: 'Meiryo',
  },
  progressBar: {
    color: '#ba2636',
  },
});

export default theme;
