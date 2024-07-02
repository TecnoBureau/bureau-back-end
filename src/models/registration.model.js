import mongoose from "mongoose";
import validator from "validator";

const defaultStringField = {
  type: String,
  required: [true, "{PATH} is required!"],
  trim: true,
};

const defaultEnumField = {
  enum: ["0", "1"],
  message: "{VALUE} is not a valid option! It must be 0 (No) or 1 (Yes).",
};

const registrationSchema = mongoose.Schema(
  {
    fullName: defaultStringField,
    cpf: {
      ...defaultStringField,
      validate: {
        validator: function (v) {
          return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid CPF! It must be in the format 000.000.000-00.`,
      },
    },
    email: {
      ...defaultStringField,
      validate: [validator.isEmail, "Enter a valid email address"],
    },
    phone: {
      ...defaultStringField,
      validate: {
        validator: function (v) {
          return /^\(\d{2}\) \d{5}-\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Use format (00) 00000-0000`,
      },
    },
    course: defaultStringField,
    ra: {
      type: String,
      required: true,
      trim: true,
    },
    period: defaultStringField,
    availability: defaultStringField,
    experience: defaultStringField,
    internshipInterest: {
      ...defaultStringField,
      ...defaultEnumField,
    },
    programParticipation: {
      ...defaultStringField,
      ...defaultEnumField,
    },
    previousParticipationDetails: defaultStringField,
    suggestions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
