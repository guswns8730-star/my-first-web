export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-gray-500 font-medium animate-pulse text-lg">데이터를 불러오는 중입니다...</p>
    </div>
  );
}
