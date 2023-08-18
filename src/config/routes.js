import errorMiddleware from "./../middlewares/errorMiddleware.js";

import waitListsRouter from "../routes/waitListsRoutes.js";
import staffRouter from "../routes/staffRoutes.js";
import authRouter from "../routes/authRoutes.js";

export default (app) => {
  app.use("/api/v1/wait-lists", waitListsRouter);
  app.use("/api/v1/staff", staffRouter);
  app.use("/api/v1/auth", authRouter);

  // Error middleware
  app.use(errorMiddleware);
};
