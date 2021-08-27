import {commonService} from './common.service';

const PrefectureService = {
  getPrefectures,
};

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getPrefectures() {
  return commonService.get('https://bhec.alpha-tech.net/api/v1/provinces');
}

export default PrefectureService;
