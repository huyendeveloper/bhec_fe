import {Box, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const useStyles = makeStyles(() => ({
  expressDeliveryCell: {
    paddingTop: '0.5rem !important',
  },
}));

const Meta = () => {
  const classes = useStyles();

  const product = useRecoilValue(productState);

  const expressDelivery = product?.sellerInfo?.express_delivery;
  const shippingType = product?.productDetail?.shipping_type || '';
  const shippingDate = product?.productDetail?.shipping_date || '';
  const shippingDays = product?.productDetail?.shipping_days || '';

  return (
    <Box component='div'>
      <TableContainer>
        <Table className={'table'}>
          <TableBody>
            {shippingType.length > 0 && (
              <>
                <TableRow>
                  <TableCell
                    component='th'
                    scope='row'
                  >
                    {'配送'}
                  </TableCell>
                  <TableCell align='left'>{shippingType}</TableCell>
                </TableRow>
                {expressDelivery && (
                  <TableRow>
                    <TableCell
                      className={classes.expressDeliveryCell}
                      component='th'
                      scope='row'
                    />
                    <TableCell
                      className={classes.expressDeliveryCell}
                      align='left'
                    >
                      {`${expressDelivery}にて配送予定`}
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}

            {shippingDays.length > 0 && shippingDays !== 'null' && (
              <TableRow>
                <TableCell
                  component='th'
                  scope='row'
                >
                  {'商品準備'}
                </TableCell>
                <TableCell align='left'>{`${shippingDays}営業日以内に発送予定`}</TableCell>
              </TableRow>
            )}
            {shippingDate.length > 0 && (
              <TableRow>
                <TableCell
                  component='th'
                  scope='row'
                >
                  {'営業日'}
                </TableCell>
                <TableCell align='left'>{shippingDate}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Meta;
