import { ApplicationError } from "@/protocols";

export function invalidDataError(detais: string[]): ApplicationInvalidateDataError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Invalid Data',
    detais,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  detais: string[];
};