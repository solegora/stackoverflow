import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { getUsers } from "../services/api";
import UserList from "./UserList";

jest.mock("../services/api", () => ({
  getUsers: jest.fn()
}));

describe("UserList", () => {
  beforeEach(() => {
    getUsers.mockReset();
  });

  test("renders the component without error", async () => {
    getUsers.mockResolvedValueOnce({ items: [] });

    render(<UserList />);

    expect(screen.getByText("StackOverflow Users")).toBeInTheDocument();

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalledTimes(1);
    });
  });

  test("displays user list items correctly", async () => {
    const mockUsers = [
      {
        user_id: 1,
        display_name: "John Doe",
        reputation: 1000,
        profile_image: "avatar.jpg"
      },
      {
        user_id: 2,
        display_name: "Jane Smith",
        reputation: 2000,
        profile_image: "avatar.jpg"
      }
    ];
    getUsers.mockResolvedValueOnce({ items: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getAllByTestId("user-list-item")).toHaveLength(2);
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Reputation: 1000")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Reputation: 2000")).toBeInTheDocument();
  });

  test("displays error message if fetching users fails", async () => {
    getUsers.mockRejectedValueOnce(new Error("API error"));

    render(<UserList />);

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching users. Please try again later.")
      ).toBeInTheDocument();
    });
  });

  test("filters users based on search input", async () => {
    const mockUsers = [
      {
        user_id: 1,
        display_name: "John Doe",
        reputation: 1000,
        profile_image: "avatar.jpg"
      },
      {
        user_id: 2,
        display_name: "Jane Smith",
        reputation: 2000,
        profile_image: "avatar.jpg"
      }
    ];
    getUsers.mockResolvedValueOnce({ items: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getAllByTestId("user-list-item")).toHaveLength(2);
    });

    const searchInput = screen.getByLabelText("Search");
    searchInput.value = "John";
    searchInput.dispatchEvent(new Event("input"));

    await waitFor(() => {
      expect(screen.getAllByTestId("user-list-item")).toHaveLength(1);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
