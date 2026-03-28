"use client";

import Link from "next/link";
import RatingStatic from "../rating";
import { useState } from "react";
import useChangeImage from "@/app/hooks/useChangeImage";

export default function CSOptionsOwner() {
  const { setHeaderImage } = useChangeImage();

  const coffeeShops = [
    {             
        name: "The Mocha Mystery",
        image: "/images/assets/cafeterias/cafe-1.jpg",
        rating: 2.5 
    },
    {             
        name: "Perky Penguin Espresso",
        image: "/images/assets/cafeterias/cafe-2.jpg",
        rating: 3 
    },
    {             
        name: "Velvet Bean Café",
        image: "/images/assets/cafeterias/cafe-3.jpg",
        rating: 3.5 
    },
    {             
        name: "Whisk & Brew",
        image: "/images/assets/cafeterias/cafe-4.jpg",
        rating: 1 
    },
    {             
        name: "Steamy Stories Coffee House",
        image: "/images/assets/cafeterias/cafe-5.jpg",
        rating: 4.5 
    },
    {             
        name: "Cup of Creavity",
        image: "/images/assets/cafeterias/cafe-6.jpg",
        rating: 5 
    },
    {             
        name: "Brewed Awakening",
        image: "/images/assets/cafeterias/cafe-7.jpg",
        rating: 2.5 
    },
    {             
        name: "Sip 'n Spin Latte Lounge",
        image: "/images/assets/cafeterias/cafe-8.jpg",
        rating: 1.5 
    },
    {             
        name: "Fantasia French Press",
        image: "/images/assets/cafeterias/cafe-9.jpg",
        rating: 3 
    },
    { 
        name: "Dream Bean Café",
        image: "/images/assets/cafeterias/cafe-10.jpg",
        rating: 4.5 
    }
  ];

  return (
    <div className="lg:pt-12 2xl:pt-12 pt-10 rounded-t-20px lg:rounded-t-[100px] bg-gradient-to-t from-blue-300 to-white shadow-[0_35px_60px_8px_rgba(0,0,0,0.3)]">
      {coffeeShops.map((item, index) => (
        <Link href={"/cs-profile"} key={index} className="cursor-default" onClick={() => setHeaderImage(`${item.image}`)}>
          <div className="flex flex-col items-center">
            <div className="bg-primary-darkBlue bg-opacity-50 mb-10 cursor-pointer">
              <img src={item.image} alt={item.name + "image"} className="w-[900px] lg:hover:opacity-70 opacity-70 object-cover h-48 object-center"/>
            </div>
            <p className="absolute lg:left-[20%] 2xl:left-[30%] left-[10%] mt-5 font-bold">{item.name}</p>
            <span className="absolute lg:right-[20%] 2xl:right-[30%] right-[10%] mt-36"><RatingStatic rating={item.rating} color={"white"}/></span>
          </div>
        </Link>
      ))}
    </div>
  )
};