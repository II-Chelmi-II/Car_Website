"use client"
import React from 'react';
import { useUrl } from 'nextjs-current-url';
import UpdateImage from '@/app/component/admin/image/UpdateImage';

export default function UpdateImagePage(){
    const { pathname } = useUrl() ?? {};
    let idImage = "";
    if (pathname) {
        const searchParams = new URLSearchParams(window.location.search);
        idImage = searchParams.get("imageId") || "";
    }
    
    return (
        <section>
            <UpdateImage id={Number(idImage)} /> 
        </section>
    );
}
