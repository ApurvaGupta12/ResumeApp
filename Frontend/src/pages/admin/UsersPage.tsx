import axios from "axios";
import React, { useEffect, useState } from "react";
interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
}
const validRoles = ["ALL", "USER", "ADMIN"];
const UsersPage: React.FC = () => {
const [searchTerm, setSearchTerm] = useState("");
const [roleFilter, setRoleFilter] = useState("ALL");
const [users, setUsers] = useState<User[]>([]);
const handleRoleChange = (userId: number, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    setLoading(false);
  }
};
  fetchUsers();
}, []);
  const handleStatusToggle = (userId: number, status: boolean) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: status } : u))
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });
 if (loading) {
    return <div>Loading users...</div>;
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-full max-w-sm"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          {validRoles.map((role) => (
            <option key={role} value={role}>
              {role === "ALL" ? "All Roles" : role}
            </option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border rounded p-1"
                >
                  {validRoles
                    .filter((r) => r !== "ALL")
                    .map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={user.active}
                  onChange={(e) => handleStatusToggle(user.id, e.target.checked)}
                  className="cursor-pointer w-5 h-5"
                  title={user.active ? "Active" : "Inactive"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
