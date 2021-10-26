import {useEffect} from 'react';
import { read } from '../../agent/api-agent';
import { useQuery } from 'react-query';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import auth from '../../auth/auth-helper';
import BubbleLoader from '../../../components/UI/BubbleLoader';
import React from 'react';

const TravelerInfo = () => {
  const siteLocation = useLocation().pathname;
  const jwt = auth.isAuthenticated();
  const userId = useParams().userId;

  const { data: user, isLoading, isError, refetch } = useQuery('user', () => read({ userId }, { t: jwt.token }).then(data => data));

  useEffect(() => {
    refetch().then(data => data);

    //eslint-disable-next-line
  }, [refetch, userId]);

  if (isLoading) {
    return <BubbleLoader />;
  }

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  if (siteLocation === '/users/' + userId + '/discussion') {
    return <h1>{user.name} {user._id}</h1>;
  }

  return (
    user && <h1>{user.name} {user.lastName}</h1>
  );
};

export default TravelerInfo;
