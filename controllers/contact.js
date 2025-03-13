import { ApiResponse } from "../helpers/ApiResponse.js";
import Joi from "joi";
import prisma from "../DB/config.js";

export const contactUsHandle = async (req, res) => {
  try {
    const { name, lastName, email, contactNumber } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      contactNumber: Joi.string()
        .pattern(/^\+\d{1,3}\d{7,15}$/)
        .required()
        .messages({
          "string.pattern.base":
            "Contact number must start with a country code ",
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(401)
        .json(new ApiResponse(400, {}, error.details[0].message));
    }

    const existingUser = await prisma.contactUs.findFirst({
      where: {
        OR: [{email: email}, {contactNumber: contactNumber}],
      },
    });

    if (existingUser) {
      return res
        .status(401)
        .json(
          new ApiResponse(200, {}, `Email or Contact Number already exists!`)
        );
    } else {
      await prisma.contactUs.create({
        data: {
          name,
          lastName,
          email,
          contactNumber,
        },
      });

      return res
        .status(201)
        .json(new ApiResponse(200, {}, `contact form filled sucessfully`));
    }
  } catch (error) {
    console.log(`error while filling the contract form`, error);
    return res
      .status(501)
      .json(new ApiResponse(500, error.message, `Internal Server Error`));
  }
};

export const allContactHandle = async (req, res) => {
  try {
    const contacts = await prisma.contactUs.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res
      .status(201)
      .json(new ApiResponse(200, contacts, "fetch all contacts successfully"));
  } catch (error) {
    console.log(`error while getting all contracts`, error);
    return res
      .status(501)
      .json(new ApiResponse(500, error.message, `Internal Server Error`));
  }
};
