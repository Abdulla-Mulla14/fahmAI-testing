'use client';

import { useMemo, useState } from 'react';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../lib/todos.mjs';

export default function Home() {
  const [todos, setTodos] = useState(getTodos);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDetails, setDraftDetails] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const todoCount = useMemo(() => todos.length, [todos]);

  const handleAddTask = () => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setError('Please enter a task title.');
      return;
    }

    createTodo(trimmedTitle);
    setTodos(getTodos());
    setDraftTitle('');
    setDraftDetails('');
    setIsAdding(false);
    setError('');
  };

  const handleEditTask = (id: number) => {
    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      setError('That task no longer exists.');
      return;
    }

    setEditingId(id);
    setDraftTitle(todo.title);
    setDraftDetails(todo.details ?? '');
    setError('');
  };

  const handleSaveEdit = () => {
    if (editingId === null) {
      return;
    }

    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setError('Please enter a task title.');
      return;
    }

    updateTodo(editingId, {
      title: trimmedTitle,
      details: draftDetails.trim(),
    });

    setTodos(getTodos());
    setEditingId(null);
    setDraftTitle('');
    setDraftDetails('');
    setError('');
  };

  const handleDeleteTask = (id: number) => {
    const confirmed = window.confirm('Delete this task?');

    if (!confirmed) {
      return;
    }

    deleteTodo(id);
    setTodos(getTodos());

    if (editingId === id) {
      setEditingId(null);
      setDraftTitle('');
      setDraftDetails('');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Todo App</p>
            <h1 className="text-3xl font-semibold">Manage your tasks</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setDraftTitle('');
              setDraftDetails('');
              setError('');
            }}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
          >
            Add Task
          </button>
        </header>

        {error ? <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

        {isAdding ? (
          <section className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="new-task-title">
              Task title
            </label>
            <input
              id="new-task-title"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0"
              placeholder="What needs to be done?"
            />
            <label className="mb-2 mt-4 block text-sm font-medium text-slate-200" htmlFor="new-task-details">
              Details
            </label>
            <textarea
              id="new-task-details"
              value={draftDetails}
              onChange={(event) => setDraftDetails(event.target.value)}
              className="min-h-24 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0"
              placeholder="Add optional details"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={handleAddTask} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400">
                Save Task
              </button>
              <button type="button" onClick={() => { setIsAdding(false); setDraftTitle(''); setDraftDetails(''); setError(''); }} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800">
                Cancel
              </button>
            </div>
          </section>
        ) : null}

        <section aria-label="Todo list" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your tasks</h2>
            <span className="text-sm text-slate-400">{todoCount} task{todoCount === 1 ? '' : 's'}</span>
          </div>

          {todos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center text-slate-400">
              No tasks yet. Add one to get started.
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {todos.map((todo) => {
                const isEditing = editingId === todo.id;

                return (
                  <li key={todo.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                    {isEditing ? (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor={`edit-${todo.id}`}>
                          Task title
                        </label>
                        <input
                          id={`edit-${todo.id}`}
                          value={draftTitle}
                          onChange={(event) => setDraftTitle(event.target.value)}
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0"
                        />
                        <label className="mb-2 mt-4 block text-sm font-medium text-slate-200" htmlFor={`edit-details-${todo.id}`}>
                          Details
                        </label>
                        <textarea
                          id={`edit-details-${todo.id}`}
                          value={draftDetails}
                          onChange={(event) => setDraftDetails(event.target.value)}
                          className="min-h-20 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0"
                        />
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button type="button" onClick={handleSaveEdit} className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400">
                            Save
                          </button>
                          <button type="button" onClick={() => { setEditingId(null); setDraftTitle(''); setDraftDetails(''); setError(''); }} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white">{todo.title}</p>
                          {todo.details ? <p className="mt-1 text-sm text-slate-400">{todo.details}</p> : null}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => handleEditTask(todo.id)} className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800">
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDeleteTask(todo.id)} className="rounded-lg border border-rose-500/40 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
