import { useEffect, useState } from "react";
import { ListCourses } from "../../types/Courses";
import { Review } from "../../types/Reviews";
import { get } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, BookOpen, Command } from "react-feather";
import CourseReviews from "./CourseReviews";
import Stepper from "../../components/Stepper/Index";
import { CourseStepperData } from "../../utils/courses";
import CourseLessons from "./CourseLessons";
import { Lesson } from "../../types/Lessons";
import CourseQuiz from "./CourseQuiz";
import { Quiz } from "../../types/Quiz";

export default function ViewCourse() {
  const [course, setCourse] = useState<ListCourses | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [tab, setTab] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return undefined;
    get<{ data: ListCourses }>(`/course/${id}`).then((res) =>
      setCourse(res.data)
    );

    get<{ data: Review[] }>(`/reviews/${id}`).then((res) =>
      setReviews(res.data)
    );
  }, [id]);

  const onTabChange = (tab: string) => setTab(tab);

  const refreshReviewsList = () => {
    get<{ data: Review[] }>(`/reviews/${id}`).then((res) =>
      setReviews(res.data)
    );
  };

  return (
    <>
      <div className="wrapper" style={{ background: "#000" }}>
        <div className="container">
          <div className="hero py-5 px-5" style={{ height: 250 }}>
            <h2 className="text-white">All Courses</h2>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => navigate("/")}
            >
              <span className="text-white">Back To courses</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container py-5 px-5">
        <div className="row">
          <div className="col-9">
            <h2>{course?.title}</h2>
            <div className="row mb-4">
              <div className="col-md-4">Instructor : Someone</div>
              <div className="col-md-4">Categories: SOmethign </div>
              <div className="col-md-4">Reviews : 4</div>
            </div>

            <Stepper
              tabOptions={CourseStepperData}
              value={tab}
              onTabClick={onTabChange}
            />

            {tab === "review" && (
              <CourseReviews
                courseID={parseInt(id as string) as number}
                refreshReviewsList={refreshReviewsList}
                reviews={reviews}
              />
            )}
            {tab === "lessons" && (
              <CourseLessons lessons={course?.lessons as Lesson[]} />
            )}
            {tab === "quiz" && <CourseQuiz quizes={course?.quizes as Quiz[]} />}
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
              <span>{course?.lessons?.length}</span>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <Command />
                <span className="ms-2">Quizes</span>
              </div>

              <span>{course?.quizes?.length}</span>
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
