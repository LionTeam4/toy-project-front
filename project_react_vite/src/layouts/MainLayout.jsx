import { Outlet, useNavigate } from "react-router-dom";
import GNB from "../components/GNB";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const MainLayout = () => {
    // 페이지 처음 실행 시 로그인 화면 띄우기 //
    // const { user } = useAuth()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!user) navigate('/login')
    // }, [user])

    return (
        <div>
            <GNB />     {/* 모든 페이지 상단에 공통 네비게이션 */}
            <main>
                <Outlet />      {/* 여기서 각 페이지가 렌더링됨 */}
            </main>
        </div>
    )
};

export default MainLayout;