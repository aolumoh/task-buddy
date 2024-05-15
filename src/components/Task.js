import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'


function Task({ task, toggleComplete, deleteTask, editTask }) {

  return (
    <div className='task flex'>
      <p className={`${task.completed ? 'completed' : ''}`}> {task.task} </p>
      <div className='date-icons'>
        <p className='date'>{task.date}</p>
        <div className='icons'>
          <FontAwesomeIcon icon={faCheckCircle} className={`icon check ${task.completed ? 'checked' : ''}`} onClick={() => toggleComplete(task.id)} />
          <FontAwesomeIcon icon={faPenToSquare} className='icon' onClick={() => editTask(task.id)} />
          <FontAwesomeIcon icon={faTrash} className='icon' onClick={() => deleteTask(task.id)} />
        </div>
      </div>

    </div>
  );
}

export default Task;