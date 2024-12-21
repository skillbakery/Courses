import { NextRequest, NextResponse } from 'next/server';
import { insertPost } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { title, description, publisher } = await req.json();

    // Server-side validation
    if (!title || !description || !publisher) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Insert the post into the database
    await insertPost(title, description, publisher);
    return NextResponse.json({ message: 'Post added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding post:', error);
    return NextResponse.json({ message: 'Failed to add post' }, { status: 500 });
  }
}
