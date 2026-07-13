import { NextResponse } from 'next/server';
import { handleTodoCreateRequest } from '@/lib/todos.mjs';

export async function POST(request: Request) {
  const result = await handleTodoCreateRequest(request);

  return NextResponse.json(result.body, { status: result.status });
}
