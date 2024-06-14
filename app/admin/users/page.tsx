import React from "react";
import { NavUser } from "@/app/component/admin/User/Nav";
import UserList from "@/app/component/admin/User/UserList";

export default function userCrud() {
    return <>
     <NavUser/>
     <UserList/>
    </>;
}