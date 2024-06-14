import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { putData } from "@/api/baseApi";
const imageSchema = z.object({
    name: z.string().min(1, "Name is required"),
    url: z.string().url("Invalid URL format"),
});

interface Image {
    imageId: number;
    name: string;
    url: string;
}

const UpdateImage = ({ id }: { id: number }) => {
    const [image, setImage] = useState<Image | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Image>({
        resolver: zodResolver(imageSchema),
        defaultValues: image || {}
    });

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/image/${id}`);
                const data = await response.json();
                setImage(data);
                reset(data);
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        };

        fetchImage();
    }, [id, reset]);

    const onSubmit: SubmitHandler<Image> = async (data) => {
        try {
            const url = `http://localhost:8080/api/image/${id}`;
            await putData<Image>(url, data);
            alert('Update Image successfully!');
            window.location.href = 'http://localhost:3000/admin/images';
        } catch (error) {
            console.error('Error updating image:', error);
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
                    <p className="mt-3 text-base">Update Image</p>
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
                        />
                        {errors.url && <p className="text-red-600 text-xs mt-1">{errors.url.message}</p>}
                    </div>
                    <div className="mt-6 mx-4 bg-gray-800 rounded-3xl hover:bg-gray-600 transition duration-300 ease-in-out">
                        <button type="submit" className="w-full px-4 py-2 text-white">
                            Update Image
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateImage;
