import joi from "joi";

export const registerValidation = {
  body: joi.object({
    username: joi.string().alphanum().min(2).max(20).required().messages({
      "any.required": "username is required",
      "string.min": "username is too short",
    }),
    email: joi
      .string()
      .email({ tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi
      .string()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      )
      .required()
      .messages({
        "string.pattern.base":
          "password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
      OTP: joi.number().required()
      
    
    
  }),
};

export const loginValidation = joi.object({
  email: joi.string().email({ tlds: { allow: ["com", "net"] }}).required(),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.\*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required().messages({
        "string.pattern.base":
          "password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
});
