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
import { toast } from "react-toastify";

import { formatTime } from "../../utils/helpers";

// game images
import oneImg from '/games-images/game1/one.png'
import twoImg from '/games-images/game1/two.png'
import threeImg from '/games-images/game1/three.png'
import fourImg from '/games-images/game1/four.png'
import fiveImg from '/games-images/game1/five.png'

const SelectedGameWrapper = styled.div`
  padding: 0 20px;
`;
const OptionGameContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.flexend === "true" ? "flex-end" : "space-between"};
  align-items: center;
  margin-bottom: 5px;
`;

function SelectedGame() {
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

      // sent data to the api
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
      <SelectedGameWrapper className=" w-full h-screen bg-bg ">
        <div className=" mt-2 w-full ">
          <p className=" flex justify-center items-center w-[100px] bg-primary text-white text-lg h-[44px] rounded ">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
        <div className=" mt-[32px] ">
          <OptionGameContainer flexend={n1.toString()} className=" w-full ">
            {!n1 && (
              <DraggableElement
                value="1"
                imgUrl={oneImg}
              />
            )}
            <DropTarget
              onDrop={handleDropFive}
              bg="red"
              items={[1, 2, 3, 4, 5]}
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n2.toString()}>
            {!n2 && (
              <DraggableElement
                value="2"
                imgUrl={twoImg}
              />
            )}
            <DropTarget
              onDrop={handleDropThree}
              bg="green"
              items={[1, 2, 3]}
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n3.toString()}>
            {!n3 && (
              <DraggableElement
                value="3"
                imgUrl={threeImg}
              />
            )}
            <DropTarget
              onDrop={handleDropTwo}
              items={[1, 2]}
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n4.toString()}>
            {!n4 && (
              <DraggableElement
                value="4"
                imgUrl={fourImg}
              />
            )}
            <DropTarget
              onDrop={handleDropFour}
              items={[1, 2, 3, 4]}
            />
          </OptionGameContainer>
          <OptionGameContainer flexend={n5.toString()}>
            {!n5 && (
              <DraggableElement
                value="5"
                imgUrl={fiveImg}
              />
            )}
            <DropTarget
              onDrop={handleDropOne}
              items={[1]}
            />
          </OptionGameContainer>
        </div>
      </SelectedGameWrapper>
    </DndProvider>
  );
}

const DraggableElement = ({ value, imgUrl }) => {
  const [, ref] = useDrag({
    type: "ELEMENT",
    item: { value },
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const elementStyle = {
    display: isDragging ? "none" : "block",
  };

  return (
    <div
      ref={(instance) => {
        ref(instance);
        instance && (instance.style.display = isDragging ? "none" : "block");
      }}
      className="draggable-element w-[80px] h-[80px] "
      style={elementStyle}
    >
      <img
        src={imgUrl}
        alt=""
        width={50}
        height={50}
        onContextMenu={handleContextMenu}
        className=" w-full h-full "
      />
    </div>
  );
};

// drop target
const DropTargetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  .circle {
    margin: 8px;
    min-width: 24px;
    min-height: 24px;
    border-radius: 100%;
  }
`;

const DropTarget = ({ onDrop, expectedValue, items, bg = "white" }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ELEMENT",
    drop: (item) => onDrop(item.value),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const backgroundColor = isOver && canDrop ? "#EF476F" : "transparent";

  return (
    <DropTargetWrapper ref={drop} style={{ backgroundColor }} className=" mms:flex-wrap mms:w-[150px] ml:flex-nowrap ml:w-[200px] min-h-[90px] rounded " >
      {items.map((value, index) => (
        <div className="circle bg-white " key={index} />
      ))}
    </DropTargetWrapper>
  );
};

export default SelectedGame;
