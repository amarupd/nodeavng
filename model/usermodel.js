module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employee", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        is_deleted: {
            type: DataTypes.BOOLEAN
        }
    })
    return Employee;
}
