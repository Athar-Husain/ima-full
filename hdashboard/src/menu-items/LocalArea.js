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
      title: 'Local Life Members',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        
        {
          id: 'View Branches',
          title: 'View Branches',
          type: 'item',
          url: '/local/view-branches',
          breadcrumbs: true

        },
        {
          id: 'Edit Members',
          title: 'Edit Members',
          type: 'item',
          url: '/local/edit-members',
          breadcrumbs: true

        },
        {
          id: 'Create Local Branch',
          title: 'Create Local Branch',
          type: 'item',
          url: '/local/create-branch',
          breadcrumbs: true

        },
      ]
    }
  ]
};

export default LocalArea;
