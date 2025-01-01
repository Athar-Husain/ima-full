// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import ApprovalIcon from '@mui/icons-material/Approval';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  ApprovalIcon,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Members Applied',
  type: 'group',
  children: [
    {
      id: 'Applied Members',
      title: 'Applied Members',
      type: 'item',
      url: '/applied-members',
      icon: icons.ApprovalIcon,
      breadcrumbs: true
    }
  ]
};

export default utilities;
