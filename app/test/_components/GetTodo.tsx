import React from 'react';

import Todo from '@/shared/database/mongodb/model';
import { deleteTodo } from '@/shared/database/mongodb/action';

const GetTodosUI = async () => {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return <h1>No todos</h1>;
    } else {
      return (
        <div>
          {todos.map((todo) => (
            <div key={todo.todo}>
              <h3>{todo.todo as string}</h3>
              <p>{todo.todoDeadline as string}</p>
              <form action={deleteTodo}>
                <input hidden type="text" name="id" />
                <button className="rounded border bg-red-400 p-2">
                  delete
                </button>
              </form>
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }

  return <h1>error</h1>;
};

export default GetTodosUI;
