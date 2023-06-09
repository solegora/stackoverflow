import React, { useState } from "react";
import { followUser, blockUser } from "../utils/mockData";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";

const UserListItem = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleFollow = () => {
    followUser(user.user_id);
    setFollowed(true);
  };

  const handleBlock = () => {
    blockUser(user.user_id);
    setBlocked(true);
  };

  const expandable = !user.blocked;

  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: "16px",
        borderRadius: "12px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)"
      }}
      elevation={user.blocked ? 0 : 1}
    >
      <CardMedia
        component="img"
        src={user.profile_image}
        alt={user.display_name}
        sx={{
          width: 160,
          height: 160,
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px"
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#202124" }}
          >
            {user.display_name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#5f6368" }}>
            Reputation: {user.reputation}
          </Typography>
        </CardContent>
        {expandable && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "16px",
              paddingBottom: "8px"
            }}
          >
            {followed ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginRight: "8px",
                  backgroundColor: "#1a73e8",
                  "&:hover": { backgroundColor: "#1a73e8" }
                }}
                onClick={() => setFollowed(false)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginRight: "8px",
                  backgroundColor: "blue",
                  "&:hover": { backgroundColor: "green" }
                }}
                onClick={handleFollow}
              >
                Follow
              </Button>
            )}

            {blocked ? (
              <Button
                variant="contained"
                color="error"
                sx={{
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "green" }
                }}
                onClick={() => setBlocked(false)}
              >
                Unblock
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                disabled={user.blocked}
                sx={{
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "amber" }
                }}
                onClick={handleBlock}
              >
                Block
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default UserListItem;
