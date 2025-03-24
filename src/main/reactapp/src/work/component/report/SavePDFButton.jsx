import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@mui/material/Button";
import PDF_Viewer from "./PDF_Viewer"; // PDF 문서 컴포넌트

const SavePDFButton = ({ formData, rpno, approval }) => {
  return (
    <PDFDownloadLink
      document={<PDF_Viewer formData={formData} rpno={rpno} approval={approval} />}
      fileName="example.pdf"
    >
      {({ loading }) =>
        loading ? (
          <Button variant="contained" disabled>PDF 생성 중...</Button>
        ) : (
          <Button variant="contained" color="primary">PDF 다운로드</Button>
        )
      }
    </PDFDownloadLink>
  );
};
export default SavePDFButton;