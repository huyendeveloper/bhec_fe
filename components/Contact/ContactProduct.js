import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ErrorMessage} from '@hookform/error-message';
import {Controller} from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';

import {UploadComponent} from '~/components';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-multiline': {
      background: 'white',
    },
    '& .inputEditor': {
      padding: '0 !important',
    },
    '& .formBlockHeader': {
      margin: '0.5rem 0 1rem 0',
    },

    '& .formBlockExchange': {
      marginBottom: '1rem',
    },
    '& .formBlockDescImage': {
      fontSize: '0.875rem',
    },
    '& .MuiInputBase-input': {
      height: '3rem',
    },
  },

  divRemove: {
    position: 'absolute',
    top: '-30px',
    right: '-1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 10px',
    background: theme.palette.gray.light,
    border: '1px solid #DBDBDB',
    boxSizing: 'border-box',
    borderRadius: '4px 4px 0px 0px',
    borderBottom: 'none',
  },

  icRemove: {
    color: theme.palette.red.main,
  },
  block: {
    width: '34.875rem',
    margin: '0 calc((100% - 34.875rem)/2)',
    flexBasis: 'auto',
    marginBottom: '0.875rem',
    [theme.breakpoints.down('sm')]: {
      width: '29.5rem',
      margin: '0 calc((100% - 29.5rem)/2)',
      marginBottom: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '21.4375rem',
      margin: '0 calc((100% - 21.4375rem)/2)',
      marginBottom: '0px',
    },
  },
}));
const ContactProduct = ({control, errors, product, index, removeProduct, valueProductImages, onContactProductImagesChange, maxNumber, logoHeight, logoWidth}) => {
  const classes = useStyles();
  const onChangeImage = (imageList) => {
    // data for submit
    onContactProductImagesChange(imageList, index);
  };
  return (
    <>
      <Grid
        xs={12}
        md={12}
        item={true}
        key={product.id}
        className={classes.root}
      >
        <div className={classes.block}>
          <label
            htmlFor='infomation'
            className='formControlLabel'
          >
            {`商品情報${index + 1}`}
            <span className='formControlRequired'>{'*'}</span>
          </label>
          <div
            className='formBlockExchange'
            style={{position: 'relative'}}
          >
            <Grid
              item={true}
              xs={12}
              md={12}
              className='gridBlockExchange'
            >
              <label
                htmlFor={`order_number${index}`}
                className='formControlLabel'
              >
                {'注文番号'}
                <span className='formControlRequired'>{'*'}</span>
              </label>
              <Controller
                name={`order_number${index}`}
                control={control}
                defaultValue=''
                rules={{required: '必須項目です。'}}
                render={({field: {name, value, ref, onChange}}) => (
                  <TextField
                    id={`order_number${index}`}
                    variant='outlined'
                    label={'注文番号をご入力ください。'}
                    error={Boolean(errors[`order_number${index}`])}
                    InputLabelProps={{shrink: false}}
                    name={name}
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name={`order_number${index}`}
                render={({messages}) => {
                  return messages ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className='inputErrorText'
                      key={type}
                    >{`${message}`}</p>
                  )) : null;
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              item={true}
              className='gridBlockExchange'
            >
              <label
                htmlFor={`product_code${index}`}
                className='formControlLabel'
              >
                {'商品コード'}
                <span className='formControlRequired'>{'*'}</span>
              </label>
              <Controller
                name={`product_code${index}`}
                control={control}
                defaultValue=''
                rules={{required: '必須項目です。'}}
                render={({field: {name, value, ref, onChange}}) => (
                  <TextField
                    id={`product_code${index}`}
                    variant='outlined'
                    label={'商品コードをご入力ください。'}
                    error={Boolean(errors[`product_code${index}`])}
                    InputLabelProps={{shrink: false}}
                    name={name}
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name={`product_code${index}`}
                render={({messages}) => {
                  return messages ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className='inputErrorText'
                      key={type}
                    >{`${message}`}</p>
                  )) : null;
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              item={true}
              className='gridBlockExchange'
            >
              <label
                htmlFor={`description${index}`}
                className='formControlLabel'
              >
                {'問い合わせ内容'}
                <span className='formControlRequired'>{'*'}</span>
              </label>
              <Controller
                name={`description${index}`}
                control={control}
                defaultValue=''
                rules={{required: '必須項目です。'}}
                render={({field: {name, value, ref, onChange}}) => (
                  <TextField
                    id={`description${index}`}
                    variant='outlined'
                    error={Boolean(errors[`description${index}`])}
                    InputLabelProps={{shrink: false}}
                    name={name}
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                    className='inputEditor'
                    multiline={true}
                    rows={8}
                    maxRows={12}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name={`description${index}`}
                render={({messages}) => {
                  return messages ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className='inputErrorText'
                      key={type}
                    >{`${message}`}</p>
                  )) : null;
                }}
              />
            </Grid>
            <div
              className='formBlockHeader'
            >
              <Typography
                component='h3'
                className='formBlockTitleImage'
              >
                {'画像アップロード（任意）'}
              </Typography>
              <Typography
                component='p'
                className='formBlockDescImage'
              >
                {'5MB未満の画像(jpg, png)をアップロードすることができます。'}
              </Typography>
            </div>

            <div className='formBlockControls'>
              <UploadComponent
                multiple={false}
                images={valueProductImages[`productImages${index}`]}
                onChange={onChangeImage}
                allowRemove={false}
                showImage={false}
                style={{marginTop: '0.5rem'}}
                maxNumber={maxNumber}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
              />
            </div>
            {index > 0 &&
              <div
                className={classes.divRemove}
                onClick={() => removeProduct(index)}
              >
                <DeleteIcon
                  className={classes.icRemove}
                />
              </div>
            }
          </div>
        </div>
      </Grid>
    </>
  );
};

ContactProduct.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  onContactProductImagesChange: PropTypes.func,
  productImages: PropTypes.array,
  maxNumber: PropTypes.number,
  control: PropTypes.any,
  errors: PropTypes.func,
  valueProductImages: PropTypes.object,
  removeProduct: PropTypes.func,
  logoHeight: PropTypes.number,
  logoWidth: PropTypes.number,
};

export default ContactProduct;

