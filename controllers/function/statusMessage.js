class message{
	static getStatusMessage(status){
		switch(staus):
			case 'false':
			case 'login-failed':
				return 'OOPS! Email ou Senha incorreta!';
			case 'register-failed':
				return 'OOPS! Desculpe, ocorreu um erro durante o registro. Por favor, tente novamente mais tarde.';
			case 'true':
				return 'O seu registo foi efetuado com sucesso!';
			default:
				return '';
	}
}

module.exports = message