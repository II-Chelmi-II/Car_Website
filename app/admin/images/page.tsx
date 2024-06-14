import React from "react"
import ImageList from "@/app/component/admin/image/ImageList"
import { NavImage } from "@/app/component/admin/image/NavImage"

export default function image() {
    return <section>
         <NavImage/>
         <ImageList/>
    </section>
}