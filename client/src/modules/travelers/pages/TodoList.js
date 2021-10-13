import TravelerListItem from '../components/TravelerListItem';
import { useQuery } from 'react-query';
import { list } from '../../agent/api-agent';
import BubbleLoader from '../../../components/UI/BubbleLoader';
import { Redirect } from 'react-router-dom';

const TodoList = () => {
  const { data: travelers = [], isLoading, isError } = useQuery('travelers', () => list().then(data => data));

  if (isLoading || travelers.length === 0) {
    return <BubbleLoader />;
  }

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <div className='todo-list__container'>
      <h1>Tuesday, 12 Octber</h1>
      <div className='travelers-list__container'>
        {travelers.map(traveler => (
          <TravelerListItem
            key={traveler._id}
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

export default TodoList;
