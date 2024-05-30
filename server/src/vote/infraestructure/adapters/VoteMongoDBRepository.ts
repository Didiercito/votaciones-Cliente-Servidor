import { MongoClient } from 'mongodb';
import { URI, dbName } from '../../../database/db';
import { VoteRepository } from '../../domain/interface/voteRepository';

export class VoteMongoDBRepository implements VoteRepository {
    async voteForCandidate(userId: string, candidateId: string): Promise<boolean> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const voteCollection = db.collection('Votes');

            const existingVote = await voteCollection.findOne({ userId });

            if (existingVote) {
                await voteCollection.updateOne({ userId }, { $set: { candidateId } });
                return true; 
            } else {
                await voteCollection.insertOne({ userId, candidateId });
                return true; 
            }
        } catch (error) {
            console.error('Error al votar:', error);
            return false;
        } finally {
            await client.close();
        }
    }
}
