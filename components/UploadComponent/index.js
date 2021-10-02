import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {Icon} from '@material-ui/core';

import {CommonService} from '~/services';
const UploadFile = ({multiple, images, onChange, maxNumber, logoWidth, logoHeight}) => {
  const imageConvert = images && images.length ? images.map((item) => {
    return {data_url: item};
  }) : [];
  const onProductImagesChange = async (imageList) => {
    const imageUpload = imageList.filter((item) => item.data_url.indexOf(process.env.S3_DOMAIN_NAME) === -1);
    if (imageUpload.length) {
      const bodyFormData = new FormData();
      imageUpload.forEach((image) => {
        bodyFormData.append('images[]', image.file);
      });
      const result = await CommonService.uploadFile(bodyFormData);
      if (result && result.urls && result.urls.length) {
        const newImages = [...result.urls, ...images];
        onChange(newImages);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <ImageUploading
      multiple={multiple}
      value={imageConvert}
      onChange={onProductImagesChange}
      dataURLKey='data_url'
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        dragProps,
      }) => {
        return (
          <div className='imageUploadWrapper'>
            {Array.from({length: maxNumber}, (x, i) => i).map((index) => {
              const uploadedImage = imageList[index];
              if (uploadedImage) {
                return (
                  <div
                    key={`imageUploadItem_${index}`}
                    className={'imageUploadItem'}
                  >
                    <Image
                      onClick={() => onImageUpdate(index)}
                      src={uploadedImage.data_url}
                      width={logoWidth}
                      height={logoHeight}
                      alt={`Image upload ${index + 1}`}
                    />
                    <button
                      type='button'
                      className='imageUploadRemove'
                      onClick={() => removeImage(index)}
                    ><Icon>{'close'}</Icon></button>
                  </div>
                );
              }
              return (
                <button
                  key={`imgUploadBtn_${index}`}
                  type='button'
                  onClick={onImageUpload}
                  className='imageUploadBtn'
                  {...dragProps}
                >
                  <Image
                    src='/img/btn-upload.png'
                    width={logoWidth}
                    height={logoHeight}
                    alt='Image upload'
                  />
                </button>
              );
            })}
          </div>
        );
      }}
    </ImageUploading>
  );
};

UploadFile.propTypes = {
  multiple: PropTypes.bool,
  images: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.element,
  allowRemove: PropTypes.bool,
  showImage: PropTypes.bool,
  removeImage: PropTypes.func,
  maxNumber: PropTypes.number,
  logoHeight: PropTypes.number,
  logoWidth: PropTypes.number,
};

UploadFile.defaultProps = {
  images: [],
};

export default UploadFile;
