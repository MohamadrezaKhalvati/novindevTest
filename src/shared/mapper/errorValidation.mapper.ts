import { ValidationError } from 'class-validator'
import { ValidationErrorConstraint } from '../types/error-validation-constrain.type'
import { ValidationErrorFormat } from '../types/error-validation-format.type'

export class Validation {
    static formatErrorData(data: ValidationError[]): ValidationErrorFormat {
        const formattedData: ValidationErrorFormat = {}

        for (const item of data) {
            if (item?.children?.length) {
                formattedData[item.property] = item.children.map(child => {
                    return child.children.map(nestedChild => ({
                        [nestedChild.property]: Object.values(
                            nestedChild.constraints as ValidationErrorConstraint,
                        )[0],
                    }))
                })
            } else {
                formattedData[item.property] = Object.values(
                    item.constraints as ValidationErrorConstraint,
                )[0]
            }
        }

        return formattedData
    }
}
