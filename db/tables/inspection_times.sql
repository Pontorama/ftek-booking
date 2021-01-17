CREATE TABLE IF NOT EXISTS `inspection_times` (
    `time` TIME,
    `timeslot` INT UNSIGNED,
    PRIMARY KEY (`time`, `timeslot`),
    CONSTRAINT `inspection_time_timeslot` FOREIGN KEY (`timeslot`) REFERENCES `timeslots`(`id`) ON DELETE CASCADE
);