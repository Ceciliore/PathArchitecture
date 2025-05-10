module.exports = (sequelize, DataTypes) => {
    const Presenca = sequelize.define('Presenca', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPalestra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        path_certificado: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'presencas',
        timestamps: false
    });

    Presenca.associate = (models) => {
        Presenca.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario'
        });

        Presenca.belongsTo(models.Palestra, {
            foreignKey: 'idPalestra'
        });

        Presenca.hasMany(models.Comentario, {
            foreignKey: 'idPresenca'
        });
    };

    return Presenca;
};
