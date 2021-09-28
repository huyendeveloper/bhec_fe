import {Box, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import React from 'react';

import {useRecoilState} from 'recoil';

import QuantityBox from '../QuantityBox';

import {productState} from '~/store/productState';

const Quantity = () => {
  const [product, setProduct] = useRecoilState(productState);

  const handleQuantityChange = (event) => {
    setProduct((oldValue) => ({
      ...oldValue,
      quantity: parseInt(event.target.value, 10),
    }));
  };

  return (
    <Box
      component='div'
    >
      <TableContainer>
        <Table className={'table'}>
          <TableBody>
            <TableRow>
              <TableCell
                component='th'
                scope='row'
              >
                {'数量'}
              </TableCell>
              <TableCell align='left'>
                <QuantityBox
                  name={'productQuantity'}
                  value={product?.quantity ?? 0}
                  maximum_quantity={product?.productDetail?.maximum_quantity}
                  quantity={product?.productDetail?.quantity}
                  handleChange={handleQuantityChange}
                  width={'170px'}
                  height={'40px'}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Quantity;
