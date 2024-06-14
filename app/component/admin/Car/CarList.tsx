"use client";
import React, { useState, useEffect } from "react";
import { fetchData, deleteData } from "@/api/baseApi";

interface Image {
    imageId: number;
    name: string;
    url: string;
}

interface Brand {
    brandId: number;
    name: string;
    description: string;
    imageId: Image;
}

interface Car {
    carId: number;
    name: string;
    description: string;
    brandId: Brand;
    model: string;
    price: number;
    color: string;
    motorType: string;
    power: number;
    placeNumber: number;
    status: string;
    type: string;
    imageId: Image;
}

export default function ListOfCar() {
    const [cars, setCars] = useState<Car[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await fetchData("http://localhost:8080/api/car/all");
                setCars(data as Car[]);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);

    const updateCar = (car: Car) => {
        window.location.href = `/admin/cars/update-car?carId=${encodeURIComponent(car.carId)}`;
    }

    const deleteCar = async (car: Car): Promise<void> => {
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (confirmDelete) {
            try {
                await deleteData(`http://localhost:8080/api/car/${car.carId}`);
                setCars(cars.filter(c => c.carId !== car.carId));
            } catch (error) {
                console.error("Error deleting car:", error);
            }
        }
    };

    const paginatedData = cars.slice((currentPage - 1) * limit, currentPage * limit);

   

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((car) => (
                        <tr key={car.carId}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={car.imageId.url} alt={car.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{car.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{car.name}</td>
                            <td>{car.description}</td>
                            <td>{car.model}</td>
                            <td>{car.price}</td>
                            <td>
                                <button className="btn btn-ghost btn-xs" onClick={() => updateCar(car)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button className="btn btn-ghost btn-xs text-red-500" onClick={() => deleteCar(car)}>
                                    <svg className="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}
