import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from './auth';

@Injectable({ providedIn: 'root' }) export class AuthService {
  private _user: User | null = null;
  public onUserChanged = new Subject<User | null>();

  public async verifyToken(): Promise<User | null> {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      const res = await fetch(`/api/verify_token?token=${token}`);
      const body = await res.json() as {status: 'valid' | 'invalid'};
      if (body.status === 'valid') {
        const user = JSON.parse(atob(token.split('.')[1])) as User;
        this._user = user;
        this.onUserChanged.next(user);
        return user;
      }
    }

    this._user = null;
    this.onUserChanged.next(null);
    return null;
  }

  public get user(): User | null {
    if (this._user === null) return null;
    return {...this._user};
  }
}
