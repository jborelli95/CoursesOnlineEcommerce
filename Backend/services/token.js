import jwt from "jsonwebtoken";
import models from "../models/index.js";
import "dotenv/config";

export default {
  encode: async (_id, rol, email) => {
    const token = jwt.sign(
      {
        _id: _id,
        rol: rol,
        email: email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    return token;
  },

  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, process.env.SECRET_KEY);
      const user = await models.User.findOne({ _id: _id });
      if (user) {
        return user;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
