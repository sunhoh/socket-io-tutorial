const express = require('express')
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const indexRouter = require('./routes');
const connect = require('./schemas');
const app = express();

app.set('port', process.env.PORT || 8005);
// app.use(express.static(path.join(__dirname, 'client/build')));

connect();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});


app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use('/', indexRouter);


app.use((req,res,next)=>{
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.stack = 404;
  next(error);
})

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'),()=>{
  console.log(app.get('port'), '번 포트에서 대기중');
})