const {model, Schema} = require("mongoose")

const friendSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    friend: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', "rejected"],
        default: 'pending'
    }   
}, {timestamps: true})

module.exports = model('friend', friendSchema)  