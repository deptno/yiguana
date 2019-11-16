import {Private, Public} from './yiguana'

export const dataSources = () => {
  return {
    public: new Public(),
    private: new Private()
  }
}