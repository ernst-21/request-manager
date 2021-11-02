import { useEffect } from 'react';
import { read } from '../../agent/api-agent';
import { useQuery } from 'react-query';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import auth from '../../auth/auth-helper';
import BubbleLoader from '../../../components/UI/BubbleLoader';
import TravelerSidePanel from '../components/Negotiation/TravelerSidePanel';
import TravelerInfoPanel from '../components/Negotiation/TravelerInfoPanel';
import TravelerDiscussionPanel from '../components/Negotiation/TravelerDiscussionPanel';

const TravelerInfo = () => {
  const siteLocation = useLocation().pathname;
  const jwt = auth.isAuthenticated();
  const userId = useParams().userId;

  const {
    data: user,
    isLoading,
    isError,
    refetch
  } = useQuery('user', () =>
    read({ userId }, { t: jwt.token }).then((data) => data)
  );

  useEffect(() => {
    refetch().then((data) => data);

    //eslint-disable-next-line
  }, [refetch, userId]);

  if (isLoading) {
    return <BubbleLoader />;
  }

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  if (siteLocation === '/users/' + userId + '/discussion') {
    return (
      <div className="traveler-info__view">
        <div className="traveler-sidepanel__wrapper">
          <TravelerSidePanel traveler={user} />
        </div>
        <div className="traveler-info__discussion-panel">
          <TravelerDiscussionPanel traveler={user} />
        </div>
      </div>
    );
  }

  if (siteLocation === '/users/' + userId) {
    return (
      <div className="traveler-info__view">
        <div className="traveler-sidepanel__wrapper">
          <TravelerSidePanel traveler={user} />
        </div>
        <div className="traveler-info__wrapper">
          <TravelerInfoPanel traveler={user} />
        </div>
      </div>
    );
  }
};

export default TravelerInfo;
