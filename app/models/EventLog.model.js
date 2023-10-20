import { Schema, model } from 'mongoose';

const schema = new Schema({
  eventName: { type: String },
  receivedData: Schema.Types.Mixed
});
schema.set('timestamps', true);

const EventLog = model('webhook_event_log', schema);

export default EventLog;
