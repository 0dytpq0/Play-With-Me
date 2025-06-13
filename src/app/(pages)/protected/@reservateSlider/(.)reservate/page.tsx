import React, { useState } from 'react';
import SliderBackground from '@/shared/ui/sliderBackground';
import Reservate from '@/features/reservate/ui/reservate';

export default function ReservateSlider() {
  return (
    <SliderBackground>
      <Reservate />
    </SliderBackground>
  );
}
