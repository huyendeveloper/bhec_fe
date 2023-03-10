import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';

import {useRecoilState} from 'recoil';

import QuantityBox from '../QuantityBox';

import {productState} from '~/store/productState';

const Quantity = () => {
  const [product, setProduct] = useRecoilState(productState);

  React.useEffect(() => {
    setProduct((oldValue) => ({
      ...oldValue,
      quantity: 1,
    }));
  }, []);

  const handleQuantityChange = (newQuantity) => {
    setProduct((oldValue) => ({
      ...oldValue,
      quantity: newQuantity,
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
                style={{verticalAlign: 'top', paddingTop: '1.5rem'}}
              >
                {'数量'}
              </TableCell>
              <TableCell align='left'>
                {product?.productDetail?.quantity > 0 ? (
                  <QuantityBox
                    name={'productQuantity'}
                    value={product?.quantity ?? 0}
                    maximum_quantity={product?.productDetail?.maximum_quantity}
                    quantity={product?.productDetail?.quantity}
                    handleChange={handleQuantityChange}
                    defaultValue={product?.quantity}
                  />
                ) : <Typography color={'secondary'}>{'在庫なし'}</Typography>}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Quantity;
