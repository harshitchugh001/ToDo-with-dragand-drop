import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../../store/todoSlice';
import './modal.css'

const Modal = ({ cardStatus, onCloseClick, editTodo, onCardStatusChange }) => {
    
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState(cardStatus);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (editTodo) {
            setTaskName(editTodo.title);
            setStatus(editTodo.status);
            setImagePreview(editTodo.image);
        }
    }, [editTodo]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        onCardStatusChange(e.target.value);
    }

    const handleSubmit = () => {
        const newTodo = {
            id: editTodo ? editTodo.id : Date.now(),
            title: taskName,
            status: cardStatus ? cardStatus : status,
            image: imagePreview,
            date: new Date().toLocaleDateString(),
            attach: 5,
        };
        if (editTodo) {
            dispatch(updateTodo({ id: editTodo.id, updates: newTodo }));
        } else {
            dispatch(addTodo(newTodo));
        }

        setTaskName('');
        setStatus('resources');
        setImagePreview(null);
        onCloseClick();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='top'>
            <h3 className='modalTitle'>{editTodo ? "Edit Task" : "Create a Task"}</h3>
            <button className='closeModal' onClick={() => onCloseClick()}>X</button>
            </div>
            <label htmlFor='taskName' className='label'>Task Name</label>
            <input id='taskName' className='modalInput' type='text' value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Enter a task...' />
            <label htmlFor='status' className='label'>Status</label>
            <select id='status' className='modalInput' value={status} onChange={handleStatusChange}>
                <option defaultValue value='resources'>Resources</option> 
                <option value='todo'>To Do</option>
                <option value='doing'>Doing</option>
                <option value='done'>Done</option>
            </select>
            <label className='label'>Image</label>
            <label htmlFor='image' className='inputImage'>Choose Image</label>
            <input id='image' className='fileInput' type='file' accept='image/*' onChange={handleImageChange} />
            {imagePreview ? (
                <div>
                    <img src={imagePreview} alt='Preview' className='imagePreview' />
                </div>
            ) : 
            (
                <div className='imagePreviewContainer'>
                    <p className='imagePreviewText'>No Image Choosen</p>
                </div>
            )
        }
            <button className='modalSubmit' onClick={handleSubmit}>{editTodo ? "Update Card" : "Add Card"}</button>
        </div>
    </div>
  )
}

export default Modal
