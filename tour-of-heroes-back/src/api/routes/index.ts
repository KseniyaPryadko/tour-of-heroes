import { Router } from 'express';

import heroes from '../controllres/heroes';

const router = Router();

router.get('/heroes', heroes.selectAll);
router.get('/heroes/:id', heroes.select);
router.post('/heroes', heroes.insert);
router.put('/heroes/:id', heroes.update);
router.delete('/heroes/:id', heroes.delete);

export = router;
