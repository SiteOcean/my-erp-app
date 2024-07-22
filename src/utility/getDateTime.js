import { format } from 'date-fns';

const getdateTime = (date) => {
  return format(new Date(date), 'dd/MM/yyyy, hh:mm a');
};

export default getdateTime;
