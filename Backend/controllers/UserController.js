import models from "../models/index.js";
import bcrypt from "bcryptjs";
import token from "../services/token.js";
import fs from "fs";
import path from "path";
import resource from '../resources/index.js'

export default {
  register: async (req, res) => {
    try {
      //**Desmenuzamos lo que nos viene en el body */
      const { email } = req.body;

      //*Tenemos que probar que el email no sea existnetne en la abse de datos/
      const user = await models.User.findOne({
        email: email,
        state: 1,
      });

      if (user) {
        res.status(200).send({
          message: 403,
          message_text: "El email ingresado ya esta registrado",
        });
      }

      //Encriptacion de password
      req.body.password = await bcrypt.hash(req.body.password, 10);

      //req.body debe tener los mismos atrivutos que definho en el modelo Schema de usuario.
      const User = await models.User.create(req.body);
      res.status(200).json({
        user: resource.User.api_resource_user(User),
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
          let tokenT = await token.encode(user._id, user.role, user.email);

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
        role: "Administrator",
      });

      if (user) {
        //Comparar contraseñas
        let compare = await bcrypt.compare(req.body.password, user.password);
        if (compare) {
          //Usuario existente y activo.
          let tokenT = await token.encode(user._id, user.role, user.email);

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

  register_admin: async (req, res) => {
    try {
      //**Desmenuzamos lo que nos viene en el body */
      const { email } = req.body;

      //*Tenemos que probar que el email no sea existnetne en la abse de datos/
      const user = await models.User.findOne({
        email: email,
        state: 1,
      });

      if (user) {
        res.status(200).send({
          message: 403,
          message_text: "El email ingresado ya esta registrado",
        });
      }

      //Encriptacion de password
      req.body.password = await bcrypt.hash(req.body.password, 10);

      if (req.files && req.files.avatar) {
        var img_path = req.files.avatar.path;
        console.log("Img path: " + img_path);
        var img_name = img_path.split("\\");
        console.log("Img name: " + img_name);
        var avatar_name = img_name[2];
        console.log("Avatar name: " + avatar_name);
        req.body.avatar = avatar_name;
      }

      //req.body debe tener los mismos atrivutos que definho en el modelo Schema de usuario.
      const User = await models.User.create(req.body);
      res.status(200).json({
        user: resource.User.api_resource_user(User),
        message: 'Admin user registered successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying register an user in metronic",
      });
    }
  },

  update: async (req, res) => {
    try {
      //**We split the values come from the body of the request */
      const { email, _id, password } = req.body;

      const user = await models.User.findOne({
        email: email,
        _id: { $ne: _id },
      });

      /**Condition for email */
      if (user) {
        res.status(200).send({
          message: 403,
          message_text: "El email ingresado ya esta registrado",
        });
      }

      /**If we required update the password */
      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }

      if (req.files && req.files.avatar) {
        var img_path = req.files.avatar.path;
        console.log("Img path: " + img_path);
        var img_name = img_path.split("\\");
        console.log("Img name: " + img_name);
        var avatar_name = img_name[2];
        console.log("Avatar name: " + avatar_name);
        req.body.avatar = avatar_name;
      }

      //We use find one by id and update from mongoose
      const User = await models.User.findByIdAndUpdate({ _id: _id }, req.body);
      const nUser = await models.User.findById( { _id: _id } );
      res.status(200).json({
        user: resource.User.api_resource_user(nUser),
        message: 'The user was successfully updated'
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying updating user",
      });
    }
  },

  list: async (req, res) => {
    try {
      //localhost:3000?search='user_name'
      var search = req.query.search;
      let users = await models.User.find({
        $or: [
          { 'name': new RegExp(search, "i") },
          { 'surname': new RegExp(search, "i") },
          { 'email': new RegExp(search, "i") },
        ],
        "role": {$in: ["Administrator", "Instructor"]}
      }).sort({ createdAt: -1 });

      users = users.map((u) => {
        return resource.User.api_resource_user(u);
      })

      res.status(200).json({
        users_list: users,
        message: 'Getting users list worked successfully'
      });
    } catch (error) {
      console.log(error);
      res.stat(500).send({
        message: "An error in list users ocurred",
      });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params["id"];
      const user = await models.User.findByIdAndDelete({ _id: id });
      res.status(200).json({
        message: "The user was successfully deleted",
      });
    } catch (error) {
      console.log(error);
      res.stat(500).send({
        message: "An error in remove an user ocurred",
      });
    }
  },

  get_image: async (req, res) => {
    try {
      var img = req.params["img"];
      if (!img) {
        res.status(500).send({
          message: "Error getting img from params",
        });
      } else {
        fs.stat("./uploads/users/" + img, function (err) {
          if (!err) {
            let path_img = "./uploads/users/" + img;
            res.status(200).sendFile(path.resolve(path_img));
          } else {
            let path_img = "./uploads/default.jpg";
            res.status(200).sendFile(path.resolve(path_img));
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error ocurred when try get an image",
      });
    }
  },
};
