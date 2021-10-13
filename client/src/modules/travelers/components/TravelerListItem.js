import {memo} from 'react';

const TravelerListItem = (props) => {
  return (
    <div className='traveler-list__item'>
      <div>
        <div>{props.negotiationStage}</div>
        <div>{props.name} {props.lastName}</div>
        <div>{props.negotiationDueDate}</div>
      </div>
      <div>
        {props.negotiationStageAction}
      </div>
    </div>
  );
};

export default memo(TravelerListItem);
