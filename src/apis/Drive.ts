import { axiosFormDataInstance } from '@/libs/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { UploadFilePayloadType, UploadFileResponseType } from '@/types/drive.type';
import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () => {
  const { user } = useAuthStore();
  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosFormDataInstance.post<UploadFileResponseType[]>('/drive/file', formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return response.data;
    },
  });
  return { uploadFiles, isUploading };
};
