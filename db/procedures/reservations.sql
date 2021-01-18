CREATE PROCEDURE `create_reservation` (
    IN `p_date` DATE,
    IN `p_timeslot` INT UNSIGNED,
    IN `p_inspection_time` TIME,
    IN `p_email` VARCHAR(100),
    IN `p_name` VARCHAR(50),
    IN `p_cid` VARCHAR(10),
    IN `p_society` VARCHAR(50),
    IN `p_description` TEXT 
)
BEGIN
    IF EXISTS 
        (SELECT '' FROM `timeslots` WHERE `weekday`=WEEKDAY(`p_date`) AND `id`=`p_timeslot`)
    THEN
        INSERT INTO `reservations`(`date`, `timeslot`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`)
        VALUES (`p_date`, `p_timeslot`, `p_inspection_time`, `p_email`, `p_name`, `p_cid` , `p_society`, `p_description`);
    ELSE
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'invalid timeslot for given date';
    END IF;
END$$

CREATE PROCEDURE `get_confirmed_reservations_for_room` (
    IN `room_id` INT UNSIGNED,
    IN `year` YEAR,
    IN `month` TINYINT UNSIGNED
)
BEGIN
    IF (`month` > 12 OR `month` < 1) THEN
        SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT = 'Out of range value for month';
    END IF;
    SELECT `date`, `timeslot`, `reservations`.`name`, `society` FROM `reservations`, `confirmed_reservations`, `timeslots`
    WHERE `reservations`.`id`=`reservation` AND `timeslots`.`id`=`timeslot` AND YEAR(`date`)=`year` AND MONTH(`date`)=`month`;
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
    IF NOT EXISTS
        (WITH
            `slot` AS
            (SELECT `date`, `timeslot` FROM `reservations`
            WHERE `id`=`reservation_id`)
        SELECT '' FROM `reservations`, `confirmed_reservations`, `slot`
        WHERE `id`=`reservation` 
        AND `reservations`.`date`=`slot`.`date` 
        AND `reservations`.`timeslot`=`slot`.`timeslot`)
    THEN
        INSERT INTO `confirmed_reservations` VALUES (`reservation_id`);
    ELSE
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = '(date, timeslot) already exists in table confirmed_reservations';
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