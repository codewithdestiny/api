import WaitListModel from "../models/WaitListModel.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import asyncHandler from "../middlewares/asyncMiddleware.js";

//@description: Get All WaitList
//@return: json object of WaitList
//@route:   GET /api/v1/WaitList
//@access: Private
export const getWaitLists = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description: Get Single WaitList
//@return:  object of WaitList
//@route:   GET /api/v1/WaitList/:id
//@access:  Private
export const getSingleWaitList = asyncHandler(async (req, res, next) => {
  const waitList = await WaitListModel.findById(req.params.id);

  if (!waitList) {
    return next(new ErrorResponse("WaitList not found", 404));
  }

  res.status(200).send({ success: true, data: waitList });
});

//@description: Create new WaitList
//@return:  object of WaitList
//@route:   POST /api/v1/WaitList
//@access:  Private
export const createWaitList = asyncHandler(async (req, res, next) => {
  const waitList = await WaitListModel.create(req.body);

  res.status(201).json({ success: true, data: waitList });
});

//@description: Update WaitList
//@return:  object of WaitList
//@route:   PUT /api/v1/WaitList/:id
//@access:  Private
export const updateWaitList = asyncHandler(async (req, res, next) => {
  const waitList = await WaitListModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!waitList) {
    return next(new ErrorResponse("WaitList not found", 404));
  }
  return res.status(200).send({ success: true, data: waitList });
});

//@description: Delete WaitList
//@return:  empty object
//@route:   DELETE /api/v1/WaitList/:id
//@access:  Private
export const deleteWaitList = asyncHandler(async (req, res, next) => {
  const waitList = await WaitListModel.findByIdAndDelete(req.params.id);

  if (!waitList) {
    return next(new ErrorResponse("WaitList not found", 404));
  }

  //   waitList.delete();

  return res.send({ success: true, data: {} });
});
