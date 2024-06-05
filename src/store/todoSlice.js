import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../utils/localstorage';

const persistedState = loadState();

const initialState = persistedState || {
    todos: [],
    columns: [
      { 
        id: 1,
        category: 'resources',
        todos: [],
      },
      {
        id: 2,
        category: 'todo',
        todos: [],
      },
      {
        id: 3,
        category: 'doing',
        todos: [],
      },
      {
        id: 4,
        category: 'done',
        todos: [],
      },
    ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      state.columns = state.columns.map((column) => column.category === action.payload.status ? {...column, todos: [...column.todos, action.payload]} : column);
      saveState(state); // Save state to local storage
    },
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;

      state.todos = state.todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      );

      const prevColumn = state.columns.find(column => {
        return column.todos.some(todo => todo.id === id);
      });

      if (prevColumn.category !== updates.status) {
        prevColumn.todos = prevColumn.todos.filter(todo => todo.id !== id);

        const updatedColumn = state.columns.find(column => column.category === updates.status);
        updatedColumn.todos.push(updates);
        state.columns = state.columns.map(column => 
          column.category === prevColumn.category ? prevColumn : column
        );
      } else {
        state.columns = state.columns.map(column => 
          (column.category === updates.status) ? {...column, todos: column.todos.map(todo => todo.id === id ? {...todo, ...updates} : todo)} : column
        );          
      }
      saveState(state); // Save state to local storage
    },
    deleteTodo: (state, action) => {
      const { id, status } = action.payload;
      state.todos = state.todos.filter(todo => todo.id !== id);

      state.columns = state.columns.map(column => 
        column.category === status ? {...column, todos: column.todos.filter(todo => todo.id !== id)} : column
      );
      saveState(state); // Save state to local storage
    },   
    moveTodo: (state, action) => {
      const newColumn = action.payload;
      state.todos = newColumn.map(column => column.todos).flat();
      state.columns = newColumn;
      saveState(state); // Save state to local storage
    },     
  },
});

export const { addTodo, updateTodo, deleteTodo, moveTodo } = todoSlice.actions;

export default todoSlice.reducer;
