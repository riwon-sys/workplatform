import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react"
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BoardList from './BoardList';
//import BoardDetail from './work/BoardDetail';
//import './Board.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),  //* 안쪽 여백 수정할 수있음*//
    textAlign: 'center',
    height: '100%',
    }));

    //미구현 ( 주석 처리해야될수도?)
    const Board = () => {

      return (<>        
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeee' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}> 
          {/* size: 너비 조정 */}
          <Grid size={7} sx={{ height: '100%', margin: '0 auto'  }}>
            <Item>
              <BoardList />
            </Item>
          </Grid>
        </Grid>
      </Box></>
        
      );
    };

    export default Board;


    
