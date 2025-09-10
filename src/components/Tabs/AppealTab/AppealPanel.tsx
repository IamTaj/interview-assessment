/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  ListItemText,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import ModalComponent from "@/components/Modal/ModalComponent";
import RenderModalComponent from "@/components/Modal/RenderModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { setModalStore } from "@/features/userSlice";
import { deleteAppeal } from "@/features/appealSlice";
import { ADD_MODAL, EDIT_MODAL, VIEW_MODAL } from "@/components/constant";

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const AppealPanel = () => {
  const dispatch = useDispatch();
  const appealData = useSelector((state: RootState) => state.appeal.data);

  const [tabValue, setTabValue] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selected, setSelected] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterColumn, setFilterColumn] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [rowMenuAnchorEl, setRowMenuAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openModal, setOpenModal] = useState<null | string>(null);

  const handleTabChange = (newValue: number) => setTabValue(newValue);
  const handleMenuClick = (e: any) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const openMenu = Boolean(anchorEl);

  const handleExport = () => {
    handleMenuClose();
  };

  const handleModal = (value: string) => {
    handleMenuClose();
    setOpenModal(value);
    dispatch(
      setModalStore({
        modalType: value,
        data: { callBack: setOpenModal },
      })
    );
  };

  const handleFilterIconClick = (e: any, column: string) => {
    setFilterAnchorEl(e.currentTarget);
    setFilterColumn(column);
    setFilterValue("");
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
    setFilterColumn(null);
    setFilterValue("");
  };

  const handleToggleFilterOption = (value: string) => {
    if (!filterColumn) return;

    if (value === "Select All") {
      const allValues = uniqueFilterOptions;
      setSelectedFilters({
        ...selectedFilters,
        [filterColumn]:
          selectedFilters[filterColumn]?.length === allValues.length
            ? []
            : allValues,
      });
    } else {
      const current = selectedFilters[filterColumn] || [];
      const updated = current.includes(value)
        ? current.filter((v: any) => v !== value)
        : [...current, value];
      setSelectedFilters({ ...selectedFilters, [filterColumn]: updated });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allSelected = filteredData.map((_, i) => i + page * rowsPerPage);
      setSelected(allSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (index: number) => {
    setSelected((prev: any) =>
      prev.includes(index)
        ? prev.filter((i: number) => i !== index)
        : [...prev, index]
    );
  };

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredData = useMemo(() => {
    return appealData.filter((row: any) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        row.company.toLowerCase().includes(term) ||
        row.assessor.toLowerCase().includes(term) ||
        row.accountNumber.toLowerCase().includes(term);

      const matchesFilters = Object.entries(selectedFilters).every(
        ([col, values]: any) => !values.length || values.includes(row[col])
      );

      return matchesSearch && matchesFilters;
    });
  }, [appealData, searchTerm, selectedFilters]);

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  const uniqueFilterOptions = useMemo(() => {
    if (!filterColumn) return [];

    const set = new Set();
    appealData.forEach((row: any) => {
      const value = row[filterColumn];
      if (
        value &&
        value.toString().toLowerCase().includes(filterValue.toLowerCase())
      ) {
        set.add(value);
      }
    });

    return Array.from(set);
  }, [appealData, filterColumn, filterValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={(_event, newValue) => handleTabChange(newValue)}
        aria-label="appeal tabs"
        sx={{
          borderBottom: "1px solid #e0e0e0",
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "600",
            fontSize: "16px",
            color: "#555",
            minHeight: 48,
            px: 2,
          },
          "& .Mui-selected": {
            color: "#3a815d",
            borderBottom: "3px solid #3a815d",
          },
        }}
      >
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Appeal Letter
              <Box
                sx={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "12px",
                  borderRadius: "12px",
                  px: 1,
                  lineHeight: 1,
                }}
              >
                {appealData.length.toString().padStart(2, "0")}
              </Box>
            </Box>
          }
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="end"
          mb={2}
          sx={{ gap: 1 }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              maxWidth: "600px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                backgroundColor: "#fff",
                height: "40px",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d9d9d9",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3a815d",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3a815d",
                borderWidth: 2,
              },
            }}
          />

          <Box
            sx={{
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              p: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                borderColor: "#3a815d",
                backgroundColor: "#f0f7f5",
              },
            }}
          >
            <FilterListIcon sx={{ color: "#3a815d" }} />
          </Box>
          <Button
            variant="contained"
            onClick={() => handleModal(ADD_MODAL)}
            sx={{
              textTransform: "none",
              backgroundColor: "#00bfa5",
              "&:hover": {
                backgroundColor: "#009e87",
              },
            }}
          >
            Add Appeal
          </Button>

          <TableCell>
            <IconButton
              onClick={handleMenuClick}
              aria-controls={openMenu ? "simple-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: { borderRadius: "8px", py: 1, minWidth: "120px" },
              }}
            >
              <MenuItem onClick={handleExport}>
                <SystemUpdateAltIcon fontSize="small" sx={{ mr: 1 }} />
                Export
              </MenuItem>
            </Menu>
          </TableCell>
        </Box>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < filteredData.length
                      }
                      checked={
                        filteredData.length > 0 &&
                        selected.length === filteredData.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>

                  <TableCell>
                    Tax Year
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "taxYear")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    Company
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "company")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    State
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "state")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    Assessor
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "assessor")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    Account Number
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "accountNumber")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    Appealed Deadline
                    <IconButton
                      size="small"
                      onClick={(e) =>
                        handleFilterIconClick(e, "appealedDeadline")
                      }
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    Status
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "status")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    Appealed Date
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "appealedDate")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    Appealed By
                    <IconButton
                      size="small"
                      onClick={(e) => handleFilterIconClick(e, "appealedBy")}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row: any, idx: number) => {
                  const realIndex = page * rowsPerPage + idx;

                  return (
                    <TableRow key={realIndex} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.includes(realIndex)}
                          onChange={() => handleSelectOne(realIndex)}
                        />
                      </TableCell>
                      <TableCell>{row.taxYear}</TableCell>
                      <TableCell>{row.company}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.assessor}</TableCell>
                      <TableCell>{row.accountNumber}</TableCell>
                      <TableCell>{row.appealedDeadline}</TableCell>
                      <TableCell
                        sx={{ color: row.status === "Sent" ? "green" : "red" }}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell>{row.appealedDate}</TableCell>
                      <TableCell>{row.appealedBy}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e: any) => {
                            setRowMenuAnchorEl(e.currentTarget);
                            setSelectedRow(row);
                            dispatch(
                              setModalStore({
                                data: { formData: row, callBack: setOpenModal },
                              })
                            );
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_event, newPage) => handleChangePage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </TabPanel>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: { borderRadius: 2, p: 1, width: 250, maxHeight: 300 },
        }}
      >
        <InputBase
          placeholder={`Search by ${filterColumn}`}
          fullWidth
          sx={{
            px: 1,
            mb: 1,
            fontSize: "14px",
            borderBottom: "1px solid #ccc",
          }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        {["Select All", ...uniqueFilterOptions].map(
          (option: any, idx: number) => (
            <MenuItem
              key={idx}
              onClick={() => handleToggleFilterOption(option)}
              sx={{ fontSize: "14px" }}
            >
              <Checkbox
                size="small"
                checked={
                  filterColumn !== null &&
                  selectedFilters[filterColumn]?.includes(option)
                    ? true
                    : false
                }
              />
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>

      <Menu
        anchorEl={rowMenuAnchorEl}
        open={Boolean(rowMenuAnchorEl)}
        onClose={() => setRowMenuAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { borderRadius: "8px", py: 1, minWidth: "160px" },
        }}
      >
        <MenuItem
          onClick={() => {
            setRowMenuAnchorEl(null);
            setOpenModal(EDIT_MODAL);
            dispatch(
              setModalStore({
                modalType: EDIT_MODAL,
              })
            );
          }}
        >
          Edit Letter
        </MenuItem>

        <MenuItem
          onClick={() => {
            setRowMenuAnchorEl(null);
            setOpenModal(VIEW_MODAL);
            dispatch(
              setModalStore({
                modalType: VIEW_MODAL,
              })
            );
          }}
        >
          View Appeal
        </MenuItem>

        <MenuItem
          onClick={() => {
            setRowMenuAnchorEl(null);
            if (selectedRow?.accountNumber) {
              dispatch(deleteAppeal(selectedRow.accountNumber));
            }
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {Boolean(openModal) && (
        <ModalComponent
          open={Boolean(openModal)}
          onClose={() => setOpenModal(null)}
        >
          <RenderModalComponent />
        </ModalComponent>
      )}
    </Box>
  );
};

export default AppealPanel;
