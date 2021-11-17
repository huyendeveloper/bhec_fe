/* eslint-disable no-param-reassign */
import {format as fnsFormat} from 'date-fns';
import moment from 'moment';
const templates = {
  date: 'yyyy/MM/dd',
  isoDate: 'yyyy-MM-dd',
  dateTime: 'yyyy/MM/dd HH:mm:ss',
  dateTime1: 'yyyy/MM/dd HH:mm',
  jaDate: 'yyyy年MM月dd日',
  jaDateTime: 'yyyy年MM月dd日 HH:mm',
  jaDateYM: 'yyyy年MM月',
  jaDateMD: 'M月d日',
};

const format = (date, template = null) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (template == null) {
    return fnsFormat(date, templates.date);
  }
  if (template in templates) {
    return fnsFormat(date, templates[template]);
  }

  return fnsFormat(date, template);
};

const formatDate = (date) => {
  if (!date) {
    return null;
  }
  moment.locale('ja');
  const objectDate = moment(date) ? moment(date).toObject() : {};
  return objectDate.years ? `${objectDate.years}/${objectDate.months + 1}/${objectDate.date} ${objectDate.hours + 2}:${objectDate.minutes}` : null;
};

export {formatDate};
export default format;
