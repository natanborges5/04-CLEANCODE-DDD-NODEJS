import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { Slug } from "@/domain/forum/enterprise/value-objects/slug";
import {faker} from "@faker-js/faker"
export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID){
    const answer = Answer.create({
        questionId: new UniqueEntityID(),
        authorId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override
    }, id)
    return answer;
}