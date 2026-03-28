"use client";

import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { auth } from "@/app/services/auth0.service";

interface CarouselProps {
  offset: number;
  showArrows: boolean;
  width: string | number;
  height: string | number;
  margin: string | number;
}
  
interface CoffeeShopInfo {
  key: number;
  content: React.ReactNode;
  onClick?: () => void;
}

export default function CarouselDashboard(props: CarouselProps) {
    const [coffeeShopInfos, setCoffeeShopInfos] = useState<CoffeeShopInfo[]>([]);
    const [offsetRadius, setOffsetRadius] = useState<number>(2);
    const [showArrows, setShowArrows] = useState<boolean>(false);
    const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);
    const { user } = useUser();

    auth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      if (err) {
        return console.log(err);
      }
      auth.client.userInfo(authResult?.accessToken!, function(err, user) {
        if (err) {
          return console.log(err);
        }
        console.log("foiiiiiiiiiiiiiiiiiiiiii")
      })
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/coffeeShops');
            const data = await response.json();
    
            const mappedData = data.map((element: any, index: number) => ({
              key: index,
              content: 
                <div>
                  <div className="shadow-2xl lg:w-[400px] lg:h-[400px] w-[280px] h-[280px]">
                    <Image
                      src={element.image}
                      alt={element.name + " image"}
                      width={400}
                      height={400}
                    />
                  </div>
                    <p className="font-jua text-primary-darkBlue font-black text-xl mt-2">
                      {element.name}
                    </p>
                </div>,
              onClick: () => setGoToSlide(index),
            }));
    
            setCoffeeShopInfos(mappedData);
          } catch (e) {
            console.error("Error fetching coffee shops:", e);
          }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
      setOffsetRadius(props.offset);
      setShowArrows(props.showArrows);
    }, [props.offset, props.showArrows]);

    return (
      <>
        <div style={{ width: props.width, height: props.height, margin: props.margin, cursor: "pointer" }}>
            <Carousel
              slides={coffeeShopInfos}
              goToSlide={goToSlide}
              offsetRadius={offsetRadius}
              showNavigation={showArrows}
              animationConfig={config.gentle}
            />
        </div>
        <div className="text-black">Olá, {user?.name}!</div>
        <div className="text-black">suas informações:</div>
        <table>
          <tr className="text-black">{user?.email}</tr>
          <tr className="text-black">{user?.nickname}</tr>
          <tr className="text-black">{user?.picture}</tr>
        </table>
      </>
    )
}