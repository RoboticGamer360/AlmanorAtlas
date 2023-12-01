import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class DrawerService {
  #isOpen = false;
  onDrawerStateChanged = new Subject<boolean>();
  entries = [
    {
      icon: 'home',
      label: 'Home',
      link: '/'
    }
  ];
  
  get isOpen(): boolean {
    return this.#isOpen;
  }
  
  close = (): void => {
    this.#isOpen = false;
    this.onDrawerStateChanged.next(false);
  }

  open = (): void => {
    this.#isOpen = true;
    this.onDrawerStateChanged.next(true);
  }
  
  toggle = (): void => {
    this.#isOpen = !this.#isOpen;
    this.onDrawerStateChanged.next(this.#isOpen);
  }
}