// import Image from "next/image";
import React from 'react';
import Link from "next/link";
// import {posts} from "@/data/posts";
import styles from "./HomePage.module.css";

import { testConnection,fetchAllPosts,Post   } from '@/lib/db';

export default async function Home() {
  const client = await testConnection();
   // Fetch posts on the server side
   let posts: Post[] = [];
  try {
    posts = await fetchAllPosts();
  } catch (error) {
    console.error('Error loading posts:', error);
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className={`${styles.title} text-4xl font-bold`}>Welcome to Our Blog</h1>
      {client && <p className="text-lg text-blue-600 mb-6">Connected to Database</p>}
       <Link
        href="/create"
        className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition-all"
      >
        Create New Post
      </Link>
      <p className={`${styles.description} text-lg`}>
        Explore our latest articles, insights, and updates.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className={`${styles.card} bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200`}
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
             <p className="text-sm text-gray-500">
                Published on: {new Date(post.publishedon).toLocaleDateString()}
              </p>
                 <p className="text-sm text-gray-500">
                Publisher: {post.publisher}
              </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
