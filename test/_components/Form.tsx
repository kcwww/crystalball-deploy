'use client';

import { useRef } from 'react';
import { createTodos } from '@/shared/database/mongodb/action';
import SubmitButton from './SubmitButton';

const Forms = () => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        await createTodos(FormData);
      }}
      className="flex flex-col"
    >
      <h2 className="text-center font-bold text-green-400">Add Todo</h2>
      <label htmlFor="todo" className="py-2">
        Todo
      </label>
      <input type="text" name="todo" className="w-62  mb-2 h-10 p-2" />
      <label htmlFor="todoDeadline" className="py-2">
        Deadline
      </label>
      <input type="date" name="todoDeadline" className=" w-62 h-10 p-2" />
      <SubmitButton />
    </form>
  );
};

export default Forms;
