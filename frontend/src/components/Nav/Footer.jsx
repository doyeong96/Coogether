import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import { Line, FotterBlock, FotterPlace } from './FooterStyle';
import Mainlogo from '../../assets/img/mainlogo.png';

function Footer() {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  if (
    location.pathname.indexOf('/login') === -1 &&
    location.pathname.indexOf('/Login') === -1 &&
    location.pathname.indexOf('/Signin') === -1 &&
    location.pathname.indexOf('/signin') === -1 &&
    location.pathname.indexOf('/room') === -1 &&
    location.pathname.indexOf('/Room') === -1
  ) {
    return (
      <FotterPlace>
        <br />
        <br />
        <br />
        <br />
        <Line />
        <br />
        <br />
        <FotterBlock>
          <Box display="grid" gridTemplateColumns="repeat(16, 1fr)" gap={1}>
            <Box gridColumn="span 3" />
            <Box gridColumn="span 2">
              <img src={Mainlogo} alt="mainlogo" width="100px" />
            </Box>
            <Box gridColumn="span 1" />
            <Box gridColumn="span 6">
              <br />
              <h4>(팀)6JEANS</h4>
              <br />
              <br />
              <p>SSAFY 8기 공통프로젝트</p>
              <br />
              <p>
                팀장 : 이현구 / 팀원: 김덕호, 박서윤, 유예지, 이석훈, 황도영
              </p>
              <br />
              <br />
              <br />
              <p>COPYRIGHT 쿠게더 ALL RIGHT RESERVED</p>
              <br />
              <br />
              <br />
            </Box>
            <Box gridColumn="span 1" />
            <Box gridColumn="span 1" />
            <Box gridColumn="span 1" />
            <Box gridColumn="span 1" />
          </Box>
        </FotterBlock>
      </FotterPlace>
    );
  }
  return <div style={{ display: 'none' }}>None</div>;
}

export default Footer;
