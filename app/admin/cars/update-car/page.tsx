"use client"
import React from "react"
import { useUrl } from 'nextjs-current-url';
import UpdateCar from "@/app/component/admin/Car/UpdateCar"
export default function UpdateCars() {
    const { pathname } = useUrl() ?? {};
    let carId = "";

    if (pathname) {
        const searchParams = new URLSearchParams(window.location.search);
        carId = searchParams.get("carId") || "";
    }
    
    return <section>
       <UpdateCar id={Number(carId)}/>
    </section>
 
}