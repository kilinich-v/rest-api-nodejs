const Joi = require('joi')

module.exports = {
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 1,
          tlds: { allow: ['com', 'net', 'co', 'uk', 'ca', 'org'] },
        })
        .required(),
      password: Joi.string().alphanum().min(3).max(30).required(),
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },
}
