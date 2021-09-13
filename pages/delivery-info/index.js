import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {Box, useMediaQuery, Grid, useTheme, Icon} from '@material-ui/core';

import {ContentBlock, Button, DeliveryForm} from '~/components';
import {DialogWidget} from '~/components/Widgets';
import {DefaultLayout} from '~/components/Layouts';
const useStyles = makeStyles((theme) => ({
  address: {
    [theme.breakpoints.down('lg')]: {
      padding: '2rem 2rem',
      marginBottom: '2rem',
    },
    [theme.breakpoints.down('md')]: {
      padding: '1.5rem 1rem',
      marginBottom: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 0.5rem 1.5rem 1rem',
      marginBottom: '1rem',
    },
    '& .blockFirst': {
      display: 'flex',
      color: '#333333',
      '& .adrNo': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: 'bold',
      },
      '& .adrInfo': {
        fontSize: '0.875rem',
        lineHeight: '1.375rem',
        fontWeight: 'normal',
        paddingLeft: '7.125rem',

        [theme.breakpoints.down('sm')]: {
          paddingLeft: '3.1rem',
        },
      },
    },
    '& .blockSecond': {
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
        paddingTop: '1rem',
      },
      '& button:first-child': {
        lineHeight: '1.313rem',
        marginRight: '1rem',
        [theme.breakpoints.down('sm')]: {
          minWidth: '8.5rem',
          padding: '0.594rem 0.5rem',
        },
        [theme.breakpoints.down('xs')]: {
          marginRight: '0.5rem',
        },
      },
      '& button:last-child': {
        marginLeft: '1rem',
        [theme.breakpoints.down('xs')]: {
          marginLeft: '0.5rem',
        },
      },
    },
  },
  borderActive: {
    border: '1px solid #EEE0B5',
    background: '#FFFFFF',
  },
  borderDefault: {
    border: '1px solid #DBDBDB',
    background: '#F8F8F8',
  },
  btnAddress: {
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

const data = [
  {
    id: 1,
    name: '鈴木はなこ1',
    district: '東京都渋谷区道玄坂2-29-1',
    zipcode: '150-0043',
    office_room: '渋谷マンション101号',
    phone_no: '090-1234-5678',
    isPrimary: true,
  },
  {
    id: 2,
    name: '鈴木はなこ2',
    district: '東京都渋谷区道玄坂2-29-1',
    zipcode: '150-0043',
    office_room: '渋谷マンション101号',
    phone_no: '090-1234-5678',
    isPrimary: false,
  },
  {
    id: 3,
    name: '鈴木はなこ3',
    district: '東京都渋谷区道玄坂2-29-1',
    zipcode: '150-0043',
    office_room: '渋谷マンション101号',
    phone_no: '090-1234-5678',
    isPrimary: false,
  },
];

const DeliveryInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const [rowId, setRowId] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditData({});
  };

  useEffect(() => {
    if (editMode) {
      setEditData(data[rowId]);
    }
  }, [editMode, rowId]);

  return (
    <DefaultLayout title='Delivery Info - Oshinagaki Store'>
      <ContentBlock
        title='お届け先情報'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {data.map((adr) => (
          <Grid
            key={adr.id}
            container={true}
            className={adr.isPrimary ? (classes.address + ' ' + classes.borderActive) : (classes.address + ' ' + classes.borderDefault)}
          >
            <Grid
              item={true}
              xs={12}
              sm={6}
              lg={6}
              className={'blockFirst'}
            >
              <Box
                component='div'
                className={'adrNo'}
              >
                {`住所 ${adr.id}`}
              </Box>
              <Box
                component='div'
                className={'adrInfo'}
              >
                {adr.name} <br/>
                {`〒${adr.zipcode}`} <br/>
                {adr.district} <br/>
                {adr.office_room} <br/>
                {adr.phone_no}
              </Box>
            </Grid>
            <Grid
              item={true}
              xs={12}
              sm={6}
              lg={6}
              className={'blockSecond'}
            >
              <Box
                component='div'
              >
                {
                  adr.isPrimary ? (
                    <Button
                      variant='contained'
                      customColor='yellow'
                      customSize='small'
                      startIcon={
                        <Image
                          src={'/img/icons/ready.svg'}
                          width={20}
                          height={20}
                          alt={'touch'}
                        />}
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
                          width={20}
                          height={20}
                          alt={'touch'}
                        />}
                    >
                      {'設定中の住所'}
                    </Button>
                  )
                }

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
                    />}
                  onClick={() => {
                    setRowId(parseInt(`${adr.id}`, 10) - 1);
                    setEditMode(true);
                    handleClickOpen();
                  }}
                >
                  {'編集'}
                </Button>
                <Button
                  variant='contained'
                  customColor='whiteRed'
                  customSize='tiny'
                  customBorder='bdRed'
                  startIcon={
                    <Icon>{'delete'}</Icon>
                  }
                >
                  {'削除'}
                </Button>
              </Box>

            </Grid>
          </Grid>
        ))}

        <Grid
          container={true}
          spacing={0}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
          >
            <Box
              textAlign={isMobile ? 'center' : 'left'}
              className={classes.btnAddress}
            >
              <Button
                variant='contained'
                customColor='white'
                customSize='extraLarge'
                customBorder='bdBlack'
                startIcon={
                  <Image
                    src={'/img/icons/btn_add.svg'}
                    width={32}
                    height={32}
                    alt={'btn_add'}
                  />}
                onClick={handleClickOpen}
              >
                {'新しい住所を追加'}
              </Button>
            </Box>

          </Grid>
        </Grid>
      </ContentBlock>
      <DialogWidget
        open={open}
        handleClose={handleClose}
        size={'lg'}
        title={'新しい住所を追加する'}
      >
        <DeliveryForm
          dataEdit={editData}
          editMode={editMode}
        />
      </DialogWidget>
    </DefaultLayout>
  );
};

export default DeliveryInfo;
