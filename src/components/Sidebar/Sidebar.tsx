import {
  HomeOutlined,
  LocalFireDepartmentOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import theme from '../../utils/theme';

interface NavItem {
  id: string;
  icon: SvgIconComponent;
  to: string;
}

const sidebarNavItems: NavItem[] = [
  {
    id: 'dashboard',
    icon: HomeOutlined,
    to: '/dashboard',
  },
  {
    id: 'heating',
    icon: LocalFireDepartmentOutlined,
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
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.white,
          width: '5rem',
          padding: '0.5rem 0',
          position: 'fixed',
          minHeight: '100%',
          zIndex: 1,
          top: 0,
          left: 0,
          overflowX: 'hidden',
          order: 0,
          alignSelf: 'stretch',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: 'none',
            order: 0,
            flexGrow: 0,
            backgroundColor: theme.palette.white,
            boxShadow: 'inset 0px 2px 4px rgba(229, 225, 255, 0.4)',
            borderRadius: '15px',
            padding: '12px 16px',
          }}
        >
          <Typography
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            {t('common.name.initials')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            width: '5rem',
            height: '4rem',
            flex: 'none',
            order: 1,
            flexGrow: 0,
          }}
        >
          {sidebarNavItems.map((item: NavItem, index: number) => (
            <Box
              className={`group-item ${activeIndex === index ? 'active' : ''}`}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '12px 16px',
                gap: '10px',
                flex: 'none',
                order: 1,
                flexGrow: 0,
                backgroundColor:
                  activeIndex === index
                    ? theme.palette.primary.light
                    : 'inherit',
                boxShadow:
                  activeIndex === index
                    ? 'inset 0px 2px 4px rgba(229, 225, 255, 0.4)'
                    : 'none',
                borderRadius: activeIndex === index ? '15px' : '0px',
              }}
            >
              <Link to={item.to}>
                <Icon
                  component={item.icon}
                  fontSize="large"
                  sx={{
                    color:
                      activeIndex === index
                        ? theme.palette.primary.main
                        : theme.palette.grey40,
                  }}
                />
              </Link>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            flex: 'none',
            order: 2,
            flexGrow: 0,
            padding: '14px 16px',
            gap: '10px',
            backgroundColor: theme.palette.white,
            borderRadius: '15px',
            boxShadow: 'inset 0px 2px 4px rgba(229, 225, 255, 0.4)',
          }}
        >
          <Typography
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            {t('common.name.initials')}
          </Typography>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Sidebar;

