import token from "./token.js";

export default {
  verifyTienda: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).send({
        message: "No se ha enviado el token!",
      });
    }

    const response = await token.decode(req.headers.token);

    if (response) {
      if (response.rol == "cliente" || response.rol == "admin") {
        next();
      } else {
        res.status(403).send({
          message: "No esta permitido visitar esta pagina",
        });
      }
    } else {
      res.status(403).send({
        message: "El TOKEN es invalido",
      });
    }
  },

  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).send({
        message: "No se ha enviado el token!",
      });
    }

    const response = await token.decode(req.headers.token);

    if (response) {
      if (response.rol == "admin") {
        next();
      } else {
        res.status(403).send({
          message: "No esta permitido visitar esta pagina",
        });
      }
    } else {
      res.status(403).send({
        message: "El TOKEN es invalido",
      });
    }
  },
};
