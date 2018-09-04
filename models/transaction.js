const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Cusstomer' },
    days: Number,
    out_date: { type : Date, default: new Date },
    due_date: Date,
    in_date: { type : Date, default: null },
    fine: Number,
    booklist: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

transactionSchema.pre('save',function(next){
    console.log(this.days)
    let dueDate = new Date
    this.due_date = dueDate.setDate(dueDate.getDate()+this.days)
    next()
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction