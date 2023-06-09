# StackOverflow Users App

This is a React application that fetches a list of top StackOverflow users and displays them on the screen. Users can be followed or blocked, and the application provides options for filtering, caching, and paging.

## Features

- Fetches and displays a list of the top 20 StackOverflow users.
- Each user is represented with their profile image, name, and reputation.
- Follow and block functionality allows users to interact with the list.
- Error handling for server availability.
- Filtering/search input to filter the list of users.
- Caching strategy to improve performance.
- Paging for navigating through the list.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   Navigate to the project directory:
   ```

2) cd stackoverflow-users-app
   Install the dependencies:

3. npm install
   Start the application:

4) npm start
   The application should now be running on http://localhost:3000.

Testing
To run the unit tests, use the following command:

npm test
The tests are written using Jest and React Testing Library.

Technologies Used
React
Axios
Material-UI
