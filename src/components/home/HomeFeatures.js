import {
  CloudArrowUpIcon,
  LockClosedIcon,
  DocumentArrowDownIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Easy Invoice Creation",
    description:
      "Create professional invoices in seconds with a simple, intuitive interface. No design skills required.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Automatic Tax Calculations",
    description:
      "Let the app handle tax calculations for you, including VAT, GST, or custom rates, to ensure accuracy.",
    icon: CalculatorIcon,
  },
  {
    name: "Download & Share as PDF",
    description:
      "Easily download invoices as PDF files or share them directly with your clients via email.",
    icon: DocumentArrowDownIcon,
  },
  {
    name: "Secure Data Storage",
    description:
      "Your invoice data is securely stored and protected with industry-standard encryption.",
    icon: LockClosedIcon,
  },
];

export default function HomeFeatures() {
  return (
    <div
      className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8"
      id="features"
    >
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/7 font-semibold text-blue-600">Bill faster</h2>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
          Everything you need to create your invoice
        </p>
        <p className="mt-6 text-pretty text-lg/8 text-gray-600">
          Our free invoice generator app simplifies the billing process,
          allowing you to create, manage, and send invoices with ease.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base/7 font-semibold text-gray-900">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-blue-600">
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base/7 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
