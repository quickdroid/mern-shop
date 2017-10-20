/* eslint-disable no-console */
import chalk            from 'chalk';
import { Router }       from 'express';
import cors             from 'cors';
import { getUserModel } from '../data_access/modelFactory';
import Promise          from 'bluebird';

const authenticationRouter = Router();

authenticationRouter.route('/api/user/register')
  .post(cors(), async (req, res) => {
    try {
      const User = await getUserModel();

      const submittedEmail = req.body.email;
      const existingUser = await User.findOne({username: submittedEmail}).exec();
      if (existingUser) {
        return res.status(409).send(`The email ${submittedEmail} already exist.`);
      }

      const submittedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: submittedEmail,
        email: submittedEmail,
        password: req.body.password,
        created: Date.now()
      };

      console.log(chalk.green('Creating new User'));
      const user = new User(submittedUser);

      await user.save()
        .then(user => {
          if (user) {
            console.log(chalk.green(`Created user ${JSON.stringify(user)}`));
          }
        })
        .catch(err => {
          if (err) {
            console.log(chalk.red(`Error occurred saving User ${user}`));
          }
        });

      res.status(201).json({user: {firstName: user.firstName, lastName: user.lastName, email: user.email}});

    } catch ( err ) {
      throw err;
    }
  });

authenticationRouter.route('/api/user/login')
  .post(cors(), async function (req, res) {
      try {
        const User = await getUserModel();
        const {email, password} = req.body;
        const existingUser = await User.findOne({username: email}).exec();

        if (!existingUser) {
          return res.status(401).send('Invalid username or password');
        }

        existingUser.passwordIsValid(password, function (err, results) {
          if (err) {
            return res.status(500).send('There is a problem logging in at the moment. Please try again later');
          } else if (!results) {
            return res.status(401).send('Invalid username or password');
          }

          const userInfo = {
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.email
          };

          req.session.login(userInfo);

          return res.status(200).json({
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.email
          });
        });
      }
      catch (err) {
        return res.status(500).send('There is a problem logging in at the moment. Please try again later');
      }
    }
  );

authenticationRouter.route('/api/user/logout')
  .get(cors(), function (req, res) {
    return new Promise(function (resolve, reject) {
      try {
        if (req.session) {
          req.session.destroy();
          resolve(res.sendStatus(200));
        }
      }
      catch (err) {
        return reject(res.sendStatus(500));
      }
    });

  });

export default authenticationRouter;
