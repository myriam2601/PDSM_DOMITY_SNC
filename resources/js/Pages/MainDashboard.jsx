import React from "react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";
import DashboardStats from "../Components/DashboardStats.jsx";

export default function MainDashboard() {
  return (
    <DefaultDashboardLayout>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
          Dashboard
        </h2>
      </div>
      <DashboardStats />
    </DefaultDashboardLayout>
  );
}
