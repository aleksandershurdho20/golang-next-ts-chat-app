import { useState } from "react";
import useToogle from "../../hooks/useToogle";
import Rating from "../../components/Rating/Index";
import { api } from "../../utils/api";
import { Review } from "../../types/Reviews";
import { toast } from "react-hot-toast";

type Props = {
  courseID: number;
  refreshReviewsList: () => void;
  reviews: Review[];
};
export default function CourseReviews({
  courseID,
  refreshReviewsList,
  reviews,
}: Props) {
  const { isOpened, handleToogle } = useToogle();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const handleRateChange = (value: number) => {
    setHoverRating(value);
    console.log("hovering");
  };
  const handleRateLeave = () => setHoverRating(0);
  const handleRateSave = (value: number) => setRating(value);

  const handleReviewCreation = () => {
    //TODO: change user_id to dynamic value later
    const params = {
      user_id: 2,
      description,
      course_id: courseID,
      rate: rating,
    };
    api
      .post(`/reviews/create`, params)
      .then(() => {
        setDescription("");
        toast.success("Review created succesfully!");
        setRating(0);
        refreshReviewsList();
      })
      .catch((err) => err);
  };
  return (
    <>
      <button className="btn btn-light mt-4 mb-4" onClick={handleToogle}>
        {isOpened ? "Cancel Review" : "Create Review"}
      </button>
      <div className="row">
        {isOpened && (
          <div className="mb-4">
            <div className="mb-2 w-80">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label>Rate</label>
            <Rating
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={handleRateChange}
              onMouseLeave={handleRateLeave}
              onSaveRating={handleRateSave}
            />
            <button
              className="btn btn-dark mt-4"
              onClick={handleReviewCreation}
            >
              Save
            </button>
          </div>
        )}
        {reviews.length > 0
          ? reviews.map((review) => (
              <div className="row mb-2" key={review.ID}>
                <div className="col-md-2">
                  <img
                    className="card-img-top"
                    src="https://www.bootdey.com/image/200x200/D3D3D3"
                    alt="Card image cap"
                  />
                </div>
                <div className="col-md-8">
                  <h5>User</h5>
                  <span>{review.description}</span>
                </div>
              </div>
            ))
          : "No reviews yet!"}
      </div>
      {/* <div className="row">
        <div className="col-md-6">
          <div className="d-flex">
            5
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            Rated 5 out of 3 ratings
          </div>
        </div>
        <div className="col-md-6">
          5 star
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          100%
        </div>
      </div> */}
    </>
  );
}
