import {Private, Public} from './yiguana'

export const dataSources = (a,b,c) => {
  return {
    public: new Public(),
    private: new Private()
  }
}