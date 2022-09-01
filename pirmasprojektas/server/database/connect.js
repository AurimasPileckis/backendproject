import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import Books from '../model/books.js'
import Users from '../model/users.js'

const database = {}

const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql'})

    database.Books = Books(sequelize)
    database.Users = Users(sequelize)
    
    await sequelize.sync({ alter: true})//false, kad nematyt pakitimu

} catch (error) {
    console.log(error)
    console.log('nepavyko prisijungti prie duomenu bazes')

}
export default database