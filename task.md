# Assignment: Enhance User Profile with "Recently Viewed Products"

## Goal

- Create a containerized Node.js (Javascript) app that integrates Firebase and
  Redis to allow users to easily revisit products they've recently shown
  interest in.

## Requirements

### Backend

- **Platform:** Firebase (create your own project)
- **Containerization:** Docker
- **Framework:** Express.js
- **Cache:** Redis
- **Authentication:** Firebase Authentication (or mocked for testing)
- **Versioned Router:** Implement versioned routing (e.g., `/api/v1/`,
  `/api/v2/`)
- **Data Storage:**
  - **Firestore Subcollection:** `users/{userID}/recentlyViewed`
    - Store product IDs and timestamps (for efficient querying and limiting).
  - **Product:** (mock the data)
- **Middleware:**
  - Log product views and update the recentlyViewed subcollection.
  - Limit the number of products to 10.
  - Consider using Redis to cache frequently accessed data (e.g., top viewed
    products).
- **API Endpoint:**
  - **Endpoint:** `/api/v1/users/{userID}/recentlyViewed`
  - **Method:** GET
  - **Authentication:** Require user authentication.
  - **Response:** Return an array of product IDs and timestamps.
- **Email Notification:**
  - **Cloud Function Trigger:** Monitor the recentlyViewed collection.
  - Send email notifications for products viewed more than twice within a
    specific timeframe.
  - Use Nodemailer or Firebase's Email Extension.

### Frontend

- **Display:** Show recently viewed products in the user's profile.
- **UI:** Use a carousel or simple list.
- **Links:** Link each product to its detail page.

### API Documentation

- Use Swagger to document the API endpoint, including authentication
  requirements, request/response formats, and error handling.

## Additional Considerations

- **Error Handling:**
  - Implement proper error handling and logging.
  - Return informative error messages to the client.
- **Testing:**
  - Write unit and integration tests to ensure code quality and functionality.

## Coding Guidelines

[Code Structure and Development Guidelines](https://foodtok.notion.site/Code-Structure-and-Development-Guidelines-24920929e64b4387bf2336bc894776e1?pvs=4)
