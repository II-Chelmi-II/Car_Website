"use client"
import React, { useState, useEffect } from "react";
import { fetchData } from "@/api/baseApi";

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

interface Appointment {
    appointmentId: number;
    carId: Car;
    name: string;
    firstName: string;
    email: string;
    message: string | null;
    contact: string | null;
    appointmentDate: string;
    status: Status;
}

enum Status {
    Pending = 'pending',
    Validated = 'validated',
    Rejected = 'rejected',
    Archived = 'archived'
}

export default function ListAppointment() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await fetchData("http://localhost:8080/api/appointment/all");
                setAppointments(data as Appointment[]);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const paginatedData = appointments.slice((currentPage - 1) * limit, currentPage * limit);

    

    return (
        <div className="overflow-x-auto">
            <p className="text-center text-4xl font-black text-gray-900 dark:text-white">List Appointment</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>FirstName</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((appointment) => (
                        <tr key={appointment.appointmentId}>
                            <td>{appointment.appointmentId}</td>
                            <td>{appointment.name}</td>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.message}</td>
                            <td>{appointment.contact}</td>
                            <td>{appointment.appointmentDate}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}
