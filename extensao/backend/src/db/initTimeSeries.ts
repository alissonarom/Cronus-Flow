import { Db } from 'mongodb';

export async function ensureFeedbacksCollection(db: Db) {
  const collections = await db
    .listCollections({ name: 'feedbacks' })
    .toArray();

  if (collections.length > 0) {
    console.log('📦 Collection feedbacks já existe');
    return;
  }

  await db.createCollection('feedbacks', {
    timeseries: {
      timeField: 'createdAt',
      metaField: 'meta',
      granularity: 'minutes'
    }
  });

  console.log('⏱️ Collection feedbacks (time-series) criada');
}
