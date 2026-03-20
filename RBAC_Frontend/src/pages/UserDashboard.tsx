import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

const getEmailFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch {
    return null;
  }
};

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const email = getEmailFromToken();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchProfile = async () => {
    if (!email) {
      toast.error("Session expired");
      navigate("/");
      return;
    }

    try {
      const res = await api.get(`/user/profile?email=${email}`);
      setUser(res.data);

      setFormData({
        name: res.data.name,
        email: res.data.email,
        password: "",
      });
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await api.put(`/user/update/${user.id}`, formData);

      toast.success("Profile updated!");

      setUser(res.data);
      setShowModal(false);
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name} 👋
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PROFILE CARD */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            My Profile
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium">{user?.name}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-medium">{user?.role}</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  user?.role === "ADMIN"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl hover:scale-[1.02] transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Quick Info
          </h2>

          <div className="space-y-4 text-gray-600">
            <div className="p-4 bg-gray-50 rounded-xl">
              Logged in as:
              <div className="font-bold">{user?.role}</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              Account Status:
              <div className="text-green-600 font-bold">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="New Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
