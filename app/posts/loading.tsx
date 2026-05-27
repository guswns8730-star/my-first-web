export default function PostsLoading() {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-3">
          <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-5 w-64 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-gray-100 rounded-3xl p-6 space-y-4">
            <div className="aspect-video w-full bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-gray-100 rounded-md animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
            <div className="pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
