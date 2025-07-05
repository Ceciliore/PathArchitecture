module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define('Comentario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        conteudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nomeUsuario: { // novo campo
            type: DataTypes.STRING,
            allowNull: false
        },
        idPalestra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dataHora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'comentarios',
        timestamps: false
    });

    Comentario.associate = (models) => {
        Comentario.belongsTo(models.Palestra, {
            foreignKey: 'idPalestra',
            as: 'palestra'
        });
    };

    return Comentario;
};
