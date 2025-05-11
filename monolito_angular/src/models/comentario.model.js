module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define('Comentario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPalestra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPresenca: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'comentarios',
        timestamps: false
    });

    Comentario.associate = (models) => {
        Comentario.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
        Comentario.belongsTo(models.Palestra, {
            foreignKey: 'idPalestra',
            as: 'palestra'
        });
        // Comentario.belongsTo(models.Presenca, {
        //     foreignKey: 'idPresenca',
        //     as: 'presenca'
        // });
    };

    return Comentario;
};
