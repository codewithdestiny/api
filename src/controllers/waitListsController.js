import BotModel from "../models/BotModel.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import asyncHandler from "../middlewares/asyncMiddleware.js";

//@description: Get All Bot
//@return: json object of Bot
//@route:   GET /api/v1/Bot
//@access: Private
export const getBots = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description: Get Single Bot
//@return:  object of Bot
//@route:   GET /api/v1/Bot/:id
//@access:  Private
export const getSingleBot = asyncHandler(async (req, res, next) => {
  const bot = await BotModel.findById(req.params.id);

  if (!bot) {
    return next(new ErrorResponse("Bot not found", 404));
  }

  res.status(200).send({ success: true, data: bot });
});

//@description: Create new Bot
//@return:  object of Bot
//@route:   POST /api/v1/Bot
//@access:  Private
export const createBot = asyncHandler(async (req, res, next) => {
  // await BotModel.init();
  const bot = await BotModel.create(req.body);

  res.status(201).json({ success: true, data: bot });
});

//@description: Update Bot
//@return:  object of Bot
//@route:   PUT /api/v1/Bot/:id
//@access:  Private
export const updateBot = asyncHandler(async (req, res, next) => {
  const bot = await BotModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bot) {
    return next(new ErrorResponse("Bot not found", 404));
  }
  return res.status(200).send({ success: true, data: bot });
});

//@description: Delete Bot
//@return:  empty object
//@route:   DELETE /api/v1/Bot/:id
//@access:  Private
export const deleteBot = asyncHandler(async (req, res, next) => {
  const bot = await BotModel.findByIdAndDelete(req.params.id);

  if (!bot) {
    return next(new ErrorResponse("Bot not found", 404));
  }

  //   bot.delete();

  return res.send({ success: true, data: {} });
});
