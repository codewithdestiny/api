import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const staffSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    otherNames: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported for gender",
      },
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please add a valid email, got {VALUE}.",
      ],
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      required: [true, "Please add the Staff Phone number"],
    },
    password: {
      type: String,
      // required: [true, 'Please add a password'],
      minlength: [6, "Please enter at least 6 characters for the password"],
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    birthDate: {
      type: Date,
    },
    moreInfo: {
      type: String,
    }, // This is for additional information
    roles: [String],
    defaultRole: String,
    qualifications: [String],
    maritalStatus: String,
    religion: String,
    nationality: {
      type: String,
      default: "Nigeria",
    },
    stateOfOrigin: String,
    lgaOfOrigin: String,
    address: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

staffSchema.virtual("fullName").get(function () {
  return `${this.title} ${this.surname} ${this.firstName} ${this.otherNames}`;
});

staffSchema.virtual("age").get(function () {
  var today = new Date();
  var birthDate = new Date(this.birthDate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Encrypt staff password using bcrypt
staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Set default role to staff if no role assigned
staffSchema.pre("save", function (next) {
  if (!this.defaultRole) {
    this.defaultRole = this.roles[0] || "staff";
  }
  next();
});

// Sign JWT and return token
staffSchema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compares entered password with stored password
staffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
staffSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire for 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.models.Staff || mongoose.model("Staff", staffSchema);
