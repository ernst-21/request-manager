import { memo } from 'react';
import { Link } from 'react-router-dom';
import TravelerNegotiationDueDate from './TravelerNegotiationDueDate';

const TravelerListItem = (props) => {
  return (
    <Link to={'/users/' + props.id}>
      <div className='traveler-list__item'>
        <div className='travelers-list__actions-name__container'>
          <h3>{props.negotiationStage}</h3>
          <div className='traveler-list__item-name'>{props.name} {props.lastName}</div>
          <TravelerNegotiationDueDate negotiationDueDate={props.negotiationDueDate} />
        </div>
        <div className='traveler-list__item-negoStage'>
          {props.negotiationStageAction}
        </div>
      </div>
    </Link>
  );
};

export default memo(TravelerListItem);
