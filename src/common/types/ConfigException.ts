import { ApplicationException } from './ApplicationException';

export class ConfigException extends ApplicationException {
  constructor(message?: string) {
    super(message);
  }
}
