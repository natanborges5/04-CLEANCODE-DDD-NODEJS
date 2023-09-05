
import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswerRepository } from "../repositories/answers-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Either, right } from "@/core/either"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}
type AnswerQuestionUseCaseResponse = Either<null, {answer: Answer}>
export class AnswerQuestionUseCase { 
    constructor(
        private answerRepository: AnswerRepository,
    ){}
    async execute({questionId, instructorId, content}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
        })
        await this.answerRepository.create(answer)
        return right({
            answer
        })
    }
    
}