"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type StepName = {
  stepType: "createAccount" | "form" | "finish",
}

export default function StepsCA({ stepType }: StepName) {

  const [changeArrow, setChangeArrow] = useState(false);

  const steps = {
    createAccount: {
      step: "createAccount",
      routeBack: "/",
      routeFurther: ""
    },
    form: {
      step: "form",
      routeBack: "/create-account",
      routeFurther: "/finish-ca"
    },
    finishCa: {
      step: "finish",
      routeBack: "",
      routeFurther: ""
    }
  }

  let step = Object.values(steps).find((stp) => stepType === stp.step);
 
  return(
    <div className="flex flex-row justify-center py-8 lg:gap-48 gap-20">
      {step && (
        <>
          <Link href={`${step.routeBack}`}>
            <div onMouseOver={() => setChangeArrow(true)} onMouseLeave={() => setChangeArrow(false)} className={`${stepType === "finish" ? "opacity-0" : "opacity-100"}`}>
              <Image
                alt="Arrow left"
                src={`${changeArrow ? '/images/icons/arrow-left-pink.svg' : '/images/icons/arrow-left-blue.svg'}`}
                height={40}
                width={40}
                className={"hover:cursor-pointer"}
              />
            </div>
          </Link>
        </>
      )}
      <div className={`font-jua cursor-default ${stepType === "createAccount" ? "text-primary-hotPint text-4xl" : "text-primary-darkBlue text-2xl hidden lg:flex"}`}>1</div>
      <div className={`font-jua cursor-default ${stepType === "form" ? "text-primary-hotPint text-4xl" : "text-primary-darkBlue text-2xl hidden lg:flex"}`}>2</div>
      <div className={`font-jua cursor-default ${stepType === "finish" ? "text-primary-hotPint text-4xl" : "text-primary-darkBlue text-2xl hidden lg:flex"}`}>3</div>
      {step && (
        <>
          <Link href={`${step.routeFurther}`}>
            <div onMouseOver={() => setChangeArrow(true)} onMouseLeave={() => setChangeArrow(false)} className={`${stepType === "createAccount" || stepType === "finish" || stepType === "form" ? "opacity-0" : "opacity-100"}`}>
              <Image
                alt="Arrow right"
                src={`${changeArrow ? '/images/icons/arrow-right-pink.svg' : '/images/icons/arrow-right-blue.svg'}`}
                height={40}
                width={40}
                className={`${stepType === "createAccount" || stepType === "finish" ? "hover:cursor-default" : "hover:cusros-pointer"}`}
              />
            </div>
          </Link>
        </>
      )}
    </div>
  )
}