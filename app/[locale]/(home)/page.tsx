// app/(home)/page.tsx

"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function HomePage() {
  const el = useRef(null);

  // useEffect를 사용하여 타이핑 애니메이션을 추가해 준다.
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [t("Exchanges and Cooperation"), t("Friendship"), t("Overseas Business")],
      typeSpeed: 100,
    });

    return () => {
      // destroy를 사용하여 컴포넌트가 언마운트 될 때 타이핑 애니메이션을 제거해 준다.
      typed.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = useTranslations("Home");

  // clog.info("Current translations: ", t("Home.See More"));
  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-xl leading-snug text-gray-800 dark:text-gray-200 md:text-2xl">
            <span className="font-semibold">{t("Our Group")}</span>
            {t("Welcome Message")}
            <span className="font-semibold underline decoration-primary">
              {" - "}
              <span ref={el} />
            </span>
          </h1>{" "}
          <p className="mt-4 text-base text-gray-500 dark:text-gray-300">{t("Guide Message")}</p>{" "}
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
            <form
              action="https://www.creative-tim.com/twcomponents/search"
              className="flex flex-wrap justify-between md:flex-row">
              <input
                type="search"
                name="query"
                placeholder="Search Components"
                required={true}
                className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />

              <button
                type="submit"
                className="flex items-center dark:bg-gray-800 justify-center w-full p-2 m-1 text-white transition-colors duration-300 transform rounded-lg lg:w-12 lg:h-12 lg:p-0 bg-primary hover:bg-primary/70 focus:outline-none focus:bg-primary/70"></button>
            </form>
          </div>
        </div>{" "}
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="tailwind css components"
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="text-gray-600 dark:text-gray-50 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2 className="text-4xl pb-8 mb-4 font-bold  text-center">About Our Services</h2>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-200 dark:bg-gray-900 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative shadow-lg">
                <h2 className="tracking-widest text-xs title-font font-medium  mb-1">WEB DEVELOPMENT</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Full-Stack Solutions
                </h1>
                <p className="leading-relaxed mb-3 text-gray-700 dark:text-gray-50  ">
                  Building robust, scalable, and responsive web applications using modern tech stacks like React,
                  Node.js, and more.
                </p>
                <a className=" inline-flex items-center hover:text-indigo-700">Learn More</a>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 dark:text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    2.4K Views
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 inline-flex items-center leading-none text-sm">
                    32 Comments
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-200 dark:bg-gray-900 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative shadow-lg">
                <h2 className="tracking-widest text-xs title-font font-medium  mb-1">MOBILE DEVELOPMENT</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Cross-Platform Apps
                </h1>
                <p className="leading-relaxed mb-3 text-gray-700 dark:text-gray-400">
                  Crafting seamless mobile experiences for both Android and iOS using frameworks like React Native and
                  Flutter.
                </p>
                <a className=" inline-flex items-center hover:text-indigo-700">Learn More</a>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 dark:text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    1.8K Views
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 inline-flex items-center leading-none text-sm">
                    18 Comments
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-200 dark:bg-gray-900 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative shadow-lg">
                <h2 className="tracking-widest text-xs title-font font-medium  mb-1">CLOUD SOLUTIONS</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Scalable Infrastructure
                </h1>
                <p className="leading-relaxed mb-3 text-gray-700 dark:text-gray-400">
                  Implementing and managing cloud environments with AWS, Azure, and GCP to ensure your applications
                  scale effortlessly.
                </p>
                <a className=" inline-flex items-center hover:text-indigo-700">Learn More</a>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 dark:text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    3.1K Views
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 inline-flex items-center leading-none text-sm">
                    24 Comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
