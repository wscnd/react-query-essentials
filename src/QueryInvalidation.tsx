import React, { useReducer } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";

type QueryPollingProps = {};

const InvalidateButton = ({
  queryClient,
  mainKey,
  subKey,
}: {
  queryClient: QueryClient;
  subKey?: string;
  mainKey?: boolean;
}) => {
  const key = mainKey ? "time" : ["time", subKey];
  return (
    <button
      style={{ marginRight: "1rem" }}
      onClick={() =>
        queryClient.invalidateQueries(key, {
          refetchInactive: true,
        })
      }
    >
      Invalidate Time {subKey}
    </button>
  );
};

export const ToggleQueryInvalidation = () => {
  // const [show, toggle] = useReducer((s) => !s, true);
  const queryClient = useQueryClient();

  return (
    <div>
      <InvalidateButton queryClient={queryClient} mainKey={true} />
      <InvalidateButton queryClient={queryClient} subKey="A" />
      <InvalidateButton queryClient={queryClient} subKey="B" />
      <InvalidateButton queryClient={queryClient} subKey="C" />
      <QueryInvalidationWithSubKey subKey="A" />
      <QueryInvalidationWithSubKey subKey="B" />
      <QueryInvalidationWithSubKey subKey="C" />
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

type QueryInvalidationWithKeyProps = {
  subKey: string;
};

export const QueryInvalidationWithSubKey = ({
  subKey,
}: QueryInvalidationWithKeyProps) => {
  const queryClient = useQueryClient();

  const timeQuery = useQuery(
    ["time", subKey],
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
      <h1>
        Server Time {subKey} {timeQuery.isFetching ? "..." : null}
      </h1>
      <div>
        {timeQuery.isLoading ? "loading time..." : timeQuery.data?.time}
      </div>
    </div>
  );
};
