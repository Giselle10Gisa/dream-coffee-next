"use client";

import Image from "next/image";
import StepsCA from "../components/steps-ca";
import Link from "next/link";
import { useEffect } from "react";

export default function FinishCA() {
  type ConfettiElement = HTMLDivElement;

  const showConfetti = (): void => {
  const confettiContainer: HTMLElement | null = document.getElementById('confetti-container');
  if (!confettiContainer) return;

    for (let i = 0; i < 10; i++) {
      const confetti: ConfettiElement = document.createElement('div');
      confetti.textContent = "☕";
      confetti.className = 'fixed text-2xl animate-fall cursor-default';
      confetti.classList.add('confetti');
      confetti.style.left = `${Math.random() * window.innerWidth}px`;
      confetti.style.top = `${Math.random() * window.innerHeight}px`;
      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  useEffect(() => {
    showConfetti();
  }, []);

  return (
    <div className="bg-white h-screen overflow-hidden">
      <StepsCA stepType={"finish"}/>
      <div className="flex justify-center items-center flex-col my-32 lg:my-0 2xl:my-32">
        <div>
          <Image
            alt="Coffee cup gif"
            src={"/images/assets/coffee.gif"}
            height={400}
            width={400}
            className="rounded-full shadow-primary-darkPink shadow-2xl w-80 lg:w-[400px] xl:w-[400px]"
          />
        </div>
        <div className="flex justify-center items-center flex-col mt-20 gap-10 lg:gap-6 lg:mt-16">
          <h1 className="text-primary-darkBlue font-bold lg:text-xl font-jua">Conta criada com sucesso!</h1>
          <Link className="text-white hover:text-primary-darkBlue bg-primary-darkPink hover:bg-white font-jua lg:text-lg py-3 px-5 rounded-full border-primary-darkPink border-4 hover:border-primary-darkBlue transition-transform duration-300" href={"/"}>Retornar ao login</Link>
        </div>
        <div id="confetti-container"/>
      </div>
      <div className="absolute hidden lg:flex xl:flex left-0 bottom-0 rounded-e-full rounded-t-full border-primary-darkPink shadow-primary-darkPink shadow-2xl w-[300px] h-[300px]"></div>
      <div className="absolute hidden lg:flex xl:flex right-0 top-0 rounded-s-full rounded-b-full border-primary-darkPink shadow-primary-darkPink shadow-2xl w-[300px] h-[300px]"></div>
    </div>
  )
}