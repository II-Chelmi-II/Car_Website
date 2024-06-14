import React from "react";
export function NavCar() {
    return <section>
        <div className="navbar bg-base-100  ">
            <div className="flex-none">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a href="/admin/cars/add-car" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">New Car</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
}