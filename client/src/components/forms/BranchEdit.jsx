"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

// Validation schema
const editSchema = z.object({
  branchCode: z.string().min(1, { message: "Branch code is required!" }),
  branchName: z.string().min(1, { message: "Branch name is required!" }),
  semesters: z.array(
    z.object({
      sem: z.number().min(1, { message: "Semester is required!" }),
      subjects: z.array(z.string()).optional(), // Array of subject IDs
    })
  ),
});

const EditBranchForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [branchDetails, setBranchDetails] = useState(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "semesters",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/subjects");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleFetchBranch = async (code) => {
    try {
      const response = await fetch(`http://localhost:5000/branches/${code}`);
      if (!response.ok) throw new Error("Branch not found");

      const data = await response.json();
      setBranchDetails(data);
      setValue("branchName", data.branchName);
      setValue("branchCode", data.branchCode);

      // Set semesters
      data.semesters.forEach((semester) => {
        append({ sem: semester.sem, subjects: semester.subjects });
      });
    } catch (error) {
      setMessage(`Error fetching branch: ${error.message}`);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/branches/${data.branchCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Error updating branch");

      const result = await response.json();
      setMessage(`Successfully updated branch: ${result.branchName}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Edit Branch</h1>

      <input
        type="text"
        placeholder="Enter Branch Code"
        onBlur={(e) => handleFetchBranch(e.target.value)} // Fetch details on blur
        className="border rounded p-2"
      />

      {branchDetails && (
        <>
          <input
            type="text"
            placeholder="Branch Name"
            {...register("branchName")}
            className={`border rounded p-2 ${
              errors.branchName ? "border-red-500" : ""
            }`}
          />
          {errors.branchName && (
            <p className="text-red-500">{errors.branchName.message}</p>
          )}

          <input
            type="text"
            placeholder="Branch Code"
            {...register("branchCode")}
            className={`border rounded p-2 ${
              errors.branchCode ? "border-red-500" : ""
            }`}
          />
          {errors.branchCode && (
            <p className="text-red-500">{errors.branchCode.message}</p>
          )}

          <h2 className="text-lg font-semibold">Semesters</h2>
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2">
              <label>Semester {index + 1}</label>
              <input
                type="number"
                placeholder="Semester Number"
                {...register(`semesters.${index}.sem`)}
                className={`border rounded p-2 ${
                  errors.semesters?.[index]?.sem ? "border-red-500" : ""
                }`}
              />
              {errors.semesters?.[index]?.sem && (
                <p className="text-red-500">
                  {errors.semesters[index].sem.message}
                </p>
              )}

              <label>Subjects</label>
              {/* Render checkboxes for subjects */}
              <div className="flex flex-col">
                {subjects.map((subject) => (
                  <div key={subject._id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subject._id}
                      {...register(`semesters.${index}.subjects`)}
                      checked={item.subjects.includes(subject._id)}
                      className="mr-2"
                    />
                    <label>
                      {subject.subjectName} ({subject.subjectCode})
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-400 text-white p-2 rounded-md"
              >
                Remove Semester
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ sem: fields.length + 1, subjects: [] })} // No sem field needed here
            className="bg-green-400 text-white p-2 rounded-md"
          >
            Add Semester
          </button>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="bg-blue-400 text-white p-2 rounded-md"
          >
            Update Branch
          </button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default EditBranchForm;
