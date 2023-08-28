import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { EditQuestionUseCase } from "./edit-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe("Edit Question", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it("Should be able to edit a question", async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("question-1"))
        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString(),
            title: "Edited Title",
            content: "Edited Content"

        })
        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: "Edited Title",
            content: "Edited Content"
        })
    })
    it("Should not be able to edit a question from another user", async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("question-1"))
        await inMemoryQuestionsRepository.create(newQuestion)
        expect(() => {
            return sut.execute({
                questionId: newQuestion.id.toString(),
                authorId: "author-2",
                title: "Edited Title",
                content: "Edited Content"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
