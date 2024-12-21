import React from "react";
import Link from "next/link";
import { fetchPostById, Post } from "@/lib/db";
// import {posts} from "@/data/posts";

export type PageProps = Promise<{id:number}>;

// export default async function PostPage({ params }: { params: { id: string } }) {
//   const postId = parseInt(params.id, 10);
export default async function PostPage(props:{params:PageProps}) {
  const {id} = await props.params;
  // Fetch the post details by ID
  let post: Post | null = null;
  try {
    post = await fetchPostById(id);
  } catch (error) {
    console.error("Error fetching post details:", error);
  }

  // Handle post not found
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link
          href="/"
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition-all"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  // Render post details
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">{post.title}</h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          {post.description}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Published on: {new Date(post.publishedon).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Publisher: {post.publisher}
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition-all"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
