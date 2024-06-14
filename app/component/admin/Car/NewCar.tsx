import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchData , postData} from "@/api/baseApi";

const imageSchema = z.object({
    imageId: z.number(),
    name: z.string(),
    url: z.string().url("Invalid URL format"),
});

const brandSchema = z.object({
    brandId: z.number(),
    name: z.string(),
    description: z.string(),
    imageId: imageSchema,
});

const carSchema = z.object({
    carId: z.number().optional(),
    name: z.string(),
    description: z.string(),
    brandId: z.preprocess((val) => Number(val), z.number()),
    model: z.string(),
    price: z.preprocess((val) => Number(val), z.number().positive()),
    color: z.string(),
    motorType: z.string(),
    power: z.preprocess((val) => Number(val), z.number().positive()),
    placeNumber: z.preprocess((val) => Number(val), z.number().positive()),
    status: z.string(),
    type: z.string(),
    imageId: z.preprocess((val) => Number(val), z.number()),
});

type Image = z.infer<typeof imageSchema>;
type Brand = z.infer<typeof brandSchema>;
type CarFormData = z.infer<typeof carSchema>;

interface CarSubmitData extends Omit<CarFormData, 'brandId' | 'imageId'> {
    brandId: Brand;
    imageId: Image;
}

const RegisterCar: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [images, setImages] = useState<Image[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<CarFormData>({
        resolver: zodResolver(carSchema),
    });

    const fetchBrandsList = async () => {
        try {
            const data = await fetchData("http://localhost:8080/api/brand/all");
            setBrands(data as Brand[]);
        } catch (error) {
            console.error("Error fetching brands data:", error);
        }
    };

    const fetchImagesList = async () => {
        try {
            const data = await fetchData("http://localhost:8080/api/image/all");
            setImages(data as Image[]);
        } catch (error) {
            console.error("Error fetching images data:", error);
        }
    };

    useEffect(() => {
        fetchBrandsList();
        fetchImagesList();
    }, []);

    const onSubmit: SubmitHandler<CarFormData> = async (formData) => {
        try {
            const selectedBrand = brands.find(brand => brand.brandId === formData.brandId);
            const selectedImage = images.find(image => image.imageId === formData.imageId);

            if (!selectedBrand || !selectedImage) {
                alert('Invalid brand or image selection.');
                return;
            }

            const data: CarSubmitData = {
                ...formData,
                brandId: selectedBrand,
                imageId: selectedImage,
            };

            const url = "http://localhost:8080/api/car/register";
            await postData<CarSubmitData>(url, data);
            alert('Car registered successfully!');
            window.location.href = 'http://localhost:3000/admin/cars';
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="flex justify-end">
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white hover:scale-105 transition duration-300 ease-in-out"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={() => window.location.href = 'http://localhost:3000/admin/cars'}
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
            <h2 className="text-2xl font-bold mb-4 mt-12 text-center">Create car</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
                    <div className="flex flex-col">
                        <label htmlFor="brandId" className="mb-1 font-semibold">Brand</label>
                        <select id="brandId" {...register("brandId")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.brandId} value={brand.brandId}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        {errors.brandId && <p className="text-red-500">{errors.brandId.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="imageId" className="mb-1 font-semibold">Image</label>
                        <select id="imageId" {...register("imageId")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select an image</option>
                            {images.map((image) => (
                                <option key={image.imageId} value={image.imageId}>
                                    {image.name}
                                </option>
                            ))}
                        </select>
                        {errors.imageId && <p className="text-red-500">{errors.imageId.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-semibold">Name</label>
                        <input type="text" id="name" {...register("name")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 font-semibold">Description</label>
                        <input type="text" id="description" {...register("description")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
                    <div className="flex flex-col">
                        <label htmlFor="model" className="mb-1 font-semibold">Model</label>
                        <input type="text" id="model" {...register("model")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.model && <p className="text-red-500">{errors.model.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="mb-1 font-semibold">Price</label>
                        <input type="text" id="price" {...register("price")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="color" className="mb-1 font-semibold">Color</label>
                        <input type="text" id="color" {...register("color")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.color && <p className="text-red-500">{errors.color.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="motorType" className="mb-1 font-semibold">Motor Type</label>
                        <input type="text" id="motorType" {...register("motorType")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.motorType && <p className="text-red-500">{errors.motorType.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
                    <div className="flex flex-col">
                        <label htmlFor="power" className="mb-1 font-semibold">Power</label>
                        <input type="text" id="power" {...register("power")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.power && <p className="text-red-500">{errors.power.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="placeNumber" className="mb-1 font-semibold">Place Number</label>
                        <input type="text" id="placeNumber" {...register("placeNumber")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.placeNumber && <p className="text-red-500">{errors.placeNumber.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="status" className="mb-1 font-semibold">Status</label>
                        <select id="status" {...register("status")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Pinned">Pinned</option>
                            <option value="NotPinned">Not Pinned</option>
                        </select>
                        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="type" className="mb-1 font-semibold">Type</label>
                        <input type="text" id="type" {...register("type")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
};

export default RegisterCar;
