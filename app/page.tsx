import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Todo API
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Create a todo item</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Use the endpoint below to create a new todo with a title. New items default to not completed.
        </p>
        <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm dark:border-zinc-800 dark:bg-zinc-900">
          POST /api/todos
        </div>
        <Link
          href="/api/todos"
          className="mt-6 inline-flex items-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          Try the endpoint
        </Link>
      </div>
    </main>
  );
}
