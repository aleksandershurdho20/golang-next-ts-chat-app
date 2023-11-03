import toast from "react-hot-toast";
import CourseForm from "../../components/Courses/CourseForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  CourseSelector,
  addNewLessonFields,
  handleFormChange,
  handleLessons,
  removeLessonFields,
} from "../../redux/slices/course";
import { UserSelector } from "../../redux/slices/user";
import { api } from "../../utils/api";

export default function CreateCourse() {
  const courseData = useAppSelector(CourseSelector);
  const { user } = useAppSelector(UserSelector);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFormChange(e));
  };
  const addLesson = () => dispatch(addNewLessonFields());

  const handleRemoveLessonFields = (index: number) =>
    dispatch(removeLessonFields(index));
  const handleSubmit = () => {
    api
      .post("course/create", { ...courseData, author_id: user?.id })
      .then((res) => {
        toast.success("Course Created Succesfully!");
        console.log(res);
      })
      .catch((err) => err);
  };
  const handleLessonsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    dispatch(handleLessons({ name, value, index }));
  };
  return (
    <div>
      <CourseForm
        {...courseData}
        handleFormChange={handleChange}
        handleSubmit={handleSubmit}
        addLesson={addLesson}
        handleRemoveLessonFields={handleRemoveLessonFields}
        handleLessonsChange={handleLessonsChange}
      />
    </div>
  );
}
