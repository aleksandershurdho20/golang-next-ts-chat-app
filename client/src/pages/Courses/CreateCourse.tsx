import toast from "react-hot-toast";
import CourseForm from "../../components/Courses/CourseForm";
import { useAppSelector } from "../../hooks/redux";
import { CourseSelector } from "../../redux/slices/course";
import { UserSelector } from "../../redux/slices/user";
import { api } from "../../utils/api";

export default function CreateCourse() {
  const courseData = useAppSelector(CourseSelector);
  const { user } = useAppSelector(UserSelector);

  const handleSubmit = () => {
    api
      .post("course/create", { ...courseData, author_id: user?.id })
      .then((res) => {
        toast.success("Course Created Succesfully!");
        console.log(res);
      })
      .catch((err) => err);
  };

  return (
    <div>
      <CourseForm handleSubmit={handleSubmit} />
    </div>
  );
}
