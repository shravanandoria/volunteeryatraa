import axios, { AxiosError } from "axios";

export const get_opportunities = async () => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`
    );
    const result = await resp.data;
    return { success: true, data: result, error: undefined };
  } catch (error: any) {
    return { success: false, data: undefined, error: error.response.data };
  }
};

export const query_opportunities = async (query: string) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities?search=${query}`
    );

    const result = await resp.data;
    return { success: true, data: result, error: undefined };
  } catch (error: any) {
    return { success: true, data: undefined, error: error };
  }
};

export const create_opportunity = async (data: any) => {
  const { title, description, skills, images } = data;

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`,
      {
        title: title,
        description: description,
        skills: skills,
        images: images,
      }
    );
    const result = await resp.data;
    return { success: true, data: result, error: undefined };
  } catch (error: any) {
    return { success: false, data: undefined, error: error.response.data };
  }
};
