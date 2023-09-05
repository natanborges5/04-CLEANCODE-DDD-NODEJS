import { AnswerQuestionUseCase } from "./answer-question"
import { AnswerRepository } from "../repositories/answers-repository"
import { Answer } from "../../enterprise/entities/answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe("Create Question", () => {
beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
})

    it("Should be able to create a answer", async () => {
        const result = await sut.execute({
            questionId: "1",
            instructorId: "1",
            content: "Conteudo da Resposta",
        })
        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    })
})