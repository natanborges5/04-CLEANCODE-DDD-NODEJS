import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { makeQuestion } from "test/factories/make-question"
import { Slug } from "../../enterprise/value-objects/slug"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question By Slug", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it("Should be able to get a question by slug", async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create("exampled-question")
        })
        await inMemoryQuestionsRepository.create(newQuestion)
        const result = await sut.execute({
            slug:"exampled-question"
        })
        expect(result.value).toBeTruthy()
    })
})
