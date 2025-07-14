// import { useMutation, useQuery } from '@tanstack/react-query';
// import { callApi } from '@/utils/apiUtils/callApi';

// import { z } from 'zod';

// export const generateQueryHooksFromDefinitions = <IApiDef extends IApiRouterDefs>({ definition, queryKey }: { definition: IApiRouterDefs; queryKey?: string }) => {
//     const { routes } = definition;
//     type routes = IApiDef['routes'];
//     // @ts-ignore
//     type routeKeys = keyof IApiDef['routes'];
//     // @ts-ignore
//     type hookKey = `use${Capitalize<routeKeys>}`;
//     // @ts-ignore
//     const hooks: Record<hookKey, any> = {};
//     const moduleKey = queryKey ? queryKey : definition?.name?.toUpperCase()?.replaceAll(' ', '_') ?? '';
//     Object.entries(routes).map(([routeKey, routeObj]) => {
//         type RouteType = routes[routeKeys];
//         let routeDef = routeObj as IRouteDef;
//         if (routeDef && routeDef.queryType && routeDef.generateRequest) {
//             if (routeDef.queryType === 'query') {
//                 // @ts-ignore
//                 hooks[`use${capitalizeFirst(routeKey)}` as hookKey] = function useHook(payload: z.infer<typeof routeDef.generatePayload>, options: UseQueryOptions={}) {
//                     return useQuery({
//                         queryKey: [moduleKey, payload],
//                         queryFn: async () => {
//                             return callApi<IPaginatedListRequestResult<any>>({
//                                 requestFunction: routeDef.generateRequest!(payload),
//                                 showToastOnSuccess: false,
//                             });
//                         },
//                         refetchOnWindowFocus: false,
//                         keepPreviousData: true,
//                         ...options
//                     });
//                 };
//             }

//             if (routeDef.queryType === 'mutation') {
//                 hooks[`use${capitalizeFirst(routeKey)}` as hookKey] = function useHook() {
//                     return useMutation({
//                         mutationFn: async (payload: any) => {
//                             return callApi({
//                                 requestFunction: routeDef.generateRequest!(payload),
//                             });
//                         },
//                         onSuccess: (data) => {
//                             if (!data.error) {
//                                 queryClient.invalidateQueries({ queryKey: [moduleKey] });
//                                 queryClient.invalidateQueries({ queryKey: [CrmEntities.ENTITY_LOG] });
//                             }
//                         },
//                     });
//                 };
//             }
//         }
//     });
//     return hooks;
// };
export const generateQueryHooksFromDefinitions = () => {};
