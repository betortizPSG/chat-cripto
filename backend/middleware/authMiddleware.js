const JWT = require("jsonwebtoken");

module.exports.authMiddleware = async (request, response, next) => {
     const authToken = request.headers.authorization;
     if (authToken) {
          const token = authToken.replace("Bearer ", "");
          try {
               const decodedToken = await JWT.verify(token, process.env.SECRET);
               request.myId = decodedToken.id;
               next();
          } catch (error) {
               response.status(400).json({
                    error: {
                         errorMessage: ["Token inválido"],
                    },
               });
          }
     } else {
          response.status(400).json({
               error: {
                    errorMessage: ["Por favor! Faça login primeiro!"],
               },
          });
     }
};