import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {order as orderConstants} from '~/constants';
import {format as formatNumber} from '~/lib/number';
import {OrderService} from '~/services';
import {userState} from '~/store/userState';
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '3rem 0',
    [theme.breakpoints.down('md')]: {
      margin: '1.5rem 0',
    },
    '& .MuiButtonBase-root': {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '1px solid ' + theme.palette.grey.dark,
      margin: '0 0.5rem',
      background: theme.palette.white.main,
      fontWeight: '700',
      fontSize: '1rem',
      color: theme.palette.gray.dark,
      '&:hover': {
        background: theme.palette.red.main,
        borderColor: theme.palette.red.main,
        color: theme.palette.white.main,
      },
      [theme.breakpoints.down('md')]: {
        width: '2.5rem',
        height: '2.5rem',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
      },
    },
    '& .Mui-selected': {
      background: theme.palette.red.main,
      borderColor: theme.palette.red.main,
      color: theme.palette.white.main,
    },
  },
}));

const headCells = ['ご注文番号', 'ご注文日時', '決済金額', 'お支払い方法'];

const Orders = () => {
  const classes = useStyles();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [page] = useState(0);
  const [orders, setOrders] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const PER_PAGE = 10;

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      fetchOrders();
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
    fetchOrders({page: newPage});
  };

  const fetchOrders = async (query) => {
    const response = await OrderService.getOrders({page, per_page: PER_PAGE, ...query});
    setOrders(response?.orders);
    setCurrentPage(response.page ?? 0);
    setCountPages(response.pages ?? 0);
  };

  const formatDate = (date) => {
    if (!date) {
      return null;
    }
    moment.locale('ja');
    const objectDate = moment(date) ? moment(date).toObject() : {};
    return objectDate.years ? `${objectDate.years}/${objectDate.months}/${objectDate.years} ${objectDate.hours + 2}:${objectDate.minutes}` : null;
  };

  return (
    <DefaultLayout title={'注文一覧'}>
      {isAuthenticated && (
        <ContentBlock
          title={'注文一覧'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
        >
          {orders?.length ? (
            <>
              <TableContainer className={classes.containerTable}>
                <Table className={classes.table}>
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell key={headCell}>{headCell}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody className={classes.tableBody}>
                    {orders.slice(page * PER_PAGE, PER_PAGE * (page + 1)).map((order) => (
                      <TableRow key={order?.id}>
                        <TableCell>
                          <Link href={`/orders/${order?.id}`}>
                            <a className={classes.orderLink}>{order?.order_number}</a>
                          </Link>
                        </TableCell>
                        <TableCell>{formatDate(order?.created_at)}</TableCell>
                        <TableCell>{`¥${formatNumber(parseInt(order?.total_amount, 10))}`}</TableCell>
                        <TableCell>
                          {orderConstants.paymentMethods?.find((p) => p.id === order.payment_method)?.label}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {currentPage > 0 &&
                <Pagination
                  count={countPages}
                  page={currentPage}
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  defaultPage={1}
                  onChange={handleChangePage}
                  className={classes.pagination}
                />
              }
            </>
          ) : (
            <Typography align='center'>{'注文情報はありません。'}</Typography>
          )}
        </ContentBlock>
      )}
    </DefaultLayout>
  );
};

export default Orders;
