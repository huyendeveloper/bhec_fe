import {Grid, Divider} from '@material-ui/core';
import PropTypes from 'prop-types';

import {Media} from './index';

const Medias = ({medias}) => {
  return (
    <Grid
      container={true}
      justifyContent='center'
      spacing={0}
    >
      <Grid
        item={true}
        md={8}
      >
        {medias.map((media, index) => (
          <div key={media.id}>
            <Media media={media}/>

            <Divider
              className={'mediaDivider'}
              style={{display: (index === medias.length - 1) ? 'none' : 'flex'}}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

Medias.propTypes = {
  medias: PropTypes.array,
};

export default Medias;
