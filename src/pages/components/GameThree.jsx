import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import "../../App.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { formatTime } from "../../utils/helpers";

const styleFlex = styled.div`
  justify-content: center;
  align-items: center;
`;

const SelectedGameWrapper = styled.div`
  box-sizing: border-box;
`;

const SelectedGameContainer = styled.div`
  display: flex;
  ${styleFlex};
  flex-direction: column;
  width: 100%;
`;
const SelectedLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;

  .selected-letter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const LettersGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .letters-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: 100px 100px;
    gap: 10px;
  }

  .letter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function GameThree() {
  const letters = ["a", "u", "i", "o", "e", "b"];
  const shownLetters = ["a", "u", "i", "o", "e", "b"];
  const [availableLetters, setAvailableLetters] = useState(letters);

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("a");

  const [startedGame, setStartedGame] = useState(false);

  const [l1, setL1] = useState(false);
  const [l2, setL2] = useState(false);
  const [l3, setL3] = useState(false);
  const [l4, setL4] = useState(false);
  const [l5, setL5] = useState(false);
  const [l6, setL6] = useState(false);

  // manage game time
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const verifyLetter = (letter) => {
    switch (letter) {
      case "a":
        if (letter === selectedLetter) {
          setStartedGame(true);
          setL1(true);
          removeLetter();
        }
        return;
      case "b":
        if (letter === selectedLetter) {
          setStartedGame(true);
          setL2(true);
          removeLetter();
        }
        return;
      case "e":
        if (letter === selectedLetter) {
          setStartedGame(true);
          setL3(true);
          removeLetter();
        }
        return;
      case "i":
        if (letter === selectedLetter) {
          setStartedGame(true);
          setL4(true);
          removeLetter();
        }
        return;
      case "o":
        if (letter === selectedLetter) {
          setStartedGame(true);
          setL5(true);
          removeLetter();
        }
        return;
      case "u":
        if (letter === selectedLetter) {
          setStartedGame(true);
          setL6(true);
          removeLetter();
        }
        return;
      default:
        return;
    }
  };

  const removeLetter = () => {
    // Eliminar el elemento mostrado de los disponibles
    setAvailableLetters((prevAvailableElements) =>
      prevAvailableElements.filter((element) => element !== selectedLetter)
    );
  };

  const { childId, gameId } = useParams();
  const navigate = useNavigate();

  const makeWinner = async () => {
    const child_data = {
      time: formatTime(hours, minutes, seconds),
      id_game: gameId,
      id_child: JSON.parse(localStorage.getItem("selected-child")).id,
    };

    const { data } = await axios.post("/api/scores", child_data);
    if (data.status_code === 200) {
      setStartedGame(false);
      setL1(false);
      setL2(false);
      setL3(false);
      setL4(false);
      setL5(false);

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

  async function setSelectedRandomLetter() {
    if (availableLetters.length === 0) {
      // Si no quedan elementos disponibles, no se hace nada
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableLetters.length);

    const newShownElement = availableLetters[randomIndex];

    setSelectedLetter(newShownElement);
  }

  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    if (l1 && l2 && l3 && l4 && l5 && l6) {
      // El juego ha terminado, detener el cronómetro
      makeWinner();
    }

    if (startedGame) {
      const interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000); // Update every 1000 milliseconds (1 second)

      return () => {
        clearInterval(interval); // Cleanup the interval on component unmount
      };
    }
  }, [l1, l2, l3, l4, l5, l6]);

  useEffect(() => {
    setSelectedRandomLetter();
  }, [l1, l2, l3, l4, l5, l6]);

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
      <SelectedGameWrapper className=" w-full h-auto ">
        <div className=" mt-2 w-full ">
          <p className=" flex justify-center items-center w-[100px] bg-primary text-white text-lg h-[44px] rounded ">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
        <SelectedGameContainer className=" mt-[48px] h-auto ">
          <SelectedLetter className="">
            <div className="selected-letter w-[100px] h-[100px] text-8xl text-white bg-primary rounded-[10px] ">
              <span className=" select-none ">{selectedLetter}</span>
            </div>
          </SelectedLetter>
          <LettersGroup className=" mt-8 ">
            <div className="letters-container mms:w-full ml:w-auto ">
              {shownLetters.map((letter) => (
                <div
                  onClick={() => verifyLetter(letter)}
                  className="letter mms:w-full mms:text-8xl ml:w-[100px] ml:h-[100px] ms:text-8xl text-[#ff9e00] rounded bg-[#cbf3f0] select-none cursor-pointer hover:scale-105 hover:duration-300 "
                  key={letter}
                >
                  {letter}
                </div>
              ))}
            </div>
          </LettersGroup>
        </SelectedGameContainer>
      </SelectedGameWrapper>
    </DndProvider>
  );
}
