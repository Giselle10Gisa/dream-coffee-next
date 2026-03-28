"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StepsCA from "../components/steps-ca";
import { auth } from "../services/auth0.service";
import { Auth0Error } from "auth0-js";
import { redirect } from 'next/navigation';

interface RegisterForm {
  email: string;
  password: any;
  passwordConfirmation: any;
  fullName: string;
  phone: number;
  address: string;
  additionalAddress: string;
  roles: string[];
}

export default function FormCACustomer() {
  const [user, setUser] = useState<RegisterForm>({
    email: "",
    password: "",
    passwordConfirmation: "",
    fullName: "",
    phone: 0,
    address: "",
    additionalAddress: "",
    roles: [] as string[]
  });
  const [passwordError, setPasswordError] = useState('');
  const form = useForm<RegisterForm>();
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    if (user.passwordConfirmation !== user.password) {
      setPasswordError('As senhas precisam ser correspondentes');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    auth.signup({
      email: user.email,
      password: user.password,
      connection: process.env.NEXT_PUBLIC_AUTH0_REALM!,
      userMetadata: {
        fullName: user.fullName,
        roles: 'customer',
        phone: user.phone,
        address: user.address,
        additionalAddress: user.additionalAddress
      }
    }, function(error: Auth0Error | null, result: any){
      if(error) {
        console.log("Registration failed");
        console.log(error);
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
    <div className="bg-white h-screen">
      <StepsCA stepType={"form"}/>
      <div className="flex flex-col justify-center items-center 2xl:mt-44 lg:mt-10 mt-5 gap-5">
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
              value={user.fullName}
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
              value={user.email}
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            <p className="text-red-500 font-jua mt-2 text-xs">{errors.email?.message}</p>
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
              value={user.phone}
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            <p className="text-red-500 font-jua mt-2 text-xs">{errors.phone?.message}</p>
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
              value={user.address}
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            <p className="text-red-500 font-jua mt-2 text-xs">{errors.address?.message}</p>
          </div>
          <div className="flex flex-col lg:w-[405px]">
            <label htmlFor="Endereço adicional" className="font-jua text-purple-600">Endereço adicional</label>
            <input 
              type="text"
              placeholder="Endereço adicional"
              name="additionalAddress" 
              value={user.additionalAddress}
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
              value={user.password}
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            <p className="text-red-500 font-jua mt-2 text-xs">{errors.password?.message as string}</p>
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
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            {passwordError && <p className="text-red-500 font-jua mt-2 text-xs">{passwordError}</p>}
            <p className="text-red-500 font-jua mt-2 text-xs">{errors.passwordConfirmation?.message as string}</p>
          </div>
        </div>
      </div>
      <div className="lg:mt-5 mt-4 2xl:mx-[535px] lg:mx-[213px] mx-[30px]">
        <button type="button" onClick={onSubmit} className="bg-purple-600 p-2 rounded-md hover:bg-primary-hotPint w-64">Cadastrar</button>
      </div>
    </div>
  )
}