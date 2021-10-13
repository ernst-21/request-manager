import { memo } from 'react';
import dateFormat from 'dateformat';
import { dueDate } from '../../../utils/date-wrangler';

const TravelerNegotiationDueDate = (props) => {

  const dueDateBgColor = dueDate(props.negotiationDueDate);

  return (
    <div style={{
      backgroundColor: dueDateBgColor,
      color: 'white',
      width: '55px',
      padding: '0 .5em',
      display: 'inline-flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      height: '22px',
      borderRadius: '4px'
    }}>{dateFormat(props.negotiationDueDate, 'mmm d')}</div>
  );
};

export default memo(TravelerNegotiationDueDate);
