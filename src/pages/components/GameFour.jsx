import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

import ImgOne from "/games-images/game4/img1.jpg";
import ImgTwo from "/games-images/game4/img2.jpg";
import ImgThree from "/games-images/game4/img3.jpg";
import ImgFour from "/games-images/game4/img4.jpg";
import ImgFive from "/games-images/game4/img5.jpg";
import ImgSix from "/games-images/game4/img6.jpg";

import GameFourModal from "./GameFourModal";

const SelectedGameWrapper = styled.div`
  width: 100%;
`;
const Gallery = styled.div`
  width: 100%;
`;

const Sizes = styled.div``;
const SizesCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  font-size: 64px;
  cursor: pointer;
`;
const CustomSize = styled.div`
  width: 200px;
`;

function GameFour() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(ImgOne);
  const [size, setSize] = useState({ x: 1, y: 1 });
  const [inputX, setInputX] = useState("");
  const [inputY, setInputY] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Desactivar el scroll del fondo
    } else {
      document.body.style.overflow = "auto"; // Habilitar el scroll del fondo
    }
  }, [showModal]);

  const setSizes = (x, y) => {
    setSize({ x, y });
    setShowModal(true);
  };

  const setSelectedImage = (img) => {
    setSelectedImg(img);
    const element = ref.current;

    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SelectedGameWrapper  className=" pb-[56px] h-auto bg-bg ">
      <div className=" h-auto [&_div]:mx-[20px] py-[32px] ">
        <div className=" flex flex-wrap justify-center [&_img]:min-w-[250px] [&_div]:cursor-pointer [&_img]:rounded-[10px] ">
          <div className=" mb-[20px] " onClick={() => setSelectedImage(ImgOne)}>
            <img src={ImgOne} alt="" className=" w-[200px] " />
          </div>
          <div className=" mb-[20px] " onClick={() => setSelectedImage(ImgTwo)}>
            <img src={ImgTwo} alt="" className=" w-[200px] " />
          </div>
          <div
            className=" mb-[20px] "
            onClick={() => setSelectedImage(ImgThree)}
          >
            <img src={ImgThree} alt="" className=" w-[200px] " />
          </div>
        </div>
        <div className=" flex flex-wrap justify-center [&_img]:min-w-[250px] [&_div]:cursor-pointer [&_img]:rounded-[10px] ">
          <div
            className=" mb-[20px] "
            onClick={() => setSelectedImage(ImgFour)}
          >
            <img src={ImgFour} alt="" className=" w-[200px] " />
          </div>
          <div
            className=" mb-[20px] "
            onClick={() => setSelectedImage(ImgFive)}
          >
            <img src={ImgFive} alt="" className=" w-[200px] " />
          </div>
          <div className=" mb-[20px] " onClick={() => setSelectedImage(ImgSix)}>
            <img src={ImgSix} alt="" className=" w-[200px] " />
          </div>
        </div>
      </div>

      <div className=" py-[32px] text-center bg-navbar ">
        <div className=" mb-2 text-3xl text-dark ">
          <h1>Imagen seleccionada</h1>
        </div>
        <div className=" flex justify-center w-full ">
          {selectedImg ? (
            <img src={selectedImg} alt="" className=" w-[200px] rounded " />
          ) : (
            <p>Seleccione una imagen</p>
          )}
        </div>
      </div>

      <div className=" mt-[32px] ">
        <div className=" mb-[3px] text-center ">
          <h2 className=" text-dark ">
            <span className=" font-bold ">Nota:</span> Ponga el dispositivo en forma horizontal para jugar.
          </h2>
        </div>
        <Sizes className=" flex justify-center flex-wrap items-center gap-[20px] py-[20px] w-full px-[20px] h-auto bg-navbar ">
          <SizesCard
            onClick={() => setSizes(1, 2)}
            className=" h-full bg-[#3a86ff] rounded-[10px] text-white "
          >
            1x2
          </SizesCard>
          <SizesCard
            onClick={() => setSizes(2, 2)}
            className=" h-full bg-[#aeb8fe] rounded-[10px] "
          >
            2x2
          </SizesCard>
          <SizesCard
            onClick={() => setSizes(2, 4)}
            className=" h-full bg-[#7209b7] rounded-[10px] text-white "
          >
            2x4
          </SizesCard>

          <CustomSize
            ref={ref}
            className=" flex flex-col justify-center items-center p-[10px] w-[25px] h-full bg-[#f2c660] rounded "
          >
            <div className=" mx-auto w-full ">
              <div className=" w-full mb-4 ">
                <input
                  onChange={(e) => setInputX(e.target.value)}
                  value={inputX}
                  type="text"
                  placeholder="Filas"
                  className=" w-full h-[36px] rounded text-sm indent-2 "
                />
              </div>
              <div>
                <input
                  onChange={(e) => setInputY(e.target.value)}
                  value={inputY}
                  type="text"
                  placeholder="Columnas"
                  className=" w-full h-[36px] rounded text-sm indent-2 "
                />
              </div>
            </div>
            <div className=" mt-4 mx-auto w-full ">
              <button
                onClick={() => {
                  setInputX("");
                  setInputY("");
                  setSizes(inputX, inputY);
                }}
                className=" bg-primary text-white w-full h-[40px] rounded "
              >
                Personalizado
              </button>
            </div>
          </CustomSize>
        </Sizes>
      </div>

      {showModal && (
        <GameFourModal
          setShowModal={setShowModal}
          image={selectedImg}
          size={size}
        />
      )}
    </SelectedGameWrapper>
  );
}

export default GameFour;
