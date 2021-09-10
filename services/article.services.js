import {api} from '~/lib/api';
import {clean} from '~/lib/object';

const ArticleService = {
  getArticles,
  getArticleDetail,
};

// eslint-disable-next-line no-warning-comments
// TODO: DRY me
const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getArticles(payload) {
  const DEFAULT_PER_PAGE = 3;
  const cleanPayload = clean(payload);
  const activeParam = {
    per_page: DEFAULT_PER_PAGE,
    page: 1,
  };
  let {tag} = cleanPayload;
  if (tag && tag.length) {
    if (tag === 'string') {
      tag = tag.split(',');
    }
    activeParam.tag = tag;
  }

  if (payload?.page) {
    activeParam.page = parseInt(payload.page, 10);
  }
  // eslint-disable-next-line no-warning-comments
  // TODO: GET /articles returns response in different format
  // eslint-disable-next-line no-unused-vars
  const [data, errors, response] = await api.get('/articles', {...cleanPayload, ...activeParam});
  if (errors.length) {
    return parserError(errors);
  }

  return response?.data;
}

async function getArticleDetail(id) {
  const [data, errors] = await api.get(`/articles/${id}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default ArticleService;
