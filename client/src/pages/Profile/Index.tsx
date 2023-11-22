import TextField from "@/components/TextField/Index";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { UserSelector, handleUserChange } from "@/redux/slices/user";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAppSelector(UserSelector);
  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    dispatch(handleUserChange({ name, value }));
  };
  const handleUpdate = () => {
    api
      .put(`/user/${user?.ID}`, user)
      .then(() => toast.success("Updated succesfully"))
      .catch(() => toast.error("Error!"));
  };
  return (
    <div className="container">
      <div className="row align-content-center justify-content-center min-vh-100">
        <div className="col-md-8">
          <h1>Profile</h1>
          <TextField
            type="text"
            wrapperClassname="mb-3"
            label="FirstName"
            id="firstname"
            placeholder="FirstName"
            name="firstname"
            value={user?.firstname}
            onChange={handleChange}
          />
          <TextField
            type="text"
            wrapperClassname="mb-3"
            label="Lastname"
            id="lastname"
            placeholder="Lastname"
            name="lastname"
            value={user?.lastname}
            onChange={handleChange}
          />
          {/* <TextField
            type="text"
            wrapperClassname="mb-3"
            label="Old Password"
            id="old_password"
            placeholder="Old Password"
            name="old_password"
            value={user?.old_password}
            onChange={handleChange}
          />
          <TextField
            type="text"
            wrapperClassname="mb-3"
            label="Password"
            id="password"
            placeholder="Password"
            name="password"
            value={user?.password}
            onChange={handleChange}
          /> */}
          <TextField
            type="text"
            wrapperClassname="mb-3"
            label="Email"
            id="email"
            placeholder="Email"
            name="email"
            value={user?.email}
            onChange={handleChange}
          />
          <button className="btn btn-dark" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
