print('Start creating database ##########################')
db = db.getSiblingDB('userdb');
db.createUser(
  {
      user: 'root',
      pwd:  'root',
      roles: [{role: 'readWrite', db: 'userdb'}],
  }
);
db = db.getSiblingDB('postdb');
db.createUser(
  {
      user: 'root',
      pwd:  'root',
      roles: [{role: 'readWrite', db: 'postdb'}],
  }
);
db = db.getSiblingDB('notificationdb');
db.createUser(
  {
      user: 'root',
      pwd:  'root',
      roles: [{role: 'readWrite', db: 'notificationdb'}],
  }
);
print('End creating database ##########################')