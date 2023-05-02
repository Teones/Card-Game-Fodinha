import { ApplicationError } from '@/protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'duplicatedEmailError',
    message: 'There is already an user with given email'
  }
}