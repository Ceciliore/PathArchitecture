const db = require('./models');

(async () => {
    try {
        await db.sequelize.sync({ alter: true });

        // Perfis
        await db.Perfil.bulkCreate([
            { nome: 'aluno' },
            { nome: 'usuario' },
            { nome: 'admin' }
        ], { ignoreDuplicates: true });

        // Usuários
        await db.Usuario.bulkCreate([
            { nome: 'Eduardo', matricula: '2021001', email: 'eduardo@cefet.rj', senha: '1234', idPerfil: 1 },
            { nome: 'Diego', matricula: '2021002', email: 'diego@cefet.rj', senha: '1234', idPerfil: 2 },
            { nome: 'Malena', matricula: '2021003', email: 'malena@cefet.rj', senha: '1234', idPerfil: 3 }
        ], { ignoreDuplicates: true });

        // Palestras
        await db.Palestra.bulkCreate([
            {
                titulo: 'Inteligência Artificial na Educação',
                local: 'Auditório Principal',
                palestrante: 'Prof. Ana Paula',
                data: '2025-08-10',
                horario: '10:00'
            },
            {
                titulo: 'Desenvolvimento Web com Vue.js',
                local: 'Sala 201',
                palestrante: 'João Silva',
                data: '2025-08-11',
                horario: '14:00'
            },
            {
                titulo: 'Como criar uma API com Node.js',
                local: 'Sala 303',
                palestrante: 'Carlos Mendes',
                data: '2025-08-12',
                horario: '09:30'
            },
            {
                titulo: 'Carreiras em Tecnologia',
                local: 'Auditório Secundário',
                palestrante: 'Mariana Rocha',
                data: '2025-08-13',
                horario: '16:00'
            },
            {
                titulo: 'Segurança da Informação para Iniciantes',
                local: 'Sala 101',
                palestrante: 'Dr. Felipe Andrade',
                data: '2025-08-14',
                horario: '11:00'
            }
        ], { ignoreDuplicates: true });

        console.log('Seed inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao executar seed:', error);
    } finally {
        process.exit();
    }
})();
