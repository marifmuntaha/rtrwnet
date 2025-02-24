import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import RootLayout from "../layout/rootLayout";
import AuthLayout from "../layout/authLayout";
import Dashboard from "../pages/dashboard";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import DeviceCreate from "../pages/device/deviceCreate.jsx";
import DeviceList from "../pages/device/deviceList.jsx";
import DeviceUpdate from "../pages/device/deviceUpdate.jsx";

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />
                    },
                    {
                        path: "/perangkat/list",
                        element: <DeviceList />
                    },
                    {
                        path: "/perangkat/tambah",
                        element: <DeviceCreate />
                    },
                    {
                        path: "/perangkat/:id/ubah",
                        element: <DeviceUpdate />
                    },
                ]
            }
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/masuk",
                element: <Login />,
            },
            {
                path: "/auth/daftar",
                element: <Register />,
            }
        ]
    }
])