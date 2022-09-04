interface IAllState {
  user: IUserInfoState;
  company: ICompanyState;
  policy: IPolicyState;
  notice: INoticeState;
  share: IShareReceiveState;
}

interface IUserInfoState {
  loading: boolean;
  userInfo: IUserInfoData;
  error: string;
}

interface IUserInfoData {
  activated: boolean;
  birth: string;
  email: string;
  id: number;
  name: string;
}

interface IActionToken {
  type: string;
  payload: IPayloadToken;
}

interface IPayloadToken {
  access_token: string;
}

interface ITokenData {
  access_token: string;
  id_token: string;
  refresh_token: string;
}

interface IActionGetCompany {
  type: string;
}

interface ICompanyInfo {
  created_at: string;
  display_name: string;
  id: number;
  search_name1: string;
  search_name2: string;
  search_name3: string;
  updated_at: string;
}

interface ICompanyState {
  loading: boolean;
  companyList: Array<ICompanyInfo>;
  error: string;
}

interface IActionGetPolicy {
  type: string;
  payload:{
    oldList: Array<IPolicyInfo>
  };
  sort: string;
}

interface IPolicyInfo {
  company: string;
  contractor: string;
  created_at: string;
  display_type: string;
  display_type_ja: string;
  id: number;
  insufficient: boolean;
  insurance_name: string;
  insurance_period_age: number;
  insurance_period_whole_life: boolean;
  insurance_type: string;
  insured: string;
  is_adding: boolean;
  is_mine: boolean;
  payee: string;
  policy_number: string;
  premium: string;
  premium_payment_age: number;
  premium_payment_method: string;
  premium_payment_method_ja: string;
  premium_payment_whole_life: boolean;
  premium_unit: string;
  status: string;
  status_ja: string;
  updated_at: string;
  user_id: number;
}

interface IPolicyResData {
  annual_premium_sum: string;
  annual_premium_sum_unit: string;
  insurance_policies: Array<IPolicyInfo>;
}

interface IPolicyState {
  loading: boolean;
  policiesData: IPolicyResData;
  isShowModal: boolean;
  error: string;
}

interface INoticeInfo {
  content: string;
  created_at: string;
  id: number;
  is_read: boolean;
  notice_kind: number;
  title: string;
  webview_url: string;
}

interface INoticeState {
  loading: boolean;
  listNotices: Array<INoticeInfo>;
  error: string;
}

interface IActionGetShare{
  type: string
}

interface IShareReceiveInfo{
  id: 1017,
  insurance_policy_id: number,
  share_key: string,
  shared_email: string,
  shared_image_path: string,
  sharee_email: string,
  sharee_id: number,
  status: string
}

interface IShareReceiveState {
  loading:boolean,
  listReceive: Array<IShareReceiveInfo>,
  isShow:boolean,
  error:string
}