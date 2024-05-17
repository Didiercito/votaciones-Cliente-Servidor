// import { AuthCredential } from "../../domain/entities/authCredential";
// import {AuthRepository} from "../../domain/interface/authRepository";
// import { MongoClient, Db } from 'mongodb';

// export class AuthMongoDBAdapterRepository implements AuthRepository {
//     private readonly mongoURI: string;
//     private readonly dbName: string;
//     private readonly collectionName: string;

//     constructor(mongoURI: string, dbName: string, collectionName: string) {
//         this.mongoURI = mongoURI;
//         this.dbName = dbName;
//         this.collectionName = collectionName;
//     }

//     async verifyUser(credentials: AuthCredential): Promise<AuthCredential | null> {
//         try {
//             const client = await MongoClient.connect(this.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//             const db: Db = client.db(this.dbName);
//             const collection = db.collection(this.collectionName);

//             const userFind = await collection.findOne({
//                 CURP: credentials.CURP,
//                 password: credentials.password
//             });

//             client.close();

//             return userFind ? new AuthCredential(userFind.CURP, userFind.password, userFind.name, userFind.lastname, userFind.email, userFind.state, userFind.city, userFind.zip_code) : null;
//         } catch (error) {
//             console.error('Error al verificar el usuario', error);
//             throw error;
//         }
//     }
// }
