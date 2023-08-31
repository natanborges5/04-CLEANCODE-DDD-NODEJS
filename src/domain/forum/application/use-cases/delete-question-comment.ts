import { QuestionCommentsRepository } from "../repositories/question-comments-repository"
interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string
}
interface DeleteQuestionCommentUseCaseResponse {}
export class DeleteQuestionCommentUseCase { 
    constructor(
        private questionCommentsRepository: QuestionCommentsRepository
    ){}
    async execute({authorId, questionCommentId}: DeleteQuestionCommentUseCaseRequest) : Promise<DeleteQuestionCommentUseCaseResponse> {
        const question = await this.questionCommentsRepository.findById(questionCommentId)
        if(!question){
            throw new Error("Question Comment not found")
        }
        if(question.authorId.toString() !== authorId){
            throw new Error("Not allowed")
        }
        await this.questionCommentsRepository.delete(question)
        return{}
    }
    
}