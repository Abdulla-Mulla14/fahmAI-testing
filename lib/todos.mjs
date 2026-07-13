const todos = [];
let nextId = 1;

export function createTodo(title) {
  const todo = {
    id: nextId++,
    title,
    done: false,
  };

  todos.push(todo);
  return todo;
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
