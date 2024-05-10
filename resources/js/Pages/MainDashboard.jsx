import React from "react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";
import DashboardStats from "../Components/DashboardStats.jsx";

export default function MainDashboard() {
    return (
        <DefaultDashboardLayout>
            <div className="flex justify-between mt-8 mb-8">
                <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue mt-4">
                    Dashboard
                </h2>
            </div>
            <DashboardStats />
        </DefaultDashboardLayout>



        //MARGIN TOP : mt-4 (ou 8)
        //MARGIN BOTTOM : mb-4 (ou 8)
    );
}
