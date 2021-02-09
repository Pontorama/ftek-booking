const db = require('./server/db');
const bcrypt = require('bcrypt');

const user = {
  email: 'foo@bar.com',
  name: 'FooBar',
  admin: false,
  password: 'test'
};

const generateUser = async () => {
 const hash = await bcrypt.hash(user.password, 10);
 await db.query('CALL create_user(?, ?, ?, ?)', [user.email, user.name, user.admin, hash]);
 console.log('Ok!');
};

generateUser();