// Setting up the database connection
const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host     : 'localhost',
      port      : '8889',
      user     : 'root',
      password : 'root',
      database : 'project_downloads',
      charset  : 'utf8'
    }
  })
  const bookshelf = require('bookshelf')(knex);

  module.exports = bookshelf;