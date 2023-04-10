import joi from "joi";

export const gamesSchema = joi.object({
  name: joi.string().invalid('').required(),
  situation: joi.string().invalid('').required(),
  price: joi.number().greater(0).required()
});

export const gamesUpdateSchema = joi.object({
  situation: joi.string().invalid('').required()
});