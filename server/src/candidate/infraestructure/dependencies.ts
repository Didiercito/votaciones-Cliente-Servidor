import { CreateCandidateUseCase, UpdateCandidateUseCase, DeleteCandidateUseCase, GetAllCandidatesUseCase } from "../application/use-case/cantidateUseCase";
import { CandidateMongoDBRepository } from "./adapters/candidateMongoDBAdapter";
import { CandidateController } from "./controller/candidateController";

const candidateMongoDBAdapter = new CandidateMongoDBRepository();
const createCandidateUseCase = new CreateCandidateUseCase(candidateMongoDBAdapter);
const updateCandidate = new UpdateCandidateUseCase(candidateMongoDBAdapter);
const deleteCandidate = new DeleteCandidateUseCase(candidateMongoDBAdapter);
const getAllCandidates = new GetAllCandidatesUseCase(candidateMongoDBAdapter);

export const candidateController = new CandidateController(createCandidateUseCase, updateCandidate, deleteCandidate, getAllCandidates);
