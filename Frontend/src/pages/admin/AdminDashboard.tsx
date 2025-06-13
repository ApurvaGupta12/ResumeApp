import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>
      {/* Render the selected route (UsersPage, TemplatesPage, etc.) */}
      <Card>
        <CardContent className="p-6">
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
