const Joi = require('joi')

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 1,
          tlds: { allow: ['com', 'net', 'co', 'uk', 'ca', 'org'] },
        })
        .required(),
      phone: Joi.string()
        .pattern(/^(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/, 'numbers')
        .required(),
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 1,
          tlds: { allow: ['com', 'net', 'co', 'uk', 'ca', 'org'] },
        })
        .optional(),
      phone: Joi.string()
        .pattern(/^(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/, 'numbers')
        .optional(),
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

  updateStatusContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },
}
