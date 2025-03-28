import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import Member_Input from './Member_Input';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  height: '100%',
}));

export default function Report_Post(){

  return(<>
        <Member_Input />
  </>)
}

