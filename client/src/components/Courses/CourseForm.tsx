import useStepper from "../../hooks/useStepper";
import { CourseFormProps, Form } from "../../types/Courses";
import { CourseFormData } from "../../utils/courses";
import Stepper from "../Stepper/Index";
import TextField from "../TextField/Index";
import CourseLessonForm from "./CourseLessonForm";
import CourseQuizForm from "./CourseQuizForm";

export default function CourseForm({
  title,
  description,
  price,
  lessons,
  handleFormChange,
  handleSubmit,
  addLesson,
  handleRemoveLessonFields,
  handleLessonsChange,
}: Form & CourseFormProps) {
  const { tab, onTabChange } = useStepper("overview");

  return (
    <div className="row mx-0">
      <div className="container">
        <h2 className="text-center">Create Course</h2>

        <div className="row mx-auto py-5 px-5">
          <div className="col-md-9 mb-5">
            <Stepper
              value={tab}
              tabOptions={CourseFormData}
              onTabClick={onTabChange}
            />
          </div>
          {tab === "overview" && (
            <>
              <div className="col-md-12">
                <TextField
                  type="text"
                  wrapperClassname="mb-3"
                  label="Title"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleFormChange}
                  placeholder="Title"
                />
              </div>
              <div className="col-md-12">
                <TextField
                  type="text"
                  wrapperClassname="mb-3"
                  label="Description"
                  id="description"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleFormChange}
                />
              </div>
              <div className="col-md-12">
                <div className="form-floating mb-3">
                  <TextField
                    type="number"
                    wrapperClassname="mb-3"
                    label="Price"
                    id="price"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </>
          )}

          {tab === "lessons" && (
            <>
              {lessons.map((lesson, index) => (
                <CourseLessonForm
                  lesson={lesson}
                  index={index}
                  removeLessonFields={handleRemoveLessonFields}
                  handleLessonsChange={handleLessonsChange}
                />
              ))}
              <button onClick={addLesson} className="btn btn-primary w-25">
                Add
              </button>
            </>
          )}
          {tab === "quiz" && <CourseQuizForm />}
          <div className="d-flex justify-content-center">
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create
            </button>
            <button
              className="btn btn-gray fw-bolder"
              style={{ background: "#E7E7E7" }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
