import { db } from "@/lib/db"
import { User, UserId, users } from "@/lib/db/schema/auth"
import { eq } from "drizzle-orm"

export const getUser = async (userId: UserId): Promise<{ user: User }> => {
  const c = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))

  return { user: c[0] }
}