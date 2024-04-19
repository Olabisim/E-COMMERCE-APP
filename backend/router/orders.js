
const express = require('express')
const router = express.Router()
const {Order} = require('../model/order')
const { OrderItem } = require('../model/order-item')

router.get('/', async (_, res) => {
        // after populating the order what is needed is only the name
        // the sort method sorts from the newest to the oldest by passing the .sort({'dateordered': -1})
        const order = await Order.find().populate('user', 'name').sort({'dateordered': -1})

        if(!order) {
                res.status(500).json({success: false})
        }

        res.status(200).json({success: true, data: order})
})

router.get('/:id', async (_, res) => {
        // after populating the order what is needed is only the name
        // the sort method sorts from the newest to the oldest by passing the .sort({'dateordered': -1})
        const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        // now populating category that is inside product we have
        .populate({ path: 'orderItems', populate: {path: 'product', populate: 'category'}})
        // populating product inside the array of orderItems
        // .populate({ path: 'orderItems', populate: 'product'})


        if(!order) {
                res.status(500).json({success: false})
        }

        res.status(200).json({success: true, data: order})
})


router.post('/', async (req,res)=>{

        // orderItemsIds was initially return a promise in the console like [ Promise {<pending> }, Promise { <Pending> }]
        // the Promise.all is doing the job of outputing it in a text that is storable and usable.

        // [Promise {<pening>}]
        // this one promise needs to be resolved

        // [ Promise {<pending> }, Promise { <Pending> }]
        // this means two promise needs to be resolved.

        // from this scenerio the promise.all resolved the first promise and the orderitemsidsresolved the second promise.

        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })
    
        //     saving the order item in the database
            newOrderItem = await newOrderItem.save();
    
            return newOrderItem._id;
        }))

        const orderItemsIdsResolved =  await orderItemsIds;
    

        //  array of total prices of each total item 
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice
        }))
    
        const totalPrice = totalPrices.reduce((a,b) => a +b , 0);
    
        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user,
        })

        order = await order.save();
    
        if(!order) return res.status(400).send('the order cannot be created!')
    
        res.send(order);
    })


//     only to change the status of the order 
    router.put('/:id',async (req, res)=> {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            { new: true}
        )
    
        if(!order)
        return res.status(400).send('the order cannot be updated!')
    
        res.send(order);
    })
    
// assessment delete all the order items with the orders that was deleted.
// my first suggestion is to delete the orderitems by the id that is gotten. 
        router.delete('/:id', (req, res)=>{
                Order.findByIdAndRemove(req.params.id).then(async order =>{
                if(order) {
                        await order.orderItems.map(async orderItem => {
                                await OrderItem.findByIdAndRemove(orderItem)
                        })
                        return res.status(200).json({success: true, message: 'the order is deleted!'})
                } else {
                        return res.status(404).json({success: false , message: "order not found!"})
                }
                }).catch(err=>{
                return res.status(500).json({success: false, error: err}) 
                })
        })


        
router.get('/get/totalsales', async (req, res)=> {

        // you need to actively learn the aggregate. 


        // one thing again to note is that mongodb cannot display an array without the _id key, to solve the issue we just set it to null to display it
        const totalSales= await Order.aggregate([
            { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
        ])
    
        if(!totalSales) {
            return res.status(400).send('The order sales cannot be generated')
        }
    
        // .pop removes the first element in the array which is the _id which was set to null
        res.send({totalsales: totalSales.pop().totalsales})
    })
    
    router.get(`/get/count`, async (req, res) =>{
        const orderCount = await Order.countDocuments((count) => count)
    
        if(!orderCount) {
            res.status(500).json({success: false})
        } 
        res.send({
            orderCount: orderCount
        });
    })
    
    router.get(`/get/userorders/:userid`, async (req, res) =>{
        const userOrderList = await Order.find({user: req.params.userid})
                        .populate({path: 'orderItems', populate: {path : 'product', populate: 'category'}}).sort({'dateOrdered': -1});
    
        if(!userOrderList) {
            res.status(500).json({success: false})
        } 
        res.send(userOrderList);
    })


module.exports =  router;