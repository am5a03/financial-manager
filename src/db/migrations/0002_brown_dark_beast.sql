CREATE UNIQUE INDEX `tx_records_timestamp_currency_source_type_category_unique` ON `tx_records` (`timestamp`,`currency`,`source`,`type`,`category`);