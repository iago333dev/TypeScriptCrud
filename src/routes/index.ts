import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response)=> {
    //Sessão Do Usuario
    console.log(req.session?.passport?.user);
    res.render('index');
});

router.get('/logout', (req: Request, res: Response)=> {
    //Comando que Limpa Sessão do Usuario
    res.clearCookie('connect.sid');
    res.redirect('/');
});

export default router;