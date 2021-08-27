import {commonService} from './common.service';

const AddressService = {
  getAll,
  createAddress,
};

async function getAll() {
  return commonService.get('https://virtserver.swaggerhub.com/anhphong/BHEC/1.0.0/api/v1/addresses');
}

async function createAddress(body) {
  return commonService.post('https://virtserver.swaggerhub.com/anhphong/BHEC/1.0.0/api/v1/addresses', body);
}

export default AddressService;
