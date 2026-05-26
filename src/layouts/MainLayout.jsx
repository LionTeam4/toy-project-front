import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";
import Dialog from "../components/Dialog";

const MainLayout = () => {
    return (
        <>
          <div className="bg-gray-200 min-h-screen flex justify-center">
              <div className="w-full max-w-[393px] bg-white min-h-screen relative">
                  <main>
                      <Outlet />
                  </main>
                  <Toast />
              </div>
          </div>
          <Dialog />
        </>
    )
};

export default MainLayout;