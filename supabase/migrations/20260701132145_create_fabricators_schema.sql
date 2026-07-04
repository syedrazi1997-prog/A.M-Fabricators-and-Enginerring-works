/*
# A.M Fabricators Engineering Works — Database Schema

## Overview
Full e-commerce + CRM schema for an iron fabrication products site.
No authentication required — all data is accessible via the anon key.

## Tables Created

### 1. `orders`
Stores each customer order placed via Razorpay checkout.
- `id` — UUID primary key
- `customer_name` — buyer's name
- `customer_email` — buyer's email
- `customer_phone` — buyer's phone number
- `razorpay_payment_id` — Razorpay payment reference (filled after payment)
- `razorpay_order_id` — Razorpay order ID (optional)
- `subtotal` — order subtotal before GST (INR paise stored as numeric)
- `gst_amount` — 18% GST amount
- `total_amount` — final total charged to customer
- `status` — order status: pending | paid | processing | delivered | cancelled
- `notes` — any additional notes from customer
- `created_at` — timestamp

### 2. `order_items`
Individual line items belonging to an order.
- `id` — UUID primary key
- `order_id` — FK to orders
- `product_id` — product identifier string (matches data/products.ts)
- `product_name` — snapshot of product name at time of order
- `category` — product category
- `measurement_label` — selected size label
- `width_ft` — width in feet
- `height_ft` — height in feet
- `quantity` — number of units ordered
- `unit_price` — price per unit in INR
- `total_price` — line total in INR
- `is_custom` — whether customer entered custom dimensions
- `created_at` — timestamp

### 3. `contact_messages`
Stores enquiries submitted via the Contact form.
- `id` — UUID primary key
- `name` — sender's name
- `email` — sender's email
- `phone` — sender's phone
- `subject` — message subject
- `message` — full message body
- `is_read` — admin flag to mark as read
- `created_at` — timestamp

### 4. `chat_messages`
Stores customer chat messages from the live chat widget.
- `id` — UUID primary key
- `session_id` — client-generated session UUID to group a conversation
- `from_user` — boolean: true = customer message, false = bot reply
- `message` — message text
- `created_at` — timestamp

## Security
- RLS enabled on all tables.
- Policies use `TO anon, authenticated` since there is no login screen.
- Public can INSERT orders, order_items, contact_messages, chat_messages.
- Public can SELECT their own chat session and order status.
- No UPDATE/DELETE exposed to public (admin only via service role).
*/

-- ============================================================
-- 1. orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  customer_email text,
  customer_phone text,
  razorpay_payment_id text,
  razorpay_order_id text,
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  gst_amount numeric(12,2) NOT NULL DEFAULT 0,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','processing','delivered','cancelled')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- 2. order_items
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  category text,
  measurement_label text,
  width_ft numeric(8,2),
  height_ft numeric(8,2),
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric(12,2) NOT NULL,
  total_price numeric(12,2) NOT NULL,
  is_custom boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items" ON order_items FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- 3. contact_messages
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_messages" ON contact_messages;
CREATE POLICY "anon_select_contact_messages" ON contact_messages FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- 4. chat_messages
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  from_user boolean NOT NULL DEFAULT true,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_messages_session_id_idx ON chat_messages(session_id);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages" ON chat_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages" ON chat_messages FOR SELECT
  TO anon, authenticated USING (true);
