// src/components/Announcements.jsx

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Announcement-1</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Trial-1</p>
        </div>
        {/* Add more announcements as needed */}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaPurple rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Announcement-2</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">holiday for next 3 days</p>
        </div>
        {/* Add more announcements as needed */}
      </div>
    </div>
  );
};

export default Announcements;
