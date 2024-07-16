import { format } from 'date-fns';

const getdateTime = (date) => {
  return format(new Date(date), 'dd/MM/yy, HH:mm a');
};

export default getdateTime;
