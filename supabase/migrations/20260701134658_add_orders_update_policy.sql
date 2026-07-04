/*
# Add UPDATE policy for orders — allow marking an order as paid after Razorpay callback

## Problem
The INSERT policy now enforces `status = 'pending'`, so the frontend must
insert a pending order first, then update it to 'paid' once Razorpay confirms
the payment. Without an UPDATE policy the second step is blocked.

## Changes

### orders — new UPDATE policy
- Allows updating `razorpay_payment_id` and `status` from 'pending' → 'paid'.
- USING clause: only rows currently in 'pending' state can be updated.
- WITH CHECK clause: the new status must be 'paid' (no arbitrary escalation).
*/

DROP POLICY IF EXISTS "anon_update_order_to_paid" ON orders;
CREATE POLICY "anon_update_order_to_paid" ON orders FOR UPDATE
  TO anon, authenticated
  USING (status = 'pending')
  WITH CHECK (status = 'paid');
