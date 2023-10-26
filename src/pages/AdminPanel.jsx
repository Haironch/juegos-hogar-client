import styled from "styled-components";
import { useEffect, useContext } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

import GamesContext from "../context/games/Context";

const colors = {
  primary: "#202020",
  secondary: "#ffffff",
  fontfamily: "'Chakra Petch', sans-serif",
  red: "#ef233c",
  blue: "#52b69a",
};

const styleFlex = {
  display: "flex;",
  "justify-content": "center;",
  "align-items": "center;",
};

const AdminPanelWrapper = styled.div`
  color: ${colors.secondary};
`;
const AdminPanelContainer = styled.div`
  /* ${styleFlex}; */
  
  height: 100%;
  width: 100%;

  .games {
    ${styleFlex};
    justify-content: space-between;
    width: 100%;

    a {
      display: block;
      height: 250px;
      width: 250px;
    }
  }
`;
const Table = styled.div`
  /* width: 700px; */

  .table-row-header {
    ${styleFlex};
    justify-content: center;
    height: 48px;
    font-size: 24px;

    div {
      text-align: center;
      width: 20%;
    }
  }
`;

function AdminPanel() {
  const { childs, getChilds } = useContext(GamesContext);

  useEffect(() => {
    getChilds();
  }, []);

  return (
    <AdminPanelWrapper className=" h-auto overflow-y-auto ">
      <AdminNavbar />
      <AdminPanelContainer className="relative pb-[68px] bg-bg ">
        <div className=" mt-2 pl-2 w-full ">
          <Link
            to="/admin"
            className=" flex justify-center items-center w-[100px] h-[48px] uppercase bg-blue-400 rounded "
          >
            <i className="fa-solid fa-"></i>
            Atrás
          </Link>
        </div>
        <Table className=" w-ful ">
          <div className="table-row-header border-b-2 border-dark ">
            <div>Niños</div>
          </div>
          {childs.length > 0 ? (
            childs.map((child) => <ChildRow child={child} key={child.id} />)
          ) : (
            <div className="  flex justify-center items-center w-full h-[100px] ">
              <p>No hay niños</p>
            </div>
          )}
        </Table>
      </AdminPanelContainer>
    </AdminPanelWrapper>
  );
}

// style sub components
const ChildRowWrapper = styled.div`
`;
const OptionsButton = styled(Link)`
  ${styleFlex};
  width: 200px;
  height: 44px;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;
  font-size: 12px;
  background-color: #62b6cb;
`;

function ChildRow({ child }) {
  return (
    <ChildRowWrapper className=" mms:flex-col mms:py-2 ts:flex-row flex justify-between items-center my-2 px-4 pb-2 h-auto border-b border-dark ">
      <div className=" table-row-name mms:mb-3 ts:mb-0 text-center ">
        {child.name} {child.lastname}
      </div>
      <div>
        <OptionsButton to={`/admin/panel/${child.id}`}>
          Ver progreso
        </OptionsButton>
      </div>
    </ChildRowWrapper>
  );
}

export default AdminPanel;
