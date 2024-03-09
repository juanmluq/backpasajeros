const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {// el force true dice que cada vez que corto el back borra la base de datos y cuando levanto vuelve a crear la base de datos
  server.listen(port, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
