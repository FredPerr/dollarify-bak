import { v4 as uuidv4 } from 'uuid';

export class IDFactory {
  private static LAST_ID = 0;

  static uuid(): string {
    return uuidv4();
  }

  static id(): number {
    return this.LAST_ID++;
  }
}

export function isUUID(uuid: string): boolean {
  return (
    uuid.match(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    ) != null
  );
}
