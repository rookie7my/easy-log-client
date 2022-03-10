import { rest } from 'msw';
import { db } from './model';

const DELAY_MS = 800;

const testUser = {
  username: 'test-user',
  email: 'test@test.com',
  password: '12341234!aA'
};
db.user.create(testUser);

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
    const username = localStorage.getItem('mock-auth-current-user') ?? '';
    const isLoggedIn = username !== '';

    return res(
      ctx.status(200),
      ctx.json({ username, isLoggedIn })
    );
  }),
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;
    const userFoundByEmailAndPassword = db.user.findFirst({
      where: {
        email: {
          equals: email
        },
        password: {
          equals: password
        }
      }
    });
    if(userFoundByEmailAndPassword === null) {
      return res(
        ctx.status(401),
        ctx.delay(DELAY_MS),
        ctx.json({
          code: 'U003',
          errorMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',
          errors: []
        })
      );
    }
    localStorage.setItem('mock-auth-current-user', userFoundByEmailAndPassword.username);

    return res(
      ctx.status(200),
      ctx.delay(DELAY_MS),
      ctx.json({
        isLoggedIn: true,
        username: userFoundByEmailAndPassword.username
      })
    );
  }),
  rest.post('/api/logout', (req, res, ctx) => {
    localStorage.removeItem('mock-auth-current-user');

    return res(
      ctx.status(200),
      ctx.delay(DELAY_MS),
      ctx.json({ isLoggedIn: false })
    );
  })
];
