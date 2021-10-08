import { useMemo, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { list } from '../../agent/api-agent';
import TravelerCard from '../components/TravelerCard';
import {onDragEnd} from '../../../utils/pipeline-draggables';

const Pipeline = () => {
  const [columns, setColumns] = useState([]);
  const { data: travelers = [], isLoading, isError } = useQuery('travelers', () => list().then(data => data));

  const newRequestTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'New Request'), [travelers]);

  const discoveryTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'Discovery'), [travelers]);

  const firstIntinerarytTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'First Itinerary'), [travelers]);

  const fineTuningTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'Fine Tuning'), [travelers]);

  const columnsFromBackend = {
    [uuidv4()]: {
      name: 'New Request',
      items: newRequestTravelers
    },
    [uuidv4()]: {
      name: 'Discovery',
      items: discoveryTravelers
    },
    [uuidv4()]: {
      name: 'First Itinerary',
      items: firstIntinerarytTravelers
    },
    [uuidv4()]: {
      name: 'Fine Tuning',
      items: fineTuningTravelers
    }
  };

  useEffect(() => {
    if (travelers.length > 0) {
      setColumns(columnsFromBackend);
    }
    //eslint-disable-next-line
  }, [travelers.length]);

  if (isLoading || travelers.length === 0) {
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <div className='pipeline-container'>
      <div className='pipeline-columns__container'>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                className='pipeline-column'
                key={columnId}
              >
                <h2 className='pipeline-column__name'>
                  {column.name} ({column.items.length})
                </h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className='pipeline-card__container'
                          style={{
                            border: snapshot.isDraggingOver
                              ? '2px dashed white'
                              : 'none'
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <TravelerCard
                                key={item._id}
                                traveler={item}
                                index={index}
                              />
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Pipeline;
