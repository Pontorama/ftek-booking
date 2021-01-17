CREATE PROCEDURE `create_timeslot` (
    IN `p_room` VARCHAR(100),
    IN `p_from` TIME,
    IN `p_to` TIME,
    IN `p_weekday` TINYINT,
    IN `p_name` VARCHAR(100)
)
BEGIN
    INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`, `name`) 
    VALUES (`p_room`, `p_from`, `p_to`, `p_weekday`, `p_name`);
END$$

CREATE PROCEDURE `update_timeslot` (
    IN `p_id` INT UNSIGNED,
    IN `p_from` TIME,
    IN `p_to` TIME,
    IN `p_weekday` TINYINT,
    IN `p_name` VARCHAR(100)
)
BEGIN
    UPDATE `timeslots`
    SET `from`=`p_from`, `to`=`p_to`, `weekday`=`p_weekday`, `name`=`p_name`
    WHERE `id`=`p_id`;
END$$

CREATE PROCEDURE `delete_timeslot` (
    IN `timeslot_id` INT UNSIGNED
)
BEGIN
    DELETE FROM `timeslots` WHERE `id`=`timeslot_id`;
END$$

CREATE PROCEDURE `get_timeslots` (
    IN `room_id` INTEGER UNSIGNED
)
BEGIN
    SELECT `id`, `from`, `to`, `weekday`, `name`
    FROM  `timeslots`
    WHERE `room`=`room_id`;
END$$