import { ValidationError } from 'class-validator';

type ValidationErrorConstraint = {
  [key: string]: string;
};

type ValidationErrorFormat = {
  [key: string]: string | Array<Array<{ [key: string]: string }>>;
};

export class Validation {
  static formatErrorData(data: ValidationError[]): ValidationErrorFormat {
    const formattedData: ValidationErrorFormat = {};

    for (const item of data) {
      if (item?.children?.length) {
        formattedData[item.property] = item.children.map((child) => {
          return child.children.map((nestedChild) => ({
            [nestedChild.property]: Object.values(
              nestedChild.constraints as ValidationErrorConstraint,
            )[0],
          }));
        });
      } else {
        formattedData[item.property] = Object.values(
          item.constraints as ValidationErrorConstraint,
        )[0];
      }
    }

    return formattedData;
  }
}
