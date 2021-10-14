import { useQuery } from 'react-query';
import { list } from '../../agent/api-agent';
import BubbleLoader from '../../../components/UI/BubbleLoader';
import { Redirect } from 'react-router-dom';
import TodoList from '../components/TodoList';
import moment from 'moment';

const dateToDisplay = moment().format('dddd, MMMM Do');

const TodoPage = () => {
  const { data: travelers = [], isLoading, isError } = useQuery('travelers', () => list().then(data => data));

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

export default TodoPage;
