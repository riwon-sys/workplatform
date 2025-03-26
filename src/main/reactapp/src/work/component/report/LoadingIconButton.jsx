import * as React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button, Tooltip, CircularProgress } from "@mui/material";

export default function LoadingIconButton( { convertToPdf } ) {
  const [ loading, setLoading ] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  });


  return (
    <Tooltip title="PDF Download">
      <Button
        onClick={async () => {
          setLoading(true);
          await convertToPdf(); // PDF 변환 함수 실행
          setLoading(false);
        }}
        variant="contained"
        color="info"
        sx={{
          width: "70px", // 가로 너비 설정
          minWidth: "unset", // 기본 min-width 제거
          padding: "8px", // 패딩 적용
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2
        }}
        disabled={loading} // 로딩 중이면 버튼 비활성화
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : <PictureAsPdfIcon />}
      </Button>
    </Tooltip>
  );
}