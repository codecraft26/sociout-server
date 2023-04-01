//schema for show
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var showSchema = new Schema({
    movieName: {    
        type: String,
        required: true
    }});
module.exports = mongoose.model('Show', showSchema);