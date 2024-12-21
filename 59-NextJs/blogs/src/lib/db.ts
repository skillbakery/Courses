import { neon } from "@neondatabase/serverless";

export type Post = {
  id: number;
  title: string;
  description: string;
  publishedon: string;
  publisher: string;
};
// Create a Neon client
export const getNeonClient = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not defined in the environment variables."
    );
  }
  return neon(process.env.DATABASE_URL);
};

// Test the database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const sql = getNeonClient();
    await sql("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};

// Method to fetch all posts
export async function fetchAllPosts(): Promise<Post[]> {
  const sql = getNeonClient();
  try {
    // Query to fetch all posts
    const posts =
      (await sql`SELECT id, title, description, publishedon, publisher FROM posts`) as Post[];
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts from the database.");
  }
}

// Fetch a single post by ID
export async function fetchPostById(id: number): Promise<Post | null> {
  const sql = getNeonClient();
  try {
    // Simulate an error for testing purposes
    if (id < 0) {
      throw new Error("Invalid ID: ID cannot be negative.");
    }
    const result =
      (await sql`SELECT id, title, description, publishedon, publisher FROM posts WHERE id = ${id}`) as Post[];
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post by ID");
  }
}

// Method to insert a new post
export async function insertPost(
  title: string,
  description: string,
  publisher: string
) {
  const sql = getNeonClient();
  try {
    await sql`INSERT INTO posts (title, description, publishedon, publisher) VALUES (${title}, ${description}, NOW(), ${publisher})`;
    console.log("Post inserted successfully");
  } catch (error) {
    console.error("Error inserting post:", error);
    throw new Error("Failed to insert post");
  }
}
