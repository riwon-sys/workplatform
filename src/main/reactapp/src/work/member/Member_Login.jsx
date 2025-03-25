import { useEffect, useState, useRef } from "react"; // 가장 위에 추가 및 use 통합 | rw 25-03-25
import axios from "axios"; // rw 25-03-20
import { useNavigate } from "react-router-dom"; // rw 25-03-20

import { useDispatch } from "react-redux"; //  로그인 > 회원정보 요청 store 저장  | rw 25-03-21
import { login } from "../member/reduxs/userSlice"; // rw 25-03-21

import {
    ThemeProvider,
    createTheme,
    Box,
    Card,
    IconButton,
    TextField,
    Button,
    Typography,
    Stack
} from "@mui/material";
import {
    Brightness7,
    Brightness4,
    Settings,
    Close,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import { useSnackbar } from "notistack"; // 토스트 메시지

export default function Member_Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [memberInfo, setMemberInfo] = useState({ mno: "", mpwd: "" });
    const [loginError, setLoginError] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedMno = localStorage.getItem("autoLoginMno");
        if (savedMno) {
            setMemberInfo((prev) => ({ ...prev, mno: savedMno }));
            setAutoLogin(true);
        }
    }, []);

    const onInputChange = (e) => {
        setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value });
    };

    const onLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8080/workplatform/login",
                memberInfo,
                { withCredentials: true }
            );
            const result = response.data;

            if (result === true) {
                const response2 = await axios.get(
                    "http://localhost:8080/workplatform/myinfo",
                    { withCredentials: true }
                );

                // ✅ 직렬화 가능한 값만 추출해서 구성
                const safeUserInfo = {
                    mno: response2.data.mno,
                    mname: response2.data.mname,
                    mrank: response2.data.mrank,
                    mprofile: response2.data.mprofile
                };

                dispatch(login(safeUserInfo)); // ✅ 안전하게 리덕스에 저장

                if (autoLogin) {
                    localStorage.setItem("autoLoginMno", memberInfo.mno);
                } else {
                    localStorage.removeItem("autoLoginMno");
                }

                enqueueSnackbar("로그인 성공! 사원님 오늘도 화이팅! 🎉", {
                    variant: "success"
                });

                navigate("/");
            } else {
                setLoginError("사원번호 또는 비밀번호가 올바르지 않습니다.");
            }
        } catch (error) {
            setLoginError("서버 오류 발생. 관리자에게 문의하세요.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginScreen
            memberInfo={memberInfo}
            onInputChange={onInputChange}
            onLogin={onLogin}
            loginError={loginError}
            autoLogin={autoLogin}
            setAutoLogin={setAutoLogin}
            loading={loading}
        />
    );
}

const LoginScreen = ({
                         memberInfo,
                         onInputChange,
                         onLogin,
                         loginError,
                         autoLogin,
                         setAutoLogin,
                         loading
                     }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const mpwdInputRef = useRef(null);

    const toggleColorMode = () => setDarkMode(!darkMode);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light"
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    padding: "20px"
                }}
            >
                <Card
                    variant="outlined"
                    sx={{
                        width: "100%",
                        maxWidth: "600px",
                        padding: "60px",
                        borderRadius: "16px",
                        position: "relative",
                        opacity: 0,
                        transform: "translateY(30px)",
                        animation: "fadeInMove 0.8s ease forwards"
                    }}
                >
                    {/* 우측 상단 아이콘 */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            display: "flex",
                            gap: 1
                        }}
                    >
                        <IconButton color="primary" onClick={toggleColorMode}>
                            {darkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                        <IconButton color="primary">
                            <Settings />
                        </IconButton>
                        <IconButton color="error" onClick={() => navigate("/")}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Typography variant="h4" align="center" gutterBottom>
                        WorkPlatform 로그인
                    </Typography>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onLogin();
                        }}
                    >
                        <Stack spacing={3} sx={{ mt: 3 }}>
                            <TextField
                                label="사원번호"
                                name="mno"
                                value={memberInfo.mno}
                                onChange={onInputChange}
                                fullWidth
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        mpwdInputRef.current?.focus();
                                    }
                                }}
                            />

                            <TextField
                                label="비밀번호"
                                name="mpwd"
                                type={showPassword ? "text" : "password"}
                                value={memberInfo.mpwd}
                                onChange={onInputChange}
                                inputRef={mpwdInputRef}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={toggleShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )
                                }}
                            />

                            {loginError && (
                                <Typography variant="body2" color="error" align="center">
                                    {loginError}
                                </Typography>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    checked={autoLogin}
                                    onChange={(e) => setAutoLogin(e.target.checked)}
                                    id="autoLogin"
                                />
                                <label htmlFor="autoLogin" style={{ marginLeft: 8 }}>
                                    자동 로그인
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "로그인 중입니다..." : "로그인"}
                            </Button>

                            <Typography variant="caption" color="textSecondary" align="center">
                                로그인 관련 문의사항은 <strong>insateam@example.com</strong> 으로 연락 바랍니다.
                            </Typography>
                        </Stack>
                    </form>
                </Card>
            </Box>
        </ThemeProvider>
    );
};