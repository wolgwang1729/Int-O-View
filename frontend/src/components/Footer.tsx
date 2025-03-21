export default function Footer() {
  return (
    <section className="relative py-10 overflow-hidden border-t">
      <div className="relative z-10 max-w-5xl px-4 mx-auto">
        <div className="flex flex-wrap -m-6">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="inline-flex items-center mb-4">
                <img
                  src="finalLogo.jpg"
                  alt="hrll"
                  className="w-52 aspect-auto"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved by Int-O-View.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-px mb-9">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Features
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Our Vision
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-px mb-9">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Account
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Help
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Customer Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-px mb-9">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    href="#"
                  >
                    Licensing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
