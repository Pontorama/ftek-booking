CREATE TABLE IF NOT EXISTS `reservations` (
    `id` SERIAL,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `date` DATE,
    `timeslot` INT UNSIGNED,
    `inspection_time` TIME,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `cid` VARCHAR(10) NOT NULL,
    `society` VARCHAR(50),
    `description` TEXT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `reservation_timeslot` FOREIGN KEY (`timeslot`) REFERENCES `timeslots`(`id`) ON DELETE CASCADE,
    CONSTRAINT `reservation_inspection_time` FOREIGN KEY (`inspection_time`, `timeslot`) REFERENCES `inspection_times`(`time`, `timeslot`)
);

CREATE TABLE IF NOT EXISTS `confirmed_reservations` (
    `reservation` BIGINT UNSIGNED,
    PRIMARY KEY (`reservation`),
    CONSTRAINT `confirmed_reservation` FOREIGN KEY (`reservation`) REFERENCES `reservations`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `denied_reservations` (
    `reservation` BIGINT UNSIGNED,
    PRIMARY KEY (`reservation`),
    CONSTRAINT `denied_reservation` FOREIGN KEY (`reservation`) REFERENCES `reservations`(`id`) ON DELETE CASCADE
);