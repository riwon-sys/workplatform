import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./userSlice"; 
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const CheckSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ isFirstCheck, setIsFirstCheck ] = useState(true); // 처음 체크 여부

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:8080/workplatform/checksession", { withCredentials: true });

        if (!response.data) {
          if (isFirstCheck) {
            console.log("첫 번째 체크 - 로그인 반영까지 기다립니다...");
            setIsFirstCheck(false); // 첫 체크에서 세션이 없더라도 바로 로그아웃하지 않음
            return;
          }

          console.log("세션 없음 - 로그아웃 실행");
          handleLogout();
        } else {
          console.log("세션 유지 중");
        }
      } catch (error) {
        console.error("세션 확인 오류:", error);
        handleLogout();
      }
    };

    const handleLogout = () => {
      dispatch(logout());
      enqueueSnackbar("로그아웃 되었습니다. 로그인 후 사용해주세요.", { variant: "info" });
      navigate("/");
    };

    // 첫 체크는 10초 후에 실행 (로그인 직후 세션 반영 시간 확보)
    setTimeout(checkSession, 10000);

    // 이후 10분마다 체크
    const interval = setInterval(checkSession, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, navigate]);
};

export default CheckSession;