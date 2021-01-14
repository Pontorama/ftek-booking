START TRANSACTION;

CREATE TABLE IF NOT EXISTS `users` (
    `email` VARCHAR(100) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE NOT NULL,
    `password` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `rooms` (
    `name` VARCHAR(100) PRIMARY KEY,
    `manager` VARCHAR(100) REFERENCES `users`(`email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `timeslots` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    `room` VARCHAR(100) REFERENCES `rooms`(`name`),
    `from` TIME NOT NULL,
    `to` TIME NOT NULL,
    `weekday` TINYINT NOT NULL CHECK (`weekday` >= 0 AND `weekday` <= 6),
    PRIMARY KEY (`id`, `room`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `inspection_times` (
    `time` TIME,
    `timeslot_id` INT UNSIGNED,
    `room` VARCHAR(100),
    PRIMARY KEY (`time`, `timeslot_id`, `room`),
    FOREIGN KEY (`timeslot_id`, `room`) REFERENCES `timeslots`(`id`, `room`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `reservations` (
    `date` DATE,
    `timeslot_id` INT UNSIGNED,
    `room` VARCHAR(100),
    `inspection_time` TIME,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `cid` VARCHAR(10) NOT NULL,
    `society` VARCHAR(50),
    `event` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`date`, `timeslot_id`, `room`),
    FOREIGN KEY (`timeslot_id`, `room`) REFERENCES `timeslots`(`id`, `room`),
    FOREIGN KEY (`inspection_time`, `timeslot_id`, `room`) REFERENCES `inspection_times`(`time`, `timeslot_id`, `room`)
) ENGINE=InnoDB;

COMMIT;