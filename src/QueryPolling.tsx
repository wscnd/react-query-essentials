import React from "react";
import { useQuery } from "react-query";

type QueryPollingProps = {};

export const QueryPolling = ({}: QueryPollingProps) => {
  const timeQuery = useQuery(
    "time",
    async () => {
      const time = await new Promise((resolve) =>
        setTimeout(resolve, 200),
      ).then((data) => {
        return new Date().toLocaleString();
      });
      return {
        time,
      };
    },
    {
      refetchInterval: 700,
    },
  );

  return (
    <div>
      <h1>Server Time {timeQuery.isFetching ? "..." : null}</h1>
      <div>
        {timeQuery.isLoading ? "loading time..." : timeQuery.data?.time}
      </div>
    </div>
  );
};
