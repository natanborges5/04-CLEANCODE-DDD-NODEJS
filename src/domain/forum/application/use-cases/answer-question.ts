
import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswerRepository } from "../repositories/answers-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}
interface AnswerQuestionUseCaseResponse{
    answer: Answer
}
export class AnswerQuestionUseCase { 
    constructor(
        private answerRepository: AnswerRepository,
    ){}
    async execute({questionId, instructorId, content}: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
        })
        await this.answerRepository.create(answer)
        return {
            answer
        }
    }
    
}