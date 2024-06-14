import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { putData } from "@/api/baseApi";

const userSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const UpdateUser = ({ id }: { id: number }) => {
    const [user, setUser] = useState<User | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: user || {}
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${id}`);
                const data = await response.json();
                setUser(data);
                reset(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [id, reset]);

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            console.log(data);
            const url = `http://localhost:8080/api/users/${id}`;
            await putData<User>(url, data);
            alert('Update User successfully!');
            window.location.href = 'http://localhost:3000/admin/users';
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-lg">
                <div className="flex justify-end">
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white hover:scale-105 transition duration-300 ease-in-out"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        onClick={() => window.location.href = 'http://localhost:3000/admin/users'}
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                        />
                    </svg>
                </div>
                <div className="font-medium flex flex-row justify-between mt-8 mx-4">
                    <p className="mt-3 text-base">Update User</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6 mx-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-xs font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:border-gray-600"
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:border-gray-600"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:border-gray-600"
                        />
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="mt-6 mx-4 bg-gray-800 rounded-3xl hover:bg-gray-600 transition duration-300 ease-in-out">
                        <button type="submit" className="w-full px-4 py-2 text-white">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
