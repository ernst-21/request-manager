import { memo } from 'react';
import TravelerMainInfoCard from './TravelerMainInfoCard';
import TravelerProfileCard from './TravelerProfileCard';

const TravelerInfoPanel = (props) => {
  return (
    <div className='traveler-info__panel'>
      <div className='traveler-info__main-info-card'>
        <TravelerMainInfoCard traveler={props.traveler} />
      </div>
      <div className='traveler-info__main-info-card'>
        <TravelerProfileCard traveler={props.traveler} />
      </div>
    </div>
  );
};

export default memo(TravelerInfoPanel);
