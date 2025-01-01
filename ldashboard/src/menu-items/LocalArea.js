// assets
import { IconKey } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
// constant
const icons = {
  IconKey , IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const LocalArea = {
  id: 'pages',
  title: 'Local Area ',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Local Branches',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        {
          id: 'Create Local Branch',
          title: 'Create Local Branches',
          type: 'item',
          url: '/local/create-branch',
          breadcrumbs: true

        },
        {
          id: 'View Branches',
          title: 'View Local Branches',
          type: 'item',
          url: '/local/view-branches',
          breadcrumbs: true

        },
        {
          id: 'Edit Branches',
          title: 'Edit Local Branches',
          type: 'item',
          url: '/local/edit-members',
          breadcrumbs: true

        },
    
      ]
    }
  ]
};

export default LocalArea;
