// assets
import { IconKey } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
// constant
const icons = {
  IconKey , IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pagesdev = {
  id: 'pagesdev',
  title: 'Developing Pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Pages',
      type: 'collapse',
      icon: icons.IconList,

      children: [
        
       
        {
          id: 'Register Member',
          title: 'Register page',
          type: 'item',
          url: '/register',
          target: true
        },
        {
          id: 'Logins page',
          title: 'Logins Page',
          type: 'item',
          url: '/logins',
          target: true
        },
       
        {
          id: 'Headquarter Certificate',
          title: 'Headquarter Login Page',
          type: 'item',
          url: '/headquarter/login',
          target: true
        },
        {
          id: 'State login',
          title: 'State Login Page',
          type: 'item',
          url: '/state/login',
          target: true
        },

      
        {
          id: 'Branch login',
          title: 'Branch Login Page',
          type: 'item',
          url: '/branch/login',
          target: true
        },
      ]
    }
  ]
};

export default pagesdev;
