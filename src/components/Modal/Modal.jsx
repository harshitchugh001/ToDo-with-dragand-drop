import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../../store/todoSlice';

const Modal = ({ cardStatus, onCloseClick, editTodo, onCardStatusChange }) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState(cardStatus);
    const [imagePreview, setImagePreview] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (editTodo) {
            setTaskName(editTodo.title);
            setStatus(editTodo.status);
            setImagePreview(editTodo.image);
            setDueDate(editTodo.date);
        }
    }, [editTodo]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        onCardStatusChange(e.target.value);
    }

    const handleSubmit = () => {
        if (!taskName || !dueDate) {
            setError('Please fill in all required fields.');
            return;
        }
        const newTodo = {
            id: editTodo ? editTodo.id : Date.now(),
            title: taskName,
            status: cardStatus ? cardStatus : status,
            image: imagePreview,
            date: new Date().toLocaleDateString(),
            duedate: dueDate,
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{editTodo ? "Edit Task" : "Create a Task"}</h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onCloseClick}>X</button>
                </div>
                <div className="mb-4">
                    <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input id="taskName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter a task..." />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select id="status" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={status} onChange={handleStatusChange}>
                        <option defaultValue value="resources">Resources</option>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input id="dueDate" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <label htmlFor="image" className="mt-1 block text-sm font-medium text-blue-600 cursor-pointer">Choose Image</label>
                    <input id="image" className="hidden" type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview ? (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-md" />
                        </div>
                    ) : (
                        <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center">
                            <p className="text-sm text-gray-500">No Image Chosen</p>
                        </div>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={handleSubmit}>{editTodo ? "Update Card" : "Add Card"}</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
