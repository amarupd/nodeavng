module.exports = (sequelize, DataTypes) => {
    const Avenger = sequelize.define("avengers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    },
    {
        createdAt: false,
        updatedAt: false
    });
    return Avenger;
}
