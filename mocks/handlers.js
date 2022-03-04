import { rest } from 'msw';

export const handlers = [
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
  rest.post('/api/users', (req, res, ctx) => {
    const { username, email, password } = req.body;
    localStorage.setItem(email, JSON.stringify({ username, email, password }));
    return res(
      ctx.status(201)
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
