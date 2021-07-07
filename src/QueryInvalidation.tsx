import React from "react";
import { useQuery, useQueryClient } from "react-query";

type QueryPollingProps = {};

export const QueryInvalidation = ({}: QueryPollingProps) => {
  const queryClient = useQueryClient();

  const timeQuery = useQuery("time", async () => {
    const time = await new Promise((resolve) => setTimeout(resolve, 200)).then(
      (data) => {
        return new Date().toLocaleString();
      },
    );
    return {
      time,
    };
  });

  return (
    <div>
      <h1>Server Time {timeQuery.isFetching ? "..." : null}</h1>
      <div>
        {timeQuery.isLoading ? "loading time..." : timeQuery.data?.time}
      </div>
      <div>
        <button onClick={() => queryClient.invalidateQueries("time")}>
          Invalidate `time`
        </button>
      </div>
    </div>
  );
};
