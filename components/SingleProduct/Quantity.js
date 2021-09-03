import {Box, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import React from 'react';

import {useRecoilState} from 'recoil';

import QuantityBox from '../QuantityBox';

import {productState} from '~/store/productState';

const Quantity = () => {
  const [product, setProduct] = useRecoilState(productState);
  const maximumQuantity = product?.productDetail?.maximumQuantity || 10;

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
                  maximumQuantity={maximumQuantity}
                  handleChange={handleQuantityChange}
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
