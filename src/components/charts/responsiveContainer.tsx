import { useResizeDetector } from "react-resize-detector";

export interface ChartContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (width: number, height: number) => React.ReactNode
}

export default function ResponsiveContainer({ children, ...rest }: ChartContainerProps) {
  const { width = 0, height = 0, ref } = useResizeDetector();

  return (
    <div ref={ref} {...rest}>
      {children(width, height)}
    </div>
  )
}