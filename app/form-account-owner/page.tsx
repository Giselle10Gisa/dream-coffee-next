"use client";

import { useState } from "react";
import StepsCA from "../components/steps-ca";
import { useForm } from "react-hook-form";
import { auth } from "../services/auth0.service";
import { Auth0Error } from "auth0-js";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: number;
  storeName: string;
  storeEmail: string;
  storePhone: number;
  address: string;
  workingHours: number;
  password: any;
  passwordConfirmation: any;
  roles: string[];
}

export default function FormCAOwner() {
  const [owner, setOwner] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: 0,
    storeName: "",
    storeEmail: "",
    storePhone: 0,
    address: "",
    workingHours: 0,
    password: "",
    passwordConfirmation: "",
    roles: [] as string[]
  });
  const [passwordError, setPasswordError] = useState('');
  const form = useForm<RegisterForm>();
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner({
      ...owner,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    if (owner.passwordConfirmation !== owner.password) {
      setPasswordError('As senhas precisam ser correspondentes');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    auth.signup({
      email: owner.email,
      password: owner.password,
      connection: process.env.NEXT_PUBLIC_AUTH0_REALM!,
      userMetadata: {
        fullName: owner.fullName,
        phone: owner.phone,
        storeName: owner.storeName,
        storeEmail: owner.storeEmail,
        storePhone: owner.storePhone,
        address: owner.address,
        workingHours: owner.workingHours,
        roles: 'owner'
      }
    }, function(error: Auth0Error | null, result: any){
      if (error) {
        console.log("Registration failed");
        console.log(error)
        return;
      } else {
        window.location.replace("http://localhost:3000/finish-ca");
      }
      
      console.log("User registration successfull");
      console.log(result);
    });

    if (validatePasswords()) {
      console.log("Passwords match, form can be submitted");
    }
  };

  return (
    <div className="bg-white h-full 2xl:h-screen">
      <StepsCA stepType={"form"}/>
      <div className="2xl:mt-24">
        <h1 className="text-primary-hotPint font-jua text-xl flex 2xl:mx-[533px] lg:mx-[208px] mx-[30px]">Dados Proprietário:</h1>
        <div className="flex flex-col justify-center items-center lg:mt-5 mt-5 gap-5">
          <div className="flex lg:flex-row flex-col gap-10 w-[350px] lg:w-[850px]">
            <div className="flex flex-col">
              <label htmlFor="Nome completo" className="font-jua text-purple-600">Nome completo</label>
              <input
                type="text"
                {...register("fullName", {
                  required: {
                    message: "Nome completo é obrigatório",
                    value: true
                  }
                })}
                placeholder="Nome completo"
                name="fullName"
                value={owner.fullName}
                onChange={onChangeHandler}
                className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
              <p className="text-red-500 font-jua mt-2 text-xs">{errors.fullName?.message}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="font-jua text-purple-600">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    message: "Email é obrigatório",
                    value: true
                  }
                })} 
                placeholder="Email"
                name="email"
                value={owner.email}
                onChange={onChangeHandler}
                className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Telefone" className="font-jua text-purple-600">Telefone</label>
              <input 
                type="tel" 
                {...register("phone", {
                  required: {
                    message: "Telefone é obrigatório",
                    value: true
                  }
                })}
                placeholder="(XX)9XXXX-XXXX"
                name="phone"
                value={owner.phone}
                onChange={onChangeHandler}
                className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-5 w-[350px] lg:w-[850px]">
            <div className="flex flex-col lg:w-[415px]">
              <label htmlFor="Senha" className="font-jua text-purple-600">Senha</label>
              <input
               type="password" 
               {...register("password", {
                required: {
                  message: "Senha é obrigatória",
                  value: true
                }
               })}
               placeholder="Senha"
                name="password"
                value={owner.password}
                onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col lg:w-[415px]">
              <label htmlFor="Confirmação de senha" className="font-jua text-purple-600">Confirmação de senha</label>
              <input
               type="password" 
               {...register("passwordConfirmation", {
                required: {
                  message: "Confirmação de senha é obrigatória",
                  value: true
                }
               })}
               placeholder="Confirmação de senha"
               name="passwordConfirmation"
               value={owner.passwordConfirmation}
               onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
              {passwordError && <p className="text-red-500 font-jua mt-2 text-xs">{passwordError}</p>}
            </div>
          </div>
        </div>
        <h1 className="text-primary-hotPint font-jua text-xl mt-5 2xl:mx-[533px] lg:mx-[208px] mx-[30px]">Dados Estabelecimento:</h1>
        <div className="flex flex-col justify-center items-center mt-5 gap-5">
          <div className="flex lg:flex-row flex-col gap-10 w-[350px] lg:w-[850px]">
            <div className="flex flex-col">
              <label htmlFor="Nome completo" className="font-jua text-purple-600">Nome do Estabelecimento</label>
              <input
               type="text" 
               {...register("storeName", {
                required: {
                  message: "Nome do estabelecimento é obrigatório",
                  value: true
                }
               })}
               placeholder="Nome estabelecimento"
               name="storeName"
               value={owner.storeName}
               onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="font-jua text-purple-600">Email</label>
              <input
               type="email" 
               {...register("storeEmail", {
                required: {
                  message: "Email é obrigatório",
                  value: true
                }
               })}
               placeholder="Email"
               name="storeEmail"
               value={owner.storeEmail}
               onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Telefone" className="font-jua text-purple-600">Telefone</label>
              <input
               type="tel" 
               {...register("storePhone", {
                required: {
                  message: "Telefone é obrigatório",
                  value: true
                }
               })}
               placeholder="(XX)9XXXX-XXXX"
               name="storePhone"
               value={owner.storePhone}
               onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-10 w-[350px] lg:w-[850px]">
            <div className="flex flex-col lg:w-[405px]">
              <label htmlFor="Endereço" className="font-jua text-purple-600">Endereço</label>
              <input
               type="text" 
               {...register("address", {
                required: {
                  message: "Endereço é obrigatório",
                  value: true
                }
               })}
               placeholder="Endereço"
               name="address"
               value={owner.address}
               onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col lg:w-[405px]">
              <label htmlFor="Horário de funcionamento" className="font-jua text-purple-600">Horário de funcionamento</label>
              <input
               type="number" 
               {...register("workingHours", {
                required: {
                  message: "Horário de funcionamento é obrigatório",
                  value: true
                }
               })}
               placeholder="Horário de funcionamento"
               name="workingHours"
               value={owner.workingHours}
               onChange={onChangeHandler}
               className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mt-5 pt-5 pb-4 2xl:mx-[533px] lg:mx-[208px] mx-[30px]">
        <button type="button" onClick={handleSubmit(() => onSubmit)} className="bg-purple-600 p-2 rounded-md hover:bg-primary-hotPint w-64">Cadastrar</button>
      </div>
    </div>
  )
}