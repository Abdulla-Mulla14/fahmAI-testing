const todos = [];
let nextId = 1;

export function getTodos() {
  return todos;
}

export function createTodo(title) {
  const todo = {
    id: nextId++,
    title,
    details: '',
    done: false,
  };

  todos.push(todo);
  return todo;
}

export function updateTodo(id, updates) {
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    throw new Error('Todo not found.');
  }

  if (typeof updates?.title === 'string') {
    todo.title = updates.title.trim();
  }

  if (typeof updates?.details === 'string') {
    todo.details = updates.details.trim();
  }

  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}

export async function handleTodoCreateRequest(request) {
  try {
    const payload = await request.json();

    if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
      return {
        status: 400,
        body: { error: 'Title is required.' },
      };
    }

    const title = typeof payload.title === 'string' ? payload.title.trim() : '';

    if (!payload.hasOwnProperty('title')) {
      return {
        status: 400,
        body: { error: 'Title is required.' },
      };
    }

    if (title.length === 0) {
      return {
        status: 400,
        body: { error: 'Title cannot be empty.' },
      };
    }

    const todo = createTodo(title);

    return {
      status: 200,
      body: {
        todo,
      },
    };
  } catch (error) {
    return {
      status: 400,
      body: { error: 'Malformed JSON payload.' },
    };
  }
}
