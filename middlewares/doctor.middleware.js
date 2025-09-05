import Joi from "joi";

const createDoctorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  specialization: Joi.string().min(3).max(50).required(),
  experience: Joi.number().min(0).required(),
  study: Joi.string().min(2).max(100).required(),
});

const updateDoctorSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  specialization: Joi.string().min(3).max(50),
  experience: Joi.number().min(0),
  study: Joi.string().min(2).max(100),
}).min(1);

export const validateCreateDoctor = (req, res, next) => {
  const { error } = createDoctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      success: false,
    });
  }
  next();
};

export const validateUpdateDoctor = (req, res, next) => {
  const { error } = updateDoctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      success: false,
    });
  }
  next();
};
