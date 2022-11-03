const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {

    sequelize.define('touristActivity', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate:{
                min:1,
                max:5
            }
        },
        duration:{
            type: DataTypes.STRING(4),
        },
        season:{
            type: DataTypes.ENUM(
                'summer',
                'fall',
                'spring',
                'winter'
            ),
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                isUrl: true
            }
        },
        review:{
            type: DataTypes.TEXT,
            allowNull:true
        }
    },{
        timestamps: false
    })
}