import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { eyeglassRoutes } from "../modules/eyeglass/eyeglass.route";
const router = express.Router();
const routes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/eyeglass",
    route: eyeglassRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
