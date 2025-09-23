import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../Shared/Components/UiElements/Navbar";
import Header from "../../../Shared/Components/UiElements/header";
import { EmployeeAuthContext } from "../../../Shared/Components/context/EmployeeAuthContext";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const { employeePersonId, isLoggedInEmployee, isCashierLoggedIn, avatarUrl } =
    useContext(EmployeeAuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, redirect to employee login
    if (!employeePersonId) {
      navigate("/loginemployee");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/EmployeeLogin/update/${employeePersonId}`
        );
        setData(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [employeePersonId, navigate]);

  const label = isCashierLoggedIn
    ? "Cashier"
    : isLoggedInEmployee
    ? "Admin"
    : "Employee";

    console.log("Avatar URL from context:", avatarUrl);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar select="Profile" />
      <Header />
      <main className="ml-64 pt-20 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
          <div className="bg-white shadow rounded-lg p-6">
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && data && (
              <div className="flex items-start gap-6">
                {data?.avatarUrl || avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                    {data?.name ? data.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900 font-medium">
                      {data?.name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email (Username)</p>
                    <p className="text-gray-900 font-medium">
                      {data?.username || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-gray-900 font-medium">
                      {data?.role || label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employee Code</p>
                    <p className="text-gray-900 font-medium">
                      {data?.ID || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="text-gray-900 font-medium">
                      {data?.createdAt
                        ? new Date(data.createdAt).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-gray-900 font-medium">
                      {data?.updatedAt
                        ? new Date(data.updatedAt).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;
