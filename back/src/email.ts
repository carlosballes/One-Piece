var nodemailer = require('nodemailer');


export var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: 'cuentaparacosas20189@gmail.com',
        pass: "vhcgcagntdolyfgx"
    }
});