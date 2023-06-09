import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { Typography, Box, TextField, Pagination } from "@mui/material";
import UserListItem from "./UserListItem";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.items);
        setFilteredUsers(response.items);
        setTotalPages(Math.ceil(response.items.length / pageSize));
      } catch (error) {
        setError(true);
      }
    };

    fetchUsers();
  }, [pageSize]);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredUsers = users.filter(
      (user) =>
        user.display_name.toLowerCase().includes(searchText) ||
        user.reputation.toString().includes(searchText)
    );
    setFilteredUsers(filteredUsers);
    setTotalPages(Math.ceil(filteredUsers.length / pageSize));
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  if (error) {
    return <div>Error fetching users. Please try again later.</div>;
  }

  return (
    <Box maxWidth="600px" margin="0 auto">
      <Typography variant="h4" align="center" gutterBottom>
        StackOverflow Users
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
        sx={{ marginBottom: "16px" }}
      />
      {displayedUsers.map((user) => (
        <UserListItem key={user.user_id} user={user} />
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default UserList;
