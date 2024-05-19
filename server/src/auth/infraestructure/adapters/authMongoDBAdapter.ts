import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { AuthCredentialLogin, AuthCredentialRegister } from '../../domain/entities/authCredentials';
import { AuthRepository } from '../../domain/interface/authRepository';
import { URI, dbName } from '../../../database/db';

export class AuthMongoDBAdapterRepository implements AuthRepository {
    
    async verifyUser(credentials: AuthCredentialLogin): Promise<AuthCredentialLogin | null> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const userCollections = db.collection('Users');

            const user = await userCollections.findOne({
                CURP: credentials.CURP,
            });

            if (!user) {
                return null; 
            }

            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

            if (!isPasswordValid) {
                return null;
            }

            return new AuthCredentialLogin(user.CURP, user.password);
        } catch (error) {
            console.error('Error verifying user', error);
            return null;
        } finally {
            await client.close();
        }
    }

    async registerUser(credentials: AuthCredentialRegister): Promise<AuthCredentialRegister | null> {
        const client = new MongoClient(URI);
        try {
            await client.connect();
            const db = client.db(dbName);
            const userCollections = db.collection('Users');
            
            const hashedPassword = await bcrypt.hash(credentials.password, 12);

            const result = await userCollections.insertOne({
                CURP: credentials.CURP,
                password: hashedPassword,
                name: credentials.name,
                lastname: credentials.lastname,
                email: credentials.email,
                state: credentials.state,
                city: credentials.city,
                zip_code: credentials.zip_code
            });

            return result.insertedId ? credentials : null;
        } catch (error) {
            console.error('Error registering user', error);
            return null;
        } finally {
            await client.close();
        }
    }
}
