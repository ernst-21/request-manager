import { useQuery } from 'react-query';
import { list } from '../../agent/api-agent';
import BubbleLoader from '../../../components/UI/BubbleLoader';
import { Redirect } from 'react-router-dom';
import TodoList from '../components/TodoList';
import moment from 'moment';

const dateToDisplay = moment().add(1, 'days').format('dddd, MMMM Do');

const TodoTomorrow = () => {
  const { data: travelers = [], isLoading, isError } = useQuery('travelers', () => list().then(res => res.json()).then(data => data));

  if (isLoading || travelers.length === 0) {
    return <BubbleLoader />;
  }

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <TodoList travelers={travelers} date={dateToDisplay} />
  );
};

export default TodoTomorrow;
