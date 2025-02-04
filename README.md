# **React UI for PEGA Case Management for Call A Doctor**
This React application integrates with PEGA DX API to allow users to create and manage cases dynamically. It utilizes the Silent Token Authentication method to securely obtain authentication tokens without requiring user interaction, providing a seamless experience.

## **🚀 Features**
- **Silent Token Authentication** – Secure token retrieval without user prompts.
- **Create & Manage Cases** – Users can create different types of cases via PEGA DX API.
- **Dynamic Case Forms** – Auto-generated UI for different case types.
- **Real-time Case Updates** – User interaction on forms update the cases in PEGA in real time.
- **Optimized Performance** – Efficient API calls with caching mechanisms.
  
## **🛠️ Tech Stack**
- **Frontend**: React.js (Vite)
- **Authentication**: PEGA Silent Token Method (OAuth2 Implicit Flow)
- **UI Library**: Tailwind CSS
- **API**: PEGA DX API

## **🔐 Authentication Flow**
- On app load, it silently requests an access token using PEGA’s OAuth2 Silent Authentication.
- If a valid token is available, the user is authenticated without needing to log in.
- The token is used for API requests to fetch case data and perform actions.

