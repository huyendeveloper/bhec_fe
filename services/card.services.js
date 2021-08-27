import {commonService} from './common.service';

const CardService = {
  getAll,
};

function getAll() {
  return commonService.get('https://virtserver.swaggerhub.com/anhphong/BHEC/1.0.0/api/v1/cards');
}

export default CardService;
