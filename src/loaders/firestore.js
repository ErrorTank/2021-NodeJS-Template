import admin from 'firebase-admin';
import {fireStoreConfig} from '../assets/firestore-config';
// import GeoFirestore from 'geofirestore';

admin.initializeApp({
    credential: admin.credential.cert(fireStoreConfig),
    databaseURL: "https://astoria-fcaca.firebaseio.com"
});

var database = admin.firestore();
database.settings({ timestampsInSnapshots: true });

// const geoFirestore = GeoFirestore.initializeApp(database);

export default class FirestoreLib {

	getDatabase() {
    return database;
  }

  // getGeoFirestore() {
  //   return geoFirestore;
  // }
}