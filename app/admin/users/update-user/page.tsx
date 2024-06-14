"use client"
import React from 'react';
import { useUrl } from 'nextjs-current-url';
import UpdateUser from '@/app/component/admin/User/UpdateUser';

export default function UpdateUserPage(){
    const { pathname } = useUrl() ?? {};
    let idUser = "";
    if (pathname) {
        const searchParams = new URLSearchParams(window.location.search);
        idUser = searchParams.get("id") || "";
    }
    
    return (
        <section>
            <UpdateUser id={Number(idUser)} /> 
        </section>
    );
}
