import { memo } from 'react';

const TravelerSidePanel = (props) => {
  return (
    <div className="traveler-sidepanel__container">
      <div className="traveler-sidepanel__name">
        <h3>
          {props.traveler.name} {props.traveler.lastName}
        </h3>
        <p className='traveler-info__id'>File #{props.traveler._id}</p>
      </div>
      <div className='traveler-sidepanel__nego-stage'>
        <p style={{color: 'gray', fontSize: '1.2rem'}}>{props.traveler.negotiationStage}</p>
        <h2>{props.traveler.negotiationStageAction}</h2>
      </div>
    </div>
  );
};

export default memo(TravelerSidePanel);
