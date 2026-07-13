import test from 'node:test';
import assert from 'node:assert/strict';

import { createTodo, handleTodoCreateRequest } from '../lib/todos.mjs';

test('createTodo defaults new items to not completed', () => {
  const todo = createTodo('Write tests');

  assert.equal(todo.title, 'Write tests');
  assert.equal(todo.done, false);
});

test('handleTodoCreateRequest rejects missing title', async () => {
  const request = new Request('http://localhost/api/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({}),
  });

  const response = await handleTodoCreateRequest(request);

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Title is required.');
});

test('handleTodoCreateRequest rejects empty title values', async () => {
  const request = new Request('http://localhost/api/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: '   ' }),
  });

  const response = await handleTodoCreateRequest(request);

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Title cannot be empty.');
});

test('handleTodoCreateRequest rejects malformed JSON', async () => {
  const request = new Request('http://localhost/api/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{not valid json}',
  });

  const response = await handleTodoCreateRequest(request);

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Malformed JSON payload.');
});
