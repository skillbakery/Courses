'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error logged:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800">
      <h1 className="text-4xl font-bold mb-4">Something Went Wrong!</h1>
      <p className="text-lg mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-700 transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
