import { HomeOutlined, LocalFireDepartmentOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
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
      <Box className="group-icons">
        {sidebarNavItems.map((item: NavItem, index: number) => (
          <Box
            className={`group-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <Link to={item.to}>{item.content}</Link>
          </Box>
        ))}
      </Box>
    </aside>
  );
};

export default Sidebar;

