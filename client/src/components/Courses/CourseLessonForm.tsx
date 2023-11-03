import React from "react";
import { Trash } from "react-feather";

import type { Lesson } from "../../types/Lessons";
import TextField from "../TextField/Index";
type Props = {
  index: number;
  lesson: Lesson;
  removeLessonFields: (index: number) => void;
  handleLessonsChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};
export default function CourseLessonForm({
  index,
  lesson,
  removeLessonFields,
  handleLessonsChange,
}: Props) {
  return (
    <>
      <div className="row" key={index}>
        <div className="col">
          <div className="form-floating mb-3">
            <TextField
              type="text"
              wrapperClassname="mb-3"
              label="Title"
              id="title"
              placeholder="title"
              name="title"
              value={lesson.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLessonsChange(e, index)
              }
            />
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <TextField
              type="text"
              wrapperClassname="mb-3"
              label="Content"
              id="content"
              placeholder="content"
              name="content"
              value={lesson.content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLessonsChange(e, index)
              }
            />
          </div>
        </div>
        {index !== 0 && (
          <div className="col">
            <button
              className="btn btn-light rounded-circle btn-sm "
              style={{ width: 50, height: 50 }}
              onClick={() => removeLessonFields(index)}
            >
              <Trash color="#ff7171" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
