import { rest } from 'msw';

export const handlers = [
  rest.get('/api/currentUser', (req, res, ctx) => {
    const isAuthenticated = !!localStorage.getItem('[mock]is-authenticated');

    if(!isAuthenticated) {
      return res(
        ctx.status(200),
        ctx.json({
          isLoggedIn: isAuthenticated
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        isLoggedIn: isAuthenticated,
        username: 'test-user'
      })
    );
  }),
  rest.post('/api/users', (req, res, ctx) => {
    const { username, email, password } = req.body;
    localStorage.setItem(email, JSON.stringify({username, email, password}));
    return res(
      ctx.status(201)
    );
  })
];
