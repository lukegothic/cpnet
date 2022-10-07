import { IndexPage, DetailPage, EditPage } from 'views';

export const Routes = {
  APP_INDEX:  "/",
  CP_LIST:    "/cp",
  CP_CREATE:  "/cp/new",
  CP_DETAIL:  "/cp/:id",
  CP_EDIT:    "/cp/:id/edit"
}

export const RouteList = [
  { id: "app_index",    path: Routes.APP_INDEX,   element: <IndexPage /> },
  { id: "cp_list",      path: Routes.CP_LIST,     element: <IndexPage /> },
  { id: "cp_create",    path: Routes.CP_CREATE,   element: <DetailPage /> },
  { id: "cp_detail",    path: Routes.CP_DETAIL,   element: <DetailPage /> },
  { id: "cp_edit",      path: Routes.CP_EDIT,     element: <EditPage /> }
];