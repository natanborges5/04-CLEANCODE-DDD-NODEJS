import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { EditAnswerUseCase } from "./edit-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe("Edit Answer", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it("Should be able to edit a answer", async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("answer-1"))
        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: newAnswer.authorId.toString(),
            content: "Edited Content"

        })
        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: "Edited Content"
        })
    })
    it("Should not be able to edit a answer from another user", async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("answer-1"))
        await inMemoryAnswersRepository.create(newAnswer)
        expect(() => {
            return sut.execute({
                answerId: newAnswer.id.toString(),
                authorId: "author-2",
                content: "Edited Content"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
