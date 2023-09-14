
import { Tooltip, BarChart as _BarChart } from 'recharts';
import ResponsiveContainer, { ChartContainerProps } from './responsiveContainer';

interface BarChartProps extends ChartContainerProps {
  data: any[]
}

export default function BarChart({ children, data, ...rest }: BarChartProps) {
  return (
    <ResponsiveContainer {...rest}>
      {
        (width, height) =>
          <_BarChart data={data} width={width} height={height}>
            {children(width ?? 0, height ?? 0)}
            <Tooltip />
          </_BarChart>
      }
    </ResponsiveContainer>
  )
}