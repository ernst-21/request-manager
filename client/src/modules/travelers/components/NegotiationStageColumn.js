import {memo} from 'react';

const NegotiationStageColumn = (props) => {
  return (
    <div className='negotiation-stage'>
      {props.children}
    </div>
  );
};

export default memo(NegotiationStageColumn);
