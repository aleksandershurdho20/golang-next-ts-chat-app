import React, { useState } from "react";
import { Lesson } from "../../types/Lessons";
import { ArrowUp, ArrowDown } from "react-feather";

type Props = {
  lessons: Lesson[];
};
export default function CourseLessons({ lessons }: Props) {
  const [accordion, setAccordion] = useState({});
  const handleLessonAccordion = (i: number) => {
    setAccordion((prev) => ({ ...prev, [`lesson${i}`]: !prev[`lesson${i}`] }));
  };
  return (
    <>
      {lessons.length > 0
        ? lessons.map((lesson) => (
            <div className="card mb-2 mt-2" key={lesson.ID}>
              <div className="card-header d-flex justify-content-between bg-white">
                <span>{lesson.title}</span>
                <button
                  className="btn btn-sm"
                  onClick={() => handleLessonAccordion(lesson.ID)}
                >
                  {accordion[`lesson${lesson.ID}`] ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                </button>
              </div>
              {accordion[`lesson${lesson.ID}`] && (
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">{lesson.content}</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              )}
            </div>
          ))
        : "No lessons yet!"}
    </>
  );
}
