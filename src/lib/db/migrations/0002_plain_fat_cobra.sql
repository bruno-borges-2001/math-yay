CREATE TABLE `results` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`status` int NOT NULL,
	`operation` enum('+','-','*','/','**','sqrt') NOT NULL,
	`created_at` timestamp(3) DEFAULT (now()),
	CONSTRAINT `results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `results_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;