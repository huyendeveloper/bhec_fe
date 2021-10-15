import {Box, Grid, Icon} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';
import Image from 'next/image';
import clsx from 'clsx';
import produce from 'immer';
import Swal from 'sweetalert2';

import {AlertMessageForSection, Button, ContentBlock, DeliveryForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {DialogWidget} from '~/components/Widgets';
import {httpStatus} from '~/constants';
import {CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

const useStyles = makeStyles((theme) => ({
  addresses: {
    marginBottom: '2rem',
  },
  address: {
    padding: '2rem',
    borderRadius: '0.25rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      padding: '1.5rem 1rem',
    },
  },
  default: {
    background: theme.palette.gray.light,
    border: `1px solid ${theme.palette.gray.main}`,
  },
  active: {
    background: theme.palette.white.main,
    border: `1px solid ${theme.palette.orange.light}`,
  },
  idAddress: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: theme.palette.black.light,
  },
  addressInfo: {
    lineHeight: '1.375rem',
    color: theme.palette.black.light,
  },
  actions: {
    display: 'flex',
    justifyContent: 'end',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-around',
      marginTop: '1.25rem',
    },
    '& button': {
      margin: '0 0 1rem 1rem',
      height: 'fit-content',
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0',
      },
    },
    '& button:first-child': {
      [theme.breakpoints.down('sm')]: {
        minWidth: '8.5rem',
        padding: '0.594rem 0.5rem',
      },
    },
  },
  btnAdd: {
    '& .MuiButton-label': {
      justifyContent: 'left',
    },
    [theme.breakpoints.down('md')]: {
      '& button': {
        width: '50%',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& button': {
        width: '100%',
      },
    },
  },
}));

const DeliveryInfo = () => {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      fetchAddresses();
      setLoaded(true);
    } else {
      setLoaded(true);
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const handleSubmit = (address) => {
    if (editMode) {
      updateDelivery(address, editData.id);
    } else {
      addDelivery(address);
    }
  };

  const addDelivery = async (address) => {
    setLoading(true);
    if (user?.isAuthenticated) {
      const response = await CommonService.addAddress(address);
      if (response) {
        fetchAddresses();
      } else {
        setAlerts({
          type: 'error',
          message: '住所を追加できませんでした。',
        });
      }
    } else {
      setUser(
        produce((draft) => {
          draft.addresses = draft.addresses ?? [];
          draft.addresses.push(address);
        }),
      );
    }
    setLoading(false);
  };

  const updateDelivery = async (address, id) => {
    setLoading(true);
    if (user?.isAuthenticated) {
      const response = await CommonService.updateAddress(address, id);
      if (response?.success) {
        fetchAddresses();
      } else {
        // eslint-disable-next-line no-warning-comments
        // TODO: handle error
      }
    } else {
      setUser(
        produce((draft) => {
          draft.addresses = draft.addresses ?? [];
          draft.addresses.push(address);
        }),
      );
    }
    setLoading(false);
  };

  const handleClickOpenAdd = () => {
    setEditData({});
    setEditMode(false);
    setOpen(true);
  };

  const handleClickOpenUpdate = (adr) => {
    setEditData(adr);
    setEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditData({});
  };

  const fetchAddresses = async () => {
    const addresses = await CommonService.getAddresses();
    if (addresses?.length > 0) {
      setUser(
        produce((draft) => {
          draft.addresses = addresses;
        }),
      );
    } else {
      setUser(
        produce((draft) => {
          draft.addresses = [];
        }),
      );
    }
  };

  const handleClickDefault = async (adr) => {
    const newAddress = {...adr, is_default: 1};
    updateDelivery(newAddress, newAddress?.id);
  };

  const handleClickDelete = (id) => {
    Swal.fire({
      title: '削除します。よろしいですか？',
      text: '削除したデータは元に戻りません。',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'キャンセル',
      confirmButtonText: 'ボタン',
      backdrop: false,
      customClass: {
        container: 'swal2-warning',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDelivery(id);
      }
    });
  };

  const deleteDelivery = async (id) => {
    setLoading(true);
    const res = await CommonService.deleteAddress(id);
    if (res.status === httpStatus.SUCCESS) {
      setLoading(false);
      handleClose();
      fetchAddresses();
    } else {
      //
    }
    setLoading(false);
  };

  return (
    <DefaultLayout title={'お届け先情報'}>
      {isAuthenticated && (
        <ContentBlock
          title='お届け先情報'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          <div className={classes.addresses}>
            {loaded &&
              user.addresses?.map((adr, indexAdd) => (
                <Grid
                  key={adr.id}
                  container={true}
                  spacing={8}
                >
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <Grid
                      container={true}
                      spacing={0}
                      className={
                        adr.is_default === 1 ? clsx(classes.address, classes.active) : clsx(classes.address, classes.default)
                      }
                    >
                      <Grid
                        item={true}
                        xs={3}
                        sm={2}
                      >
                        <b className={classes.idAddress}>{`住所 ${indexAdd + 1}`}</b>
                      </Grid>

                      <Grid
                        item={true}
                        xs={9}
                        sm={4}
                      >
                        <Box
                          component='div'
                          className={classes.addressInfo}
                        >
                          {adr.name} <br/>
                          {`〒${adr.zipcode}`} <br/>
                          {`${adr?.province?.name}${adr.city}`} <br/>
                          {adr.address} <br/>
                          {adr.tel}
                        </Box>
                      </Grid>

                      <Grid
                        item={true}
                        xs={12}
                        sm={6}
                        className={classes.actions}
                      >
                        {adr.is_default === 1 ? (
                          <Button
                            variant='contained'
                            customColor='yellow'
                            customSize='small'
                          >
                            {'設定中の住所'}
                          </Button>
                        ) : (
                          <Button
                            variant='contained'
                            customColor='white'
                            customSize='small'
                            customBorder='bdGray'
                            startIcon={
                              <Image
                                src={'/img/icons/ready_line.svg'}
                                width={17}
                                height={17}
                                alt={'touch'}
                                // eslint-disable-next-line react/jsx-closing-bracket-location
                              />
                            }
                            onClick={() => {
                              handleClickDefault(adr);
                            }}
                          >
                            {'この住所に設定'}
                          </Button>
                        )}

                        <Button
                          variant='contained'
                          customSize='tiny'
                          customColor='white'
                          customBorder='bdGray'
                          startIcon={
                            <Image
                              src={'/img/icons/edit.svg'}
                              width={20}
                              height={20}
                              alt={'touch'}
                              // eslint-disable-next-line react/jsx-closing-bracket-location
                            />
                          }
                          onClick={() => {
                            handleClickOpenUpdate(adr);
                          }}
                        >
                          {'編集'}
                        </Button>

                        <Button
                          variant='contained'
                          customColor='whiteRed'
                          customSize='tiny'
                          customBorder='bdRed'
                          startIcon={<Icon>{'delete'}</Icon>}
                          onClick={() => {
                            handleClickDelete(adr.id);
                          }}
                        >
                          {'削除'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </div>

          <div className={classes.btnAdd}>
            <Button
              variant='contained'
              customColor='white'
              customSize='medium'
              customBorder='bdBlack'
              startIcon={
                <div style={{marginRight: '0.5rem', display: 'flex'}}>
                  <Image
                    src={'/img/icons/btn_add.svg'}
                    width={32}
                    height={32}
                    alt={'btn_add'}
                  />
                </div>
              }
              onClick={handleClickOpenAdd}
            >
              {'新しい住所を追加'}
            </Button>
          </div>
        </ContentBlock>
      )}

      <DialogWidget
        open={open}
        size={'lg'}
        title={'新しい住所を追加する'}
        handleClose={handleClose}
      >
        <DeliveryForm
          defaultValues={editMode ? editData : null}
          onSubmit={handleSubmit}
          editMode={editMode}
          onClose={handleClose}
        />
      </DialogWidget>

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </DefaultLayout>
  );
};

export default DeliveryInfo;
