// import Announcements from "../../../components/Announcements";
// import BigCalendar from "../../../components/BigCalendar"; // Ensure the spelling is correct
// import EventCalendar from "../../../components/EventCalendar";

// const StudentPage = () => {
//   return (
//     <div className="p-4 flex gap-4 flex-col xl:flex-row">
//       {/*
//       <div className="w-full xl:w-2/3">
//         <div className="h-full bg-white p-4 rounded-md
//           <h1 className="text-xl font-semibold">Schedule (4A)</h1>
//           <BigCalendar />
//         </div>
//       </div>
//       {/* RIGHT SECTION */}
//       <div className="w-full xl:w-1/3 flex flex-col gap-8">
//         <EventCalendar />
//         <Announcements />
//       </div>
//     </div>
//   );
// };

// export default StudentPage;
import React from "react"; // Ensure the spelling is correct
import EventCalendar from "../../../components/EventCalendar";
import Announcements from "../../../components/Announcements";

export default function page() {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
