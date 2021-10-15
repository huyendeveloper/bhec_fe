import {Box, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const Meta = () => {
  const product = useRecoilValue(productState);
  const shippingType = product?.productDetail?.shipping_type || '';
  const shippingDate = product?.productDetail?.shipping_date || '';
  const shippingDays = product?.productDetail?.shipping_days || '';

  return (
    <Box
      component='div'
    >
      <TableContainer>
        <Table className={'table'}>
          <TableBody>
            {shippingType.length > 0 && (
              <TableRow>
                <TableCell
                  component='th'
                  scope='row'
                >
                  {'配送'}
                </TableCell>
                <TableCell align='left'>{shippingType}</TableCell>
              </TableRow>
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
