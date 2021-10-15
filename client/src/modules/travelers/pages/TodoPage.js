import {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import { list } from '../../agent/api-agent';
import BubbleLoader from '../../../components/UI/BubbleLoader';
import TodoList from '../components/TodoList';
import moment from 'moment';

const dateToDisplay = moment().format('dddd, MMMM Do');

const TodoPage = () => {
  const [redirectToNetError, setRedirectToNetError] = useState(false);
  const { data: travelers = [], isLoading, isError } = useQuery('travelers', () => list().then(res => res.json()).then(data => data), {
    onSuccess: data => {
      if (data && data.error) {
        setRedirectToNetError(true);
      }
    }
  });

  if (isLoading || travelers.length === 0) {
    return <BubbleLoader />;
  }

  if (isError || redirectToNetError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <TodoList travelers={travelers} date={dateToDisplay} />
  );
};

export default TodoPage;
