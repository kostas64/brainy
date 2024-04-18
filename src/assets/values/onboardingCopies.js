/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

import images from '../images/images';
import dict from '../values/dict.json';
import GamesSlider from '../../components/onboarding/GamesSlider';
import OnboardingSearch from '../../components/onboarding/OnboardingSearch';

const copies = [
  {
    title: dict.onboardingTitle1,
    paragraph: dict.onboardingSubtitle1,
    component: <GamesSlider />,
  },
  {
    title: dict.onboardingTitle2,
    paragraph: dict.onboardingSubtitle2,
    component: <OnboardingSearch />,
  },
  {
    title: dict.onboardingTitle3,
    paragraph: dict.onboardingSubtitle3,
    component: (
      <Image source={images.rankRes} style={{width: 280, height: 170}} />
    ),
  },
];

export default copies;
