import color from "colors";
import express from "express";
import cors from "cors";

export default (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
};
