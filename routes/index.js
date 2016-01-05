var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next){
	Post.find(function(err, posts){
		if(err)
			return next(err);

		res.json(posts);
	});
});

router.post('/posts', function(req, res, next){
	var post = new Post(req.body);

	post.save(function(err, post){
		if(err)
			return next(err);

		res.json(post);
	});
});

router.param('post', function(req, res, next, id){
	var query=Post.findById(id);

	query.exec(function(err, post){
		if(err)
			return next(err);
		if(!post)
			return next(new Error('can\'t find post'));

		req.post = post;
		return next();
	});
});

router.get('/posts/:post', function(req, res){
	console.log("inside post/:post", req.post);
	res.json(req.post);
});

router.put('/posts/:post/vote', function(req, res, next){
	console.log("inside :post", req.post);
	req.post.vote(function(err, post){
		if(err)
			return next(err);

		res.json(post);
	});
});

/*router.get('/comments/{id}', function(req, res, next){
	Comment.find(function(err, comments){
		if(err)
			return next(err);

		res.json(comments);
	});
});

router.post('/comments/{id}', function(req, res, next){
	var comment = new Comment(req.body);

	comment.save(function(err, comments){
		if(err)
			return next(err);

		res.json(comments);
	});
});*/
module.exports = router;
