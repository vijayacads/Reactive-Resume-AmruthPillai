import type { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchResumes = async () => {
  try {
    const response = await axios.get<ResumeDto[], AxiosResponse<ResumeDto[]>>("/resume");
    return response.data;
  } catch (error) {
    // For guest users, return empty array instead of throwing error
    return [];
  }
};

export const useResumes = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: RESUMES_KEY,
    queryFn: fetchResumes,
    retry: false,
  });

  return { resumes: resumes || [], loading, error };
};
