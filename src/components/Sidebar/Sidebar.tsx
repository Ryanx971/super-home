import { HomeOutlined, LocalFireDepartmentOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import './Sidebar.scss';

interface NavItem {
  id: string;
  content: ReactElement;
  to: string;
}

const sidebarNavItems: NavItem[] = [
  {
    id: 'dashboard',
    content: <HomeOutlined className="icon" fontSize="large" />,
    to: '/dashboard',
  },
  {
    id: 'heating',
    content: <LocalFireDepartmentOutlined className="icon" fontSize="large" />,
    to: '/heating',
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const currentPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex(
      (item: NavItem) => item.id === currentPath
    );
    setActiveIndex(currentPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <aside className="sidebar-container">
      <Box className="top-content">
        <Typography className="name">{t('common.name.initials')}</Typography>
      </Box>
      <Box className="middle-group-icons">
        {sidebarNavItems.map((item: NavItem, index: number) => (
          <Box
            className={`group-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <Link to={item.to}>{item.content}</Link>
          </Box>
        ))}
      </Box>
      <Box className="bottom-content">
        <Typography className="name">{t('common.name.initials')}</Typography>
      </Box>
    </aside>
  );
};

export default Sidebar;

