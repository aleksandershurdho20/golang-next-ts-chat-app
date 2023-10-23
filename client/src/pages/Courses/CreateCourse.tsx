import { useState } from "react";
import { Form as CreateCourseFormData } from "../../types/Courses";
import CourseForm from "../../components/Courses/CourseForm";
import { api } from "../../utils/api";

export default function CreateCourse() {
  const [courseData, setCourseData] = useState<CreateCourseFormData>({
    title: "",
    description: "",
    price: 0,
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    api
      .post("course/create", { ...courseData, author_id: 2 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
  };
  return (
    <div>
      <CourseForm
        {...courseData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
