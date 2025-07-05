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
        descricao: {
            type: DataTypes.STRING,
            allowNull: true
        },
        palestrante: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'palestras',
        timestamps: false
    });

    // Relacionamentos serão definidos no index.js, mas podemos deixar esse gancho aqui se quiser:
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
