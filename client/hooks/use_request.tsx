import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useState } from "react";

interface Props {
  url: string;
  method: Method | undefined;
  body: any;
  // (onSuccess: any): void;
  onSuccess: CallableFunction
}

interface Error {
  message: string;
}

export const useRequest = ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<any>();

  const doRequest = async () => {
    try {
      setErrors(null)
      // set config up to have dinamyc hook use of url, method and boyd
      let config: AxiosRequestConfig = {
        url: url,
        method: method,
        data: body,
      };
      const response = await axios.request(config);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oppos</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err: Error) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
