CREATE TABLE `emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`resend_id` text,
	`error` text,
	`ip` text,
	`user_agent` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `emails_created_idx` ON `emails` (`created_at`);--> statement-breakpoint
CREATE INDEX `emails_status_idx` ON `emails` (`status`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text,
	`content` text,
	`reading_time` integer,
	`cover` text,
	`tags` text,
	`featured` integer DEFAULT false NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`published_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE INDEX `posts_slug_idx` ON `posts` (`slug`);--> statement-breakpoint
CREATE INDEX `posts_pub_idx` ON `posts` (`published`,`published_at`);