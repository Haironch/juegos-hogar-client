import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import CreateUpdateChildModal from "../components/CreateUpdateChildModal";
import { Button } from "@nextui-org/react";
import GamesContext from "../context/games/Context";

const AdminWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const AdminSubWrapper = styled.div`
  width: 100%;

  .child-list {
    border-radius: 4px;

    a {
      display: block;
      margin-bottom: 32px;
      color: white;
      font-size: 18px;
      padding: 16px 12px;
      border-radius: 4px;
      transition: 300ms all;
    }
  }
`;

function Admin() {
  const [showModal, setShowModal] = useState(false);
  const { childs, getChilds } = useContext(GamesContext);

  const navigate = useNavigate();

  useEffect(() => {
    getChilds();
  }, []);

  const handleRedirect = async (childId) => {
    const { data } = await axios.get(`/api/child/${childId}`);
    localStorage.setItem("selected-child", JSON.stringify(data));
    navigate(`/admin/${childId}`);
  };

  return (
    <AdminWrapper className=" relative pb-[68px] bg-bg overflow-y-auto |">
      <AdminNavbar />
      <AdminSubWrapper className=" mb-[68px] pb-[68px] px-[40px] h-[calc(100%-80px)] border border-bg ">
        <div className=" mms:text-center flex justify-center items-center my-[32px] w-full h-[75px] text-3xl ">
          <h1 className=" text-primary ">
            Seleccione un niño para ingresar a los juegos
          </h1>
        </div>
        <div className="child-list w-full min-h-[400x] h-[calc(50vh)] ">
          {childs.length > 0 ? (
            childs.map((child) => (
              <button
                className=" mms:text-xl lxl:text-base mb-4 px-2 w-full h-[49px] text-start border-y border-dark hover:bg-primary hover:duration-300 "
                onClick={() => handleRedirect(child.id)}
                key={child.id}
              >
                <p>
                  {child.name} {child.lastname}{" "}
                </p>{" "}
              </button>
            ))
          ) : (
            <div className=" flex justify-center items-center text-red-500 w-full min-h-[400px] ">
              <p>No hay niños.</p>
            </div>
          )}
        </div>
        </AdminSubWrapper>
        <Button
          color="primary"
          className=" fixed bottom-[20px] right-[20px] h-[48px] text-lg shadow-2xl "
          onClick={() => setShowModal(true)}
        >
          Agregar Niño
          <i className="fa-solid fa-plus"></i>
        </Button>
        {showModal && (
          <CreateUpdateChildModal state="CREATE" setShowModal={setShowModal} />
        )}
    </AdminWrapper>
  );
}

export default Admin;
