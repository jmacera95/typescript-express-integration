import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
import { bodyValidator } from './decorators/bodyValidator';

@controller('/auth')
class LoginController {
  @get('/')
  add(a: number, b: number): number {
    return a + b;
  }

  @get('/login')
  getLogin(req: Request, res: Response) {
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
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email == 'test@gmail.com' && password == 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password.');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}
