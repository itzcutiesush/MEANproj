var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	votes: {type: Number, default: 0},
	comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.vote = function(cb){
	this.votes++;
	this.save(cb);
}

mongoose.model('Post', PostSchema);