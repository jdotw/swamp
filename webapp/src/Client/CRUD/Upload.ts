import { useEffect, useState } from "react";
import { useBackend } from "./Backend";

export interface UseUploadProps {
  domain?: string;
  endpoint: string;
}

export interface UseUploadInterface<ResponseType> {
  uploading: boolean;
  upload: (file: File) => Promise<void>;
  response?: ResponseType;
  error: any;
  authHeaders: () => Promise<Record<string, string>>;
  urlForPath: (path: string) => string | undefined
}

export function useUpload({
  domain,
  endpoint,
}: UseUploadProps): UseUploadInterface<ResponseType> {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState<ResponseType>();

  const { authHeaders, urlForPath } = useBackend({
    domain,
  });

  const url = urlForPath(endpoint);

  const upload = async (file: File) => {
    if (!url) {
      throw new Error("No URL provided");
    }
    const formData = new FormData();
    formData.append('File', file);
    const httpResponse = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        //'Content-Type': file.type,
        //'Content-Length': `${file.size}`,
        ...(await authHeaders()),
      },
    });
    const jsonResponse = (await httpResponse.json()) as ResponseType
    setResponse(jsonResponse);
    return jsonResponse;
  };

  return {
    response,
    uploading,
    error,
    upload,
    authHeaders,
    urlForPath,
  };
}
