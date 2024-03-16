const { conn } = require('../../controllers/db');

class Authorization {
  static async registerWithGoogle(user) {
    const { id, name, emails, photos, provider} = user;
    const user_id_info = id;
    const fname = name.givenName;
    const lname = name.familyName;
    const email = emails[0].value;
    const picture = photos[0].value;
    const date = new Date().toISOString().slice(0, 10);
    const timezone = process.env.TIMEZONE || ''; // Defina o fuso horário apropriado

    // Verifique se o usuário já existe na base de dados
    const selectQuery = 'SELECT * FROM users WHERE user_id_info = ?';
	
    conn.query(selectQuery, [user_id_info], async (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return;
      }

      if (result.length > 0) {
        // Usuário já existe na base de dados
        console.log('Usuário já existe na base de dados');
        // Execute ações adicionais, se necessário
      } else {
        // Usuário não existe na base de dados, então registre-o
        const insertQuery = `INSERT INTO users (user_id_info, fname, lname, email, data, profile_pic, timezone, role, source) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, '0', 'google')`;
        conn.query(insertQuery, [user_id_info, fname, lname, email, date, picture, timezone], async (err, result) => {
          if (err) {
            console.error('Erro ao registrar o usuário:', err);
            return;
          }

          console.log('Usuário registrado com sucesso');
          // Execute ações adicionais, se necessário
        });
      }
    });
  }
}

module.exports = Authorization;
