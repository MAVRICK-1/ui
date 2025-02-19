import { RouteObject } from "react-router-dom";
import Clusters from "../components/Clusters";
import { Layout } from "../components/Layout";
import ITS from "../pages/ITS";
import CreateCluster from "../pages/CreateCluster";
import KubeconfigOnboarding from "../pages/KubeconfigOnboarding"; // Ensure that the file exists at this path
import WDS from "../pages/WDS";
import BP from "../pages/BP";
import NotFoundPage from "../pages/NotFoundPage";
import DeploymentDetails from "../components/DeploymentDetails";
import NameSpace from "../pages/NS";
import TreeView from "../components/TreeViewComponent";
// import ShowLogs from "../components/Logs";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Clusters /> },
      { path: "its", element: <ITS /> },
      { path: "createCluster", element: <CreateCluster /> },
      { path: "kubeconfigOnboarding", element: <KubeconfigOnboarding /> },
      { path: "wds", element: <WDS /> },
      { path: "bp", element: <BP /> },
      { path: "namespaces" , element: <NameSpace />},
      { path: "deploymentdetails/:namespace/:deploymentName", element: <DeploymentDetails /> },
      { path: "treeview", element: <TreeView /> },
      { path: "*", element: <NotFoundPage /> },
      // {path: "logs/:deployment/:namespace", element: <ShowLogs />} // TODO: remove it in future after deployment details page
      // {path: "logs/:deployment/:namespace", element: <ShowLogs />} // TODO: remove it in future after deployment details page
    ],
  },
];
