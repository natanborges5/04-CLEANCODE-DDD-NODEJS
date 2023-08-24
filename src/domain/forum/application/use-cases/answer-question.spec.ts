import { AnswerQuestionUseCase } from "./answer-question"
import { AnswerRepository } from "../repositories/answers-repository"
import { Answer } from "../../enterprise/entities/answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-asnwers-repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe("Create Question", () => {
beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
})

    it("Should be able to create a answer", async () => {
        const {answer} = await sut.execute({
            questionId: "1",
            instructorId: "1",
            content: "Conteudo da Resposta",
        })
        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    })
})