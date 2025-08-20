import axios from "axios";

export const apply_to_opportunity = async (opportunity_id: string) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applications`,
      {
        opportunity_id,
      }
    );

    const result = await resp.data;
    return result;
  } catch (error) {
    return error;
  }
};
