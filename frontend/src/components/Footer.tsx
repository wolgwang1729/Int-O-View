import logo1 from '/logo1.jpg'


export default function Footer() {
  return (
    <section className="relative overflow-hidden border-t py-10">
    <div className="relative z-10 mx-auto max-w-5xl px-4">
      <div className="-m-6 flex flex-wrap">
        <div className="w-full p-6 md:w-1/2 lg:w-5/12">
          <div className="flex h-full flex-col justify-between">
            <div className="mb-4 inline-flex items-center">
              <img src={logo1} alt="hrll" className='w-44 aspect-auto'/>
            </div>
            <div>
              <p className="mb-4  text-base font-medium">DRDO's Interview Platform</p>
              <p className="text-sm text-gray-600">
                &copy; Copyright 2024. All Rights Reserved by Int-O-View.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
          <div className="h-full">
            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
              Company
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  href="#"
                >
                  Features
                </a>
              </li>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
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
            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
              Support
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  href="#"
                >
                  Account
                </a>
              </li>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  href="#"
                >
                  Help
                </a>
              </li>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
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
            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
              Legals
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  href="#"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li className="mb-4">
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
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
  )
}
