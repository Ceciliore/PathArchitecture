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
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: true
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
            foreignKey: 'idPerfil'
        });

        Usuario.hasMany(models.Presenca, {
            foreignKey: 'idUsuario'
        });

        Usuario.hasMany(models.Comentario, {
            foreignKey: 'idUsuario'
        });
    };

    return Usuario;
};
