
import { Tooltip, PieChart as _PieChart } from 'recharts';
import ResponsiveContainer, { ChartContainerProps } from './responsiveContainer';

const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];

export default function PieChart({ children, ...rest }: ChartContainerProps) {
  return (
    <ResponsiveContainer {...rest}>
      {
        (width, height) =>
          <_PieChart height={height} width={width}>
            {children(width, height)}
            <Tooltip />
          </_PieChart>
      }
    </ResponsiveContainer>
  )
}