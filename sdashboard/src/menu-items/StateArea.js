// assets
import { IconKey } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
// constant
const icons = {
  IconKey , IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const StateArea = {
  id: 'pages',
  title: 'State Area ',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'State Branches',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        {
          id: 'Create State Branches',
          title: 'Create State Branches',
          type: 'item',
          url: '/state/create-branch',
          breadcrumbs: true

        },
        {
          id: 'View Branches',
          title: 'View State Branches',
          type: 'item',
          url: '/state/view-branches',
          breadcrumbs: true

        },
        {
          id: 'Edit Branches',
          title: 'Edit State Branches',
          type: 'item',
          url: '/state/edit-members',
          breadcrumbs: true

        },
     
      ]
    }
  ]
};

export default StateArea;
