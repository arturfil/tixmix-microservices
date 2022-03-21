import router from "next/router";
import { useEffect } from "react";
import { useRequest } from "../../hooks/use_request";

export default function Signout() {
  useEffect(() => {
    doRequest();
  }, []);

  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  return (
    <div className="container mt-5">
      <h2>Signing user out</h2>
    </div>
  );
}
