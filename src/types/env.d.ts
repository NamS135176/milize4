declare module 'react-native-dotenv' {
  export const ENV: 'dev' | 'develop' | 'prod' | 'production';
  export const CODE_PUSH: string;
  export const ANDROID_CODE_PUSH_KEY: string;
  export const IOS_CODE_PUSH_KEY: string;
  export const API_HOST: string;
}

type IEnv = {
  CodePushKey: string | undefined;
};
