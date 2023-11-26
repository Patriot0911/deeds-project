import { Router } from "express";
import indexRouter from "../controllers";

const router = Router();

router.get('/', indexRouter);

export default router;