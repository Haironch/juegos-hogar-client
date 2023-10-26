import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { toast } from "react-toastify";

import logo from "/hermano-pedro-hogar-logo.jpeg";

const schema = yup.object({
  name: yup.string().required("Ingrese su nombre por favor"),
  password: yup.string().required("Ingrese su contraseña por favor"),
});

const HomeWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  .user-logo {
    text-align: center;
    width: 100%;
    font-size: 128px;
  }
`;
const InputContainer = styled.div`
  margin: 24px 0;
  width: 100%;
  height: 50px;

  input {
    width: 100%;
    height: 100%;
  }
`;

function Home() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formdata) => {
    const { data } = await axios.post("/api/login", formdata);
    if (data.status_code === 200) {
      localStorage.setItem("user_token", JSON.stringify(data.token));
      localStorage.setItem("user_data", JSON.stringify(data.user_data));
      navigate("/admin");
    } else {
      toast.warning("Datos inválidos");
    }
  };

  if (localStorage.getItem("user_token")) {
    return <Navigate to="/admin" />;
  }

  return (
    <HomeWrapper className=" flex justify-between items-center w-screen h-screen min-h-[700px] bg-bg overflow-y-auto ">
      <Form
        className=" mms:w-[90%] ml:w-[80%] ts:w-[500px] min-h-[500x] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="user-logo">
          <img
            src={logo}
            className=" rounded-[10px] "
            alt="Hermano Pedro Hogar"
          />
        </div>
        <InputContainer>
          <Input
            color={"success"}
            {...register("name")}
            placeholder="Ingrese su nombre"
            className=" h-[80px] "
          />
          {errors.name && (
            <p className=" text-red-600 ">{errors.name.message}</p>
          )}
        </InputContainer>
        <InputContainer>
          <Input
            color={"success"}
            {...register("password")}
            type="password"
            placeholder="Ingrese su contraseña"
          />
          {errors.password && (
            <p className=" text-red-600 ">{errors.password.message}</p>
          )}
        </InputContainer>
        <InputContainer>
          <Button
            type="submit"
            color="primary"
            className=" "
            variant="ghost"
            radius="full"
            size="lg"
          >
            Ingresar
          </Button>
        </InputContainer>
      </Form>
    </HomeWrapper>
  );
}

export default Home;
