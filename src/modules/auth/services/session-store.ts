import { Session } from '../entities/session';

class SessionStore {

  private sessions: Session[] = [];
  constructor() {}

  public addSession(session: Session): void {
    if (!!session) this.sessions.push(session);
  }

  public removeSession(sessionId: string): void {
    this.sessions = this.sessions.filter(session => session.sessionId === sessionId);
  }

  public getSession(sessionId: string): Session | null {
    const session = this.sessions.find((s: Session) => s.sessionId === sessionId);
    return !!session ? session : null;
  }

  public getSessions(): any {
    return this.sessions;
  }
}

export default new SessionStore();
