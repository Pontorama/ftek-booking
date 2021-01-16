CREATE TABLE IF NOT EXISTS `users` (
    `email` VARCHAR(100),
    `name` VARCHAR(50) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `rooms` (
    `name` VARCHAR(100),
    `manager` VARCHAR(100),
    PRIMARY KEY (`name`),
    CONSTRAINT `room_manager` FOREIGN KEY (`manager`) REFERENCES `users`(`email`)
);

CREATE TABLE IF NOT EXISTS `timeslots` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    `room` VARCHAR(100),
    `from` TIME NOT NULL,
    `to` TIME NOT NULL,
    `weekday` TINYINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    CHECK (`weekday` >= 0 AND `weekday` <= 6),
    PRIMARY KEY (`id`),
    CONSTRAINT `timeslot_room` FOREIGN KEY (`room`) REFERENCES `rooms`(`name`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `inspection_times` (
    `time` TIME,
    `timeslot` INT UNSIGNED,
    PRIMARY KEY (`time`, `timeslot`),
    CONSTRAINT `inspection_time_timeslot` FOREIGN KEY (`timeslot`) REFERENCES `timeslots`(`id`) ON DELETE CASCADE
);

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