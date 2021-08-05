import {useState} from 'react';

import {ImageDropzone} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ImageDropzone',
  component: ImageDropzone,
};

export const ImageDropzoneDefault = () => {
  const [image, setImage] = useState(null);
  const setImages = (index, newImage) => {
    setImage(newImage);
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <ImageDropzone
      index={0}
      image={image}
      setImages={setImages}
      removeImage={removeImage}
    />
  );
};
