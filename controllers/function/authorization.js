const { conn } = require('../../controllers/db');
const path = require('path')

class Authorization {
	static async handUserGoogleLogin(user, res, req) {
	  const { id, name, emails, photos, provider} = user;
	  const user_id_info = id;
	  const fname = name.givenName;
	  const lname = name.familyName;
	  const email = emails[0].value;
	  const pic = photos[0].value;
	  const date = new Date().toISOString().slice(0, 10);
	  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


// Verifique se o usuário já existe na base de dados
	  const selectQuery = 'SELECT * FROM users WHERE user_id_info = ?';
	  conn.query(selectQuery, [user_id_info], async (err, result) => {
		if (err) {
		  console.error('Erro ao executar a consulta:', err);
		  return;
		}

		if (result.length > 0) {
		  const rows = result[0];
		  if (rows.source === 'google') {
			const userDetailsExist = await Authorization.checkUserDetails(user_id_info);
			if (userDetailsExist) {
			  req.session.user = rows;
			  console.log('Redirecionar para o dashboard');
			} else {
			  req.session.user = rows;
			  res.redirect('/user_details');
			}
		  }
		} else {
		  console.log('Registado com sucesso');
		  // Usuário não existe na base de dados, então registre-o
		  const insertQuery = `INSERT INTO users (user_id_info, fname, lname, email, data, profile_pic, timezone, role, source)
							   VALUES (?, ?, ?, ?, ?, ?, ?, '0', 'google')`;
		  conn.query(insertQuery, [user_id_info, fname, lname, email, date, picture, timezone], async (err, result) => {
			if (err) {
			  console.error('Erro ao registrar o usuário:', err);
			  return;
			}

			// Após registrar o usuário, armazene seus dados na sessão
			const newUserRow = { user_id_info, fname, lname, email, data: date, profile_pic: picture, timezone, role: '0', source: 'google' };
			req.session.user = newUserRow;
			res.redirect('/user_details');
		  });
		}
	  });
	} 
  
	static async checkUserDetails(user_id_info){
		const selectQuery = 'SELECT * FROM user_details WHERE user_id_info = ?';
		return new Promise((resolve, reject) => {
		  conn.query(selectQuery, [user_id_info], (err, result) => {
			if (err) {
			  reject(err);
			} else {
			  resolve(result.length > 0);
			}
		  });
		});
	}
}

module.exports = Authorization;
