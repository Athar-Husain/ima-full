// assets
import { IconKey } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
// constant
const icons = {
  IconKey , IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const MembersArea = {
  id: 'pages',
  title: 'Members Area',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Life Members',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        {
          id: 'Add New Member',
          title: 'Add New Member',
          type: 'item',
          url: '/add-member',
          breadcrumbs: true

        },
        {
          id: 'View / Edit Members',
          title: ' View / Edit Members',
          type: 'item',
          url: '/view-members',
          breadcrumbs: true

        },
        
        // {
        //   id: 'Add Member Form',
        //   title: 'Add Member Form',
        //   type: 'item',
        //   url: '/add-member-form',
        //   breadcrumbs: true

        // },
       
      ]
    }
  ]
};

export default MembersArea;
