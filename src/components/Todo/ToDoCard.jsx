import React, { useState } from 'react'
import './todo.css'
import { CiCircleChevRight } from "react-icons/ci";
import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from '../Menu/Menu';

const ToDoCard = ({id, index, todo, onEdit, innerRef, draggableProps, dragHandleProps}) => {

  const [menu, setMenu] = useState(false);

  const { title, image, date, attach } = todo;

  const handleEdit = () => {
    setMenu(false);
    onEdit(todo);
  }

  const handleMenuClick = () => {
    setMenu(!menu);
  }
  
  return (
    <div 
      {...draggableProps} {...dragHandleProps} ref={innerRef}
      className='todo'
    >
      <div className='imageContainer'>
          {image && <img src={image} className='image' alt=""/>}
      </div>
      <h3 className='title'>{title}</h3>
      <div className='footer-and-menu'>
        <div className='todo-footer'>
            <TfiAlignLeft className='footer' />
            <CiCircleChevRight className='footer' />
            <p className='footer'>{date}</p>
            <AiOutlinePaperClip className='footer' />
            <p className='footer'>{attach}</p>
        </div>
        {menu && (
          <Menu todo={todo} onClose={handleMenuClick} onEdit={handleEdit} />
        )}
        <div className='todo-menu'>
          <BsThreeDotsVertical onClick={handleMenuClick} />
        </div>
      </div>
    </div>
  )
}

export default ToDoCard
