import errorMiddleware from "./../middlewares/errorMiddleware.js";

// Importing Other Modules
// import nursesRoutes from './../modules/nurses/src/config/nursesRoutes.js';

export default (app) => {
  //   app.use("/api/v1/auth", authRoute);

  // Routing Other Modules
  //   app.use("/api/v1/nurses", nursesRoutes);

  // Error middleware
  app.use(errorMiddleware);
};
