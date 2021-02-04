CREATE PROCEDURE `get_timeslots_by_room` (
    IN `room_id` INTEGER UNSIGNED
)
BEGIN
    SELECT `id`, `from_time`, `to_time`, `weekday`, `name`
    FROM  `timeslots`
    WHERE `room`=`room_id`;
END$$

CREATE PROCEDURE `create_timeslot` (
    IN `timeslot_room` VARCHAR(100),
    IN `timeslot_from_time` TIME,
    IN `timeslot_to_time` TIME,
    IN `timeslot_weekday` TINYINT,
    IN `timeslot_name` VARCHAR(100)
)
BEGIN
    INSERT INTO `timeslots`(`room`, `from_time`, `to_time`, `weekday`, `name`) 
    VALUES (`timeslot_room`, `timeslot_from_time`, `timeslot_to_time`, `timeslot_weekday`, `timeslot_name`);
END$$

CREATE PROCEDURE `update_timeslot` (
    IN `timeslot_id` INT UNSIGNED,
    IN `timeslot_from_time` TIME,
    IN `timeslot_to_time` TIME,
    IN `timeslot_weekday` TINYINT,
    IN `timeslot_name` VARCHAR(100)
)
BEGIN
    UPDATE `timeslots`
    SET `from_time`=`timeslot_from_time`, `to_time`=`timeslot_to_time`, `weekday`=`timeslot_weekday`, `name`=`timeslot_name`
    WHERE `id`=`timeslot_id`;
END$$

CREATE PROCEDURE `delete_timeslot` (
    IN `timeslot_id` INT UNSIGNED
)
BEGIN
    DELETE FROM `timeslots`
    WHERE `id`=`timeslot_id`;
END$$