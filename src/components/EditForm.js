import { useState } from 'react';

function EditForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);
  const handleSubmit = e => {
    e.preventDefault();

    editTodo(value, task.id);

    setValue('');
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type='text' className='input' placeholder='Make your changes'
        onChange={(e) => setValue(e.target.value)} value={value} />
      <button type='submit' className='submit-btn'>Update Task</button>
    </form>
  );
}

export default EditForm;