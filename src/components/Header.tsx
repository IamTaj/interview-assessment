import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsIcon from "@mui/icons-material/Apps";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", width: "unset" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component={"img"}
            src="https://i.ibb.co/J9rs9ct/Appeals-Logo-1-1.png"
            alt="Appeals-Logo-1-1"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Client Workspace:
          </Typography>
          <Select
            size="small"
            defaultValue="client1"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              bgcolor: "#f9fafb",
            }}
          >
            <MenuItem value="client1">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component={"img"}
                  src="https://i.ibb.co/1YMxnx2R/7e2badd84fa5dfb15f26933af4aad053381cddbf.png"
                  alt="company"
                  sx={{ width: 25, height: 20 }}
                />
              </Box>
            </MenuItem>
            <MenuItem value="client2">Placeholder</MenuItem>
            <MenuItem value="client2">Placeholder</MenuItem>
            <MenuItem value="client2">Placeholder</MenuItem>
          </Select>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d1d5db",
              borderRadius: 1,
              px: 1,
              bgcolor: "#f9fafb",
              width: 500,
            }}
          >
            <SearchIcon sx={{ color: "gray", fontSize: 20 }} />
            <InputBase
              placeholder="Search"
              fullWidth
              sx={{ ml: 1, flex: 1, fontSize: "0.875rem" }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component={"img"}
            src="https://i.ibb.co/1YMxnx2R/7e2badd84fa5dfb15f26933af4aad053381cddbf.png"
            alt="company"
            sx={{ width: 38, height: 30 }}
          />
          <Avatar sx={{ bgcolor: "#60a5fa", width: 32, height: 32 }}>AK</Avatar>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <AppsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
