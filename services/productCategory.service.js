import {commonService} from './common.service';

export const productCategoryService = {
  getAll,
  getProductByCategory,
};

// const API_ENDPOINT = process.env.API_ENDPOINT;

// const baseUrl = `${API_ENDPOINT}`;

async function getAll() {
  const category = await commonService.get('https://60fea5c925741100170786d1.mockapi.io/categories');
  return category;
}

function getProductByCategory(categoryName, currentPage) {
  // return commonService.get(`https://virtserver.swaggerhub.com/anhphong/BHEC/1.0.0/api/v1/products?page=${page}&category=${category}&per_page=12`);
  return commonService.get('http://localhost:3000/api/v1/products', {category: categoryName, per_page: 12, page: currentPage});
  // return commonService.get(`http://3.144.18.206/api/v1/products?category=${category}&page=${page}&per_page=12`);
}
