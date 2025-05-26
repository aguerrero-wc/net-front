import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Siderbar/SideBar";
import ContenidosMain from "~/components/Contenidos/ContenidosMain";

export default function VideosLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <Outlet />
    </div>
  );
}