const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {

    sequelize.define('touristActivity', {
        id: {
            type: DataTypes.INTEGER,
            PrimaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min:1,
                max:5
            }
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season:{
            type: DataTypes.ENUM(
                'summer',
                'fall',
                'spring',
                'winter'
            ),
            allowNull: false
        }
    })
}