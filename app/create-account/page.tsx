"use client";
import Link from "next/link";
import StepsCA from "../components/steps-ca";
import Image from "next/image";
import { useState } from "react";

export default function Delivery() {

  const [hideImageCustomer, setHideImageCustomer] = useState(false);
  const [hideImageOwner, setHideImageOwner] = useState(false);

  return (
    <div className="bg-white h-screen overflow-hidden">
      <StepsCA stepType={"createAccount"}/>
      <div className="2xl:mt-28">
        <h1 className="text-primary-hotPint font-jua text-xl flex justify-center">Qual seu tipo de usuário?</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-32 pt-10 lg:pt-12">
          <Link href={"/form-account-customer"} onMouseEnter={() => setHideImageCustomer(true)} onMouseLeave={() => setHideImageCustomer(false)} className="rounded-full">
            <div className="flex flex-col items-center justify-center border-primary-darkPink border-[20px] shadow-primary-darkPink hover:bg-primary-darkPink transition-all duration-300 rounded-full h-80 w-80 shadow-2xl">
              <h1 className={`${hideImageCustomer ? "lg:flex hidden" : "lg:hidden flex"} lg:text-white text-primary-hotPint lg:items-center font-jua text-2xl`}>Cliente</h1>
              <Image
                src={"/images/icons/customer.svg"}
                alt="Customer icon"
                height={170}
                width={170}
                className={`${hideImageCustomer ? "hidden" : "flex"}`}
              />
            </div>
          </Link>
          <Link href={"/form-account-owner"} onMouseEnter={() => setHideImageOwner(true)} onMouseLeave={() => setHideImageOwner(false)} className="rounded-full">
            <div className="flex flex-col items-center justify-center border-primary-darkBlue border-[20px] shadow-primary-darkBlue hover:bg-primary-darkBlue transition-all duration-300 rounded-full h-80 w-80 shadow-2xl">
              <h1 className={`${hideImageOwner ? "lg:flex hidden" : "lg:hidden flex"} lg:text-white text-primary-darkBlue lg:items-center font-jua text-2xl`}>Proprietário(a)</h1>
              <Image
                src={"/images/icons/owner.svg"}
                alt="Customer icon"
                height={220}
                width={220}
                className={`rounded-3xl ${hideImageOwner ? "hidden" : "flex"}`}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}