import {
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TablePagination, TableRow, Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {order as orderConstants} from '~/constants';
import {format as formatNumber} from '~/lib/number';
import {OrderService} from '~/services';

const useStyles = makeStyles((theme) => ({
  containerTable: {
    '& th, td': {
      border: '1px solid ' + theme.border.default,
    },
    '& .MuiTableCell-root': {
      textAlign: 'center',
      fontSize: '1rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.813rem',
      },
    },
  },
  table: {
    borderCollapse: 'separate',
    [theme.breakpoints.down('xs')]: {
      width: '27.313rem',
      overflow: 'scroll',
    },
    '& th:first-child': {
      borderTopLeftRadius: '0.25rem',
    },
    '& th:last-child': {
      borderTopRightRadius: '0.25rem',
    },
    '& tr:last-child td:first-child': {
      borderBottomLeftRadius: '0.25rem',
    },
    '& tr:last-child td:last-child': {
      borderBottomRightRadius: '0.25rem',
    },
  },
  tableHead: {
    background: theme.palette.pink.light,
    height: '3rem',
    '& .MuiTableCell-head': {
      padding: '0',
      color: theme.palette.black.light,
      fontWeight: 'bold',
    },
  },
  tableBody: {
    background: theme.palette.white.main,
    height: '8.375rem',
    '& .MuiTableCell-body': {
      lineHeight: '1.5rem',
      color: theme.palette.black.light,
      padding: '1.75rem 0',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
        padding: '1.375rem 0',
      },
    },
    '& .MuiTableRow-root:nth-of-type(even)': {
      backgroundColor: theme.palette.gray.light,
      [theme.breakpoints.down('md')]: {
        backgroundColor: theme.palette.white.main,
      },
    },
  },
  orderLink: {
    color: theme.palette.red.main,
  },
}));

const headCells = [
  'ご注文番号',
  'ご注文日時',
  '決済金額',
  'お支払い方法',
];

const Orders = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState();
  const PER_PAGE = 10;

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const fetchOrders = async () => {
    const response = await OrderService.getOrders({per_page: PER_PAGE});
    setOrders(response?.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <DefaultLayout title={'注文一覧'}>
      <ContentBlock
        title={'注文一覧'}
        bgImage='/img/noise.png'
        bgRepeat='repeat'
      >

        {orders?.length ? (
          <>
            <TableContainer className={classes.containerTable}>
              <Table
                className={classes.table}
              >
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell}
                      >
                        {headCell}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody className={classes.tableBody}>
                  {orders.slice(page * PER_PAGE, PER_PAGE * (page + 1)).map((order) => (
                    <TableRow key={order?.id}>
                      <TableCell>
                        <Link href={`/orders/${order?.id}`}><a className={classes.orderLink}>{order?.order_number}</a></Link>
                      </TableCell>
                      <TableCell>{moment(order?.created_at).format('YYYY/MM/DD HH:mm')}</TableCell>
                      <TableCell>{`¥${formatNumber(parseInt(order?.total_amount, 10))}`}</TableCell>
                      <TableCell>{orderConstants.paymentMethods?.find((p) => p.id === order.payment_method)?.label}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[]}
              component='div'
              count={orders.length}
              rowsPerPage={PER_PAGE}
              page={page}
              onPageChange={handleChangePage}
            />
          </>
        ) : <Typography align='center'>{'注文情報はありません。'}</Typography>}
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Orders;
