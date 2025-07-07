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
        nomeUsuario: {
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
        tableName: 'presencas',
        timestamps: false
    });

    Presenca.associate = (models) => {
        Presenca.belongsTo(models.Palestra, {
            foreignKey: 'idPalestra',
            as: 'palestra'
        });
    };

    return Presenca;
};
