"use client";
import React, { useState, useEffect } from "react";
import { fetchData, deleteData } from "@/api/baseApi";
import { UUID } from "crypto";

interface User {
    id: UUID;
    name: string;
    email: string;
    password: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchData("http://localhost:8080/api/users/all");
                setUsers(data as User[]);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const paginatedData = users.slice((currentPage - 1) * limit, currentPage * limit);


    const updateUser = (user: User) => {
        window.location.href = `/admin/users/update-user?id=${encodeURIComponent(user.id)}`;
    };

    const deleteUser = async (user: User): Promise<void> => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        
        if (confirmDelete) {
            try {
                await deleteData(`http://localhost:8080/api/users/${user.id}`);
                window.location.href = 'http://localhost:3000/admin/users';
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        } else {
            window.location.href = 'http://localhost:3000/admin/users';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-left"></th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((user, index) => ( 
                        <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="py-4 px-6">{index + 1}</td>
                            <td className="py-4 px-6">{user.name}</td>
                            <td className="py-4 px-6">{user.email}</td>
                            <td className="py-4 px-6">
                                <button className="text-blue-500 hover:underline" onClick={() => updateUser(user)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button className="text-red-500 hover:underline ml-2" onClick={() => deleteUser(user)}>
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
