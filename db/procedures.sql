DELIMITER $$

CREATE PROCEDURE `create_reservation` (
    IN `p_date` DATE,
    IN `p_timeslot` INT UNSIGNED,
    IN `p_room` VARCHAR(100),
    IN `p_inspection_time` TIME,
    IN `p_email` VARCHAR(100),
    IN `p_name` VARCHAR(50),
    IN `p_cid` VARCHAR(10),
    IN `p_society` VARCHAR(50),
    IN `p_description` TEXT 
)
BEGIN
    INSERT INTO `reservations`(`date`, `timeslot`, `room`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`)
    VALUES (`p_date`, `p_timeslot`, `p_room`, `p_inspection_time`, `p_email`, `p_name`, `p_cid` , `p_society`, `p_description`);
END$$

CREATE PROCEDURE `get_public_reservations` (
    IN `year` YEAR,
    IN `month` TINYINT UNSIGNED
)
BEGIN
    IF (`month` > 12 OR `month` < 1) THEN
        SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT = 'Out of range value for month';
    END IF;
    SELECT `date`, `room`, `name`, `society` FROM `reservations`, `confirmed_reservations`
    WHERE `id`=`reservation` AND YEAR(`date`)=`year` AND MONTH(`date`)=`month`;
END$$

CREATE PROCEDURE `get_pending_reservations` ()
BEGIN
    SELECT *
    FROM `reservations`
    WHERE `id` NOT IN (SELECT `reservation` FROM `confirmed_reservations`);
END$$

CREATE PROCEDURE `confirm_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
BEGIN
    DECLARE `reservation_count` INT UNSIGNED;
    WITH
        `slot` AS
        (SELECT `date`, `timeslot`, `room` FROM `reservations`
        WHERE `id`=`reservation_id`)
    SELECT COUNT(`id`) INTO reservation_count FROM `reservations`, `confirmed_reservations`, `slot`
    WHERE `id`=`reservation` 
    AND `reservations`.`date`=`slot`.`date` 
    AND `reservations`.`timeslot`=`slot`.`timeslot` 
    AND `reservations`.`room`=`slot`.`room`;
    
    IF (`reservation_count` = 0) THEN
        INSERT INTO `confirmed_reservations` VALUES (`reservation_id`);
    ELSE
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = '(date, timeslot, room) already exists in table confirmed_reservations';
    END IF;
END$$

CREATE PROCEDURE `unconfirm_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
BEGIN
    DELETE FROM `confirmed_reservations` WHERE `reservation`=`reservation_id`;
END$$

CREATE PROCEDURE `delete_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
BEGIN
    DELETE FROM `reservations` WHERE `id`=`reservation_id`;
END$$

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
    UPDATE `timeslots`(`from`, `to`, `weekday`, `name`)
    SET `from`=`p_from`, `to`=`p_to`, `weekday`=`p_weekday`, `name`=`p_name`
    WHERE `id`=`p_id`;
END$$

CREATE PROCEDURE `delete_timeslot` (
    IN `timeslot_id` INT UNSIGNED
)
BEGIN
    DELETE FROM `timeslots` WHERE `id`=`timeslot_id`;
END$$

CREATE PROCEDURE `create_inspection_time` (
    IN `p_time` TIME,
    IN `p_timeslot` INT UNSIGNED,
    IN `p_room` VARCHAR(100)
)
BEGIN
    INSERT INTO `inspection_times`(`time`, `timeslot`, `room`) VALUES (`p_time`, `p_timeslot`, `p_room`);
END$$

CREATE PROCEDURE `get_inspection_times` (
    IN `p_timeslot` INT UNSIGNED,
    IN `p_room` VARCHAR(100)
)
BEGIN
    SELECT `time` FROM `inspection_times` WHERE `timeslot`=`p_timeslot` AND `room`=`p_room`;
END$$

CREATE PROCEDURE `delete_inspection_time` (
    IN `p_time` TIME,
    IN `p_timeslot` INT UNSIGNED,
    IN `p_room` VARCHAR(100)
)
BEGIN
    DELETE FROM `timeslots` WHERE `time`=`p_time`, `timeslot`=`p_timeslot` AND `room`=`p_room`
END$$

DELIMITER ;

