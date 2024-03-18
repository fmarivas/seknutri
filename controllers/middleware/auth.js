function isAuthenticated(req, res, next) {
  if (req.session.user) {
    // O usuário está autenticado, permitir o acesso à rota
    next();
  } else {
    // O usuário não está autenticado, redirecionar para a página de login
    res.redirect('/');
  }
}

module.exports = isAuthenticated;