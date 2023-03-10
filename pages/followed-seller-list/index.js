import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {signOut} from 'next-auth/client';
import Pagination from '@material-ui/lab/Pagination';

import {SellerService} from '~/services';
import {userState} from '~/store/userState';
const SellerInstance = new SellerService();
import {ContentBlock} from '~/components';
import {SellerWidget} from '~/components/Widgets';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  favouriteProducts: {
    marginTop: '2rem',
  },
  gridFilter: {
    textAlign: 'end',
    '& .MuiSelect-select': {
      width: '8rem',
    },
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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const DEFAULT_PER_PAGE = 6;

export default function FollowedSellerList() {
  const classes = useStyles();
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      getSellersFollowed();
    } else {
      requestLogin();
    }
  }, []);

  const getSellersFollowed = async () => {
    const query = {
      page: currentPage,
      per_page: DEFAULT_PER_PAGE,
    };
    const response = await SellerInstance.getSellersFollowed(query);
    if (response && response.list_followed_seller && response.list_followed_seller.length) {
      setPages(response.pages);
      setSellers(response.list_followed_seller);
    } else {
      setSellers([]);
    }
  };

  const changePage = (e, pageNumber) => {
    setCurrentPage(pageNumber);
    getSellersFollowed();
  };

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  return (
    <DefaultLayout title='?????????????????????????????????'>
      {isAuthenticated && (
        <div className={'page'}>
          <div className='content'>
            <ContentBlock
              title='?????????????????????????????????'
              bgImage='/img/noise.png'
              bgRepeat='repeat'
              mixBlendMode='multiply'
            >
              <Box m={'0 auto'}>
                <Grid
                  container={true}
                  spacing={3}
                  className={classes.favouriteProducts}
                >
                  {sellers.map((seller) => (
                    <Grid
                      key={seller.id}
                      item={true}
                      md={4}
                      sm={4}
                      xs={12}
                    >
                      <SellerWidget
                        data={seller}
                        border={'borderNone'}
                        reload={getSellersFollowed}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {sellers?.length > 0 && pages > 0 && (
                <Pagination
                  count={pages}
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  defaultPage={1}
                  onChange={changePage}
                  className={classes.pagination}
                />
              )}
            </ContentBlock>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
