const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text')
const Transport = require("nodemailer-brevo-transport");


// new Email(user,url).sendWelcome();
 
module.exports=class Email{
    constructor(user,url){
        this.to=user.email;
        this.firstName=user.name.split(' ')[0];
        this.url=url;
        this.from=`Tarun <${process.env.EMAIL_FROM}>`
    }
 
    newTransport() {
        if (process.env.NODE_ENV === 'production') {
          console.log('production');
          return nodemailer.createTransport({
            host: process.env.BREVO_HOST,
            port: process.env.BREVO_PORT,
            auth: {
              user: process.env.BREVO_LOGIN,
              pass: process.env.BREVO_PASSWORD,
            },
          });
        }
    }
 
        //send email
    // async send(template,subject){
    //     //render  HTML based on a pug template
    //     const html=pug.renderFile(`${__dirname}/../views/email/${template}.pug`,
    //     {
    //         firstName: this.firstName,
    //         url: this.url,
    //         subject
    //     })
    //     //define email options
    //     const mailOptions = {
    //         from: this.from,
    //         to: this.to,
    //         subject,
    //         html,
    //         text:convert(html),
    //     }
 
    //     //create transport and send email
        
    //     await this.newTransport().sendMail(mailOptions)
    // }


    async send(template, subject) {
        // 1) Render HTML based on a pug template
        console.log(`${__dirname}/../views/email/${template}.pug`);
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
          firstName: this.firstName,
          url: this.url,
          subject,
        });
     
        // // 2) Define email options
        const mailOptions = {
          from: `infotarun3543@gmail.com`,
          to: this.to,
          subject: subject,
          html,
          text: convert(html),
        };
     
        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
      }
 
    async sendWelcome(){
        await this.send('Welcome','Welcome to the Natours family!')
    }

    async sendPasswordReset(){
        await this.send('passwordReset','Your password reset token (valid for only 10 minutes)')
    }
}