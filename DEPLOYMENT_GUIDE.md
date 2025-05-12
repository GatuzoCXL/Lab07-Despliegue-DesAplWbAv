# Deployment Guide for the JWT Authentication App

## Frontend Deployment (React App)

1. Log in to your Render account at [render.com](https://render.com).

2. Click on "New +" in the top right and select "Static Site".

3. Connect to your GitHub repository or select "Manual Deploy" if you're pushing the code directly.

4. Configure the deployment with these settings:
   - **Name**: jwt-auth-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Branch**: `main` (or your default branch)

5. Under "Advanced" settings, add this environment variable:
   - **Key**: REACT_APP_API_URL
   - **Value**: https://jwt-auth-backend-ym69.onrender.com/api

6. Click "Create Static Site" to start the deployment.

7. After deployment completes, Render will provide a URL for your frontend (e.g., https://jwt-auth-frontend.onrender.com).

8. Update the backend CORS configuration:
   - Backend environment variables should include:
   ```
   FRONTEND_URL=https://jwt-auth-frontend.onrender.com
   ```

## Testing the Application

1. Open the frontend URL you received from Render
2. Try to register a new account
3. Test login functionality
4. Verify role-based access to different pages

## Troubleshooting

If you encounter connection issues:

1. Verify that the REACT_APP_API_URL environment variable is correctly set
2. Check the browser console for CORS errors
3. Verify the backend server logs to ensure it's receiving requests
4. Test the backend API directly using a tool like Postman

### Common Issues:

- **CORS errors**: Ensure the backend CORS configuration includes your frontend URL
- **404 Not Found on page refresh**: The '_redirects' and 'render.json' files should handle this
- **API connection issues**: Double-check the API URL environment variable on the frontend

## Next Steps

To make further updates to your deployed application:

1. Make changes to your code locally
2. Push the changes to your repository
3. Render will automatically detect the changes and deploy the updated version
