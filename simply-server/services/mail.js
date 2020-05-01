const nodeMailer = require('nodemailer');

// Find all groups
exports.sendInvitation = async function (user, receiverEmail, group){
    try {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // use SSL
            auth: {
              user: 'trevion19@ethereal.email',
              pass: 'RuDNdZqTbRPEXS4zGZ'
            }
        });
        let mailOptions = {
            from: user.email,
            to: receiverEmail,
            subject: 'Kairos invitation',
            text:'Hello Dear '
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
             console.log('Message %s sent: %s', info.messageId, info.response);
             return "ok";
        });
        
      } catch (error) {
        throw Error('Error while searching groups  : ' + error.message);
      }
  };