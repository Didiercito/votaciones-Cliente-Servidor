import { MongoClient, ObjectId } from 'mongodb';
import { URI, dbName } from '../../../database/db';
import { VoteRepository } from '../../domain/interface/voteRepository';

export class VoteMongoDBRepository implements VoteRepository {
    async voteForCandidate(userId: string, candidateId: string): Promise<boolean> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const voteCollection = db.collection('Votes');
            const candidateCollection = db.collection('Candidate');

            const existingVote = await voteCollection.findOne({ userId });

            if (existingVote) {
                const previousCandidateId = existingVote.candidateId;
                await voteCollection.updateOne({ userId }, { $set: { candidateId } });

                await candidateCollection.updateOne({ candidate_id: previousCandidateId }, { $inc: { votes: -1 } });
                await candidateCollection.updateOne({ candidate_id: candidateId }, { $inc: { votes: 1 } });
            } else {
                await voteCollection.insertOne({ userId, candidateId });
                await candidateCollection.updateOne({ candidate_id: candidateId }, { $inc: { votes: 1 } });
            }

            return true;
        } catch (error) {
            console.error('Error al votar:', error);
            return false;
        } finally {
            await client.close();
        }
    }

    async getTotalVotesByCandidate(): Promise<Map<string, number>> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const voteCollection = db.collection('Votes');

            const allVotes = await voteCollection.find({}).toArray();

            const votesMap = new Map<string, number>();

            allVotes.forEach(vote => {
                const { candidateId } = vote;
                if (votesMap.has(candidateId)) {
                    votesMap.set(candidateId, votesMap.get(candidateId)! + 1);
                } else {
                    votesMap.set(candidateId, 1);
                }
            });

            return votesMap;
        } catch (error) {
            console.error('Error al obtener los votos por candidato:', error);
            return new Map<string, number>();
        } finally {
            await client.close();
        }
    }
}