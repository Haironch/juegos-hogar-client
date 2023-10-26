import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import "../../App.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { formatTime } from "../../utils/helpers";

import tringuloImg from "/games-images/game2/img1.png";
import cuadradoImg from "/games-images/game2/img3.png";
import hexagonoImg from "/games-images/game2/img2.png";
import pentagonoImg from "/games-images/game2/img5.png";
import circuloImg from "/games-images/game2/img4.png";

const styleFlex = styled.div`
  justify-content: center;
  align-items: center;
`;

const SelectedGameWrapper = styled.div`
  padding: 0 20px;
`;
const SelectedGameContainer = styled.div`
  ${styleFlex};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OptionGameContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: ${(props) =>
    props.flexend === "true" ? "flex-end" : "space-between"};
  align-items: center;
  margin-bottom: 5px;
  /* width: 650px; */
`;

export default function GameTow() {
  const [child, setChild] = useState({});
  const [startedGame, setStartedGame] = useState(false);
  const [n1, setN1] = useState(false);
  const [n2, setN2] = useState(false);
  const [n3, setN3] = useState(false);
  const [n4, setN4] = useState(false);
  const [n5, setN5] = useState(false);

  const [totalSeconds, setTotalSeconds] = useState(0);

  // manage game time
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("selected-child")) {
      setChild(JSON.parse(localStorage.getItem("selected-child")));
    }
  }, [setChild]);

  const handleDropOne = (value) => {
    if (value === "1") {
      setN1(true);
    } else {
      setN1(false);
    }
    setStartedGame(true);
  };

  const handleDropTwo = (value) => {
    if (value === "2") {
      setN2(true);
    } else {
      setN2(false);
    }
    setStartedGame(true);
  };

  const handleDropThree = (value) => {
    if (value === "3") {
      setN3(true);
    } else {
      setN3(false);
    }
    setStartedGame(true);
  };

  const handleDropFour = (value) => {
    if (value === "4") {
      setN4(true);
    } else {
      setN4(false);
    }
    setStartedGame(true);
  };

  const handleDropFive = (value) => {
    if (value === "5") {
      setN5(true);
    } else {
      setN5(false);
    }
    setStartedGame(true);
  };

  const { childId, gameId } = useParams();
  const navigate = useNavigate();

  const setScores = async () => {
    const child_data = {
      time: formatTime(hours, minutes, seconds),
      id_game: gameId,
      id_child: JSON.parse(localStorage.getItem("selected-child")).id,
    };

    const { data } = await axios.post("/api/scores", child_data);
    if (data.status_code === 200) {
      Swal.fire({
        title: "Ganador!",
        icon: "success",
        confirmButtonColor: "#202020",
        confirmButtonText: "Ir al menu de juegos",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate(`/admin/${childId}`);
        }
      });
    } else {
      toast.error(
        "Ha habido un error en el servidor. Intente nuevamente por favor."
      );
    }
  };

  useEffect(() => {
    if (n1 && n2 && n3 && n4 && n5) {
      setStartedGame(false);
      setN1(false);
      setN2(false);
      setN3(false);
      setN4(false);
      setN5(false);

      // request to db...
      setScores();
    }

    if (startedGame) {
      const interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000); // Update every 1000 milliseconds (1 second)

      return () => {
        clearInterval(interval); // Cleanup the interval on component unmount
      };
    }
  }, [n1, n2, n3, n4, n5, startedGame]);

  useEffect(() => {
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(totalSeconds % 60);
  }, [totalSeconds]);

  const isMobile = window.navigator.userAgent.match(
    /(Android|iPhone|iPad|iPod)/i
  );

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <SelectedGameWrapper className=" w-full min-h-screen h-screen max-h-screen bg-bg ">
        <div className=" mt-2 w-full ">
          <p className=" flex justify-center items-center w-[100px] bg-primary text-white text-lg h-[44px] rounded ">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
        <SelectedGameContainer className=" mt-[48px] w-full h-full ">
          <OptionGameContainer flexend={n1.toString()} className=" w-[25%] h-full ">
            {!n1 && <DraggableElement value="1" imgUrl={tringuloImg} />}
            <DropTarget
              onDrop={handleDropFive}
              expectedValue="5"
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n2.toString()} className=" w-[25%] h-full ">
            {!n2 && <DraggableElement value="2" imgUrl={cuadradoImg} />}
            <DropTarget
              onDrop={handleDropFour}
              expectedValue="4"
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n3.toString()} className=" w-[25%] h-full ">
            {!n3 && <DraggableElement value="3" imgUrl={hexagonoImg} />}
            <DropTarget
              onDrop={handleDropThree}
              expectedValue="3"
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n4.toString()} className=" w-[25%] h-full ">
            {!n4 && <DraggableElement value="4" imgUrl={pentagonoImg} />}
            <DropTarget
              onDrop={handleDropTwo}
              expectedValue="2"
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n5.toString()} className=" w-[25%] h-full ">
            {!n5 && <DraggableElement value="5" imgUrl={circuloImg} />}
            <DropTarget
              onDrop={handleDropOne}
              expectedValue="1"
            />
          </OptionGameContainer>
        </SelectedGameContainer>
      </SelectedGameWrapper>
    </DndProvider>
  );
}

const DraggableElement = ({ value, imgUrl }) => {
  const [, ref] = useDrag({
    type: "ELEMENT",
    item: { value },
  });

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // <p className=" w-[80px] h-[80px] text-3xl bg-black "></p>
  return (
    <div ref={ref} className="draggable-element mms:w-full ">
      <img
        src={imgUrl}
        alt=""
        onContextMenu={handleContextMenu}
        className=" mms:w-full mms:h-auto "
      />
    </div>
  );
};

// drop target
const DropTargetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

`;

const DropTarget = ({ onDrop, expectedValue }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ELEMENT",
    drop: (item) => onDrop(item.value),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getImage = () => {
    switch (expectedValue) {
      case "1":
        return <img src={tringuloImg} className=" mms:w-full mms:h-auto " />;
      case "2":
        return <img src={cuadradoImg} className=" mms:w-full mms:h-auto " />;
      case "3":
        return <img src={hexagonoImg} className=" mms:w-full mms:h-auto " />;
      case "4":
        return <img src={pentagonoImg} className=" mms:w-full mms:h-auto " />;
      case "5":
        return <img src={circuloImg} className=" mms:w-full mms:h-auto " />;
    }
  };

  const backgroundColor = isOver && canDrop ? "#EF476F" : "transparent";

  return (
    <DropTargetWrapper
      ref={drop}
      style={{ backgroundColor }}
      className=" mms:full mms:h-auto rounded-[10px] "
    >
      {getImage()}
    </DropTargetWrapper>
  );
};
