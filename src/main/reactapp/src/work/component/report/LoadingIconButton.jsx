import * as React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button, Tooltip, CircularProgress } from "@mui/material";

/* react pdf */
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";

export default function LoadingIconButton( ) {
  const [ loading, setLoading ] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  });

  const convertToPdf = async () => {
    const element = document.getElementById("pdf-download");
    if ( !element ) {
      console.error("PDF 변환할 요소를 찾을 수 없습니다.");
      return;
    }
  
    // 기존 스타일 저장
    const originalStyle = {
      width: element.style.width,
      height: element.style.height,
      maxWidth: element.style.maxWidth,
      visibility: element.style.visibility,
    };
  
    // 스타일 변경 (PDF 생성용)
    element.style.width = "800px"; 
    element.style.height = "auto"; 
    element.style.maxWidth = "none"; 
    element.style.background = "white";  
    // element.style.visibility = "hidden"; // 깜빡임 방지
  
    try {
      const dataUrl = await domtoimage.toPng(element, {
        bgcolor: 'white',
        scale: 2
      });
  
      const doc = new jsPDF("p", "mm", "a4");
  
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const padding = 15;
        const imgWidth = pageWidth * 0.85;
        // const imgHeight = (img.height * imgWidth) / img.width;
        const imgHeight = pageHeight * 0.85;

  
        doc.addImage(img, "PNG", padding, padding, imgWidth, imgHeight, '', 'FAST');
        doc.save("screenshot.pdf");
  
        // 원래 스타일 복원
        Object.assign(element.style, originalStyle);
      };
    } catch (error) {
      console.error("PDF 변환 오류:", error);
      // 오류 발생 시에도 원래 스타일 복원
      Object.assign(element.style, originalStyle);
    }
  };
  
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