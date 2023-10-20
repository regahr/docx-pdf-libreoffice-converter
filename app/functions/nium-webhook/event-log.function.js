import EventLog from '../../models/EventLog.model';

const EventLogFunc = {
  async save(eventName, data) {
    await EventLog.create({ eventName, receivedData: data });
  },
  async logCallback(type, data) {
    // currently hardcoded
    await EventLog.create({ eventName: type, receivedData: data });
  }
};

export default EventLogFunc;
