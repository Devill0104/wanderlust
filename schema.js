const Joi = require("joi");
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required().allow("", null),
        country: Joi.string().required(),
        location:Joi.string().required(),
    }).required()
});