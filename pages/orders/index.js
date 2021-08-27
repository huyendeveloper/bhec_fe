import {
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TablePagination, TableRow,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import {useState} from 'react';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

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

const rows = [
  {
    id: 1234567890,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567891,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567892,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567893,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567894,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567895,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567896,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567897,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567898,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567899,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567900,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
  {
    id: 1234567901,
    dateTime: '2021/01/01 01:30',
    price: 3000,
    paymentMethod: 'クレジットカード',
  },
];

const Orders = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
    <DefaultLayout title={'Orders - BH_EC'}>
      <ContentBlock
        title={'基本情報'}
        bgImage='/img/noise.png'
        bgRepeat='repeat'
      >
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
              {rows.slice(page * 10, 10 * (page + 1)).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link href={`/orders/${row.id}`}><a className={classes.orderLink}>{row.id}</a></Link>
                  </TableCell>
                  <TableCell>{row.dateTime}</TableCell>
                  <TableCell>{currency.format(row.price)}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[]}
          component='div'
          count={rows.length}
          rowsPerPage={10}
          page={page}
          onChangePage={handleChangePage}
        />
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Orders;
