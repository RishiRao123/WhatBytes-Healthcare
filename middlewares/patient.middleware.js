import Joi from "joi";

export const validatePatient = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    age: Joi.number().min(0).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    disease: Joi.string().min(2).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};


export const validatePatientUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100),
    age: Joi.number().min(0),
    gender: Joi.string().valid("Male", "Female", "Other"),
    disease: Joi.string().min(2).max(200),
  }).min(1); 

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
