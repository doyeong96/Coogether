import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// MUI
import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Style
import { Background, H3 } from './MakeCookRoomStyle';

// Component
import MakeBasicInfo from '../../components/Wrapper/Box/MakeCookRoomBox/MakeBasicInfo';
import MakeDetailInfo from '../../components/Wrapper/Box/MakeCookRoomBox/MakeDetailInfo';
import StreamModal from '../../components/Modal/StreamModal/StreamModal';
import MakeImage from '../../components/Wrapper/Box/MakeCookRoomBox/MakeImage';
import MakeTimeInput from '../../components/Wrapper/Box/MakeCookRoomBox/MakeTimeInput';
import SearchMakeCookRoom from '../../components/Wrapper/Box/MakeCookRoomBox/SearchMakeCookRoom';
import NextBtn from '../../components/Btn/NextBtn/NextBtn';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MakeCoomRoom() {
  const userSeq = useSelector(state => state.user.userSeq);
  const accessToken = useSelector(state => state.user.accessToken);
  const history = useHistory();
  // 방송 제목
  const [streamName, setStreamName] = useState('');
  // 요리 시간
  const [streamTime, setStreamTime] = useState('');
  // 공지사항
  const [announce, setAnnounce] = useState('');
  // 요리 사진
  const [cookImage, setCookImage] = useState('');
  // 레시피
  const [selectRecipe, setSelectRecipe] = useState({});

  // Alert
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Alert 닫기
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsAlertOpened(false);
  };

  // 모달 열기
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };
  const roomSubmitHandler = async () => {
    if (!streamName) {
      setAlertMessage('방송 제목을 입력해주세요.');
      setIsOpen(false);
      setIsAlertOpened(true);
      return;
    }
    if (streamTime.includes('undefined')) {
      setAlertMessage('시작 시간을 입력해주세요.');
      setIsOpen(false);
      setIsAlertOpened(true);
      return;
    }
    if (!selectRecipe.recipeName) {
      setAlertMessage('요리 이름을 선택해주세요.');
      setIsOpen(false);
      setIsAlertOpened(true);
      return;
    }
    if (!announce) {
      setAlertMessage('공지사항을 입력해주세요.');
      setIsOpen(false);
      setIsAlertOpened(true);
      return;
    }
    if (!cookImage) {
      setAlertMessage('썸네일 이미지를 첨부해주세요.');
      setIsOpen(false);
      setIsAlertOpened(true);
      return;
    }

    const sendingData = {
      cookingRoomName: streamName,
      cookingRoomNotice: announce,
      cookingRoomStartTime: streamTime,
      recipeName: selectRecipe.recipeName,
    };
    const formData = new FormData();
    formData.append(
      'cookingRoomRequest',
      new Blob([JSON.stringify(sendingData)], { type: 'application/json' })
    );
    formData.append('file', cookImage);
    try {
      const postData = await axios({
        url: `https://i8b206.p.ssafy.io:9000/api/room/create/${userSeq}/${selectRecipe.recipeId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: formData,
      });
      history.push(`/Room/${postData.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <Snackbar
        open={isAlertOpened}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ width: '40%', fontSize: '1.4rem' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%', '& .MuiAlert-message': { fontSize: '1.6rem' } }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box display="grid" gridTemplateColumns="repeat(16, 1fr)" gap={1}>
        <Box gridColumn="span 6" />
        <Box gridColumn="span 4">
          <H3>다른 사람들과 요리를 시작해 보세요</H3>
          <MakeBasicInfo setStreamName={setStreamName} />
          <MakeTimeInput setStreamTime={setStreamTime} />
          <SearchMakeCookRoom setSelectRecipe={setSelectRecipe} />
          <MakeDetailInfo setAnnounce={setAnnounce} />
          <MakeImage cookImage={cookImage} onChange={setCookImage} />
          <NextBtn
            size="large"
            color="yellow"
            name="만들기"
            onClick={onClickButton}
          />
          {isOpen && (
            <StreamModal
              open={isOpen}
              roomSubmitHandler={roomSubmitHandler}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
        </Box>
        <Box gridColumn="span 6" />
      </Box>
    </Background>
  );
}

export default MakeCoomRoom;
