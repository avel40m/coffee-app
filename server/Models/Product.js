const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
    },
    imgURL: {
        type:String
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }
},{
    timestamps:true
}
);

ProductSchema.methods.setImgURL = function setImgURL(){
    
}

module.exports = mongoose.model('Product', ProductSchema);
