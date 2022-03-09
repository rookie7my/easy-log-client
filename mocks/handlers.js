import { rest } from 'msw';
import { db } from './model';

const DELAY_MS = 800;

export const handlers = [
  rest.post('/api/users', (req, res, ctx) => {
    const { username, email, password } = req.body;

    const userFoundByEmail = db.user.findFirst({
      where: {
        email: {
          equals: email
        }
      }
    });
    if(userFoundByEmail) {
      return res(
        ctx.status(409),
        ctx.delay(DELAY_MS),
        ctx.json({
          code: 'U001',
          errorMessage: '이미 사용중인 이메일 입니다.',
          errors: [
            {
              field: 'email',
              value: email,
              reason: '이미 사용중인 이메일 입니다.'
            }
          ]
        })
      );
    }

    const userFoundByUsername = db.user.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    });
    if(userFoundByUsername) {
      return res(
        ctx.status(409),
        ctx.delay(DELAY_MS),
        ctx.json({
          code: 'U002',
          errorMessage: '이미 사용중인 유저이름 입니다.',
          errors: [
            {
              field: 'username',
              value: username,
              reason: '이미 사용중인 유저이름 입니다.'
            }
          ]
        })
      );
    }

    const { username: createdUsername } = db.user.create({ username, email, password });
    return res(
      ctx.status(201),
      ctx.delay(DELAY_MS),
      ctx.json({ username: createdUsername })
    );
  }),
  rest.get('/api/currentUser', (req, res, ctx) => {
    const { username } = JSON.parse(localStorage.getItem('current-user') ?? '{}');
    const isLoggedIn = !!username;
    const response = { isLoggedIn };
    if(isLoggedIn) response.username = username;

    return res(
      ctx.status(200),
      ctx.json(response)
    );
  }),
  rest.post('/api/users/login', (req, res, ctx) => {
    const { email, password } = req.body;
    const userInfo = localStorage.getItem(email);
    const responseOnEmailOrPasswordInvalid = {
      code: 'U003',
      errorMessage: '이메일 또는 비밀번호가 올바르지 않습니다',
      errors: []
    };
    if(userInfo === null) {
      return res(
        ctx.status(401),
        ctx.json(responseOnEmailOrPasswordInvalid)
      );
    }
    const { email: foundEmail, password: foundPassword, username } = JSON.parse(userInfo);
    if(email === foundEmail && password === foundPassword) {
      localStorage.setItem('current-user', JSON.stringify({ username }));
      return res(ctx.status(200));
    } else {
      return res(
        ctx.status(401),
        ctx.json(responseOnEmailOrPasswordInvalid)
      );
    }
  })
];
