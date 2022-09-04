import React from 'react';
import {Image, Box} from 'native-base';
import CarSVG from '~/assets/car.svg';
import StudySVG from '~/assets/study.svg';
import HospitalSVG from '~/assets/hospital.svg';
import HouseSVG from '~/assets/house.svg';
import SavingSVG from '~/assets/saving.svg';
import VacancesSVG from '~/assets/vacances.svg';
export default function RenderImage(props: any) {
  switch (props.type) {
    case 'life_insurance':
      return <HospitalSVG width={props.width} height={props.height} />;

    case 'student':
      return <StudySVG width={props.width} height={props.height} />;

    case 'personal_pension':
      return <SavingSVG width={props.width} height={props.height} />;
    case 'endowment':
      return <VacancesSVG width={props.width} height={props.height} />;
    case 'automobile_insurance':
      return <CarSVG width={props.width} height={props.height} />;
    case 'fire_insurance':
      return <HouseSVG width={props.width} height={props.height} />;
    case 'other':
      return <HospitalSVG width={props.width} height={props.height} />;
    default:
      return <Box></Box>;
  }
}
