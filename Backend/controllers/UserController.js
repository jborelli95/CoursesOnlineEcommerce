import models from "../models/index.js";
import bcrypt from "bcryptjs";
import token from "../services/token.js";

export default {
  register: async (req, res) => {
    try {
      //Encriptacion de password
      console.log("Hola mundo!");
      console.log(req.body);
      req.body.password = await bcrypt.hash(req.body.password, 10);

      //req.body debe tener los mismos atrivutos que definho en el modelo Schema de usuario.
      const User = await models.User.create(req.body);
      res.status(200).json({
        user: User,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ocurrio un error en registrar el usuario",
      });
    }
  },

  login: async (req, res) => {
    try {
      // email y contraseña, mandamos por el request, req.body.email y req.body.password
      console.log(req.body);
      const user = await models.User.findOne({
        email: req.body.email,
        state: 1,
      });

      if (user) {
        //Comparar contraseñas
        let compare = await bcrypt.compare(req.body.password, user.password);
        if (compare) {
          //Usuario existente y activo.
          let tokenT = await token.encode(user._id, user.rol, user.email);

          const USER_BODY = {
            token: tokenT,
            user: {
              name: user.name,
              surname: user.surname,
              email: user.email,
              // faltaria el avatar
            },
          };

          res.status(200).json({
            USER: USER_BODY,
          });
        } else {
          //contraseña incorrecta o inactivo.
          res.status(500).send({
            message: "Contraseña incorrecta",
          });
        }
      } else {
        res.status(500).send({
          message: "El usuario ingresado no existe!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error en logear al usuario",
      });
    }
  },

  login_admin: async (req, res) => {
    try {
      // email y contraseña, mandamos por el request, req.body.email y req.body.password
      console.log(req.body);
      const user = await models.User.findOne({
        email: req.body.email,
        state: 1,
        rol: "admin"
      });

      if (user) {
        //Comparar contraseñas
        let compare = await bcrypt.compare(req.body.password, user.password);
        if (compare) {
          //Usuario existente y activo.
          let tokenT = await token.encode(user._id, user.rol, user.email);

          const USER_BODY = {
            token: tokenT,
            user: {
              name: user.name,
              surname: user.surname,
              email: user.email,
              // faltaria el avatar
            },
          };

          res.status(200).json({
            USER: USER_BODY,
          });
        } else {
          //contraseña incorrecta o inactivo.
          res.status(500).send({
            message: "Contraseña incorrecta",
          });
        }
      } else {
        res.status(500).send({
          message: "El usuario ingresado no existe!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error en logear al usuario",
      });
    }
  }
};
