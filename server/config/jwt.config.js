const jwt = require("jsonwebtoken");

const Key = "Esta es mi super clave";

const getToken = (payload) => {
  return jwt.sign({
      data: payload
  }, Key, { expiresIn: '1h' });
}

const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, Key, (err, decoded) => {
      if(err) {
          console.log('Error al obtener data del token');
      } else {
          data = decoded;
      }
  });

  return data;
}


module.exports = {
  Key,
  getToken,
  getTokenData
}