import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Box,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';
import Image from 'next/image';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ContactService} from '~/services';
import {userState} from '~/store/userState';

const ContactCommon = new ContactService();

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
  noteContactNull: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    color: theme.palette.black4.main,
    fontWeight: '700',
    marginTop: '2rem',
  },
}));

const headCells = ['受付番号', '種別', '日時', 'お問い合わせ内容'];

const Contacts = () => {
  const classes = useStyles();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const PER_PAGE = 10;

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      fetchContacts();
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
    setPage(newPage);
  };

  const fetchContacts = async () => {
    const response = await ContactCommon.getContacts({page, per_page: PER_PAGE});
    setContacts(response?.contacts);
  };

  return (
    <DefaultLayout title={'問い合わせ一覧'}>
      {isAuthenticated && (
        <ContentBlock
          title={'問い合わせ一覧'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
        >
          {contacts?.length ? (
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
                    {contacts.slice(page * PER_PAGE, PER_PAGE * (page + 1)).map((contact) => (
                      <TableRow key={contact?.id}>
                        <TableCell>
                          <Link href={`/contacts/${contact?.id}`}>
                            <a className={classes.orderLink}>{contact?.request_no}</a>
                          </Link>
                        </TableCell>
                        <TableCell>{contact?.contact_category?.name}</TableCell>
                        <TableCell>{moment(contact?.created_at).format('YYYY/MM/DD HH:mm')}</TableCell>
                        <TableCell>{contact?.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[]}
                component='div'
                count={contacts.length}
                rowsPerPage={PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
              />
            </>
          ) : (
            <Box
              textAlign='center'
              mt={2}
              mb={-4}
            >
              <Image
                width={201}
                height={192}
                alt='簡単３ステップで商品到着 - STEP3'
                src='/img/seller-step-3.png'
              />
              <Typography
                component='h3'
                align='center'
                className={classes.noteContactNull}
              >
                {'お問い合わせはありません。'}
              </Typography>
            </Box>
          )}
        </ContentBlock>
      )}
    </DefaultLayout>
  );
};

export default Contacts;
