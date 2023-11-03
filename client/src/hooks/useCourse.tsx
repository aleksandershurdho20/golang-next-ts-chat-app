import { useCallback, useState } from "react";
import type { Lesson } from "../types/Lessons";
export default function useCourse(initialValue: Lesson[]) {
  const [lessons, setLessons] = useState(initialValue);

  //   const addLesson = useCallback(() => {
  //     setLessons((prevLessons) => [...prevLessons, { title: "", content: "" }]);
  //   }, []);

  const addLesson = () =>
    setLessons((prevLessons) => [...prevLessons, { title: "", content: "" }]);

  const removeLesson = useCallback((index: number) => {
    const tempArr = [...lessons].splice(0, index);
    setLessons(tempArr);
  }, []);
  const handleLessonChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = target;
    const tempArr = [...lessons];
    tempArr[index][name] = value;
    setLessons(tempArr);
  };
  return {
    lessons,
    addLesson,
    removeLesson,
    handleLessonChange,
  };
}
