import admin from 'firebase-admin';
import serviceAccount from '../assets/spatialAnchor-GCS.json';
import GeoFirestore from 'geofirestore';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://astoria-fcaca.firebaseio.com"
});

var database = admin.firestore();
database.settings({ timestampsInSnapshots: true });

const geoFirestore = GeoFirestore.initializeApp(database);

export default class FirestoreLib {

	getDatabase() {
    return database;
  }

  getGeoFirestore() {
    return geoFirestore;
  }
}