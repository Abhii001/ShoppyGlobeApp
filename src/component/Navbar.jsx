import  { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Typography, Tooltip } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GridViewIcon from '@mui/icons-material/GridView'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone'; // Import Phone Icon

const categories = [
  { name: 'Baking Material', icon: '🍰' },
  { name: 'Bread and Juice', icon: '🍞' },
  // Add other categories here
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCategoriesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoriesClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar sx={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            startIcon={<GridViewIcon sx={{ color: 'white' }} />} 
            endIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
            onClick={handleCategoriesClick}
            sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Browse All Categories
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCategoriesClose}
          >
            {categories.map((category) => (
              <MenuItem key={category.name} onClick={handleCategoriesClose}>
                <span>{category.icon}</span>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {category.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" startIcon={<ShoppingCartIcon sx={{ color: 'green' }} />} href="/deals">
            Hot Deals
          </Button>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/about">About</Button>
          <Button color="inherit" href="/shop">Shop</Button>
          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon sx={{ color: 'green' }} />}
            onClick={handleMenuClick}
          >
            Vendors
          </Button>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
            <MenuItem onClick={handleMenuClose}>Store Listing</MenuItem>
            <MenuItem onClick={handleMenuClose}>Store Details</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
          </Menu>
          
          <Button color="inherit" href="/blogs">Blogs</Button>
          <Button color="inherit" href="/contact">Contact</Button>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Tooltip title="24/7 Support Center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit">
                <PhoneIcon sx={{ color: 'green' }} />
              </IconButton>
              <div style={{ textAlign: 'right' }}>
                <Typography variant="h6" sx={{ color: 'green' }}>
                  017XXXXXXX
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: 'gray' }}>
                  24/7 Support Center
                </Typography>
              </div>
            </div>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
