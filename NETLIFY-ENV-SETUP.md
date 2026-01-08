# 🚀 Add Supabase Keys to Netlify - Step by Step

## Follow These Exact Steps:

### **Step 1: Login to Netlify**
1. Go to: **https://app.netlify.com**
2. Login with your account

---

### **Step 2: Find Your Site**
1. You'll see a list of your sites
2. Click on: **flipco-capital** (or whatever your site is named)
3. You should see your site dashboard

---

### **Step 3: Open Site Settings**
1. Click the **"Site settings"** button (near the top right)
2. You'll see a menu on the left side

---

### **Step 4: Go to Environment Variables**
1. In the left menu, find **"Environment variables"**
2. Click it
3. You should see a page that says "Environment variables"

---

### **Step 5: Add Variable #1 (Project URL)**

1. Click the **"Add a variable"** button
2. Click **"Add a single variable"**

**Fill in:**
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://dtryzdvzxkkmttaocbce.supabase.co`

3. Click **"Create variable"**

---

### **Step 6: Add Variable #2 (Anon Key)**

1. Click **"Add a variable"** again
2. Click **"Add a single variable"**

**Fill in:**
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cnl6ZHZ6eGtrbXR0YW9jYmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NDA2NzcsImV4cCI6MjA3NzUxNjY3N30.Ugpf5PsgCWXwQ0K_Z5JIEnvuzXb99o3a_7CvHHLWZwo`

3. Click **"Create variable"**

---

### **Step 7: Add Variable #3 (Service Role Key)**

1. Click **"Add a variable"** one more time
2. Click **"Add a single variable"**

**Fill in:**
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cnl6ZHZ6eGtrbXR0YW9jYmNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTk0MDY3NywiZXhwIjoyMDc3NTE2Njc3fQ.1phY-YhfsVIPZpWSLextWLFomeJvdc20gdJvhAirI00`

3. Click **"Create variable"**

---

### **Step 8: Verify All 3 Variables Are Added**

You should now see 3 environment variables in the list:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

---

### **Step 9: Trigger a New Deployment**

1. Click **"Deploys"** in the top menu (or sidebar)
2. Click the **"Trigger deploy"** dropdown button
3. Click **"Deploy site"**
4. You'll see "Site deploy in progress"
5. **Wait 2-3 minutes** for it to complete

---

### **Step 10: Verify It's Working**

Once the deploy shows "Published":

1. **On your computer:** Go to **flipcocapital.com/admin**
2. **Login** to admin
3. **Edit an investment opportunity** (change a name or ROI)
4. **Click "Save"**
5. **Open flipcocapital.com on your phone**
6. **You should see the changes!** 🎉

---

## ✅ Success Checklist:

- [ ] All 3 environment variables added to Netlify
- [ ] New deployment triggered
- [ ] Deployment completed successfully (shows "Published")
- [ ] Tested editing in admin portal
- [ ] Changes visible on phone/other devices

---

## 🎊 You're Done!

Your admin portal now works globally! Any changes you make will appear on ALL devices instantly.

**No more localStorage issues - everything is in a real database now!** 🚀
