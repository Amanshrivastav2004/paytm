# Vercel Deployment Configuration

## Required Environment Variables

Your backend requires the following environment variables to be set in Vercel:

### 1. JWT_KEY
- **Purpose:** Secret key used to sign and verify JWT tokens
- **Current Local Value:** `SECRET`
- **Recommended:** Use a strong, random string (at least 32 characters)

### 2. MONGO_URL
- **Purpose:** MongoDB connection string
- **Format:** `mongodb+srv://username:password@cluster.mongodb.net/database_name`

---

## How to Set Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Select your `paytm-backend-pied` project

2. **Navigate to Settings:**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add Environment Variables:**
   
   **Variable 1:**
   - **Name:** `JWT_KEY`
   - **Value:** `SECRET` (or generate a more secure one)
   - **Environment:** Production, Preview, Development (select all)
   
   **Variable 2:**
   - **Name:** `MONGO_URL`
   - **Value:** Your MongoDB connection string from `.env` file
   - **Environment:** Production, Preview, Development (select all)

4. **Redeploy:**
   - After adding variables, go to **Deployments** tab
   - Click the three dots (...) on the latest deployment
   - Select **Redeploy**
   - OR push a new commit to trigger redeployment

---

## Verifying the Fix

After redeploying with environment variables:

1. **Check Vercel Logs:**
   - Go to your deployment
   - Check the Function Logs to see if there are any error messages about missing environment variables

2. **Test the API:**
   - Try signing in through your frontend
   - Check if the balance and users endpoints work

3. **Common Issues:**
   - If you still get 403 errors, check that the JWT_KEY matches between deployments
   - Ensure MONGO_URL is correct and the database is accessible
   - Check that your MongoDB cluster allows connections from anywhere (0.0.0.0/0) in Network Access

---

## Security Recommendations

For production:
- Use a strong JWT_KEY (generate using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- Restrict CORS to your frontend domain only (not '*')
- Add rate limiting
- Use HTTPS only
- Set shorter token expiration times
- Implement token refresh mechanisms
