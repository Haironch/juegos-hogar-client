import styled from "styled-components";
import { useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import Swal from "sweetalert2/dist/sweetalert2.js";

const CreateUpdateChildModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(6, 214, 160, 0.8);
`;

function CreateUpdateChildModal({ setShowModal, image, size }) {
  // const { getChilds, getChildByID } = useContext(GamesContext);

  const [isDragging, setIsDragging] = useState(false);
  const [source, setSource] = useState(null);

  const handleDragStart = (event) => {
    // Evitar que la pagina haga scroll
    event.preventDefault();

    // Establecer el estado de arrastre
    setIsDragging(true);

    // Guardar la pieza que se está arrastrando
    setSource(event.target);
  };

  const handleDragEnd = () => {
    // Borrar el estado de arrastre
    setIsDragging(false);
  };

  const set = () => {
    Swal.fire({
      title: "Ganador!",
      text: "",
      icon: "success",
      confirmButtonColor: "#8338ec",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModal(false);
      }
    });
  };

  return (
    <CreateUpdateChildModalWrapper className=" overflow-y-auto ">
      <div className=" w-[90vh] h-[90vh] bg-navbar rounded-[10px] border-2 border-black ">
        <div className=" flex justify-end items-center px-[50px] w-full h-[64px] ">
          <button
            onClick={() => setShowModal(false)}
            className=" px-[10px] py-[10px] text-white bg-blue-400 rounded "
          >
            Volver
          </button>
        </div>
        <div className=" mx-auto w-[calc(90vh-80px)] h-[calc(90vh-80px)] bg-[#f2c660] ">
          <JigsawPuzzle
            imageSrc={image}
            rows={size.x}
            columns={size.y}
            onSolved={set}
            className=""
            scale={1}
            zoom={1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </div>
      </div>
    </CreateUpdateChildModalWrapper>
  );
}

export default CreateUpdateChildModal;
