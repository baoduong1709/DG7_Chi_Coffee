const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://bao1709:bao17092002@cluster0.ni9fgfo.mongodb.net/DG7_Chi_Coffee?retryWrites=true&w=majority', {

        })
        console.log('Connected!')
    } catch (error) {
        console.log('fail!')
    }
}
module.exports = { connect }

