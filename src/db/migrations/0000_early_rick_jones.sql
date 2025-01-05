CREATE TABLE `currencies` (
	`currency` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `currencies_currency_unique` ON `currencies` (`currency`);--> statement-breakpoint
CREATE TABLE `exchange_rates` (
	`base_currency` text NOT NULL,
	`quote_currency` text NOT NULL,
	`rate` real NOT NULL,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `income_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` integer NOT NULL,
	`currency` text NOT NULL,
	`source` text NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`category` text
);
