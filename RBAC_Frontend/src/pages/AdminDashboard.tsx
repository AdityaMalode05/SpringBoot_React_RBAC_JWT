import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../api/adminApi";
import api from "../api/axios";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const payload: any = {
    name: formData.name,
    email: formData.email,
    role: formData.role,
  };

  if (formData.password?.trim()) {
    payload.password = formData.password;
  }

  const loggedInEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users!");
    }
  };

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "USER",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        await api.put(`/admin/user/${editingUser.id}`, payload);
        toast.success("User updated!");
      } else {
        await api.post("/admin/create-user", formData);
        toast.success("User created!");
      }

      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed!");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;

    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;

  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const confirmDelete = (user: User) => {
    if (user.email === loggedInEmail) {
      toast.error("You can't delete yourself!");
      return;
    }

    setUserToDelete(user);
    setShowConfirm(true);
  };

  const executeDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      toast.success("User deleted!");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed!");
    } finally {
      setShowConfirm(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Admins</h2>
          <p className="text-2xl font-bold">{totalAdmins}</p>
        </div>
      </div>

      {/* 🔍 Search + Filter + Add */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-3 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => confirmDelete(user)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧾 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Create User"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />

            {!editingUser && (
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
            )}

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 border rounded mb-3"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold mb-3">Confirm Delete</h2>

            <p className="text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDelete?.name}</span>?
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={executeDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
