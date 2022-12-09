'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
    var res = await Order
        .find({}, 'number status customer items')
        .populate('customer', 'name') //Filtrando para trazer somente a propriedade 'name' para o objeto customer
        .populate('items.product', 'title'); //Filtrando para trazer somente a propriedade 'title' para cada produto dentro de items
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}