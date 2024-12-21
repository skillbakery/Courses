'use client';
import { useState } from 'react';
import { useSession, signIn } from "next-auth/react";

export default function CreatePostPage() {
  const { data: session, status } = useSession();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [publisher, setPublisher] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
   // Handle session states
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>You must be signed in to add a post</h1>
        <button
          onClick={() => signIn('github')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Sign In
        </button>
      </div>
    );
  }
  const publisher = session.user?.name || session.user?.email || "Anonymous";
   async function handleGenerateContent() {
    if (!title) {
      setError("Title is required to generate content.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        const data = await res.json();
        setDescription(data.content);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to generate content.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Client-side validation
    if (!title || !description || !publisher) {
      setError('All fields are required.');
      return;
    }
    
    try {
      const res = await fetch('/api/add-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, publisher }),
      });

      if (res.ok) {
        setSuccess('Post added successfully!');
        setTitle('');
        setDescription('');
        //setPublisher('');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add post');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            onClick={handleGenerateContent}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
         </div>
         <div>
          <label className="block font-medium">Publisher</label>
          <input
            type="text"
            value={publisher}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
