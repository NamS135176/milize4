import React from 'react';
import ApplyReviewSVG from '~/assets/images/messages/applyReview.svg';
import ApplyReviewWarningSVG from '~/assets/images/messages/applyReviewWarning.svg';
import CommonSVG from '~/assets/images/messages/common.svg';
import DateCompleteSVG from '~/assets/images/messages/dateComplete.svg';
import ErrorSVG from '~/assets/images/messages/error.svg';
import RegisterSVG from '~/assets/images/messages/registered.svg';
import ReviewResultSVG from '~/assets/images/messages/reviewResult.svg';
import SendRequestSVG from '~/assets/images/messages/sendRequest.svg';
import SendRequsetWarningSVG from '~/assets/images/messages/sendRequestWarning.svg';
import SharingSVG from '~/assets/images/messages/sharing.svg';

export default function NoticeImage(Props) {
  switch (Props.noticeKind) {
    case 0:
      return <ApplyReviewSVG/>;
      break;
    case 1:
      return <ApplyReviewWarningSVG/>;
      break;
    case 2:
      return <CommonSVG/>;
      break;
    case 3:
      return <RegisterSVG/>;
      break;
    case 4:
      return <RegisterSVG/>;
      break;
    case 5:
      return <DateCompleteSVG/>;
      break;
    case 6:
      return <ReviewResultSVG/>;
      break;
    case 7:
      return <SendRequestSVG/>;
      break;
    case 8:
      return <SendRequsetWarningSVG/>;
      break;
    case 9:
      return <SharingSVG/>;
      break;
      case 10:
        return <SharingSVG/>;
        break;
    default:
      return <ApplyReviewSVG/>;
      break;
  }
}
