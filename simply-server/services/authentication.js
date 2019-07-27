const jwt = require('jsonwebtoken');

// Login users
exports.login = async function (){
  try {
    // Mock User
    const user = {
      id: 1,
      username: 'Abdelkarim',
      email: 'lahbabi@gmail.com'
    }

    return jwt.sign({user}, 'secretkey', { expiresIn: '3600s' });
  } catch (error) {
      throw Error('Error while Searching Users  : ' + error.message);
  }
};
