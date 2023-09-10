import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, int, longtext, serial, mysqlEnum, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("account", {
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: longtext("id_token"),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		accountProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const computers = mysqlTable("computers", {
	id: serial("id").notNull(),
	brand: varchar("brand", { length: 256 }).notNull(),
	cores: int("cores").notNull(),
},
(table) => {
	return {
		computersId: primaryKey(table.id),
	}
});

export const results = mysqlTable("results", {
	id: serial("id").notNull(),
	userId: varchar("user_id", { length: 255 }),
	status: int("status").notNull(),
	operation: mysqlEnum("operation", ['+','-','*','/','**','sqrt']).notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		resultsId: primaryKey(table.id),
	}
});

export const session = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionSessionToken: primaryKey(table.sessionToken),
	}
});

export const user = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).defaultNow(),
	image: varchar("image", { length: 255 }),
},
(table) => {
	return {
		userId: primaryKey(table.id),
	}
});

export const verificationToken = mysqlTable("verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierToken: primaryKey(table.identifier, table.token),
	}
});