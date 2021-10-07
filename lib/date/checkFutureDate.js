import moment from 'moment';
const notFutureDate = (date) => {
  return moment(new Date(date)).isBefore(new Date());
};

export default notFutureDate;
