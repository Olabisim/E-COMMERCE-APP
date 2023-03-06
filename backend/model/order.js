
const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({

        // multiple needs to be passed with an array
        orderItemd: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItems',
                required: true
        }],
        shippingAddress1: String,
        shippingAddress2: String,
        city: {type: String, required: true},
        zip: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: String, required: true},
        status: {type: String, required: true, default: 'Pending'},
        totalPrice: Number,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        dateOrdered: {type: Date, default: Date.now}


})

orderSchema.virtuals('id').get(function() {
        return this._id.toHexString()
})

orderSchema.set('toJSON', {
        virtuals: true
})


exports.Order = mongoose.model('Order', orderSchema)