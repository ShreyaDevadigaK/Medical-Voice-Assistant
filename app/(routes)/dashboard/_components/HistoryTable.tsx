import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import moment from "moment";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import ViewReportDialog from "./ViewReportDialog";
import DownloadReportButton from "./DownloadReportButton";

type Props = {
  historyList: SessionDetail[];
  viewType: 'consultations' | 'reports';
};

function HistoryTable({ historyList, viewType }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableCaption className="pb-4">
          {viewType === 'consultations' ? 'Your recent medical consultations' : 'Available medical reports for download'}
        </TableCaption>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="font-semibold">AI Specialist</TableHead>
            <TableHead className="font-semibold border-x">
              {viewType === 'consultations' ? 'Symptoms / Notes' : 'Chief Complaint'}
            </TableHead>
            <TableHead className="font-semibold whitespace-nowrap">Date</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.map((record: SessionDetail, index: number) => (
            <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium text-blue-700">
                {record.selectedDoctor?.specialist || 'General Assistant'}
              </TableCell>
              <TableCell className="max-w-md truncate border-x text-gray-600">
                {viewType === 'consultations' 
                  ? record.notes 
                  : (record.report as any)?.chiefComplaint || 'Consultation Summary'}
              </TableCell>
              <TableCell className="text-gray-500 whitespace-nowrap">
                {moment(new Date(record.createdOn)).fromNow()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                   <ViewReportDialog record={record}/>
                   {viewType === 'reports' && (
                     <DownloadReportButton record={record} />
                   )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
