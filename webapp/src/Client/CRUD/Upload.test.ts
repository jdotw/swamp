import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";
import { useUpload, UseUploadProps } from "./Upload";

global.fetch = vi.fn();

const endpoint = "/just/for/tests";

function mockFetchResponse(data: any, code: number = 200) {
  (fetch as Mock<any[], any>).mockResolvedValue({
    json: () => new Promise((resolve) => resolve(data)),
    status: code,
    ok: true,
  });
}

function mockFetchError(errorString: string) {
  (fetch as Mock<any[], any>).mockRejectedValue(new Error(errorString));
}

type TestResponseType = {
  id: number;
};

interface RenderUseUploadHookProps extends UseUploadProps {
}

const renderUseUploadHook = async (props: RenderUseUploadHookProps = { endpoint }) => {
  props = {
    ...props,
  };
  const hook = renderHook(() =>
    useUpload<TestResponseType>(props)
  );
  return hook;
};

describe("useUpload", () => {
  it("should return an object with the correct properties", async () => {
    const hook = await renderUseUploadHook();
    expect(hook.result.current).toHaveProperty("upload");
    expect(hook.result.current).toHaveProperty("response");
    expect(hook.result.current).toHaveProperty("uploading");
    expect(hook.result.current).toHaveProperty("error");
  });

  it("should have uploading set to false on creation", async () => {
    const hook = await renderUseUploadHook();
    await act(async () => {
      expect(hook.result.current.uploading).toBeFalsy();
    });
  });

  /*
   * Upload
   */

  describe("upload function", () => {
    const uploadId = Math.floor(Math.random() * 10000);
    const uploadResponse: TestResponseType = {
      id: uploadId,
    };
    const fileContents = "test,1,2,3";
    const file = new File([fileContents], "test.csv", { type: "text/csv" });

    it("should call fetch with the correct path and headers", async () => {
      const hook = await renderUseUploadHook();
      mockFetchResponse(uploadResponse);
      const formData = new FormData();
      formData.append('File', file);
      await act(() => hook.result.current.upload(file));
      expect(fetch).toHaveBeenCalledWith(
        hook.result.current.urlForPath(`${endpoint}`),
        {
          body: formData,
          method: "POST",
          headers: {
            'Content-Type': file.type,
            'Content-Length': `${file.size}`,
            ...(await hook.result.current.authHeaders()),
          },
        }
      );
    });

    it("should return the response", async () => {
      const hook = await renderUseUploadHook();
      mockFetchResponse(uploadResponse);
      let response;
      await act(async () => { response = await hook.result.current.upload(file) });
      expect(response).toEqual(uploadResponse);
    });

    it("should set the response property", async () => {
      const hook = await renderUseUploadHook();
      expect(hook.result.current.response).toBeUndefined();
      mockFetchResponse(uploadResponse);
      await act(async () => { await hook.result.current.upload(file) });
      expect(hook.result.current.response).toEqual(uploadResponse);
    });
  });
});
