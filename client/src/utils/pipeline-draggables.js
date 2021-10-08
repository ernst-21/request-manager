import moment from 'moment';

const dragendCb = (removed, destColumn, cb) => {
  let traveler;
  let negotiationDueDate = moment().format();
  if (destColumn.name === 'New Request') {
    traveler = {
      id: removed._id,
      negotiationDueDate,
      negotiationStage: 'New Request',
      negotiationStageAction: 'Contact the prospect'
    };
  }
  if (destColumn.name === 'Discovery') {
    traveler = {
      id: removed._id,
      negotiationDueDate,
      negotiationStage: 'Discovery',
      negotiationStageAction: 'Call the prospect'
    };
  }
  if (destColumn.name === 'First Itinerary Creation') {
    traveler = {
      id: removed._id,
      negotiationDueDate,
      negotiationStage: 'First Itinerary Creation',
      negotiationStageAction: 'Send the itinerary'
    };
  }
  if (destColumn.name === 'Fine Tuning') {
    traveler = {
      id: removed._id,
      negotiationDueDate,
      negotiationStage: 'Fine Tuning',
      negotiationStageAction: 'Call the prospect'
    };
  }
  if (destColumn.name === 'Itinerary validated') {
    traveler = {
      id: removed._id,
      negotiationDueDate,
      negotiationStage: 'Itinerary validated',
      negotiationStageAction: 'Send the registration form'
    };
  }
  return cb(traveler);
};

export const onDragEnd = (result, columns, setColumns, apiFunc) => {
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
    dragendCb(removed, destColumn, apiFunc);
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
