import { Router } from 'express';

let router = Router();

import {DisplayHomePage} from '../controllers';

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

export default router;