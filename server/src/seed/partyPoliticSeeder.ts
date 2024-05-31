import { MongoClient } from "mongodb";
import { URI, dbName } from "../database/db";
import { CandidateCredentials } from "../candidate/domain/entities/candidateCredentials";

export const political_partys: Omit<CandidateCredentials, '_id'>[] = [
    {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/PAN_logo_%28Mexico%29.svg/1200px-PAN_logo_%28Mexico%29.svg.png",
        name_candidate: "Xóchitl Gálvez",
        name_political_party: "PARTIDO ACCIÓN NACIONAL",
        id_political_party: "32211212",
        candidate_id: "11221121",
        votes: 0
    },
    {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PRI_logo_%28Mexico%29.svg/1200px-PRI_logo_%28Mexico%29.svg.png",
        name_candidate: "Xóchitl Gálvez",
        name_political_party: "PARTIDO REVOLUCIONARIO INSTITUCIONAL",
        id_political_party: "32222333",
        candidate_id: "11221121",
        votes: 0
    },
    {
        image_url: "https://i0.wp.com/www.adiario.mx/wp-content/uploads/2023/06/PRD.jpeg",
        name_candidate: "Xóchitl Gálvez",
        name_political_party: "PARTIDO DE LA REVOLUCIÓN DEMOCRÁTICA",
        id_political_party: "32233444",
        candidate_id: "11221121",
        votes : 0
    },
    {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Worker%27s_Party_logo_%28Mexico%29.svg/800px-Worker%27s_Party_logo_%28Mexico%29.svg.png",
        name_candidate: "Claudia Sheinbaum",
        name_political_party: "PARTIDO DEL TRABAJO",
        id_political_party: "43344555",
        candidate_id: "22332233",
        votes:0
    },
    {
        image_url: "https://pbs.twimg.com/profile_images/1390729511751372806/mUAZhDNm_400x400.jpg",
        name_candidate: "Claudia Sheinbaum",
        name_political_party: "PARTIDO VERDE ECOLOGISTA DE MÉXICO",
        id_political_party: "43355666",
        candidate_id: "22332233",
        votes:0
    },
    {
        image_url: "https://laorquesta.mx/wp-content/uploads/2020/12/morena-logo.jpg",
        name_candidate: "Claudia Sheinbaum",
        name_political_party: "MORENA",
        id_political_party: "43366777",
        candidate_id: "22332233",
        votes:0
    },
    {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Logo_Partido_Movimiento_Ciudadano_%28M%C3%A9xico%29.svg/2048px-Logo_Partido_Movimiento_Ciudadano_%28M%C3%A9xico%29.svg.png",
        name_candidate: "Jorge Álvarez Máynez",
        name_political_party: "MOVIMIENTO CIUDADANO",
        id_political_party: "54477888",
        candidate_id: "33443344",
        votes:0
    }
];

export const seedingCandidates = async () => {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const candidateCollection = db.collection('Candidate');

        await candidateCollection.deleteMany({});

        const result = await candidateCollection.insertMany(political_partys);

        console.log(`${result.insertedCount} candidates were successfully inserted.`);

    } catch (error) {
        console.error('Error seeding candidates:', error);
    } finally {
        await client.close();
    }
};
