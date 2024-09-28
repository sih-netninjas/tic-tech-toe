import Announcements from "../../../components/Announcements";
import UserCard from "../../../components/UserCard";
import BigCalendar from "../../../components/BigCalendar";
import CountChart from "../../../components/CountChart";
import AttendanceChart from "../../../components/AttendanceChart";
import EventCalendar from "../../../components/EventCalendar";
import FinanceChart from "../../../components/FinanceChart";
import SubjectDeleteForm from "../../../components/forms/SubjectDelete";
import SubjectInsertForm from "../../../components/forms/SubjectInsert";
import SubjectUpdateForm from "../../../components/forms/SubjectUpdate";
import BranchInsertForm from "@/components/forms/BranchInsert";
import BranchDeleteForm from "@/components/forms/BranchDelete";
import BranchEditForm from "@/components/forms/BranchEdit";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
        <SubjectInsertForm />
        <SubjectDeleteForm />
        <SubjectUpdateForm />
        <BranchInsertForm />
        <BranchDeleteForm />
        <BranchEditForm />
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
