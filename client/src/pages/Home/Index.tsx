import { useEffect, useState } from "react";
import { get } from "../../utils/api";
import { ListCourses } from "../../types/Courses";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";

export default function Home() {
  const [courses, setCourses] = useState<ListCourses[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  useEffect(() => {
    // get<ListCourses[]>("courses").then((res) => setCourses(res));
    get<{ data: ListCourses[] }>(`/courses/${currentPage}`)
      .then((res) => {
        setCourses(res.data);
        console.log(res, "resko");
      })
      .catch((err) => console.log("err", err));
  }, [currentPage]);

  const limit: number = 5;
  const totalItems: number = courses.length;
  const totalPages: number = Math.ceil(totalItems / limit);
  const handleViewCourse = (id: number) => navigate(`/course/${id}`);
  const updatePage = (page: number) => setCurrentPage(page);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <button>Filter</button>
          <button>Sort</button>
        </div>

        <div className="col-md-10">
          <div className="row  gx-5 gy-4">
            <div className="mt-5">
              <Pagination
                pageSize={5}
                onChange={updatePage}
                current={currentPage}
                total={totalPages}
              />
            </div>
            {courses.length > 0
              ? courses.map((course) => (
                  <div className="col-md-4" key={course.ID}>
                    <div className="card" style={{ width: "19rem" }}>
                      <img
                        className="card-img-top"
                        src="https://www.bootdey.com/image/200x200/D3D3D3"
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">{course.desc}</p>
                        <a
                          href="#"
                          className="btn btn-primary"
                          onClick={() => handleViewCourse(course.ID)}
                        >
                          View
                        </a>
                      </div>
                    </div>

                    {/* <img src='https://i.imgur.com/9jr2ysw.jpeg' style={{width:"10%",height:"5%"}}/>
                        
                        </div>
                        <div className='col'>
                        <h4>{course.title}</h4>
                            <p>{course.desc}</p>
                            <p>rating</p>
                            <span>Maybe another</span>
                        </div>
                        <div>
                            <button>BTN</button>
                        </div> */}
                  </div>
                ))
              : "No courses"}
          </div>
        </div>
      </div>
    </div>
  );
}
