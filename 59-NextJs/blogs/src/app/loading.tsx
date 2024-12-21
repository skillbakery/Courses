export default function Loading() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Loading Posts...</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Skeleton for each post */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white shadow rounded-lg p-4 space-y-4"
          >
            <div className="bg-gray-300 h-40 w-full rounded-md"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
               <div className="h-4 bg-gray-300 rounded w-2/4"></div>{" "}
              
              <div className="h-4 bg-gray-300 rounded w-1/3"></div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
