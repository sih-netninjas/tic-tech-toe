"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

const insertSchema = z.object({
  teacherName: z.string().min(1, { message: "Teacher name is required!" }),
  branch: z.string().min(1, { message: "Branch is required!" }),
  subjects: z.array(z.string()).min(1, { message: "At least one subject must be selected!" }),
});

const TeacherInsertForm = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranchSubjects, setSelectedBranchSubjects] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(insertSchema),
  });

  const fetchBranches = async () => {
    const response = await fetch("http://localhost:5000/branches");
    const data = await response.json();
    setBranches(data);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const selectedBranchId = watch("branch");

  useEffect(() => {
    if (selectedBranchId) {
      const selectedBranch = branches.find(branch => branch._id === selectedBranchId);
      if (selectedBranch) {
        const allSubjects = selectedBranch.semesters.flatMap(semester => semester.subjects);
        setSelectedBranchSubjects(allSubjects);
      }
    } else {
      setSelectedBranchSubjects([]);
    }
  }, [selectedBranchId, branches]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error inserting teacher");

      const result = await response.json();
      console.log("Inserted Teacher:", result);

      alert("Teacher record inserted successfully!");

    } catch (error) {
      console.error("Error inserting teacher:", error);
      alert("Failed to insert teacher record.");
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-black">Insert New Teacher</h1>

      <label htmlFor="teacherName" className="text-black">Teacher Name:</label>
      <input
        type="text"
        id="teacherName"
        {...register("teacherName")}
        className={`border ${errors.teacherName ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.teacherName && <span className="text-red-500">{errors.teacherName.message}</span>}

      <label htmlFor="branch" className="text-black">Branch:</label>
      <select id="branch" {...register("branch")} className={`border ${errors.branch ? 'border-red-500' : 'border-gray-300'}`}>
        <option value="">Select a branch</option>
        {branches.map((branch) => (
          <option key={branch._id} value={branch._id}>{branch.branchName}</option>
        ))}
      </select>
      {errors.branch && <span className="text-red-500">{errors.branch.message}</span>}

      <fieldset>
        <legend className="text-black">Subjects:</legend>
        <div className="max-h-32 overflow-y-auto border border-gray-300 p-2">
          {selectedBranchSubjects.map((subject) => (
            <div key={subject._id} className="flex items-center">
              <input
                type="checkbox"
                id={subject._id}
                value={subject._id}
                {...register("subjects")}
                className="mr-2"
              />
              <label htmlFor={subject._id} className="text-black">
                {subject.subjectName} ({subject.subjectCode})
              </label>
            </div>
          ))}
          {errors.subjects && <span className="text-red-500">{errors.subjects.message}</span>}
        </div>
      </fieldset>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        Insert Teacher
      </button>
    </form>
  );
};

export default TeacherInsertForm;