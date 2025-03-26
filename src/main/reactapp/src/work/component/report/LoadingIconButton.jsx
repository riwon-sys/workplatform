import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function LoadingIconButton( { convertToPdf } ) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  });
  return (
    <Tooltip title="Click to see loading">
      <IconButton 
        onClick={() => { setLoading(true); convertToPdf(); } } 
        loading={loading}
        color='primary'
      >
        <PictureAsPdfIcon variant="contained" />
      </IconButton>
    </Tooltip>
  );
}