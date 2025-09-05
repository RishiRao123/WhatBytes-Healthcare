import Joi from "joi";

export const validateCreateMapping = (req, res, next) => {
  const schema = Joi.object({
    patient: Joi.string().hex().length(24).required(),
    doctor: Joi.string().hex().length(24).required(),
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

export const validatePatientId = (req, res, next) => {
  const schema = Joi.object({
    patientId: Joi.string().hex().length(24).required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

export const validateMappingId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};
