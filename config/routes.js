var checkLogin = require('../Server/middleware/login');

module.exports = function(app, gravatar){
	var controller = require('./../Server/controllers/controller.js')(app);

	app.get('/plot_PosNeg',function(req,res){
		controller.getPosNegs(req,res);
	});
	app.get('/plot_Org',function(req,res){
		controller.getOrganisms(req,res);
	});
	app.get('/tables',function(req,res){
		controller.getFormated(req,res);
	});
	app.get('/tablesNeg',function(req,res){
		controller.getFormatedNegCulture(req,res);
	});
	app.get('/categories',function(req,res){
		controller.getCategories(req,res);
	});
	app.get('/original',function(req,res) {
		controller.getOriginal(req,res);
	});
	app.get('/originalNeg',function(req,res) {
		controller.getOriginalNegCulture(req,res);
	});
	app.get('/lookUp', function(req,res) {
		controller.getLookUps(req, res);
	});
	app.get('/robertLookUp', function(req, res) {
		controller.getRobertLookUps(req, res);
	});
	app.get('/users',function(req,res){
		controller.show(req,res);
	});
	app.post('/users',function(req,res){
		/** Gravatar Generation **/
		var secureUrl = gravatar.url(req.body.email, {s: '100', r: 'x', d: 'identicon'}, false);
		// console.log("gravatar", secureUrl);
		req.body.gravatar = secureUrl;

		controller.add(req,res);
	});
	app.post('/static/users',function(req,res){
		controller.add(req,res);
	});

	// use middleware to check login
	app.post('/login', function(req,res) {

		console.log("last user", req.session.email);

		if(req.session.email != req.body.email) {
			/** Gravatar Generation **/
			var secureUrl = gravatar.url(req.body.email, {s: '100', r: 'x', d: 'identicon'}, false);
			// console.log("gravatar", secureUrl);
			req.body.gravatar = secureUrl;
			req.session.gravatar = secureUrl;

			req.session.email = req.body.email;
			console.log("new user logged in..");
		}
		console.log("current user",req.session.email);

			controller.login(req,res);
	});
	app.post('/static/login',function(req,res) {

		if(req.session.email != req.body.email) {
			/** Gravatar Generation **/
			var secureUrl = gravatar.url(req.body.email, {s: '100', r: 'x', d: 'identicon'}, false);
			// console.log("gravatar", secureUrl);
			req.body.gravatar = secureUrl;
			req.session.gravatar = secureUrl;

			req.session.email = req.body.email;
			console.log("new user logged in..");
		}
		console.log("current user",req.session.email);

		  controller.login(req,res);
	});
	// check if user is login or not
	app.get('/check-login', checkLogin, function (req, res) {
		// if users have login before, they will pass to this code
		res.send(req.session.user);
	});
	// logout
	app.get('/logout', function (req, res) {
		// remove session
		delete req.session.user;
		console.log("logout successful");
		res.send('/');
	});
	app.get('/user/activate', function(req, res){
		controller.activate(req, res);
	});
	app.post('/password/request', function(req, res){
		controller.request_password(req, res);
	});
	app.get('/password/reset', function(req, res){
		controller.reset_password(req, res);
	});
	app.post('/password/reset/complete', function(req, res){
		controller.reset_password_complete(req, res);
	});


	// app.use('/', router);
};