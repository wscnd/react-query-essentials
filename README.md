# react-query-essentials

This is the code from doing `React Query Essentials v2` course.

It has some divergencies from the original code, as it used `react-query@2` and I'm using `react-query@3^`.

Most differences are covered by their [docs](https://react-query.tanstack.com/guides/migrating-to-react-query-3) and pretty straightforward.

Commits are references to the course outline. <strike>(I should've used branches instead)</strike>

Course is [here](https://learn.tanstack.com/p/react-query-essentials).

## Outline
### Introduction
- Installing React Query
### Queries
- Basic Queries
- Query Loading State
- Query Error State
- React Query Devtools
- Automatically Refetching Queries on Window Focus
- Query Refetching Indicators
- Configuring Query Stale Time
- Configuring Query Cache Time
- Query Keys and Caching
- Using Custom Hooks to Share and Reuse Queries
- Parallel Queries
- Using Props and State in Queries
- Disabling Queries
- Multi-part Query Keys
- Automatic Query Retries
- Query Cancellation
- Dependent Queries
- Supplying a Query with Initial Data
- Marking Initial Query data as Stale
- Querying Related Lists and Items
- Seeding Initial Query Data from Other Queries
- Using Query Data to Seed Future Queries
- Query Side-Effects
- Scroll Restoration
- Query Polling with Refetch Intervals
### Invalidation
- Query Invalidation Basics
- Invalidating Without Refetching Active Queries
- Invalidating & Refetching Inactive Queries
- Invalidating Multiple Queries with Similar Query Keys
### Prefetching
- Basic query prefetching
- Hover-based query prefetching
- Prefetching & Stale Time
- Forced Prefetching
### Mutations
- Mutations Overview
- Mutations with the useMutation Hook
- Mutation Side-Effects
- Updating Query Data with Mutation Responses
### Optimistic Updates
- Optimistic Updates for List-Like Queries
- Rollbacks for List-Like Queries
- Optimistic Updates for Single Entity Queries
- Rollbacks for Single Entity Queries
### Paginated & Infinite Queries
- Paginated Queries
- Prefetching Paginated Queries
- Infinite Queries
### Server Side Rendering
- Server Side Rendering
- Using React Query with Next.js (Part 1)
- Using React Query with Next.js (Part 2)
