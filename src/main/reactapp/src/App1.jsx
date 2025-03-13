import React, { useState } from 'react';
import { 
  Container, Row, Col, Nav, Navbar, Form, Button, Card, ListGroup, Modal 
} from 'react-bootstrap';
import { 
  PersonFill, ChatDotsFill, PeopleFill, 
  BellFill, GearFill 
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  // 상태 관리
  const [activeView, setActiveView] = useState('chat');
  const [selectedUser, setSelectedUser] = useState(null);

  // 사용자 데이터
  const users = [
    { id: 1, name: '홍길동', department: '인사팀', status: '온라인' },
    { id: 2, name: '김철수', department: '개발팀', status: '자리비움' },
    { id: 3, name: '이영희', department: '마케팅팀', status: '외근' }
  ];

  // 조직도 관련 상태
  const departments = [
    { 
      id: 1, 
      name: '인사팀', 
      members: [
        { id: 101, name: '김인사', position: '부장', status: '온라인' },
        { id: 102, name: '박채용', position: '과장', status: '자리비움' }
      ]
    },
    { 
      id: 2, 
      name: '개발팀', 
      members: [
        { id: 201, name: '이개발', position: '팀장', status: '온라인' },
        { id: 202, name: '최프로', position: '선임', status: '외근' }
      ]
    }
  ];

  // 알림 데이터
  const notifications = [
    { id: 1, message: '새로운 프로젝트 공지', time: '10분 전' },
    { id: 2, message: '김철수님의 휴가 승인', time: '1시간 전' },
    { id: 3, message: '팀 회의 알림', time: '오늘 오후 2시' }
  ];

  // 메시지 데이터
  const [messages, setMessages] = useState([
    { id: 1, sender: '홍길동', text: '안녕하세요!', time: '09:30' },
    { id: 2, sender: '나', text: '반갑습니다.', time: '09:31' }
  ]);

  // 메시지 입력 상태
  const [newMessage, setNewMessage] = useState('');

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: '나',
      text: newMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  // 조직도 렌더링
  const renderOrganization = () => (
    <div>
      <h4 className="mb-3">조직도</h4>
      {departments.map(dept => (
        <Card key={dept.id} className="mb-3">
          <Card.Header>{dept.name}</Card.Header>
          <Card.Body>
            {dept.members.map(member => (
              <div 
                key={member.id} 
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <div>
                  <strong>{member.name}</strong>
                  <div className="text-muted">{member.position}</div>
                </div>
                <span className={`
                  badge 
                  ${member.status === '온라인' ? 'bg-success' : 
                    member.status === '자리비움' ? 'bg-warning' : 
                    'bg-secondary'}
                `}>
                  {member.status}
                </span>
              </div>
            ))}
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  // 알림 렌더링
  const renderNotifications = () => (
    <div>
      <h4 className="mb-3">알림</h4>
      <ListGroup>
        {notifications.map(noti => (
          <ListGroup.Item 
            key={noti.id} 
            className="d-flex justify-content-between align-items-center"
          >
            {noti.message}
            <small className="text-muted">{noti.time}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  // 설정 렌더링
  const renderSettings = () => (
    <div>
      <h4 className="mb-3">설정</h4>
      <Form>
        <Card className="mb-3">
          <Card.Header>개인 설정</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>상태 메시지</Form.Label>
              <Form.Control type="text" placeholder="상태 메시지를 입력하세요" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check 
                type="switch" 
                id="notification-switch" 
                label="알림 받기" 
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header>보안 설정</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>비밀번호 변경</Form.Label>
              <Form.Control type="password" placeholder="현재 비밀번호" />
              <Form.Control type="password" placeholder="새 비밀번호" className="mt-2" />
              <Form.Control type="password" placeholder="새 비밀번호 확인" className="mt-2" />
            </Form.Group>
          </Card.Body>
        </Card>

        <Button variant="primary">설정 저장</Button>
      </Form>
    </div>
  );

  // 메인 렌더링 함수
  const renderContent = () => {
    switch(activeView) {
      case 'organization':
        return renderOrganization();
      case 'notifications':
        return renderNotifications();
      case 'settings':
        return renderSettings();
      default:
        return null;
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* 사이드바 */}
        <Col md={3} className="bg-light border-end">
          <Navbar className="mb-3">
            <Navbar.Brand>
              <PersonFill /> 내 프로필
            </Navbar.Brand>
          </Navbar>

          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link 
                onClick={() => setActiveView('chat')}
                active={activeView === 'chat'}
              >
                <ChatDotsFill /> 채팅
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                onClick={() => setActiveView('organization')}
                active={activeView === 'organization'}
              >
                <PeopleFill /> 조직도
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                onClick={() => setActiveView('notifications')}
                active={activeView === 'notifications'}
              >
                <BellFill /> 알림
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                onClick={() => setActiveView('settings')}
                active={activeView === 'settings'}
              >
                <GearFill /> 설정
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* 사용자 목록 */}
          {activeView === 'chat' && (
            <div className="mt-3">
              <Form.Control 
                type="text" 
                placeholder="사용자 검색" 
                className="mb-3" 
              />
              {users.map(user => (
                <Card 
                  key={user.id} 
                  className="mb-2"
                  onClick={() => setSelectedUser(user)}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{user.name}</strong>
                        <div className="text-muted">{user.department}</div>
                      </div>
                      <div className={`
                        badge 
                        ${user.status === '온라인' ? 'bg-success' : 
                          user.status === '자리비움' ? 'bg-warning' : 
                          'bg-secondary'}
                      `}>
                        {user.status}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
        <Col md={9} className="d-flex flex-column">
          <div className="flex-grow-1 p-3 overflow-auto">
            {activeView === 'chat' && !selectedUser ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <h4 className="text-muted">대화할 사용자를 선택해주세요</h4>
              </div>
            ) : activeView === 'chat' && selectedUser ? (
              <>
                {/* 채팅방 헤더 */}
                <Navbar bg="light" className="border-bottom">
                  <Container fluid>
                    <Navbar.Brand>
                      <PersonFill /> {selectedUser.name}
                    </Navbar.Brand>
                  </Container>
                </Navbar>

                {/* 채팅 메시지 영역 */}
                <div className="flex-grow-1 overflow-auto p-3">
                  {messages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`mb-3 ${msg.sender === '나' ? 'text-end' : 'text-start'}`}
                    >
                      <div 
                        className={`d-inline-block p-2 rounded ${
                          msg.sender === '나' ? 'bg-primary text-white' : 'bg-light'
                        }`}
                      >
                        {msg.sender !== '나' && <strong>{msg.sender}: </strong>}
                        {msg.text}
                        <small className="d-block text-muted mt-1" style={{fontSize: '0.7rem'}}>
                          {msg.time}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 메시지 입력 영역 */}
                <Form className="p-3 border-top" onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}>
                  <Row>
                    <Col xs={10}>
                      <Form.Control 
                        type="text" 
                        placeholder="메시지를 입력하세요" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </Col>
                    <Col xs={2}>
                      <Button 
                        variant="primary" 
                        className="w-100" 
                        onClick={handleSendMessage}
                      >
                        전송
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : (
              // 다른 뷰 (조직도, 알림, 설정)
              renderContent()
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;