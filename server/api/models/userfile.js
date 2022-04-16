const bookshelf = require('../../util/bookshelf');

const UserFile = bookshelf.model('UserFile',{
    tableName: 'user_files'
})

module.exports = UserFile;