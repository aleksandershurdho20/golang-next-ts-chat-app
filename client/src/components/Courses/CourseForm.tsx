import {Form,CourseFormProps} from "../../types/Courses"



export default function CourseForm({
  title,
  description,
  price,
  handleFormChange,
  handleSubmit
}:Form &CourseFormProps) {
  return (
    <div>
      <div className="form-group">
        <label>Title</label>
        <input type="text" className='form-control' value={title} name="title" onChange={handleFormChange}/>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input type="text" className='form-control' value={description} name="description" onChange={handleFormChange}/>
      </div>

      <div className="form-group">
        <label>Price</label>
        <input type="number" className='form-control' value={price} name="price" onChange={handleFormChange}/>
      </div>
      <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
    </div>
  )
}
