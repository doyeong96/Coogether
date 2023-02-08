/* eslint-disable */
import React, { Component, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CarouselBtn from '../../Btn/CarouselBtn/CarouselBtn';

import {
  RecipeWrap,
  ContentWrap,
  ExitBox,
  WrapUserList,
  WrapUserInfo,
  WaitDivideBox,
  WaitTitle,
  ThisUserImg,
  WaitContainer,
} from './ChatCompo';

import './ChatComponent.css';

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
      message: '',
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:chat', event => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            'userImg-' + (this.state.messageList.length - 1)
          );
          const video = document.getElementById('video-' + data.streamId);
          const avatar = userImg.getContext('2d');
          // avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log(this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, '');
      if (message !== '' && message !== ' ') {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        });
      }
    }
    this.setState({ message: '' });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    return (
      <WaitContainer>
        <WaitDivideBox>
          <WaitTitle>오늘은 모두 요리사</WaitTitle>

          {/* 유저 정보 입력 공간, 사진도 같이 가져와야함 */}
          <WrapUserList>
            <WrapUserInfo>
              <ThisUserImg src={this.props.userImg} />
              <div>{this.props.user.nickname}</div>
            </WrapUserInfo>
            {this.props.remoteUsers.map((v, a) => {
              return (
                <WrapUserInfo>
                  <ThisUserImg src={v.img} />
                  <div>{v.nickname}</div>
                </WrapUserInfo>
              );
            })}
          </WrapUserList>
          {/* 재료 및 레시피 정보 입력 공간 */}

          <ContentWrap>
            <CarouselBtn left={'레시피'} right={'재료'} />
            <RecipeWrap>
              <h1 style={{}}>레시피 이름</h1>
              {this.props.recipe.map(v => {
                return (
                  <div>
                    {v.recipeStepNum}
                    <div>{v.recipeStepContent}</div>
                  </div>
                );
              })}
            </RecipeWrap>
          </ContentWrap>
        </WaitDivideBox>
        <WaitDivideBox>
          <ContentWrap>
            <div id="chatComponent">
              <div id="chatToolbar">
                {/* 방 이름+ 채팅 */}
                <span>
                  {this.props.user.getStreamManager().stream.session.sessionId}{' '}
                  방 채팅
                </span>
              </div>
              <span>참가자 ({this.props.remoteUsers.length + 1})</span>
              <span>공지를 올려주세요!</span>
              <div className="message-wrap" ref={this.chatScroll}>
                {this.state.messageList.map((data, i) => (
                  <div
                    key={i}
                    id="remoteUsers"
                    className={
                      'message' +
                      (data.connectionId !== this.props.user.getConnectionId()
                        ? ' left'
                        : ' right')
                    }
                  >
                    <canvas
                      id={'userImg-' + i}
                      width="60"
                      height="60"
                      className="user-img"
                    />
                    <div className="msg-detail">
                      <div className="msg-info">
                        <p> {data.nickname}</p>
                      </div>
                      <div className="msg-content">
                        <span className="triangle" />
                        <p className="text">{data.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div id="messageInput">
                <input
                  placeholder="여기에 메세지를 입력해주세요"
                  id="chatInput"
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={this.handlePressKey}
                />
                <button onClick={this.sendMessage}> 보내기</button>
              </div>
            </div>
            <button onClick={this.close}>시작하기</button>
          </ContentWrap>
        </WaitDivideBox>
        <ExitBox>
          <Link to="/Main">나가기</Link>
        </ExitBox>
      </WaitContainer>
    );
  }
}
