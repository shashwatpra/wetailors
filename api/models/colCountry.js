var mongoose = require('mongoose');
module.exports = mongoose.model('colCountry', {
    CountryID: {type: String},
    CountryName: {type: String}
});
