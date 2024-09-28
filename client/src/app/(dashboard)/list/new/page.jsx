import React from "react";
import SubjectDeleteForm from "../../../../components/forms/SubjectDelete";
import SubjectInsertForm from "../../../../components/forms/SubjectInsert";
import SubjectUpdateForm from "../../../../components/forms/SubjectUpdate";
import BranchInsertForm from "@/components/forms/BranchInsert";
import BranchDeleteForm from "@/components/forms/BranchDelete";
import BranchEditForm from "@/components/forms/BranchEdit";
import TeacherInsertForm from '../../../../components/forms/TeacherInsertForm';
export default function page() {
  return (
    <>
     <div>
      {" "}
      <div className="flex flex-wrap space-x-4">
        <div className=" p-4 bg-white rounded-lg shadow-md">
          <SubjectInsertForm />
        </div>

        <div className=" p-4 bg-white rounded-lg shadow-md">
          <SubjectDeleteForm />
        </div>
      </div>
      <div className="flex flex-wrap space-x-4">
        <div className=" p-4 bg-white rounded-lg shadow-md">
          <SubjectUpdateForm />
        </div>
        <div className=" p-4 bg-white rounded-lg shadow-md">
          <BranchInsertForm />
        </div>
      </div>
      <div className="flex flex-wrap space-x-4">
        <div className=" p-4 bg-white rounded-lg shadow-md">
          <BranchDeleteForm />
        </div>
        <div className=" p-4 bg-white rounded-lg shadow-md">
          <BranchEditForm />
        </div>
      </div>
    </div>
        <TeacherInsertForm/>
    </>

  );
}
