
import { PolarGrid, Tooltip, RadarChart as _RadarChart } from 'recharts';
import ResponsiveContainer, { ChartContainerProps } from './responsiveContainer';

interface BarChartProps extends ChartContainerProps {
  data: any[]
}

export default function RadarChart({ children, data, ...rest }: BarChartProps) {
  return (
    <ResponsiveContainer {...rest}>
      {
        (width, height) =>
          <_RadarChart data={data} width={width} height={height}>
            {children(width, height)}
            <Tooltip formatter={(value: number) => (value * 100).toFixed(2) + '%'} />
            <PolarGrid />
          </_RadarChart>
      }
    </ResponsiveContainer>
  )
}