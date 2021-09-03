import PropTypes from 'prop-types';
import {
  Grid, Icon,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {ErrorMessage} from '@hookform/error-message';
import {Controller} from 'react-hook-form';
import ImageUploading from 'react-images-uploading';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .inputEditor .MuiInputBase-input': {
      height: '20rem',
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
}));
const ContactProduct = ({control, errors, product, index, removeProduct, valueProductImages, onContactProductImagesChange, maxNumber}) => {
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
        <label
          htmlFor='infomation'
          className='formControlLabel'
        >
          {`種別${index + 1}`}
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
                  >{`⚠ ${message}`}</p>
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
                  >{`⚠ ${message}`}</p>
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
                  >{`⚠ ${message}`}</p>
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
            <ImageUploading
              multiple={true}
              value={valueProductImages[`productImages${index}`]}
              onChange={onChangeImage}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                dragProps,
              }) => {
                return (
                  <div className='imageUploadWrapper'>
                    {Array.from({length: maxNumber}, (x, i) => i).map((indexImg) => {
                      const uploadedImage = imageList[indexImg];
                      if (uploadedImage) {
                        return (
                          <div
                            key={`imageUploadItem_${indexImg}`}
                            className={'imageUploadItem'}
                          >
                            <Image
                              onClick={() => onImageUpdate(indexImg)}
                              src={uploadedImage.data_url}
                              width={78}
                              height={80}
                              alt={`Image upload ${indexImg + 1}`}
                            />
                            <button
                              type='button'
                              className='imageUploadRemove'
                              onClick={() => onImageRemove(indexImg)}
                            ><Icon>{'close'}</Icon></button>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={`imgUploadBtn_${indexImg}`}
                          type='button'
                          onClick={onImageUpload}
                          className='imageUploadBtn'
                          {...dragProps}
                        >
                          <Image
                            src='/img/btn-upload.png'
                            width={80}
                            height={80}
                            alt='Image upload'
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              }}
            </ImageUploading>
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
};

export default ContactProduct;

