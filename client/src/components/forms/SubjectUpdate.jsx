"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../../components/InputFields"; // Adjust the path as necessary

// Validation schema
const updateSchema = z.object({
  subjectCode: z.string().min(1, { message: "Subject code is required!" }),
  subjectName: z.string().min(1, { message: "Subject name is required!" }),
  sem: z.string().min(1, { message: "Semester is required!" }),
});

const SubjectUpdateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    data.sem = parseInt(data.sem);
    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:5000/subjects/${data.subjectCode}`, // Use subjectCode here
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const j = await response.json();
      console.log(j);
      if (!response.ok) throw new Error("Error updating subject");

      const result = await response.json();
      console.log("Updated Subject:", result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error updating subject:", error);
      // Handle error (e.g., show an error message)
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Update Subject</h1>
      <InputField
        label="Subject Code"
        name="subjectCode"
        type="text"
        register={register}
        error={errors.subjectCode}
      />
      <InputField
        label="Subject Name"
        name="subjectName"
        type="text"
        register={register}
        error={errors.subjectName}
      />
      <InputField
        label="Semester"
        name="sem"
        type="text"
        register={register}
        error={errors.sem}
      />
      <button className="bg-yellow-400 text-white p-2 rounded-md">
        Update Subject
      </button>
    </form>
  );
};

export default SubjectUpdateForm;
