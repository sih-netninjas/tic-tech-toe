"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import InputField from "../../components/InputFields"; // Adjust the path as necessary
import { useEffect, useState } from "react";

// Validation schema
const insertSchema = z.object({
  branchName: z.string().min(1, { message: "Branch name is required!" }),
  branchCode: z.string().min(1, { message: "Branch code is required!" }), // Changed to string for consistency
  semesters: z.array(
    z.object({
      sem: z.number().min(1, { message: "Semester is required!" }),
      subjects: z.array(z.string()).optional(), // Array of subject IDs
    })
  ),
});

const BranchInsertForm = () => {
  const [subjects, setSubjects] = useState([]);
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(insertSchema),
    defaultValues: {
      semesters: [{ subjects: [] }], // Default semester without sem number
    },
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

  const handleFormSubmit = async () => {
    const data = getValues(); // Get current form values

    // Automatically assign semester numbers based on their index
    data.semesters.forEach((semester, index) => {
      semester.sem = index + 1; // Set sem value
    });

    console.log("Submitting data:", data); // Debugging line

    try {
      const response = await fetch("http://localhost:5000/branches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error inserting branch");
      const f = await response.json();
      console.log("Inserted Branch:", f);
      const result = await response.json();
      console.log("Inserted Branch:", result);
    } catch (error) {
      console.error("Error inserting branch:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-xl font-semibold">Insert New Branch</h1>
      <InputField
        label="Branch Name"
        name="branchName"
        register={register}
        error={errors.branchName}
      />
      <InputField
        label="Branch Code"
        name="branchCode"
        type="text" // Changed back to string for consistency
        register={register}
        error={errors.branchCode}
      />

      <h2 className="text-lg font-semibold">Semesters</h2>
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-2">
          {/* Displaying semester number based on index */}
          <label>Semester {index + 1}</label>
          <label>Subjects</label>
          {/* Render checkboxes for subjects */}
          <div className="flex flex-col">
            {subjects
              .filter(
                (subject) => subject.sem === index + 1 // Filter by semester number
              )
              .map((subject) => (
                <div key={subject._id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={subject._id}
                    {...register(`semesters.${index}.subjects`)}
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
        onClick={() => append({ subjects: [] })} // No sem field needed here
        className="bg-green-400 text-white p-2 rounded-md"
      >
        Add Semester
      </button>

      <button
        type="button"
        onClick={handleFormSubmit}
        className="bg-blue-400 text-white p-2 rounded-md"
      >
        Insert Branch
      </button>
    </form>
  );
};

export default BranchInsertForm;
