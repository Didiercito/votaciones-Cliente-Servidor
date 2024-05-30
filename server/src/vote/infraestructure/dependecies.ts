import { VoteUseCase } from "../application/use-case/voteUseCase";
import { VoteMongoDBRepository } from "./adapters/VoteMongoDBRepository";
import { VoteController } from "./controller/VoteController";
import { wss } from "../../ws/ws";

const voteMongoDBAdapter = new VoteMongoDBRepository();
const voteUseCase = new VoteUseCase(voteMongoDBAdapter);

export const voteController = new VoteController(voteUseCase, wss);
