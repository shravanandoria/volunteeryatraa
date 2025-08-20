"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { create_opportunity } from "../../../lib/apis/opportunities/Opportunity";
import { useRouter } from "next/navigation";

const CreateOpportunity = () => {
  const router = useRouter();

  interface Form {
    title: string;
    description: string;
    skills: string;
    images: string;
  }

  const [data, setData] = useState<Form>({
    title: "",
    description: "",
    skills: "",
    images: "",
  });

  const [skills, setSkills] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);
  const [skillInput, setSkillInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>("");

  const handle_addSkill = () => {
    if (skillInput.trim() == "") return;
    const updatedSkill = [...skills];
    updatedSkill.push(skillInput.trim());
    setSkills(updatedSkill);
    setSkillInput("");
  };

  const handle_removeSkill = (val: string) => {
    setSkills((prev) =>
      prev.filter((skill) => skill.toLowerCase() !== val.toLowerCase())
    );
  };

  const handle_imageInput = () => {
    if (imageInput.trim() == "") return;
    const updatedImages = [...images];
    updatedImages.push(imageInput);
    setImages(updatedImages);
    setImageInput("");
  };

  const handle_change = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handle_submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formedData = {
      title: data.title,
      description: data.description,
      skills: skills.join(","),
      images: images.join(","),
    };

    const result = await create_opportunity(formedData);
    router.back();
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form onSubmit={handle_submit}>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handle_change}
                placeholder="Enter a title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <textarea
                name="description"
                onChange={handle_change}
                id="description"
                placeholder="Enter a description"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="skills"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Skills Required
              </label>
              <div className="flex gap-3">
                <input
                  type="skills"
                  name="skills"
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Enter skills required for this job"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <button
                  type="button"
                  onClick={handle_addSkill}
                  className="hover:shadow-form  rounded-md bg-[#6A64F1] text-center text-base px-6 font-semibold text-white outline-none"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-start  gap-4 mt-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex gap-4 justify-center  items-center align-middle px-2 py-1 text-center min-w-[50px] rounded-lg text-white bg-blue-400"
                  >
                    {skill}
                    <svg
                      className="w-6 h-6 hover:cursor-pointer"
                      onClick={() => handle_removeSkill(skill)}
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="skills"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Add Images
              </label>
              <div className="flex gap-3">
                <input
                  type="images"
                  name="images"
                  id="images"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Enter skills required for this job"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handle_imageInput()}
                  className="hover:shadow-form  rounded-md bg-[#6A64F1] text-center text-base px-6 font-semibold text-white outline-none"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-start  gap-4 mt-3">
                {images.map((image, index) => (
                  <span
                    key={index}
                    className="rounded-lg text-white shadow-2xl w-[200px] h-[200px] relative"
                  >
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full rounded-lg"
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Create Opportunity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOpportunity;
