# How to Configure CodeLove Auth & Deploy

Follow these steps to enable user sign-up/login and deploy your app publicly.

## Step 1: Set up Clerk (Authentication)
1. Go to [https://clerk.com/](https://clerk.com/) and create a free account.
2. Click **"Create Application"**.
3. Name it "CodeLove" and select **Google** and **Email** as sign-in methods (you can add LinkedIn later).
4. Click **Create Application**.
5. You will see "API Keys". Copy the **Publishable Key** and **Secret Key**.

## Step 2: Configure Environment Variables
1. Rename `.env.local.example` to `.env.local` in your project folder.
2. Paste your keys inside:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
3. Restart your dev server (`Control + C` then `npm run dev`).
   - Now your "Sign In" button will work!

## Step 3: Deploy to Vercel (Make it Public)
1. Go to [https://vercel.com/](https://vercel.com/) and sign up with GitHub.
2. Click **"Add New..."** -> **"Project"**.
3. Import your `codelove` repository.
4. In the **Environment Variables** section, paste the same keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
5. Click **Deploy**.

## Done!
Your app will be live at `https://codelove.vercel.app` (or similar) and users can sign up securely.
