declare module 'react-gauge-chart' {
  import { Component } from 'react';

  interface GaugeChartProps {
    id: string;
    nrOfLevels?: number;
    arcsLength?: number[];
    colors?: string[];
    percent?: number;
    arcPadding?: number;
    needleColor?: string;
    textColor?: string;
    style?: React.CSSProperties;
    animate?: boolean;
    formatTextValue?: (value: number) => string;
  }

  export default class GaugeChart extends Component<GaugeChartProps> {}
} 