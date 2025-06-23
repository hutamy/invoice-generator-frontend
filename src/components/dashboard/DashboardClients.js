import Card from "../ui/ClientCard";

const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "SavvyCal",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Reform",
    imageUrl: "https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

export default function Clients() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Recent clients
          </h2>
          <a
            href="#"
            className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            View all<span className="sr-only">, clients</span>
          </a>
        </div>
        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {clients.map((client) => (
            <Card key={client.id} client={client} />
          ))}
        </ul>
      </div>
    </div>
  );
}
