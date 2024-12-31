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
      title: 'State Life Members',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        
        {
          id: 'View Branches',
          title: 'View Branches',
          type: 'item',
          url: '/state/view-branches',
          breadcrumbs: true

        },
        {
          id: 'Edit Members',
          title: 'Edit Members',
          type: 'item',
          url: '/state/edit-members',
          breadcrumbs: true

        },
        {
          id: 'Create State Branch',
          title: 'Create State Branch',
          type: 'item',
          url: '/state/create-branch',
          breadcrumbs: true

        },
      ]
    }
  ]
};

export default StateArea;
