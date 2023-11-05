import { useEffect, useState } from "react";
import { Eye, Trash } from "react-feather";
import { api, get } from "../../../utils/api";
import type { ListCourses } from "../../../types/Courses";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Courses() {
  const [courses, SetCourses] = useState<ListCourses[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    get<ListCourses[]>("courses")
      .then((res) => SetCourses(res))
      .catch((err) => err);
  }, []);

  const handleViewCourse = (id: number) => navigate(`/update/course/${id}`);
  const handleDeleteCourse = (id: number) => {
    api
      .delete(`/course/${id}`)
      .then(() => {
        const filteredCourses = [...courses].filter(
          (course) => course.ID !== id
        );
        SetCourses(filteredCourses);
        toast.success("Course Deleted succesfully!");
      })
      .catch((err) => toast.error("Error while deleting course"));
  };

  return (
    <div className="py-5 px-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Courses</h2>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/course/create")}
        >
          Create Course
        </button>
      </div>
      <div className="row bg-white py-3 px-2 shadow-md mb-3">
        <div className="col-2 ">
          <span className="text-muted">Title</span>
        </div>
        <div className="col-3">
          <span className="text-muted">Description</span>
        </div>
        <div className="col-2">
          <span className="text-muted">Price</span>
        </div>
        <div className="col-2">
          <span className="text-muted">Lessons</span>
        </div>
        <div className="col-3 text-center">
          <span className="text-muted">Actions</span>
        </div>
      </div>
      <div className="row bg-white mt-2">
        {courses.length > 0
          ? courses.map((course, index) => (
              <div className="row mb-2 mt-2" key={index}>
                <div className="col-2 ">
                  <span className="text-muted">{course.title}</span>
                </div>
                <div className="col-3">
                  <span className="text-muted">{course.description}</span>
                </div>
                <div className="col-2 ms-3">
                  <span className="text-muted">{course.price}</span>
                </div>
                <div className="col-2 ms-3">
                  <span className="text-muted">
                    {course?.lessons?.length || 0}
                  </span>
                </div>
                <div className="col-2 ">
                  <button
                    className="btn  btn-sm mx-1 shadow-md "
                    style={{
                      width: 50,
                      height: 50,
                      border: "2px solid #f8f9fa",
                    }}
                    onClick={() => handleViewCourse(course.ID as number)}
                  >
                    <Eye color="#000" />
                  </button>{" "}
                  <button
                    className="btn  btn-sm mx-1 shadow-md "
                    style={{
                      width: 50,
                      height: 50,
                      border: "2px solid #f8f9fa",
                    }}
                    onClick={() => handleDeleteCourse(course.ID as number)}
                  >
                    <Trash color="red" />
                  </button>{" "}
                </div>
              </div>
            ))
          : "No courses !"}
      </div>
    </div>
  );
}
