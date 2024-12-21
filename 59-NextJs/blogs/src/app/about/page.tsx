import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-center max-w-2xl">
        Welcome to our blog! We are dedicated to sharing insightful articles and
        updates on the latest topics. Our mission is to create a platform for
        learning and sharing knowledge with the world.
      </p>
    </div>
  );
};

export default AboutPage;
