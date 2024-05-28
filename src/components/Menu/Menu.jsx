import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store/todoSlice';
import { MdEdit, MdDelete } from "react-icons/md";


import './menu.css'

const Menu = ({todo, onClose, onEdit}) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTodo({ id: todo.id, status: todo.status }));
        onClose();
    }

  return (
    <div className='menu-background'>
        <div className='menu'>
            <div className='menu-option'>
                <p onClick={onEdit} className='option'><MdEdit />Edit</p>
                <p onClick={handleDelete} className='option'><MdDelete />Delete</p>
            </div>
            <div className='delete' onClick={onClose}>X</div>
        </div>
    </div>
  )
}

export default Menu
