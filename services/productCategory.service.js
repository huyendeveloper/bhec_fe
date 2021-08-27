import {api} from '~/lib/api';

const ProductCategoryService = {
  getProductByCategory,
};

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getProductByCategory(categoryName, currentPage) {
  const [data, errors] = await api.get('/products', {category: categoryName, per_page: 12, page: currentPage});
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default ProductCategoryService;