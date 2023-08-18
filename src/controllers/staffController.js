import asyncHandler from "../middlewares/asyncMiddleware.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import StaffModel from "./../models/StaffModel.js";

//@description: Get All staff
//@return: json object of all staff
//@route:  GET /api/v1/administration/staff
//@access: Public
export const getAllStaff = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description: Get A staff
//@return: json object of a staff
//@route:  GET /api/v1/administration/staff/:id
//@access: Public
export const getStaff = asyncHandler(async (req, res, next) => {
  const staff = await StaffModel.findById(req.params.id);

  if (!staff) {
    return next(new ErrorResponse("Staff not found", 404));
  }

  res.status(200).send({ success: true, data: staff });
});

//@description: find a staff
//@return: json object of staff
//@route:  POST /api/v1/administration/staff/find-staff
//@access: Public
export const findStaff = asyncHandler(async (req, res, next) => {
  let staff;
  staff = await StaffModel.findOne({ email: req.body.identity });

  if (!staff && typeof parseInt(req.body.identity) == "number") {
    staff = await StaffModel.findOne({ phone: req.body.identity });

    if (!staff) {
      return next(new ErrorResponse("No Staff found with this identity", 404));
    }
  }

  if (!staff) {
    return next(new ErrorResponse("No Staff found with this identity", 404));
  }

  res.status(201).json({ success: true, data: staff });
});

//@description: Create a staff
//@return: json object of staff
//@route:  POST /api/v1/administration/staff
//@access: Public
export const createStaff = asyncHandler(async (req, res) => {
  const staff = await StaffModel.create(req.body);

  res.status(200).send({ success: true, data: staff });
});

//@description: Update a staff
//@return: json object of staff
//@route:  PUT /api/v1/administration/staff/:id
//@access: Private
export const updateStaff = asyncHandler(async (req, res, next) => {
  if (req.body.password === "" || req.body.password === undefined) {
    delete req.body.password;
  }

  const staff = await StaffModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!staff) {
    return next(new ErrorResponse(`Staff not found`, 404));
  }

  res.status(200).send({ success: true, data: staff });
});

//@description: Delete a staff
//@return: empty object
//@route:  DELETE /api/v1/administration/staff/:id
//@access: Public
export const deleteStaff = asyncHandler(async (req, res, next) => {
  const staff = await StaffModel.findById(req.params.id);

  if (!staff) {
    return next(new ErrorResponse("Staff not found", 404));
  }

  staff.remove();
  res.status(200).send({ success: true, data: {} });
});
