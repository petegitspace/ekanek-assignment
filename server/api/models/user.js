const bookshelf = require('../../util/bookshelf');

const User = bookshelf.model('User',{
    tableName: 'users'
})

module.exports = User;