import { useResizeDetector } from "react-resize-detector";

import { ResponsiveContainer as ResponsiveChartContainer } from 'recharts';

export interface ChartContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (width: number, height: number) => React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export default function ResponsiveContainer({ children, ...rest }: ChartContainerProps) {
  const { width = 0, height = 0, ref } = useResizeDetector();

  return (
    <div ref={ref} {...rest}>
      <ResponsiveChartContainer height={height} width={width}>
        {children(width, height)}
      </ResponsiveChartContainer>
    </div>
  )
}