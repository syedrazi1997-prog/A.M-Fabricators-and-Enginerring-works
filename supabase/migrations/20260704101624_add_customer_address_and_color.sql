/*
# Add customer address and selected color columns

1. Modified Tables
- `orders`: add `customer_address` (text, nullable) to collect delivery address from customer.
- `order_items`: add `selected_color` (text, nullable) to store the chosen color for each item.
2. Security
- No RLS policy changes — existing policies remain in place.
3. Notes
- Both columns are nullable so existing rows are not affected.
- The app is single-tenant (no auth), so anon+authenticated policies already allow writes.
*/

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_address text;

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS selected_color text;
