const boom = require('@hapi/boom');

const { signToken } = require('../../utils/jwt.util')


const users = [
  {
    id: 1,
    username: "usuario1",
    password: "password1",
  },
  {
    id: 2,
    username: "usuario2",
    password: "password2",
  },
];

class AuthService {
  getUser(username, password) {
    const user = users.filter(user => user.username === username);
    const isMatch = user[0].password === password;

    if (!isMatch) throw boom.unauthorized();
    return user[0];
  }

  signToken(user){
    const payload = {
      sub: user.id,
      username: user.username
    }

    const token = signToken(payload);
    return {
      token
    }
  }
}

module.exports = { AuthService };
