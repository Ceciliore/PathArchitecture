module.exports = (sequelize, DataTypes) => {
    const Palestra = sequelize.define('Palestra', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palestrante: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'palestras',
        timestamps: false
    });

    Palestra.associate = (models) => {
        Palestra.hasMany(models.Comentario, {
            foreignKey: 'idPalestra',
            as: 'comentarios'
        });

        Palestra.hasMany(models.Presenca, {
            foreignKey: 'idPalestra',
            as: 'presencas'
        });
    };

    return Palestra;
};