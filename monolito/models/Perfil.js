module.exports = (sequelize, DataTypes) => {
    const Perfil = sequelize.define('Perfil', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'perfis',
        timestamps: false
    });

    Perfil.associate = (models) => {
        Perfil.hasMany(models.Usuario, {
            foreignKey: 'idPerfil'
        });
    };

    return Perfil;
};
