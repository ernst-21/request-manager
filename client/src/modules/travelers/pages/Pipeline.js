import { useMemo, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { list, dragTravelerCard } from '../../agent/api-agent';
import TravelerCard from '../components/TravelerCard';
import { onDragEnd } from '../../../utils/pipeline-draggables';
import BubbleLoader from '../../../components/UI/BubbleLoader';

const Pipeline = () => {
  const [columns, setColumns] = useState([]);
  const { data: travelers = [], isLoading, isError, isFetching } = useQuery('travelers', () => list().then(data => data));

  const queryClient = useQueryClient();

  const { mutate: dragMutation, isError: dragError, isLoading: dragLoading } = useMutation((traveler) => dragTravelerCard(traveler).then(data => data), {
    onSuccess: data => {
      console.log(data);
      queryClient.setQueryData('travelers', old => [...old, data]);
      queryClient.invalidateQueries('travelers');
    }
  });

  const newRequestTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'New Request'), [travelers]);

  const discoveryTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'Discovery'), [travelers]);

  const firstItineraryTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'First Itinerary Creation'), [travelers]);

  const fineTuningTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'Fine Tuning'), [travelers]);

  const validatedTravelers = useMemo(() => travelers.filter(traveler => traveler.negotiationStage === 'Itinerary validated'), [travelers]);

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
      name: 'First Itinerary Creation',
      items: firstItineraryTravelers
    },
    [uuidv4()]: {
      name: 'Fine Tuning',
      items: fineTuningTravelers
    },
    [uuidv4()]: {
      name: 'Itinerary validated',
      items: validatedTravelers
    }
  };

  useEffect(() => {
    if (travelers.length > 0) {
      setColumns(columnsFromBackend);
    }
    //eslint-disable-next-line
  }, [travelers.length]);

  if (isFetching || dragLoading || isLoading || travelers.length === 0) {
    return <BubbleLoader />;
  }

  if (isError || dragError) {
    return <Redirect to="/info-network-error" />;
  }

  return (
    <div className='pipeline-container'>
      <div className='pipeline-columns__container'>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns, dragMutation)}
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
