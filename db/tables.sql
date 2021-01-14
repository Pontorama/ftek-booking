START TRANSACTION;

CREATE TABLE IF NOT EXISTS `users` (
    `email` VARCHAR(100) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `rooms` (
    `id` SERIAL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `manager` VARCHAR(100) REFERENCES `users`
);

CREATE TABLE IF NOT EXISTS `timeslots` (
    `id` SERIAL,
    `room` BIGINT REFERENCES `rooms`,
    `from` TIME NOT NULL,
    `to` TIME NOT NULL,
    `weekday` DATE NOT NULL,
    PRIMARY KEY (id, room)
);

CREATE TABLE IF NOT EXISTS `inspection_times` (
    `time` TIME,
    `timeslot_id` BIGINT,
    `room_id` BIGINT,
    PRIMARY KEY (`time`, `timeslot_id`, `room_id`),
    FOREIGN KEY (`timeslot_id`, `room_id`) REFERENCES `timeslots`
);

CREATE TABLE IF NOT EXISTS `reservations` (
    `date` DATE,
    `timeslot_id` BIGINT,
    `room_id` BIGINT,
    `inspection_time` TIME,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `society` VARCHAR(50),
    `event` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`date`, `timeslot_id`, `room_id`),
    FOREIGN KEY (`timeslot_id`, `room_id`) REFERENCES `timeslots`,
    FOREIGN KEY (`inspection_time`, `timeslot_id`, `room_id`) REFERENCES `inspection_times`
);

COMMIT;