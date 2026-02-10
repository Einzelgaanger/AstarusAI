-- Fix: Allow space creators to create shared chats (they are not in space_members by default)
-- Run this in Supabase SQL Editor if you get: new row violates row-level security policy for table "chats"

DROP POLICY IF EXISTS "Space creators can create shared chats" ON chats;

CREATE POLICY "Space creators can create shared chats"
  ON chats FOR INSERT
  WITH CHECK (
    space_id IS NOT NULL
    AND user_id IS NULL
    AND created_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM spaces
      WHERE spaces.id = space_id
      AND spaces.creator_id = auth.uid()
    )
  );
