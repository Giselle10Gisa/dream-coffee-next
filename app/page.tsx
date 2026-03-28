"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { auth } from "./services/auth0.service";
import { Auth0Error } from "auth0-js";

interface LoginForm {
  email: string;
  password: string;
}

export default function Home() {
  const constraintsRef = useRef(null);

  const [user, setUser] = useState<LoginForm>({ email: "", password: "" });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(user);
    auth.login({
      username: user.email,
      password: user.password,
      realm: process.env.NEXT_PUBLIC_AUTH0_REALM,
      redirectUri: process.env.NEXT_PUBLIC_AUTH0_LOGIN_REDIRECT_URI,
      responseType: process.env.NEXT_PUBLIC_AUTH0_LOGIN_RESPONSE_TYPE,
    }, function(error: Auth0Error | null, result: any){
      if(error){
        console.log("Login failed")
        console.log(error)
        return;
      }

      console.log("Login successful")
      console.log(result)
    })
  };

  return (
    <div className="bg-white h-screen overflow-hidden animate-slide bg-auto">
        <motion.div className="w-screen h-screen absolute overflow-hidden z-[99]" ref={constraintsRef}>
          <motion.div className="cursor-pointer w-[100px] h-[100px] bg-transparent absolute lg:right-[330px] right-[250px] top-[50px] lg:top-[80px] bg-no-repeat bg-[url('/images/icons/coffee-bean-lf.png')]" drag dragConstraints={constraintsRef}/>
          <motion.div className="cursor-pointer w-[100px] h-[100px] bg-transparent absolute lg:right-[100px] right-0 top-[250px] bg-no-repeat bg-[url('/images/icons/coffee-bean-rg.png')]" drag dragConstraints={constraintsRef}/>
          <motion.div className="cursor-pointer w-[100px] h-[100px] bg-transparent absolute lg:right-[300px] right-0 bottom-[50px] bg-no-repeat bg-[url('/images/icons/coffee-bean-lf.png')]" drag dragConstraints={constraintsRef}/>
          <motion.div className="cursor-pointer w-[100px] h-[100px] bg-transparent absolute lg:left-[350px] left-[20px] top-[400px] lg:top-[150px] bg-no-repeat bg-[url('/images/icons/coffee-bean-rg.png')]" drag dragConstraints={constraintsRef}/>
          <motion.div className="cursor-pointer w-[100px] h-[100px] bg-transparent absolute lg:left-[100px] left-[250px] lg:top-[120px] top-[20px] bg-no-repeat bg-[url('/images/icons/coffee-bean-lf.png')]" drag dragConstraints={constraintsRef}/>
          <motion.div className="cursor-pointer w-[100px] h-[100px] bg-transparent absolute lg:left-[350px] left-[80px] bottom-[30px] bg-no-repeat bg-[url('/images/icons/coffee-bean-rg.png')]" drag dragConstraints={constraintsRef}/>
        </motion.div>
      <div className="absolute right-0 -top-1">
        <Image
          src="/images/assets/cloud.png"
          alt="Cloud image"
          height={350}
          width={350}
        />
      </div>
      <div className="absolute left-0 bottom-0 rotate-180">
        <Image
          src="/images/assets/cloud.png"
          alt="Cloud image"
          height={350}
          width={350}
        />
      </div>
      <div className="flex flex-col justify-center items-center h-full gap-10">
        <div className="flex z-[100] pointer-events-none">
          <Image
            src="/images/assets/logo-round.svg"
            alt="Cloud image"
            height={200}
            width={200}
          />
        </div>
        <div className="flex flex-col gap-6 w-64 justify-center z-[100]">
          <form action={"submit"} className="flex flex-col gap-6">
            <input 
              type="email"
              placeholder="email"
              name="email"
              value={user.email}
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={user.password}
              onChange={onChangeHandler}
              className="text-[#8D8F8A] text-lg bg-[#EBEBE9] outiline-[#8D8F8A] outline-2 outline p-2 rounded-md"
            />
            <button type="button" onClick={onSubmit} className="bg-primary-darkPink p-2 rounded-md hover:bg-primary-hotPint w-64">Login</button>
          </form>
          <div className="flex flex-col gap-2">
            <button>
              <p className="text-primary-hotPint text-xs text-center font-jua">Esqueceu a senha?</p>
            </button>
            <button>
              <Link href={"/create-account"}>
                <p className="text-primary-hotPint text-xs text-center font-jua">Criar conta</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
