import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast } from "react-toastify";

import CreateUpdateChildModal from "../components/CreateUpdateChildModal";
import GamesContext from "../context/games/Context";

const styleFlex = {
  display: "flex;",
  "justify-content": "center;",
  "align-items": "center;",
};

const AdminPanelWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const AdminPanelContainer = styled.div`
  ${styleFlex};
  flex-direction: column;
  height: 100%;
  width: 100%;
  .games {
    ${styleFlex};
    justify-content: space-between;

    a {
      display: block;
    }
  }
`;
const AdminPanelContent = styled.div`
  width: 90%;
`;
const Table = styled.div`
  width: 100%;

  .table-row-header {
    font-size: 24px;
    border-bottom: 2px solid white;
    div {
      text-align: center;
      width: 30%;
    }
  }
`;

function AdminPanel() {
  const { child_by_id: child, getChildByID } = useContext(GamesContext);
  const { childId } = useParams();
  const [game1, setGame1] = useState(null);
  const [game2, setGame2] = useState(null);
  const [game3, setGame3] = useState(null);

  // const getChildById = async () => {
  //   const { data } = await axios.get(`/api/child/${childId}`)
  //   setChild(data)
  // }
  const getChildScores = async () => {
    const { data } = await axios.get(`/api/scores/${childId}`);
    setGame1(data.scores_1);
    setGame2(data.scores_2);
    setGame3(data.scores_3);
  };
  useEffect(() => {
    getChildByID(childId);
    getChildScores();
  }, []);

  const games = [
    {
      name: "Habilidad numerica",
      level: "Juego 1",
      time: "3.6",
      approved: true,
    },
    {
      name: "Habilidad geometrica",
      level: "Juego 2",
      time: "4.9",
      approved: false,
    },
    {
      name: "Habilidad Gramatical",
      level: "Juego 3",
      time: "9.6",
      approved: true,
    },
  ];

  return (
    <AdminPanelWrapper className=" pb-[20px] ">
      <AdminNavbar />
      <AdminPanelContainer className=" relative my-[20px] h-full bg-bg ">
        <AdminPanelContent className=" h-[calc(100%)] ">
          <ChildHeader child={child} />
          <Table>
            <div className="table-row-header mms:hidden ts:flex justify-between items-center ">
              <div>Juego</div>
              <div>Tiempo</div>
              <div>Habilidad Nueva</div>
            </div>
            {game1 && <ChildRow game={game1} />}
            {game2 && <ChildRow game={game2} />}
            {game3 && <ChildRow game={game3} />}
            {!game1 && !game2 && !game3 && (
              <div className=" flex justify-center items-center w-full h-[100px] ">
                <p>El niño no tiene juegos ganados aún.</p>
              </div>
            )}
          </Table>
        </AdminPanelContent>
      </AdminPanelContainer>
    </AdminPanelWrapper>
  );
}

// style sub components
const ChildRowWrapper = styled.div`
  padding: 0 16px;

  .table-row-name {
    text-align: start;
  }

  div {
    text-align: center;
  }
`;
function ChildRow({ game }) {
  const getGameName = (id) => {
    if (id === 1) {
      return "Juego Númerico";
    }
    if (id === 2) {
      return "Juego Geométrico";
    }
    if (id === 3) {
      return "Juego de Vocales";
    }
  };
  const getGameHability = (id) => {
    if (id === 1) {
      return "Asociativa";
    }
    if (id === 2) {
      return "Geométrica";
    }
    if (id === 3) {
      return "Juego de Vocales";
    }
  };

  const gameName = getGameName(game.id_game);
  const gameHability = getGameHability(game.id_game);

  return (
    <ChildRowWrapper className=" mms:flex-col mms:h-auto ts:flex-row flex h-[48px] justify-between items-center ">
      <div className="table-row-name mms:flex mms:justify-between mms:w-full ts:justify-center ts:w-[30%] ">
        <span className=" ts:hidden mr-2 font-bold ">Juego:</span> <p>{gameName}</p>
      </div>
      <div className=" my-4 mms:flex mms:justify-between mms:w-full ts:justify-center ts:w-[30%] ">
        <span className=" ts:hidden mr-2 font-bold ">Tiempo:</span> <p>{game.time}</p>
      </div>
      <div className=" mms:flex  mms:justify-between mms:w-full ts:justify-center ts:w-[30%] ">
        <span className=" ts:hidden mr-2 font-bold ">Habilidad:</span>
        <p className=" text-dark "> {gameHability}</p>
      </div>
    </ChildRowWrapper>
  );
}

// child header options
const ChildHeaderWrapper = styled.div`
  margin-bottom: 32px;
  width: 100%;

  .child {
    display: flex;
    align-items: center;

    .fa-user-circle {
      margin-right: 12px;
    }
    i {
      font-size: 36px;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }
`;
const Button = styled.button`
  ${styleFlex};
  padding: 8px 18px;
  height: 44px;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;

  i {
    margin-right: 8px;
    font-size: 24px;
  }
`;
const ButtonUpdate = styled(Button)`
  background-color: #62b6cb;
`;
const ButtonDelete = styled(Button)``;

function ChildHeader({ child }) {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const deleteChild = async () => {
    Swal.fire({
      title: "¿Está seguro de eliminar al niño?",
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const { data } = await axios.delete(`/api/child/${child.id}`);
        if (data.status_code === 200) {
          Swal.fire(data.message, "", "success");
          navigate("/admin/panel");
        } else {
          toast.error(data.message);
        }
      } else if (result.isDenied) {
        Swal.fire("Niño no borrado", "", "info");
      }
    });
  };

  return (
    <ChildHeaderWrapper className=" mms:h-auto flex flex-col-reverse h-[150px] ">
      <div className="child w-full ">
        <div>
          <i className="fa-solid fa-user-circle"></i>
        </div>
        <div>
          <h1 className=" text-3xl text-black ">
            <p>
              {child.name} {child.lastname}
            </p>
          </h1>
        </div>
      </div>
      <div className="actions mms:flex-col ts:flex-row flex mb-[32px] w-full ">
        <div>
          <Link
            to="/admin/panel"
            className=" mms:w-full flex justify-center items-center ts:w-[100px] h-[48px] uppercase bg-blue-400 rounded "
          >
            <i className="fa-solid fa-"></i>
            Atrás
          </Link>
        </div>
        <div className=" mms:flex-col ts:flex-row flex ">
          <ButtonUpdate onClick={() => setShowModal(true)} className=" mms:w-auto mms:my-2 ts:my-0 ts:w-[200px] ">
            <i className="fa-solid fa-pen-to-square"></i>
            Modificar datos
          </ButtonUpdate>
          <ButtonDelete
            onClick={deleteChild}
            className=" mms:ml-0 mms:w-full ts:w-[150px] bg-red-500 ts:ml-[24px] text-white "
          >
            <i className="fa-solid fa-times-circle"></i>
            Eliminar
          </ButtonDelete>
        </div>
      </div>

      {showModal && (
        <CreateUpdateChildModal
          state="UPDATE"
          setShowModal={setShowModal}
          child={child}
        />
      )}
    </ChildHeaderWrapper>
  );
}

export default AdminPanel;
