import { Answer } from "../../enterprise/entities/answer"
import { Question } from "../../enterprise/entities/question"
import { AnswerRepository } from "../repositories/answers-repository"
import { QuestionRepository } from "../repositories/questions-repository"

interface FetchQuestionAnswersUseCaseRequest {
    questionId: string
    page: number
}
interface FetchQuestionAnswersUseCaseResponse{
    answers: Answer[]
}
export class FetchQuestionAnswersUseCase { 
    constructor(
        private answerRepository: AnswerRepository,
    ){}
    async execute({questionId,page}: FetchQuestionAnswersUseCaseRequest) : Promise<FetchQuestionAnswersUseCaseResponse> {
        const answers = await this.answerRepository.findManyByQuestionId(questionId, {page})
        return {
            answers
        }
    }
    
}