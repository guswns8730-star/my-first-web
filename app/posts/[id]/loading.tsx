export default function PostDetailLoading() {
  return (
    <div className="max-w-screen-md mx-auto py-12 px-4 animate-in fade-in duration-500">
      <header className="mb-12 pb-8 border-b border-gray-100 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-12 w-2/3 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </header>

      <section className="space-y-4 mb-16">
        <div className="h-5 w-full bg-gray-100 rounded-md animate-pulse"></div>
        <div className="h-5 w-full bg-gray-100 rounded-md animate-pulse"></div>
        <div className="h-5 w-full bg-gray-100 rounded-md animate-pulse"></div>
        <div className="h-5 w-3/4 bg-gray-100 rounded-md animate-pulse"></div>
        <div className="h-5 w-full bg-gray-100 rounded-md animate-pulse"></div>
        <div className="h-5 w-5/6 bg-gray-100 rounded-md animate-pulse"></div>
      </section>

      <div className="h-32 w-full bg-gray-50 rounded-3xl animate-pulse"></div>
    </div>
  );
}
