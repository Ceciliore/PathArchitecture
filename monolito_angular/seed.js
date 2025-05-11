const db = require('./src/models');

async function seed() {
    try {
        await db.sequelize.sync({ force: true });

        // Perfis
        await db.Perfil.bulkCreate([
            { id: 1, nome: 'Aluno' },
            { id: 2, nome: 'Professor' },
            { id: 3, nome: 'Admin' }
        ]);

        // Usuários
        await db.Usuario.bulkCreate([
            { id: 1, nome: 'Eduardo', idPerfil: 1 },
            { id: 2, nome: 'Diego', idPerfil: 2 },
            { id: 3, nome: 'Malena', idPerfil: 3 }
        ]);

        // Palestras
        await db.Palestra.bulkCreate([
            {
                id: 1,
                nome: 'Boas práticas com Node.js',
                palestrante: 'Prof. Diego',
                local: 'Auditório A',
                horario: '10:00'
            },
            {
                id: 2,
                nome: 'Vue.js na prática',
                palestrante: 'Malena',
                local: 'Sala 204',
                horario: '14:00'
            }
        ]);

        // Presenças
        await db.Presenca.bulkCreate([
            { id: 1, idUsuario: 1, idPalestra: 1 },
            { id: 2, idUsuario: 2, idPalestra: 1 },
            { id: 3, idUsuario: 1, idPalestra: 2 }
        ]);

        // Comentários
        await db.Comentario.bulkCreate([
            {
                conteudo: 'Muito bom o conteudo!',
                idUsuario: 1,
                idPalestra: 1,
                idPresenca: 1
            },
            {
                conteudo: 'Excelente aula!',
                idUsuario: 2,
                idPalestra: 1,
                idPresenca: 2
            },
            {
                conteudo: 'Show de bola!',
                idUsuario: 1,
                idPalestra: 2,
                idPresenca: 3
            }
        ]);

        console.log('Seed executado com sucesso');
        process.exit();
    } catch (error) {
        console.error('Erro ao executar o seed:', error);
        process.exit(1);
    }
}

seed();
