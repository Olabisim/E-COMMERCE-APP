
const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({

        // multiple needs to be passed with an array
        orderItems: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItem',
                required: true
        }],
        shippingAddress1: {type: String, required: true},
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
// first is Schema.virtual (without the s) while the second is orderSchema.set('toJSON', {virtuals: true})
orderSchema.virtual('id').get(function() {
        return this._id.toHexString();
})

orderSchema.set('toJSON', {
        virtuals: true,
})


exports.Order = mongoose.model('Order', orderSchema)



/**
Order Example:

{
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "5fcfc406ae79b0a6a90d2585"
        },
        {
            "quantity": 2,
            "product" : "5fd293c7d3abe7295b1403c4"
        }
    ],
    "shippingAddress1" : "Flowers Street , 45",
    "shippingAddress2" : "1-B",
    "city": "Prague",
    "zip": "00000",
    "country": "Czech Republic",
    "phone": "+420702241333",
    "user": "5fd51bc7e39ba856244a3b44"
}

 */