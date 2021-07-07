import React, { useReducer } from "react";
import { useQuery, useQueryClient } from "react-query";

type QueryPollingProps = {};

export const ToggleQueryInvalidation = () => {
  const [show, toggle] = useReducer((s) => !s, true);
  const queryClient = useQueryClient();

  return (
    <div>
      <button onClick={toggle}>Toggle Time</button>
      <button onClick={() => queryClient.invalidateQueries("time",{
        refetchInactive: true
      })}>
        Invalidate Time
      </button>
      {show ? <QueryInvalidation /> : null}
    </div>
  );
};

export const QueryInvalidation = ({}: QueryPollingProps) => {
  const queryClient = useQueryClient();

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
      staleTime: Infinity,
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
