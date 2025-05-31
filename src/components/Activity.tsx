import clsx from "clsx";
import React, { useState } from "react";

import { Code2Icon, GlobeIcon, Gamepad2Icon, CloudCog } from "lucide-react"; // Adjust imports as necessary
import Globe from "@/components/Globe";

// Icon mapping
const iconMapping: { [key: string]: React.ElementType } = {
  code: Code2Icon,
  globe: GlobeIcon,
  gamepad: Gamepad2Icon,
  cloud: CloudCog,
};

// Preview mapping
const previewMapping: { [key: string]: React.ElementType } = {
  globe: Globe, // Use actual component for preview, adjust as needed
  // Add more mappings if necessary
};

interface Tab {
  heading: string;
  content: string;
  Icon?: string;
  img?: string;
  Preview?: string;
  fill?: boolean;
}
// Define TypeScript interface for props
interface Props {
  title: any;
  tabs: Tab[];
}
function Activity({ title, tabs }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  function handleSwitchIndex(k: number) {
    setCurrentIndex(k);
  }
  return (
    <div className="w-full px-0 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
              <span dangerouslySetInnerHTML={{ __html: title as string }} />
            </h2>
            <nav
              className="grid gap-4 mt-5 md:mt-10"
              aria-label="Tabs"
              role="tablist"
            >
              {tabs.map((tab, index) => {
                const Icon = iconMapping[tab.Icon!];
                return (
                  <button
                    type="button"
                    className={clsx(
                      "hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl",
                      {
                        active: index === currentIndex,
                      }
                    )}
                    onClick={() => handleSwitchIndex(index)}
                    key={index}
                    id={`tabs-with-card-item-${index}`}
                    data-hs-tab={`#tabs-with-card-${index}`}
                    aria-controls={`tabs-with-card-${index}`}
                    role="tab"
                  >
                    <span className="flex">
                      {Icon && (
                        <Icon className="flex-shrink-0 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-secondary text-gray-800 " />
                      )}

                      <span className="grow ml-6">
                        <span className="block text-lg font-semibold hs-tab-active:text-secondary text-gray-800 ">
                          {tab.heading}
                        </span>
                        <span className="block mt-1 text-gray-800 ">
                          {tab.content}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-6 sticky top-32">
            <div className="relative  w-full h-[300px] lg:h-[430px]">
              <div className="shadow-xl shadow-gray-200 rounded-xl bg-white w-full h-full overflow-hidden">
                {tabs.map((t, index) => {
                  const Preview = previewMapping[t.Preview!];
                  return (
                    <div
                      key={index}
                      id={`tabs-with-card-${index}`}
                      role="tabpanel"
                      className={clsx(
                        "flex items-center justify-center w-full h-full relative",
                        {
                          hidden: index !== currentIndex,
                        }
                      )}
                      aria-labelledby={`tabs-with-card-item-${index}`}
                    >
                      {Preview && <Preview />}
                      {t.img && (
                        <img
                          className={clsx("object-cover", {
                            "w-full h-full": t.fill,
                          })}
                          src={t.img}
                          alt={`Image Feature ${index}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="hidden absolute -top-14 right-0 translate-x-20 md:block lg:translate-x-20">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full  rounded-xl max-sm:h-[90%] lg:h-full "></div>
        </div>
      </div>
    </div>
  );
}
export default Activity;
