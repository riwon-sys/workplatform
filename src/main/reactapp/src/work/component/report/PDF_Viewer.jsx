import * as React from 'react';

/* mui import */
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';

/* mui icon */
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

/* jsx import */
import Report_Form from './Report_Form';
import LoadingIconButton from './LoadingIconButton';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const materialTheme = createTheme(); // MUI Material Theme 생성

export default function PDF_Viewer( { formData, formDataChange, rpno, approval } ) {
  const [layout, setLayout] = React.useState(undefined);
  const [scroll, setScroll] = React.useState(true);
  const [scale, setScale] = React.useState(1);

  // 확대 함수
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.4, 2.2)); // 최대 2배까지 확대
  };

  // 축소 함수
  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.4, 0.6)); // 최소 0.5배까지 축소
  };

  // 확대 비율을 퍼센트로 계산
  const scalePercentage = Math.round(scale * 100);  // 예: 1.5 => 150%

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1} mb={2}>
        <Tooltip title="PDF 미리보기" placement="top">
          <Button
            variant="contained"
            color="info"
            sx={{
              backgroundColor: '#0288d1', 
              color: 'white', 
            }}
            onClick={() => {
              setLayout('fullscreen');
            }}
          >
            <PictureAsPdfIcon color='inherit' fontSize='20px' />
          </Button>
        </Tooltip>
      </Stack>

      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog
          layout={layout}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "100vh", // 화면을 넘지 않도록 설정
            overflow: "hidden", // 기본적으로 hidden 설정
            padding: 0,
            // maxWidth: "1000px",
            // margin: "0 auto"
          }}
        >
          <ModalClose sx={{ mt: 1, mr: 2, zIndex: "1500", backgroundColor: "white" }} />
          <div 
            style={{ 
              position: "fixed",
              top: 15, 
              right: 80,
              zIndex: 1001
            }}
          >
            <ThemeProvider theme={materialTheme}>
              <LoadingIconButton />
            </ThemeProvider>
          </div>

          {/* 상단 고정 (sticky 사용 가능) */}
          <div 
            style={{ 
              width: "100%",  
              position: "sticky",
              top: 0,
              background: "#3c3c3c",
              zIndex: 1000,
              marginBottom: "-12px",
            }}
          >
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                height: "70px"
              }} 
            >
              <h3 style={{ color: "white", width: "20%", padding: "0px 40px", }}>
                PDF 미리보기
              </h3>
              {/* 확대/축소 버튼들 */}
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  width: "60%",
                  height: "100%"
                }}
              >
                <button 
                  onClick={zoomIn} 
                  style={{ 
                    backgroundColor: "transparent", 
                    margin: "0 10px",
                  }}
                >
                  <ZoomInIcon 
                    sx={{ 
                      color: "white",
                      fontSize: "25px", // 버튼 글자 크기
                    }} 
                  />
                </button>

                {/* 확대 비율 표시 */}
                <div 
                  style={{ 
                    color: "white", 
                    fontSize: "16px", 
                    margin: "0 10px", 
                    width: "50px",
                    textAlign: "cen"
                  }}
                >
                  {scalePercentage}%
                </div>

                <button 
                  onClick={zoomOut} 
                  style={{ 
                    backgroundColor: "transparent", 
                    margin: "0 10px",
                  }}
                >
                  <ZoomOutIcon 
                    sx={{ 
                      color: "white",
                      fontSize: "25px", // 버튼 글자 크기
                    }} 
                  />
                </button>
              </div>
              
              <div 
                style={{ 
                  width: "20%", 
                  padding: "16px 0px 0px 20px"
                }}
              >
              </div>
            </div>
          </div>

          {/* 스크롤 가능 영역 */}
          <div 
            style={{ 
              flexGrow: 1, 
              width: "100%",
              overflowY: "auto", 
              backgroundColor: "#28292a",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                margin: "0 auto",
                padding: "60px 0px",
                border: "1px solid black",
                minWidth: "980px",
                maxWidth: "980px",
                transform: `scale(${scale})`, // scale 값 적용
                transformOrigin: "top center", // 스케일이 상단 중앙을 기준으로 확대/축소
                transition: "transform 0.3s ease", // 부드러운 애니메이션 추가
              }}
            >
              <div style={{ width: "800px", margin: "0 auto", minHeight: "100vh" }}>
                <Report_Form
                  id="pdf-download"
                  formData={formData}
                  formDataChange={formDataChange}
                  isReadOnly={true}
                  isUpdate={true}
                  rpno={rpno}
                  approval={approval}
                />
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}