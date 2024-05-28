import { Request, Response } from "express";
import { CreateCandidateUseCase, UpdateCandidateUseCase, DeleteCandidateUseCase, GetAllCandidatesUseCase } from '../../application/use-case/cantidateUseCase';
import { CandidateCredentials } from "../../domain/entities/candidateCredentials";

export class CandidateController {
    constructor(
        readonly createCandidateUseCase: CreateCandidateUseCase,
        readonly updateCandidateUseCase: UpdateCandidateUseCase,
        readonly deleteCandidateUseCase: DeleteCandidateUseCase,
        readonly getAllCandidatesUseCase: GetAllCandidatesUseCase
    ) { }

    async create(req: Request, res: Response) {
        try {
            const { image_url, name_candidate } = req.body;
            const createdCandidate = await this.createCandidateUseCase.execute(image_url, name_candidate);

            if (!createdCandidate) {
                return res.status(500).json({ message: 'Failed to create candidate', success: false });
            }

            return res.status(201).json({
                message: "Created new candidate",
                success: true,
                createdCandidate
            });

        } catch (error) {
            console.error('Error creating candidate:', error);
            return res.status(500).json({
                message: "Internal Server Error. Please try again later",
                success: false
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { image_url, name_candidate } = req.body;
            const credentials = new CandidateCredentials(image_url, name_candidate);
            const updatedCandidate = await this.updateCandidateUseCase.execute(id, credentials);

            if (!updatedCandidate) {
                return res.status(404).json({ message: 'Candidate not found', success: false });
            }

            return res.status(200).json({
                message: "Candidate updated",
                success: true,
                updatedCandidate
            });

        } catch (error) {
            console.error('Error updating candidate:', error);
            return res.status(500).json({
                message: "Internal Server Error. Please try again later",
                success: false
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCandidate = await this.deleteCandidateUseCase.execute(id);

            if (!deletedCandidate) {
                return res.status(404).json({ message: 'Candidate not found', success: false });
            }

            return res.status(200).json({
                message: "Candidate deleted",
                success: true,
                deletedCandidate
            });

        } catch (error) {
            console.error('Error deleting candidate:', error);
            return res.status(500).json({
                message: "Internal Server Error. Please try again later",
                success: false
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const allCandidates = await this.getAllCandidatesUseCase.execute();

            if (!allCandidates) {
                return res.status(500).json({ message: 'Failed to fetch candidates', success: false });
            }

            return res.status(200).json({
                message: "All candidates retrieved successfully",
                success: true,
                candidates: allCandidates
            });

        } catch (error) {
            console.error('Error fetching candidates:', error);
            return res.status(500).json({
                message: "Internal Server Error. Please try again later",
                success: false
            });
        }
    }
}
