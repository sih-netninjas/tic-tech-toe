"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../../components/InputFields"; // Adjust the path as necessary

// Validation schema
const insertSchema = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required!" }),
  subjectCode: z.string().min(1, { message: "Subject code is required!" }),
  sem: z.string().min(1, { message: "Semester is required!" }), // Changed to string
});

const SubjectInsertForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(insertSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("http://localhost:5000/subjects", {
        // Ensure this matches your API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert data to JSON string
      });

      if (!response.ok) throw new Error("Error inserting subject");

      const result = await response.json(); // Parse JSON response
      console.log("Inserted Subject:", result); // Log inserted subject
    } catch (error) {
      console.error("Error inserting subject:", error); // Log any errors
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Insert New Subject</h1>
      <InputField
        label="Subject Name"
        name="subjectName"
        register={register}
        error={errors.subjectName}
      />
      <InputField
        label="Subject Code"
        name="subjectCode"
        register={register}
        error={errors.subjectCode}
      />
      <InputField
        label="Semester"
        name="sem"
        type="text" // Changed to text input for semester
        register={register}
        error={errors.sem}
      />
      <button className="bg-blue-400 text-white p-2 rounded-md">
        Insert Subject
      </button>
    </form>
  );
};

export default SubjectInsertForm;
