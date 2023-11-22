import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseForm from "../../components/Courses/CourseForm";
import { api, get } from "../../utils/api";
import type { ListCourses } from "../../types/Courses";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CourseSelector, getCourse } from "../../redux/slices/course";
import toast from "react-hot-toast";

export default function UpdateCourse() {
  const { id } = useParams();
  const courseData = useAppSelector(CourseSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourse(id as string));
  }, [id]);

  const handleSubmit = () => {
    api
      .put(`/course/${id}`, courseData)
      .then(() => toast.success("Course Updated succesfully!"));
  };
  return (
    <div>
      <CourseForm handleSubmit={handleSubmit} />
    </div>
  );
}
