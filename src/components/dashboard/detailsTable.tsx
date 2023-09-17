import { getOperationName } from "@/lib/dashboard/utils";
import { StatisticByOperation } from "@/types/statistics";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface DetailsTable {
  data?: StatisticByOperation[]
}

export default function DetailsTable({ data }: DetailsTable) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead >Operation</TableHead>
          <TableHead className="text-center">Correct</TableHead>
          <TableHead className="text-center">Incorrect</TableHead>
          <TableHead className="text-center">Skipped</TableHead>
          <TableHead className="text-center">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el, index) => <TableRow key={index} className="font-bold">
          <TableCell className="font-medium">{getOperationName(el.operation)}</TableCell>
          <TableCell className="text-center text-[#2ecc71]">{el.correctQuestions}</TableCell>
          <TableCell className="text-center text-[#e74c3c]">{el.incorrectQuestions}</TableCell>
          <TableCell className="text-center text-[#95a5a6]">{el.skippedQuestions}</TableCell>
          <TableCell className="text-center">{Number(el.correctQuestions) + Number(el.incorrectQuestions) + Number(el.skippedQuestions)}</TableCell>
        </TableRow>)}
      </TableBody>
    </Table>

  )
}