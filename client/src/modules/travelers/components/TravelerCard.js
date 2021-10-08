import { memo } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Draggable } from 'react-beautiful-dnd';
import { dateDiff } from '../../../utils/date-wrangler';
import { AiFillDollarCircle, HiUsers, MdFlightTakeoff } from 'react-icons/all';
import { dueDate } from '../../../utils/date-wrangler';

const TravelerCard = (props) => {
  const estimatedDate = dateFormat(props.traveler.estimatedDate[0], 'mmmm, yyyy');

  const travelDuration = props.traveler.duration ? ' ~ ' + props.traveler.duration : ' ~ ' + dateDiff(props.traveler.range[0], props.traveler.range[1]);

  const paxAmount = (props.traveler.adults + props.traveler.young + props.traveler.children + props.traveler.babies);

  const budget = props.traveler.budget ? '$' + props.traveler.budget * paxAmount : '--';

  const dueDateBgColor = dueDate(props.traveler.negotiationDueDate);

  return (
    <Link to={'/users/' + props.traveler._id}>
      <Draggable
        key={props.traveler._id}
        draggableId={props.traveler._id}
        index={props.index}
      >
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: 'none',
                padding: 10,
                margin: '0 0 8px 0',
                height: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                borderRadius: '10px',
                backgroundColor: snapshot.isDragging
                  ? 'rgba(236,236,236, .75)'
                  : '#ffffff',
                color: 'black',
                ...provided.draggableProps.style
              }}
            >
              <div className='pipeline-card__action-date'>
                <div className='pipeline-negoAction__wrapper'>
                  <span>{props.traveler.negotiationStageAction}</span></div>
                <div style={{
                  backgroundColor: dueDateBgColor,
                  color: 'white',
                  padding: '0 .5em',
                  display: 'flex',
                  alignItems: 'center',
                  height: '22px',
                  borderRadius: '4px'
                }}>{dateFormat(props.traveler.negotiationDueDate, 'mmm d')}</div>
              </div>
              <div className='pipeline-card__additional-description-container'>
                <span
                  className='pipeline-card__traveler-name'>{props.traveler.name} {' '} {props.traveler.lastName}</span>
                <span className='pipeline-card__additional-description'>Country: {props.traveler.country}</span>
                <span className='pipeline-card__additional-description'><MdFlightTakeoff
                  className='pipeline-card__icon' /> {dateFormat(props.traveler.range[0], 'dd mmm, yyyy') || estimatedDate} {travelDuration}</span>
                <span className='pipeline-card__additional-description'><HiUsers
                  className='pipeline-card__icon' /> {paxAmount} PAX</span>
                <span className='pipeline-card__additional-description'><AiFillDollarCircle
                  className='pipeline-card__icon' /> {budget}</span>
              </div>

            </div>
          );
        }}
      </Draggable>
    </Link>

  );
};

export default memo(TravelerCard);
