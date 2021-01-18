const db = require('./server/db');
const bcrypt = require('bcrypt');

const user = {
  email: 'foo@bar.com',
  name: 'FooBar',
  admin: false,
  password: 'test'
};

bcrypt.hash(user.password, 10,
  (err, hash) => {
    if (err)
      return console.error(err);
    db.query('CALL create_user(?, ?, ?, ?)',
      [user.email, user.name, user.admin, hash],
      err => {
        if (err)
          return console.error(err);
        else
          console.log('Ok!');
      });
  });