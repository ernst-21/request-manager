import NegotiationStageColumn from '../components/NegotiationStageColumn';

const negotiationStages = ['New Request', 'Discovery', 'First Itinerary', 'Fine Tuning'];

const Pipeline = () => {
  return (
    <div className='pipeline-container'>
      {negotiationStages.map(stage => (<NegotiationStageColumn key={stage}>
        <div className='stage-title'><h1>{stage}</h1></div>
      </NegotiationStageColumn>))}
    </div>
  );
};

export default Pipeline;
