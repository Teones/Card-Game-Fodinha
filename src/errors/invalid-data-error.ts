import { ApplicationError } from "@/protocols";

export function invalidDataError(detais: string[]): ApplicationInvalidateDataError {
  return {
    name: 'InvalidDataError',
    message: 'Invalid Data',
    detais,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  detais: string[];
};