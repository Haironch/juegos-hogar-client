import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

import figurasImg from "/games-icons/figuras.png";
import numerosImg from "/games-icons/numeros.png";
import puzzleImg from "/games-icons/puzzle.png";
import vocalesImg from "/games-icons/vocales.png";

const styleFlex = {
  display: "flex;",
  "justify-content": "center;",
  "align-items": "center;",
};

const ChildrenWrapper = styled.div``;

const GamesContainer = styled.div`
  ${styleFlex};

  .games {
    width: 100%;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #118ab2;
      border-radius: 10px;
      transition: 300ms transform;

      &:hover {
        transform: translateY(-10px);
      }
    }
  }
`;

function Children() {
  const [child] = useState(JSON.parse(localStorage.getItem("selected-child")));

  return (
    <ChildrenWrapper className=" mms:h-auto lm:h-screen w-full bg-bg ">
      <AdminNavbar child={child} canReturn={false} />

      <div className=" flex justify-end mt-4 px-[40px] ">
        <Link
          to="/admin"
          className=" flex justify-center items-center h-[44px] w-[130px] bg-navbar rounded "
        >
          Listado de Niños
        </Link>
      </div>
      <GamesContainer className=" px-[40px] w-full h-full bg-bg ">
        <div className="games tm:flex flex-wrap gap-2  ">
          <GameImageCard
            to={`/admin/${child.id}/juego/1`}
            img={numerosImg}
            alt="Juego de números"
          />
          <GameImageCard
            to={`/admin/${child.id}/juego/2`}
            img={figurasImg}
            alt="Juego de figuras geométricas"
          />
          <GameImageCard
            to={`/admin/${child.id}/juego/3`}
            img={vocalesImg}
            alt="Juego de vocales"
          />
          <GameImageCard
            to={`/admin/${child.id}/juego/4`}
            img={puzzleImg}
            alt="Juego de rompecabezas"
          />
        </div>
      </GamesContainer>
    </ChildrenWrapper>
  );
}

const GameImageCard = ({ to, img, alt }) => {
  return (
    <Link to={to} className=" my-[32px] mx-auto w-[250px] h-[250px] ">
    <img src={img} alt={alt} />
    </Link>
    );
  };
  
  export default Children;