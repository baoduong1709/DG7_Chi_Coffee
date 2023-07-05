const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://bao1709:bao17092002@cluster0.ni9fgfo.mongodb.net/dg7_employee?retryWrites=true&w=majority', {

        })
        console.log('Connected!')
    } catch (error) {
        console.log('fail!')
    }
}
module.exports = { connect }

// mongodb+srv://bao1709:bao17092002@cluster0.ni9fgfo.mongodb.net/?retryWrites=true&w=majority