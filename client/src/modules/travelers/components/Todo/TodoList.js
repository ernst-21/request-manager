import {memo} from 'react';
import TravelerListItem from './TravelerListItem';

const TodoList = (props) => {
  return (
    <div className='todo-list__container'>
      <div className='todo-list-date__container'><h1>{props.date}</h1></div>
      <div className='travelers-list__container'>
        {props.travelers.map(traveler => (
          <TravelerListItem
            key={traveler._id}
            id={traveler._id}
            negotiationStage={traveler.negotiationStage}
            name={traveler.name}
            lastName={traveler.lastName}
            negotiationDueDate={traveler.negotiationDueDate}
            negotiationStageAction={traveler.negotiationStageAction} />
        ))}
      </div>
    </div>
  );
};

export default memo(TodoList);
