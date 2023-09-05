import { Either, right } from "@/core/either"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/questions-repository"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface FetchRecentQuestionsUseCaseRequest {
    page: number
}
type FetchRecentQuestionsUseCaseResponse = Either<null,{questions: Question[]}>
export class FetchRecentQuestionsUseCase { 
    constructor(
        private questionRepository: QuestionRepository,
    ){}
    async execute({page}: FetchRecentQuestionsUseCaseRequest) : Promise<FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionRepository.findManyRecent({page})
        return right({
            questions
        })
    }
    
}