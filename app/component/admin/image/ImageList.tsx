"use client";
import React, { useState, useEffect } from "react";
import { fetchData, deleteData } from "@/api/baseApi";

interface Image {
    imageId: number;
    name: string;
    url: string;
}

export default function ImageList() {
    const [images, setImages] = useState<Image[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await fetchData("http://localhost:8080/api/image/all");
                setImages(data as Image[]);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    const updateImage = (img: Image) => {
        window.location.href = `/admin/images/update-image?imageId=${encodeURIComponent(img.imageId)}`;
    }

    const deleteImage = async (img: Image): Promise<void> => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (confirmDelete) {
            try {
                await deleteData(`http://localhost:8080/api/image/${img.imageId}`);
                setImages(images.filter(image => image.imageId !== img.imageId));
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };

    const paginatedData = images.slice((currentPage - 1) * limit, currentPage * limit);

    

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((img) => (
                        <tr key={img.imageId}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={img.url} alt={img.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{img.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{img.name}</td>
                            <td>
                                <button className="btn btn-ghost btn-xs" onClick={() => updateImage(img)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                </button>
                                <button className="btn btn-ghost btn-xs text-red-500" onClick={() => deleteImage(img)}>
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
