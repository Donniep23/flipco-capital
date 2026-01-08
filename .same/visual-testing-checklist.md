# 👁️ Visual Testing Checklist - What You Should See

## Version 187 - Investment Opportunities Auto-Sync

---

## 🏠 Step 1: Homepage (Before Adding Property)

### Navigate to: `http://localhost:3000`

**Scroll to "Current Investment Opportunities" section:**

You should see **2 investment cards**:

### Card 1: Maple Ridge Drive
```
┌─────────────────────────────────────┐
│  [Property Image]                   │
│  🟢 Available Now      32% ROI      │
│                                     │
│  Maple Ridge Drive                  │
│  Westfield, TX • 3 bed, 2 bath     │
│                                     │
│  Projected Profit: $67,500          │
│                                     │
│  Purchase: $195,000                 │
│  Renovation: $52,500                │
│  ARV: $325,000                      │
│  Timeline: 4 months                 │
│                                     │
│  Investment Tiers:                  │
│  Bronze: 28% | Silver: 30% | Gold: 32% │
│                                     │
│  [Reserve Spot] [View Details]      │
└─────────────────────────────────────┘
```

### Card 2: Oakmont Circle
```
┌─────────────────────────────────────┐
│  [Property Image]                   │
│  🟠 Starting Soon      29% ROI      │
│                                     │
│  Oakmont Circle                     │
│  Sugar Land, TX • 4 bed, 3 bath    │
│                                     │
│  Projected Profit: $81,200          │
│                                     │
│  Purchase: $245,000                 │
│  Renovation: $63,800                │
│  ARV: $400,000                      │
│  Timeline: 5 months                 │
│                                     │
│  Investment Tiers:                  │
│  Bronze: 25% | Silver: 27% | Gold: 29% │
│                                     │
│  [Reserve Spot] [View Details]      │
└─────────────────────────────────────┘
```

**✅ Checkpoint:** You see exactly 2 investment opportunity cards

---

## 📊 Step 2: Projects Page (Before Adding Property)

### Navigate to: `http://localhost:3000/projects`

**Filter Tabs at Top:**
```
┌─────────────────────────────────────────────────────────────┐
│  [All Projects (6)] [Completed (2)] [In Progress (2)] [Upcoming (3)] │
└─────────────────────────────────────────────────────────────┘
```

**Click "Upcoming (3)" tab**

You should see **3 project cards**:

1. **Pine Cottage** (existing planning project)
   - Status: Planning
   - Category: Upcoming
   - 29% ROI

2. **Maple Ridge Drive** (from investment opportunities)
   - Status: Available Now
   - Category: Upcoming
   - 32% ROI
   - Highlights: "32% Projected ROI", "4 months timeline", "$67,500 projected profit"

3. **Oakmont Circle** (from investment opportunities)
   - Status: Starting Soon
   - Category: Upcoming
   - 29% ROI
   - Highlights: "29% Projected ROI", "5 months timeline", "$81,200 projected profit"

**✅ Checkpoint:** You see exactly 3 projects in Upcoming tab

---

## 🔧 Step 3: Add New Property in Admin

### Navigate to: `http://localhost:3000/admin`

**Login Screen:**
```
Username: admin
Password: admin123
```

**Admin Dashboard - Click: "Investment Opportunities" card**

**You'll see a list on the left:**
```
┌───────────────────────────┐
│ Opportunities (2)         │
├───────────────────────────┤
│ ✓ Maple Ridge Drive      │
│   32% ROI                │
│   [Available Now]        │
├───────────────────────────┤
│ ✓ Oakmont Circle         │
│   29% ROI                │
│   [Starting Soon]        │
├───────────────────────────┤
│ [+ Add New Property]     │
└───────────────────────────┘
```

**Click "Add New Property"**

**Fill in the form:**
```
Property Name: Sunset Hills Estate
Address: Katy, TX • 4 bed, 3 bath • 2,200 sq ft

Purchase Price: 210000
Renovation Budget: 55000
Estimated ARV: 350000
Projected Profit: 85000
ROI: 32
Timeline: 5 months

Status: Available Now
Status Color: green

Image URL: https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop

Investment Tiers:
Bronze: 30
Silver: 31
Gold: 32
```

**Click "Save Changes"**

**✅ Checkpoint:** You see success message "✅ Sunset Hills Estate saved successfully!"

**Left sidebar now shows 3 opportunities:**
```
┌───────────────────────────┐
│ Opportunities (3)         │
├───────────────────────────┤
│ ✓ Maple Ridge Drive      │
│ ✓ Oakmont Circle         │
│ ✓ Sunset Hills Estate    │ ← NEW!
└───────────────────────────┘
```

---

## 🏠 Step 4: Verify on Homepage

### Navigate to: `http://localhost:3000` (or refresh)

**Scroll to "Current Investment Opportunities"**

You should now see **3 investment cards** (added your new one):

1. Maple Ridge Drive
2. Oakmont Circle
3. **Sunset Hills Estate** ← NEW!

```
┌─────────────────────────────────────┐
│  [Property Image]                   │
│  🟢 Available Now      32% ROI      │
│                                     │
│  Sunset Hills Estate                │
│  Katy, TX • 4 bed, 3 bath          │
│                                     │
│  Projected Profit: $85,000          │
│                                     │
│  Purchase: $210,000                 │
│  Renovation: $55,000                │
│  ARV: $350,000                      │
│  Timeline: 5 months                 │
│                                     │
│  Investment Tiers:                  │
│  Bronze: 30% | Silver: 31% | Gold: 32% │
│                                     │
│  [Reserve Spot] [View Details]      │
└─────────────────────────────────────┘
```

**✅ Checkpoint:** Homepage now shows 3 investment opportunities (was 2, now 3)

---

## 📊 Step 5: Verify on Projects Page

### Navigate to: `http://localhost:3000/projects`

**Filter Tabs:**
```
┌─────────────────────────────────────────────────────────────┐
│  [All Projects (7)] [Completed (2)] [In Progress (2)] [Upcoming (4)] │
└─────────────────────────────────────────────────────────────┘
                                                                    ↑
                                                              Updated!
```

**Click "Upcoming (4)" tab**

You should now see **4 project cards**:

1. Pine Cottage (existing)
2. Maple Ridge Drive (investment opp)
3. Oakmont Circle (investment opp)
4. **Sunset Hills Estate** (NEW - your added property!)

**Sunset Hills Estate card shows:**
```
┌───────────────────────────────────────────┐
│  BEFORE          │        AFTER           │
│  [Image]         │        [Same Image]    │
│  🟢 Available Now                         │
├───────────────────────────────────────────┤
│  Sunset Hills Estate                      │
│  📍 Katy, TX • 4 bed, 3 bath             │
│                                           │
│  Projected Profit: $85,000                │
│                                           │
│  Purchase: $210,000                       │
│  Renovation: $55,000                      │
│  Estimated Sale: $350,000                 │
│  Timeline: 5 months                       │
│  ROI: 32%                                 │
│                                           │
│  Key Highlights:                          │
│  • 32% Projected ROI                      │
│  • 5 months timeline                      │
│  • $85,000 projected profit               │
│  • Co-ownership through LLC               │
│                                           │
│  [View Details →]                         │
└───────────────────────────────────────────┘
```

**✅ Checkpoint:** Projects page now shows 4 upcoming projects (was 3, now 4)

---

## ✏️ Step 6: Edit Property

### Go back to: `/admin/edit/investment-opportunities`

**Click on "Sunset Hills Estate"**

**Change these values:**
```
ROI: 32 → 35
Projected Profit: 85000 → 95000
```

**Click "Save Changes"**

**✅ Checkpoint:** Success message appears

---

## 🔄 Step 7: Verify Edits Synced

### Homepage Check:
Go to `/` → Scroll to opportunities

**Sunset Hills Estate card now shows:**
- ROI: **35%** (updated!)
- Projected Profit: **$95,000** (updated!)

### Projects Page Check:
Go to `/projects` → Click "Upcoming"

**Sunset Hills Estate card now shows:**
- ROI: **35%** (updated!)
- Projected Profit: **$95,000** (updated!)
- Highlight: "**35%** Projected ROI" (updated!)

**✅ Checkpoint:** Changes appear on BOTH pages

---

## 🗑️ Step 8: Delete Property

### Go to: `/admin/edit/investment-opportunities`

**Click on "Sunset Hills Estate"**

**Click "Delete" button**

**Confirm deletion**

**✅ Checkpoint:**
- Success message: "✅ Opportunity deleted successfully!"
- Left sidebar shows 2 opportunities again (Sunset Hills gone)

---

## 🔄 Step 9: Verify Deletion Synced

### Homepage Check:
Go to `/` → Scroll to opportunities

**You see 2 cards** (Sunset Hills Estate is GONE):
1. Maple Ridge Drive
2. Oakmont Circle

### Projects Page Check:
Go to `/projects`

**Filter tabs show:**
```
[All Projects (6)] [Completed (2)] [In Progress (2)] [Upcoming (3)]
                                                                ↑
                                                          Back to 3!
```

**Click "Upcoming (3)"**

**You see 3 projects** (Sunset Hills Estate is GONE):
1. Pine Cottage
2. Maple Ridge Drive
3. Oakmont Circle

**✅ Checkpoint:** Property removed from BOTH pages

---

## 🎯 Final Verification Checklist

Run through this checklist:

- [ ] Default state shows 2 investment opportunities on homepage
- [ ] Default state shows 3 upcoming projects on projects page
- [ ] Adding property in admin → appears on homepage immediately
- [ ] Adding property in admin → appears on projects page immediately
- [ ] Filter count updates correctly (Upcoming: 3 → 4)
- [ ] All property details display correctly
- [ ] Editing property in admin → updates homepage
- [ ] Editing property in admin → updates projects page
- [ ] Deleting property in admin → removes from homepage
- [ ] Deleting property in admin → removes from projects page
- [ ] Filter count updates correctly (Upcoming: 4 → 3)
- [ ] No duplicate entries
- [ ] No console errors

---

## 🐛 What If Something's Wrong?

### Property doesn't appear:
1. Check browser console for errors (F12)
2. Refresh the page (Cmd/Ctrl + R)
3. Clear localStorage and try again:
   ```javascript
   localStorage.removeItem("flipco_investment_opportunities")
   ```

### Count is wrong:
1. Inspect localStorage:
   ```javascript
   JSON.parse(localStorage.getItem("flipco_investment_opportunities"))
   ```
2. Should see array of opportunities
3. Count array length

### Changes don't sync:
1. Make sure you clicked "Save Changes" in admin
2. Refresh the page to reload from localStorage
3. Check that property IDs are unique

---

## ✅ Success Looks Like:

**Homepage:**
- Current Investment Opportunities section populated
- Cards show all property details
- Adding/editing/deleting reflects immediately

**Projects Page:**
- "Upcoming" tab contains investment opportunities
- Filter counts are accurate
- Project cards display correctly
- Adding/editing/deleting reflects immediately

**Admin Panel:**
- Can add unlimited properties
- Can edit any field
- Can delete properties
- Changes save successfully

**Data Sync:**
- One source of truth (localStorage)
- Both pages read from same source
- Edits in admin update both displays
- No data conflicts

---

**If everything above works, your integration is 100% functional! 🎉**
