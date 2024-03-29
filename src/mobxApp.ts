// state
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

/** # Main */
export class AppStore {
  // ctor
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  isAnimate = false;
  animateState = ""

  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setIsAnimate(input: boolean) {
    this.isAnimate = input;
  }
  setAnimateState(input: string | "success" | "pending") {
    this.animateState = input;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}

// context
export const AppContext = createContext<AppStore>(new AppStore());

// hook
export const useAppContext: (callerFxn: (stores: AppStore) => {}) => any = (
  callerFxn: (stores: AppStore) => any
) => {
  const context = useContext(AppContext) as AppStore;

  return callerFxn(context);
};
