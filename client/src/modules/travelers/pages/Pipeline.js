import { useMemo, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { list } from '../../agent/api-agent';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const Pipeline = () => {
  const [columns, setColumns] = useState([]);
  const { data: travelers = [], isLoading, isError } = useQuery('travelers', () => list().then(data => data), {
    onSuccess: data => console.log(data)
  });

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
                <h2 className='pipeline-column__name'>{column.name} ({column.items.length})</h2>
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
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        height: '168px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '10px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : 'white',
                                        color: 'black',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <h3>{item.negotiationStageAction}</h3>
                                      {item.name}
                                    </div>
                                  );
                                }}
                              </Draggable>
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
