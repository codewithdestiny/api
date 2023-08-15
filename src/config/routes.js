import errorMiddleware from "./../middlewares/errorMiddleware.js";

import waitListsRouter from "../routes/waitListsRoutes.js";

export default (app) => {
  app.use("/api/v1/wait-lists", waitListsRouter);

  // Error middleware
  app.use(errorMiddleware);
};
