import { Injectable } from "@angular/core";
import { API } from "api";

@Injectable({ providedIn: 'root' }) export class APIService {
  public async addShoppingLocation(loc: API.NewShoppingLocationRequest, pending: boolean): Promise<{status: 'success' | 'error'}> {
    if (!pending) {
      const token = localStorage.getItem('access_token');
      if (token === null) {
        const err = new Error();
        err.name = "ENOTOKEN";
        err.message = `No access token exists in local storage!`;
        throw err;
      }

      const res = await fetch('/api/locations/shopping', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(loc)
      });

      return await res.json();
    }

    const res = await fetch('/api/contribute/locations/shopping', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(loc)
    });

    return await res.json();
  }

  public async addFoodLocation(loc: API.NewFoodLocationRequest, pending: boolean): Promise<{status: 'success' | 'error'}> {
    if (!pending) {
      const token = localStorage.getItem('access_token');
      if (token === null) {
        const err = new Error();
        err.name = "ENOTOKEN";
        err.message = `No access token exists in local storage!`;
        throw err;
      }

      const res = await fetch('/api/locations/food', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(loc)
      });

      return await res.json();
    }

    const res = await fetch('/api/contribute/locations/food', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(loc)
    });

    return await res.json();
  }

  public async addFishingLocation(loc: API.NewFishingLocationRequest, pending: boolean): Promise<{status: 'success' | 'error'}> {
    if (!pending) {
      const token = localStorage.getItem('access_token');
      if (token === null) {
        const err = new Error();
        err.name = "ENOTOKEN";
        err.message = `No access token exists in local storage!`;
        throw err;
      }

      const res = await fetch('/api/locations/fishing', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(loc)
      });

      return await res.json();
    }

    const res = await fetch('/api/contribute/locations/fishing', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(loc)
    });

    return await res.json();
  }
}
