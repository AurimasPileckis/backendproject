import { DataTypes } from 'sequelize'

const Books = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: { 
            type: DataTypes.STRING
        },
        cover_author: { 
            type: DataTypes.STRING
        },
        ISBN_code: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
        content:{
            type: DataTypes.TEXT
        },
    }
    return sequelize.define('books', Schema)
}

export default Books