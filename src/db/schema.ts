import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth-schema';

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp('created_at').defaultNow(),
})

// Relations for joins (enable experimental.joins: true in Better Auth config)
export const todosRelations = relations(todos, ({ one }) => ({
  user: one(user, { fields: [todos.userId], references: [user.id] }),
}));