import moment from 'moment';

export const dateDiff = (date1, date2) => {
  const difference =  moment(date2, 'YYYY-MM-DD').diff(moment(date1, 'YYYY-MM-DD'), 'weeks');
  if (difference <= 1) {
    return difference + ' week';
  } else {
    return difference + ' weeks';
  }
};

export const dueDate = (date) => {
  const now = new Date();
  const difference = moment(date, 'YYYY-MM-DD').diff(moment(now, 'YYYY-MM-DD'), 'days');
  if (difference < 0) {
    return '#db2c24';
  } else if (difference >= 0) {
    return '#129cab';
  }
};
