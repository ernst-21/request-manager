import { memo } from 'react';

const TravelerDiscussionPanel = (props) => {
  return (
    <h1>
      {props.traveler._id} {props.traveler.name} {props.traveler.country}
    </h1>
  );
};

export default memo(TravelerDiscussionPanel);
