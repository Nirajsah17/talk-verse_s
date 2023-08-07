// userRoutes.js
import express from 'express';
import userIndexRoute from './user/index.js';
import userCreateRoute from './user/create.js';
// Import other user route modules here

const router = express.Router();

// Mount individual user routes
router.use('/', userIndexRoute);
router.use('/', userCreateRoute);
// Use other user routes here

export default router;
