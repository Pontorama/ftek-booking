CREATE TABLE IF NOT EXISTS `timeslots` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    `room` INT UNSIGNED,
    `from` TIME NOT NULL,
    `to` TIME NOT NULL,
    `weekday` TINYINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    CHECK (`weekday` >= 0 AND `weekday` <= 6),
    PRIMARY KEY (`id`),
    CONSTRAINT `timeslot_room` FOREIGN KEY (`room`) REFERENCES `rooms`(`id`) ON DELETE CASCADE
);