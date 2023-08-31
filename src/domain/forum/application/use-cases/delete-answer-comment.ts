import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string
    answerCommentId: string
}
interface DeleteAnswerCommentUseCaseResponse {}
export class DeleteAnswerCommentUseCase { 
    constructor(
        private answerCommentsRepository: AnswerCommentsRepository
    ){}
    async execute({authorId, answerCommentId}: DeleteAnswerCommentUseCaseRequest) : Promise<DeleteAnswerCommentUseCaseResponse> {
        const answer = await this.answerCommentsRepository.findById(answerCommentId)
        if(!answer){
            throw new Error("Answer Comment not found")
        }
        if(answer.authorId.toString() !== authorId){
            throw new Error("Not allowed")
        }
        await this.answerCommentsRepository.delete(answer)
        return{}
    }
    
}