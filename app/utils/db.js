import config from '../configs/env.config';

const mongoose = require('mongoose');

// const changeStream = (collectionName) => {
//   const { client } = mongoose.connection;
//   const db = client.db('bean');
//   const collection = db.collection(collectionName);
//   const historyCollection = db.collection(`history.${collectionName}`);
//   const cs = collection.watch();
//   cs.on('change', (next) => {
//     if (next.operationType === 'insert') {
//       const payload = {
//         documentId: next.documentKey._id,
//         operationType: next.operationType,
//         changeEvent: JSON.stringify(next),
//         isDeleted: false,
//         createdAt: new Date(),
//         version: next.fullDocument.__v,
//         document: next.fullDocument
//       };
//       historyCollection.insertOne(payload);
//     }
//     else if (next.operationType === 'update') {
//       const payload = {
//         documentId: next.documentKey._id,
//         operationType: next.operationType,
//         changeEvent: JSON.stringify(next),
//         isDeleted: false,
//         updatedAt: new Date(),
//         updateDescription: next.updateDescription,
//         version: next.updateDescription.updatedFields.__v
//       };
//       historyCollection.insertOne(payload);
//     }
//     else if (next.operationType === 'delete') {
//       const payload = {
//         documentId: next.documentKey._id,
//         operationType: next.operationType,
//         changeEvent: JSON.stringify(next),
//         isDeleted: true,
//         deletedAt: new Date()
//       };
//       historyCollection.insertOne(payload);
//     }
//     else if (next.operationType === 'replace') {
//       const payload = {
//         documentId: next.documentKey._id,
//         operationType: next.operationType,
//         changeEvent: JSON.stringify(next),
//         isDeleted: true,
//         deletedAt: new Date(),
//         version: next.fullDocument.__v,
//         document: next.fullDocument
//       };
//       historyCollection.insertOne(payload);
//     }
//   });
// };

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    await mongoose.connect(config.db.url, connectionParams);
    // changeStream('organizations');
    // changeStream('users');

    // changeStream('bills');
    // changeStream('payees');
    // changeStream('payments');
    // changeStream('payment_accounts');

    // changeStream('contacts');
    // changeStream('invoices');
    // changeStream('invoice_templates');
    // changeStream('business_details');

    // changeStream('system_variables');
    process.stdout.write('connected to database. \n');
  }
  catch (error) {
    process.stdout.write('could not connect to database \n', error);
    process.exit();
  }
};
