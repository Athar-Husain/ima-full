import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ViewMemberDetails from 'views/view-membersDetails';
import EditMemberDetails from 'views/edit-members';
// import ViewMemberDetails from 'views/view-members-form';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing

// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// sample page routing
const AddMember = Loadable(lazy(() => import('views/add-member')));
const ViewMembers = Loadable(lazy(() => import('views/view-members')));


const AppliedMembers = Loadable(lazy(() => import('views/members-applied')));
// const EditMembers = Loadable(lazy(() => import('views/edit-members')));
const StateViewBranches = Loadable(lazy(() => import('views/state/state-view-branches')));
const StateEditMembers = Loadable(lazy(() => import('views/state/state-edit-members')));
const CreateStateBranch = Loadable(lazy(() => import('views/state/create-state-branch')));
const LocalViewBranches = Loadable(lazy(() => import('views/Local/local-view-branches')));
const LocalEditMembers = Loadable(lazy(() => import('views/Local/local-edit-members')));
const CreateLocalBranch = Loadable(lazy(() => import('views/Local/create-local-branch')));
const MemberApplication = Loadable(lazy(() => import('views/view-membersDetails')));
const AppliedMemberDetails = Loadable(lazy(() => import('views/applied-membersDetails')));
const Approvals = Loadable(lazy(() => import('views/approvals')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'add-member',
      element: <AddMember />
    },
    {
      path: 'view-members',
      element: <ViewMembers />
    },
    {
      path: 'view-member/:id',
      element: <ViewMemberDetails />
    },
    {
      path: 'edit-member/:id',
      element: <EditMemberDetails />
    },
    {
      path: 'applied-member/:id',
      element: <AppliedMemberDetails/>
    },
    {
      path: 'approve-member/:id',
      element: <Approvals/>
    },

    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'applied-members',
      element: <AppliedMembers />
    },
    // {
    //   path: 'edit-members',
    //   element: <EditMembers />
    // },

    {
      path: '/state/view-branches',
      element: <StateViewBranches />
    },
    {
      path: '/state/edit-members',
      element: <StateEditMembers />
    },
    {
      path: '/state/create-branch',
      element: <CreateStateBranch />
    },

    {
      path: '/local/view-branches',
      element: <LocalViewBranches />
    },
    {
      path: '/local/edit-members',
      element: <LocalEditMembers />
    },
    {
      path: '/local/create-branch',
      element: <CreateLocalBranch />
    },
    {
      path: 'add-member-form',
      element: <MemberApplication />
    }
  ]
};

export default MainRoutes;
