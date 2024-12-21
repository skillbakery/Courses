-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,               -- Auto-incrementing ID
  title TEXT NOT NULL,                 -- Title of the blog post
  description TEXT NOT NULL,           -- Description of the blog post
  publishedOn TIMESTAMP DEFAULT NOW(), -- Publication timestamp
  publisher TEXT NOT NULL              -- Publisher name
);


-- Insert sample data into posts table
INSERT INTO posts (title, description, publisher)
VALUES
  ('Introduction to Neon', 'A comprehensive guide to getting started with Neon and PostgreSQL.', 'John Doe'),
  ('PostgreSQL Tips and Tricks', 'Explore advanced features and optimizations in PostgreSQL.', 'Jane Smith'),
  ('Scaling with Neon', 'Learn how to scale your database seamlessly using Neon.', 'Tech Guru'),
  ('Database Security Best Practices', 'Top tips to secure your PostgreSQL database.', 'Cyber Secure');

SELECT * FROM posts;