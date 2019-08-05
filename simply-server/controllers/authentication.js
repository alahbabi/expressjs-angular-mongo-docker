const authenticationService = require('../services/authentication')

// Generate Token
exports.login = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var token = await authenticationService.login();
        return response.status(200).json({
          status: 200,
          token: token,
          message: "Succesfully authenticated"
        });
    } catch (error) {
        return response.status(401).json({
          status: 401,
          message: error.message
        });
    }
};
