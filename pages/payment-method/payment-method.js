import {Container, Grid, Typography, Icon, Snackbar, useMediaQuery} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';

import {DefaultLayout} from '~/components/Layouts';
import {ContentBlock} from '~/components';
import {PaymentService} from '~/services';
const Payment = new PaymentService();
import {PaymentWidget} from '~/components/Widgets';
import {DeletePaymentPopup, PaymentPopup} from '~/components/Payment';
import {userState} from '~/store/userState';
import {loadingState} from '~/store/loadingState';

const useStyles = makeStyles((theme) => ({
  content: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '21px',
    fontSize: '16px',
    color: theme.palette.black.default,
  },

  labelPayment: {
    display: 'flex',
  },
  icon: {
    width: '0.5rem',
    height: '2rem',
    background: theme.palette.red.main,
    borderRadius: '0.15rem',
    marginRight: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      height: '1.5rem',
    },
  },
  title: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: theme.palette.solidBlack.default,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.815rem',
      lineHeight: '1.1815rem',
    },
  },

  divAddPayment: {
    border: `1px solid ${theme.palette.solidBlack.default}`,
    boxSizing: 'border-box',
    borderRadius: '4px',
    maxWidth: '22rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },

  divAdd: {
    display: 'flex',
    alignItems: 'center',
  },
  icAdd: {
    marginRight: '0.5rem',
  },
  labelAdd: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    lineHeight: '2rem',
    color: theme.palette.solidBlack.default,
  },
  note: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.7rem',
    lineHeight: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    color: theme.chipItem.borderColor,
  },
  divBankAccount: {
    width: '100%',
    border: `1px solid ${theme.styledForm.formControl.borderColor}`,
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: '1rem',
    marginTop: '1rem',
  },
  gridBank: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    borderBottom: 'none',
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '&:hover .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '&:focus .MuiInput-underline:before': {
      borderBottom: 'none',
    },
  },
  active: {
    '& .MuiInputBase-input': {
      border: `1px solid ${theme.styledForm.formControl.borderColor}`,
      boxSizing: 'border-box',
      borderRadius: '4px',
      padding: '0.5rem',
      height: '2rem',
      color: theme.chipItem.borderColor,
      fontSize: '0.8rem',
    },
  },
  disabled: {
    color: 'black',
    borderBottom: 'none',
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '&:hover .MuiInput-underline:before': {
      borderBottom: 'none',
    },
  },
}));

function PaymentMethod() {
  const classes = useStyles();
  const router = useRouter();

  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [listPayment, setListPayment] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [idRemove, setIdRemove] = useState(null);
  const [message, setMessage] = useState();
  const [openMess, setOpenMess] = useState(false);
  const [typeMess, setTypeMess] = useState('success');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const widthBtn = isMobile ? '224px' : (isTablet ? '224px' : '364px');

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      getListCard();
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const getListCard = async () => {
    setLoading(true);
    const res = await Payment.getCards();
    if (res && res.cards && res.cards.length) {
      setLoading(false);
      setListPayment(res.cards);
    } else {
      setLoading(false);
      setListPayment([]);
    }
  };

  const openPopupDelete = (id) => {
    setIdRemove(id);
    setOpenDeletePopup(true);
  };

  const openPopupUpdate = (data) => {
    if (data) {
      setDataUpdate(data);
    } else {
      setDataUpdate({});
    }
    setOpenUpdatePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
  };

  const createPaymentSuccess = () => {
    setTypeMess('success');
    setOpenMess(true);
    setMessage('??????????????????????????????????????????!');
    getListCard();
  };

  const actionFinish = (status) => {
    if (status === 'success') {
      setTypeMess('success');
      setOpenMess(true);
      setMessage('??????????????????????????????????????????!');
      getListCard();
    } else {
      setTypeMess('error');
      setOpenMess(true);
      setMessage('?????????????????????????????????????????????????????????????????????????????????????????????!');
    }
  };

  const handleCloseMess = () => {
    setOpenMess(false);
  };

  return (
    <DefaultLayout title='??????????????????'>
      {isAuthenticated && (
        <div className={classes.root}>
          <div
            className='content'
            style={{marginBottom: '3rem'}}
          >
            <ContentBlock title='??????????????????'>
              <Container maxWidth='lg'>
                <Grid
                  container={true}
                  spacing={3}
                >
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.labelPayment}>
                      <div className={classes.icon}/>
                      <Typography
                        gutterBottom={true}
                        component='h3'
                        className={classes.title}
                      >
                        {'????????????????????????'}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <PaymentWidget
                      data={listPayment}
                      openPopupDelete={openPopupDelete}
                      openPopupUpdate={openPopupUpdate}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div
                      className={classes.divAddPayment}
                      onClick={() => openPopupUpdate()}
                    >
                      <div className={classes.divAdd}>
                        <Icon className={classes.icAdd}>{'add_box'}</Icon>
                        <span className={classes.labelAdd}>{'??????????????????????????????????????????'}</span>
                      </div>
                      <div className={classes.note}>{'?????????????????????????????????????????????????????????????????????'}</div>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </ContentBlock>
          </div>
          {openUpdatePopup && (
            <PaymentPopup
              open={openUpdatePopup}
              onClose={handleCloseUpdatePopup}
              style={{width: '80%'}}
              onSubmit={createPaymentSuccess}
              dataUpdate={dataUpdate}
              widthBtn={widthBtn}
            />
          )}
          {openDeletePopup && (
            <DeletePaymentPopup
              open={openDeletePopup}
              handleClose={handleCloseDeletePopup}
              style={{width: '80%'}}
              idRemove={idRemove}
              actionFinish={actionFinish}
            />
          )}
        </div>
      )}
      <Snackbar
        open={openMess}
        autoHideDuration={3000}
        onClose={handleCloseMess}
        elevation={6}
        variant='filled'
      >
        <MuiAlert
          onClose={handleCloseMess}
          severity={typeMess}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </DefaultLayout>
  );
}

export default PaymentMethod;
