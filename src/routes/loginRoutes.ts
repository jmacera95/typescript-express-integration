import { NextFunction, Request, Response, Router } from 'express';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted.');
}

const router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

router.get('/login', (req: Request, res: Response) => {
  res.send(
    `
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email"/>
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password"/>
      </div>
      <button>Submit</button>
    </form>
    `
  );
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (
    email &&
    password &&
    email == 'test@gmail.com' &&
    password == 'password'
  ) {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password.');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <div>You are logged in.</div>
      <a href="/logout">Logout</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in.</div>
      <a href="/login">Login</a>
    </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('You are seeing protected info because you are logged in.');
});

export { router };
