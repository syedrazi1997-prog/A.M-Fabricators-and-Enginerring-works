/*
# Tighten RLS INSERT Policies — Replace "always true" WITH CHECK clauses

## Problem
All four INSERT policies used `WITH CHECK (true)`, which is flagged as
unrestricted access. While this is expected for a public no-auth app, we
can add meaningful field-level validation in the WITH CHECK predicate to
prevent empty/garbage rows and basic abuse without requiring user identity.

## Changes

### orders
- Require `total_amount > 0` — prevents zero-value ghost orders.
- Require `status = 'pending'` on insert — clients cannot directly write 'paid'.

### order_items
- Require `quantity >= 1` — no zero-quantity line items.
- Require `unit_price > 0` — no free items written by clients.
- Require `product_id` is non-empty.

### contact_messages
- Require `name` is non-empty (length > 0).
- Require `message` is non-empty (length > 0).

### chat_messages
- Require `message` is non-empty (length > 0) — no blank chat rows.
- Require `session_id` is a non-nil UUID — prevents null session spam.

## Security notes
- SELECT policies remain `USING (true)` — data is intentionally public/shared
  for a single-tenant no-auth storefront.
- These predicates are enforced by the database engine, not the client,
  so they cannot be bypassed from the frontend.
*/

-- ============================================================
-- orders — restrict inserts to valid, pending orders only
-- ============================================================
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    total_amount > 0
    AND status = 'pending'
  );

-- ============================================================
-- order_items — require valid product and positive quantities/prices
-- ============================================================
DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    quantity >= 1
    AND unit_price > 0
    AND length(trim(product_id)) > 0
  );

-- ============================================================
-- contact_messages — require non-empty name and message
-- ============================================================
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(message)) > 0
  );

-- ============================================================
-- chat_messages — require non-empty message and valid session_id
-- ============================================================
DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages" ON chat_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(message)) > 0
    AND session_id IS NOT NULL
    AND session_id <> '00000000-0000-0000-0000-000000000000'::uuid
  );
