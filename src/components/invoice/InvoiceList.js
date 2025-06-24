import Pill from "@/components/ui/Pill";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/20/solid";

const statusMapper = {
  paid: "bg-green-50 ring-green-700/10 text-green-700",
  open: "bg-indigo-50 ring-indigo-700/10 text-indigo-700",
  draft: "bg-blue-50 ring-blue-700/10 text-blue-700",
  "past due": "bg-red-50 ring-red-600/10 text-red-700",
};

export default function InvoiceList({ invoices }) {
  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Number
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Client
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Issue Date
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {invoices.map((invoice) => (
              <tr key={invoice.number}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 text-sm text-gray-500">
                  {invoice.number}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.client.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.client.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.amount}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Pill
                    label={invoice.status}
                    className={statusMapper[invoice.status]}
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.issued_date}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.due_date}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                  <span className="flex items-center gap-3">
                    <ArrowDownTrayIcon className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700" />
                    <span className="text-gray-300">|</span>
                    <PencilSquareIcon className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700" />
                    <span className="text-gray-300">|</span>
                    <TrashIcon className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
