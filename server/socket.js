const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { 
    path: '/socket.io',
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
  });

  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');
  // 기본 io는 / 네임스페이스인거고
  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    
    socket.on('disconnect',()=>{
      console.log('room 네임스페이스에 해제');
    })
  })

  chat.on('connection', (socket) => {
    
    console.log('chat 네임스페이스에 접속');
    console.log(socket.request.session)

    socket.on('join', (data) => {
      // console.log('???',socket.request)

      socket.join(data);
      socket.to(data).emit('join', {
        user: 'system',
        // chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    })
  })
}


// io.on('connection', (socket) => { // 웹소켓 연결 시
  //   const req = socket.request;
  //   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  //   // 서버에서 클라이언트 ip를 가져오는 유명한 방법이 req.headers['x-forwarded-for']

  //   console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

  //   socket.on('disconnect', () => { // 연결 종료 시
  //     console.log('클라이언트 접속 해제', ip, socket.id);
  //     clearInterval(socket.interval);
  //   });

  //   socket.on('error', (error) => { // 에러 시
  //     console.error(error);
  //   });

  //   socket.on('reply', (data) => { // 클라이언트로부터 메시지
  //     console.log(data);
  //   });

  //   socket.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
  //     socket.emit('news', 'Hello Socket.IO');
  //   }, 3000);
  // });