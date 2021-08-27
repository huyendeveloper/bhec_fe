import {api} from '~/lib/api';

const PrefectureService = {
  getPrefectures,
};

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getPrefectures() {
  const [data, errors] = await api.get('/provinces');
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default PrefectureService;
