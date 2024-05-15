import Title from './components/Title';
import Form from './components/Form';
import Task from './components/Task';
import { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditForm from './components/EditForm';
uuidv4();

function reducer(state, action) {
  switch (action.type) {

    case 'ADD_TODO':
      return [...state, {
        id: uuidv4(), task: action.payload, completed: false, isEditing: false,
        date: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) + ' ' + new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      }];

    case 'TOGGLE_COMPLETE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo);
    case 'DELETE_TASK':
      return state.filter(todo => todo.id !== action.payload);
    case 'EDIT_TASK':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, isEditing: !todo.isEditing } : todo);

    case 'EDIT_TEXT':
      return state.map(todo =>
        todo.id === action.payload.id ? {
          ...todo, task: action.payload.task, isEditing: !todo.isEditing, date: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }) + ' ' + new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        } : todo);
    default:
      return state;
  }
}

function App() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = todo => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  }

  const toggleComplete = id => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  }

  const deleteTask = id => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  const editTask = id => {
    dispatch({ type: 'EDIT_TASK', payload: id });
  }

  const editText = (task, id) => {
    dispatch({ type: 'EDIT_TEXT', payload: { task, id } });
  }

  return (
    <>
      <Title />
      <main>
        <div className='container'>
          <Form addTodo={addTodo} />
          <div className='taskArea'>
          {todos.map((task, index) => (
            task.isEditing ? (
              <EditForm editTodo={editText} task={task} />
            ) : (
              <Task task={task} key={index} toggleComplete={toggleComplete}
                deleteTask={deleteTask} editTask={editTask} date={task.date} />
            )
          ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
