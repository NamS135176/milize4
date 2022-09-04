type MainStackParamList = {
  Home: undefined;
  ConfirmRecoverPassword: {
    email: string;
  };
  ResetPassword: {
    verifyCode: string;
    email: string;
  };
  Camera: {c: any; id?: any, listImg:Array<string>};
  CompleteResetPass: {};
  ChangePass: {};
  CompleteSignUp: {email: string; password: string};
  ConfirmSignUp: {
    data: ITokenData;
    email: string;
    password: string;
  };
  Insurance: {};
  Login: {};
  IntroSlider: {};
  Selection: {};
  Main: {};
  RecoverPassword: {};
  Profile: {};
  SignUp: {};
  WebView: {
    item: {
      title: string;
      link: string;
    };
  };
  IntroCamera: {};
  PostPolicy: {imgList: Array<string>; c: any; d: any};
  CompletePostPolicy: {};
  Notices: {};
  NoticeDetail: {
    notice: INoticeInfo;
  };
  DetailPolicy: {};
  Share: {
    id: number;
  };
  TotalPolicy: {};
  ChangeEmail: {};
  ConfirmChangeMail: {};
  CompletePostInquiries: {};
};
