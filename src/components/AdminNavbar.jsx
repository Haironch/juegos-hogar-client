import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 76px;

  .user {
    display: inherit;
    align-items: center;

    .fa-user-circle {
      margin-right: 12px;
    }
  }
`;

function AdminNavbar({ child, canReturn }) {
  const [user] = useState(JSON.parse(localStorage.getItem("user_data")));

  const navigate = useNavigate();
  const { childId } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("selected-child");
    navigate("/");
  };

  return (
    <AdminNavbarWrapper className=" select-none px-[40px] bg-navbar text-dark border-b-4 border-white ">
      {child === null || child === undefined ? (
        <Link to="/admin/panel" className=" user ">
          <div>
            <i className=" text-3xl fa-solid fa-user-circle"></i>
          </div>
          <div>
            <p className=" font-font ">
              {user.name} {user.lastname}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex items-center ">
          <div>
            <i className=" mr-2 text-3xl fa-solid fa-child "></i>
          </div>
          <div>
            <p>
              {child?.name} {child?.lastname}
            </p>
          </div>
        </div>
      )}
      <div className=" flex ">
        {canReturn ? (
          <div className=" mr-5 ">
            <Link
              to={`/admin/${childId}`}
              className=" flex justify-center items-center w-[70px] h-[48px] uppercase bg-primary text-white rounded "
            >
              <i className=" text-2xl fa-solid fa-arrow-left-long"></i>
            </Link>
          </div>
        ) : (
          <div onClick={handleLogout}>
            <i className=" text-3xl fa-solid fa-right-from-bracket"></i>
          </div>
        )}
      </div>
    </AdminNavbarWrapper>
  );
}

export default AdminNavbar;
