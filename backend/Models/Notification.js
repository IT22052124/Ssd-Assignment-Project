const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
    {
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        read: {
            type: String,
            enum: ['Yes', 'Pending'],
            default: 'Pending',
        },
        seen: {
            type: String,
            enum: ['Yes', 'Pending'],
            default: 'Pending',
        },
    },
    {
      timestamps: true,
    }
);

const Notifications = mongoose.model("Notification",NotificationSchema);
module.exports = Notifications;