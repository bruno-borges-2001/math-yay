import { useResizeDetector } from 'react-resize-detector';

import { PieChart as _PieChart } from 'recharts';


interface PieChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (width: number, height: number) => React.ReactNode
}
export default function PieChart({ children, ...rest }: PieChartProps) {

  const { width, height, ref } = useResizeDetector();

  return (
    <div ref={ref} {...rest}>
      <_PieChart height={height} width={width}>
        {children(width ?? 0, height ?? 0)}
      </_PieChart>
    </div>
  )
}