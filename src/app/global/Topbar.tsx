export default function Topbar() {
    return (
      <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-8 shadow-lg">
        <h1 className="text-xl font-bold">Mwhmart Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, User!</span>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
            Logout
          </button>
        </div>
      </div>
    );
  }
  