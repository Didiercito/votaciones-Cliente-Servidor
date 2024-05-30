import { MongoClient, ObjectId } from "mongodb";
import { CandidateCredentials } from "../../domain/entities/candidateCredentials";
import { CandidateRepository } from "../../domain/interface/candidateRepository";
import { URI, dbName } from "../../../database/db";

export class CandidateMongoDBRepository implements CandidateRepository {
    async createCandidate(credentials: CandidateCredentials): Promise<CandidateCredentials | null> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const candidateCollection = db.collection('Candidate');

            const result = await candidateCollection.insertOne({
                image_url: credentials.image_url,
                name_candidate: credentials.name_candidate,
                name_political_party: credentials.name_political_party,
                id_political_party: credentials.id_political_party,
                candidate_id: credentials.candidate_id
            });

            if (result.insertedId) {
                credentials._id = result.insertedId.toString(); 
                return credentials;
            }

            return null;

        } catch (error) {
            console.error('Error al crear candidato', error);
            return null;
        } finally {
            await client.close();
        }
    }

    async updateCandidate(_id: string, credentials: CandidateCredentials): Promise<CandidateCredentials | null> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const candidateCollection = db.collection('Candidate');

            const result = await candidateCollection.updateOne(
                { _id: new ObjectId(_id) },
                {
                    $set: {
                        image_url: credentials.image_url,
                        name_candidate: credentials.name_candidate,
                        name_political_party: credentials.name_political_party,
                        id_political_party: credentials.id_political_party,
                        candidate_id: credentials.candidate_id
                    }
                }
            );

            return result.modifiedCount > 0 ? credentials : null;
        } catch (error) {
            console.error("Error al actualizar el candidato: ", error);
            return null;
        } finally {
            await client.close();
        }
    }

    async deleteCandidate(_id: string): Promise<CandidateCredentials | null> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const candidateCollection = db.collection('Candidate');

            const candidate = await candidateCollection.findOne({ _id: new ObjectId(_id) });
            if (!candidate) {
                return null;
            }

            const result = await candidateCollection.deleteOne({ _id: new ObjectId(_id) });
            if (result.deletedCount > 0) {
                return {
                    _id: candidate._id.toString(),
                    image_url: candidate.image_url,
                    name_candidate: candidate.name_candidate,
                    name_political_party: candidate.name_political_party,
                    id_political_party: candidate.id_political_party,
                    candidate_id: candidate.candidate_id
                };
            }
            return null;
        } catch (error) {
            console.error("Error al eliminar candidato: ", error);
            return null;
        } finally {
            await client.close();
        }
    }

    async getAllCandidates(): Promise<CandidateCredentials[] | null> {
        const client = new MongoClient(URI);

        try {
            await client.connect();
            const db = client.db(dbName);
            const candidateCollection = db.collection('Candidate');

            const candidates = await candidateCollection.find().toArray();
            return candidates.map(candidate => ({
                _id: candidate._id.toString(),
                image_url: candidate.image_url,
                name_candidate: candidate.name_candidate,
                name_political_party: candidate.name_political_party,
                id_political_party: candidate.id_political_party,
                candidate_id: candidate.candidate_id
            }));

        } catch (error) {
            console.error("Error al obtener candidatos:", error);
            return null;
        } finally {
            await client.close();
        }
    }
}
