import React, { useState } from "react";
import { Opportunity } from "../../interfaces/interfaces";
import Loading from "../Loading/Loading";
import { apply_to_opportunity } from "../../lib/apis/applications/Applications";
import BtnLoading from "../Loading/BtnLoading";

const Card = ({
  title,
  description,
  id,
  skills,
  created_at,
  images,
}: Opportunity) => {
  const card_images = images.split(",");
  const card_skills = skills.split(",");

  const [btnText, setBtnText] = useState("Apply");
  const [btnLoading, setBtnLoading] = useState(false);

  const handle_apply = async (id: string) => {
    setBtnLoading(true);
    await apply_to_opportunity(id);
    setBtnLoading(false);
    setBtnText("Applied!");
  };

  return (
    <div className="shadow-2xl flex flex-col justify-between md:w-[400px]">
      {/* Image */}
      <a href="#">
        <img
          className="rounded-t-lg w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
          src={card_images[0]}
          alt="volunteeryatraa_img"
        />
      </a>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <a href="#">
          <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            {`${title.slice(0, 25)} ${title.length > 25 ? "..." : ""}`}
          </h5>
        </a>
        <p className="mb-3 text-sm sm:text-base font-normal text-left text-gray-700">
          {`${description.slice(0, 80)} ${
            description.length > 80 ? "..." : ""
          }`}
        </p>

        {/* Skills */}
        <div className="skills flex flex-wrap gap-2 mb-4">
          {card_skills
            .map((skill, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-sm"
              >
                {skill}
              </span>
            ))
            .slice(0, 3)}
        </div>

        {/* Button */}
        <button
          onClick={() => handle_apply(id)}
          className={`inline-flex justify-center items-center px-3 py-2 text-xs sm:text-sm font-medium text-center text-white ${
            btnText.toLocaleLowerCase() === "applied!"
              ? "bg-green-700"
              : "bg-blue-700"
          } rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full load`}
        >
          {btnLoading ? (
            <div>
              <BtnLoading />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span>{btnText}</span>
              {btnText.toLocaleLowerCase() !== "applied!" && (
                <svg
                  className="rtl:rotate-180 w-3 h-3 sm:w-3.5 sm:h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
