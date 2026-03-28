"use client";

import { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import Image from "next/image";

interface CarouselProps {
    offset: number;
    showArrows: boolean;
    width: string | number;
    height: string | number;
    margin: string | number;
}

interface CoffeeShopItems {
    key: number;
    content: React.ReactNode;
    onClick?: () => void;
}

export default function CsDeliveryOptions (props: CarouselProps) {
    const [coffeeShopItems, setCoffeeShopItems] = useState<CoffeeShopItems[]>([]);
    const [offsetRadius, setOffsetRadius] = useState<number>(2);
    const [showArrows, setShowArrows] = useState<boolean>(false);
    const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/coffeeShops');
            const data = await response.json();
      
            const mappedData = data.flatMap((coffeeShop: any) => 
              coffeeShop.items.map((item: string, itemIndex: number) => ({
                key: `${coffeeShop.id}-${itemIndex}`,
                content: (
                  <div>
                    <div className="lg:w-[300px] lg:h-[400px] w-[280px] h-[280px]">
                      <Image
                        src={item}
                        alt={`${coffeeShop.name} item ${itemIndex + 1}`}
                        width={400}
                        height={400}
                        objectFit="cover"
                      />
                    </div>
                    <p className="font-jua text-primary-darkBlue font-black text-xl mt-2">
                      {coffeeShop.name}
                    </p>
                  </div>
                ),
                onClick: () => setGoToSlide(coffeeShop.id),
              }))
            );
      
            setCoffeeShopItems(mappedData);
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
              slides={coffeeShopItems}
              goToSlide={goToSlide}
              offsetRadius={offsetRadius}
              showNavigation={showArrows}
              animationConfig={config.gentle}
            />
        </div>
      </>
    )
};