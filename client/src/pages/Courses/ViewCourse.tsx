import React, { useEffect, useState } from "react";
import { ListCourses } from "../../types/Courses";
import { get } from "../../utils/api";
import { useParams } from "react-router-dom";
import { Clock, BookOpen, Command } from "react-feather";

export default function ViewCourse() {
  const [course, setCourse] = useState<ListCourses | undefined>(undefined);
  const { id } = useParams();
  useEffect(() => {
    get<{ data: ListCourses }>(`/course/${id}`).then((res) =>
      setCourse(res.data)
    );
  }, [id]);
  console.log(course);
  return (
    <>
      <div className="wrapper" style={{ background: "#000" }}>
        <div className="container">
          <div className="hero py-5 px-5" style={{ height: 250 }}>
            <h2 className="text-white">All Courses</h2>
            <span className="text-white">Breadcrumb</span>
          </div>
        </div>
      </div>
      <div className="container py-5 px-5">
        <div className="row">
          <div className="col-9">
            <h2>Title</h2>
            <div className="row">
              <div className="col-md-4">Instructor : Someone</div>
              <div className="col-md-4">Categories: SOmethign </div>
              <div className="col-md-4">Reviews : 4</div>
            </div>
          </div>
          <div className="col-3">
            <h3>Course Features</h3>

            <div className="d-flex justify-content-between mt-4">
              <div>
                <Clock />
                <span className="ms-2">Duration</span>
              </div>

              <span>500</span>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <BookOpen />
                <span className="ms-2">Lessons</span>
              </div>

              <span>4</span>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <Command />
                <span className="ms-2">Quizes</span>
              </div>

              <span>4</span>
            </div>
            <div className="mt-4">
              <h3>You may like</h3>

              <div className="d-flex flex-row">
                <img
                  className="card-img-top"
                  src="https://www.bootdey.com/image/200x200/D3D3D3"
                  style={{ width: 80 }}
                />
                <div className="d-flex flex-column mt-2 ms-3">
                  <span className="mb-3">title</span>
                  <span>price</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
