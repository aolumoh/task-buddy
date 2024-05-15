import { useState } from 'react';

function Form({ addTodo }) {
  const [value, setValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();

    addTodo(value);

    setValue('');
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type='text' className='input' placeholder='What are we doing today?'
        onChange={(e) => setValue(e.target.value)} value={value} />
      <button type='submit' className='submit-btn'>Add Task</button>
    </form>
  );
}

export default Form;