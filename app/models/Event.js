const { Schema, model, models } = require("mongoose");

const EventSchema = new Schema({
  type: String, // click or view
  page: String, // like "sayan"
  uri: String, // /sayan | https://.....
}, {timestamps: true});

export const Event = models?.Event || model('Event', EventSchema)