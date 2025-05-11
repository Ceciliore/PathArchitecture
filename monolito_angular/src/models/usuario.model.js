module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idPerfil: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Perfil, {
            foreignKey: 'idPerfil',
            as: 'perfil'
        });
        Usuario.hasMany(models.Comentario, {
            foreignKey: 'idUsuario',
            as: 'comentarios'
        });
    };

    return Usuario;
};
