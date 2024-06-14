import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postData } from "@/api/baseApi";

const imageSchema = z.object({
    name: z.string().min(1, "Name is required"),
    url: z.string().url("Invalid URL format"),
});

type Image = z.infer<typeof imageSchema>;

const RegisterImage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Image>({
        resolver: zodResolver(imageSchema),
    });

    const onSubmit: SubmitHandler<Image> = async (data) => {
        try {
            const url = "http://localhost:8080/api/image/register";
            const response = await postData<Image>(url, data);
            alert('Image registered successfully!');
            window.location.href = 'http://localhost:3000/admin/images';
        } catch (error) {
            console.error('Error adding image:', error);
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
                        onClick={() => window.location.href = 'http://localhost:3000/admin/images'}
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
                    <p className="mt-3 text-base">Register Image</p>
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
                            required
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label
                            htmlFor="url"
                            className="block text-xs font-medium text-gray-700"
                        >
                            URL
                        </label>
                        <input
                            type="text"
                            id="url"
                            {...register("url")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:border-gray-600"
                            required
                        />
                        {errors.url && <p className="text-red-600 text-xs mt-1">{errors.url.message}</p>}
                    </div>
                    <div className="mt-6 mx-4 bg-gray-800 rounded-3xl hover:bg-gray-600 transition duration-300 ease-in-out">
                        <button type="submit" className="w-full px-4 py-2 text-white">
                            Register Image
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterImage;
