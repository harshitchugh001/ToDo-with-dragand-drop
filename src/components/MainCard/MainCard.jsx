import React from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useSelector } from 'react-redux';
import './maincard.css'
import { deleteTodo } from '../../store/todoSlice';
import ToDoCard from '../Todo/ToDoCard'
import { useDispatch } from 'react-redux';

const MainCard = ({ id, index, status, onStatus, onEdit }) => {

  const columns = useSelector(state => state.todo.columns);
  const categoryHeadings = {
    resources: "Resources",
    todo: "To Do",
    doing: "Doing",
    done: "Done"
  };
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    const filteredColumn = columns.find(column => column.category === status);
    if (!filteredColumn) {
      console.error(`No column found for status: ${status}`);
      return;
    }

    const filteredData = filteredColumn.todos;
    filteredData.forEach(todo => {
      dispatch(deleteTodo({ id: todo.id, status: status }));
    });

    console.log(filteredData);
    // onEdit(null);
  }

  const onButtonClick = () => {
    onStatus(status);
  }

  const heading = categoryHeadings[status];

  const filteredData = columns.find(column => column.category === status).todos;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='maincard-container'
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='maincard'
              >

                <div>
                  <div className='flex justify-between'>
                  <h3 className='heading'>{heading}</h3>
                  {status === 'done' && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={onDeleteClick}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                  </div>


                  <div className="todo-cards-container">

                    {filteredData.map((todo, subIndex) => {
                      return (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={subIndex}>
                          {(provided) => (
                            <ToDoCard
                              key={todo.id}
                              id={todo.id}
                              index={subIndex}
                              todo={todo}
                              onEdit={onEdit}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      )
                    })}

                    {provided.placeholder}
                  </div>
                </div>
                <button className='addNewTask' onClick={onButtonClick}>Add a Card...</button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default MainCard
