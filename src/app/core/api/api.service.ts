import { Injectable } from "@angular/core";
import { API } from "api";

@Injectable({ providedIn: 'root' }) export class APIService {
  public async addShoppingLocation(loc: API.NewShoppingLocationRequest): Promise<{status: 'success' | 'error'}> {
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

  public async addFoodLocation(loc: API.NewFoodLocationRequest): Promise<{status: 'success' | 'error'}> {
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

  public async addFishingLocation(loc: API.NewFishingLocationRequest): Promise<{status: 'success' | 'error'}> {
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
}
