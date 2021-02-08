CREATE PROCEDURE `get_confirmed_reservations_by_room_and_month` (
    IN `room_id` INT UNSIGNED,
    IN `year` YEAR,
    IN `month` TINYINT UNSIGNED
)
READS SQL DATA
BEGIN
    IF (`month` > 12 OR `month` < 1) THEN
        SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT = 'Out of range value for month';
    END IF;
    SELECT `reservations`.`date`, `reservations`.`timeslot`, `reservations`.`society` 
    FROM `reservations`, `confirmed_reservations`, `timeslots`
    WHERE `reservations`.`id`=`confirmed_reservations`.`reservation`
    AND `timeslots`.`id`=`reservations`.`timeslot`
    AND  `timeslots`.`room` = `room_id`
    AND YEAR(`date`)=`year`
    AND MONTH(`date`)=`month`;
END$$

CREATE PROCEDURE `get_confirmed_reservations` (
    IN `from_date` DATE
)
READS SQL DATA
BEGIN
    SELECT `reservations`.`id`, `reservations`.`timestamp`, `reservations`.`date`, `reservations`.`inspection_time`, `reservations`.`email`, `reservations`.`name`, `reservations`.`cid`, `reservations`.`society`, `reservations`.`description`, `timeslots`.`from_time`, `timeslots`.`to_time`, `timeslots`.`name` AS `timeslot`, `rooms`.`name` AS `room`
    FROM `reservations`, `timeslots`, `rooms`
    WHERE `reservations`.`timeslot`=`timeslots`.`id`
    AND `timeslots`.`room`=`rooms`.`id`
    AND `reservations`.`id` IN (SELECT `reservation` FROM `confirmed_reservations`)
    AND `reservations`.`date`>=`from_date`;
END$$

CREATE PROCEDURE `get_pending_reservations` (
    IN `from_date` DATE
)
READS SQL DATA
BEGIN
    SELECT `reservations`.`id`, `reservations`.`timestamp`, `reservations`.`date`, `reservations`.`inspection_time`, `reservations`.`email`, `reservations`.`name`, `reservations`.`cid`, `reservations`.`society`, `reservations`.`description`, `timeslots`.`from_time`, `timeslots`.`to_time`, `timeslots`.`name` AS `timeslot`, `rooms`.`name` AS `room`
    FROM `reservations`, `timeslots`, `rooms`
    WHERE `reservations`.`timeslot`=`timeslots`.`id`
    AND `timeslots`.`room`=`rooms`.`id`
    AND `reservations`.`id` NOT IN (SELECT `reservation` FROM `confirmed_reservations` NATURAL JOIN `denied_reservations`)
    AND `reservations`.`date`>=`from_date`;
END$$

CREATE PROCEDURE `get_denied_reservations` (
    IN `from_date` DATE
)
READS SQL DATA
BEGIN
    SELECT `reservations`.`id`, `reservations`.`timestamp`, `reservations`.`date`, `reservations`.`inspection_time`, `reservations`.`email`, `reservations`.`name`, `reservations`.`cid`, `reservations`.`society`, `reservations`.`description`, `timeslots`.`from_time`, `timeslots`.`to_time`, `timeslots`.`name` AS `timeslot`, `rooms`.`name` AS `room`
    FROM `reservations`, `timeslots`, `rooms`
    WHERE `reservations`.`timeslot`=`timeslots`.`id`
    AND `timeslots`.`room`=`rooms`.`id`
    AND `reservations`.`id` IN (SELECT `reservation` FROM `denied_reservations`)
    AND `reservations`.`date`>=`from_date`;
END$$

CREATE PROCEDURE `create_reservation` (
    IN `reservation_date` DATE,
    IN `reservation_timeslot` INT UNSIGNED,
    IN `reservation_inspection_time` TIME,
    IN `reservation_email` VARCHAR(100),
    IN `reservation_name` VARCHAR(50),
    IN `reservation_cid` VARCHAR(10),
    IN `reservation_society` VARCHAR(50),
    IN `reservation_description` TEXT 
)
MODIFIES SQL DATA
BEGIN
    IF EXISTS 
        (SELECT '' FROM `timeslots` WHERE `weekday`=WEEKDAY(`reservation_date`) AND `id`=`reservation_timeslot`)
    THEN
        INSERT INTO `reservations`(`date`, `timeslot`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`)
        VALUES (`reservation_date`, `reservation_timeslot`, `reservation_inspection_time`, `reservation_email`, `reservation_name`, `reservation_cid` , `reservation_society`, `reservation_description`);
    ELSE
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'invalid timeslot for given date';
    END IF;
END$$

CREATE FUNCTION `is_reservation_confirmed_or_denied` (
    `reservation_id` BIGINT UNSIGNED
)
RETURNS BOOLEAN
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE `exists` BOOLEAN;
    IF EXISTS
        (WITH
            `slot` AS
            (SELECT `date`, `timeslot` FROM `reservations`
            WHERE `id`=`reservation_id`)
        SELECT '' FROM `reservations`, `confirmed_reservations`, `denied_reservations`, `slot`
        WHERE `reservations`.`id`=`confirmed_reservations`.`reservation`
        AND `reservations`.`id`=`denied_reservations`.`reservation` 
        AND `reservations`.`date`=`slot`.`date` 
        AND `reservations`.`timeslot`=`slot`.`timeslot`)
    THEN
        SET `exists`=true;
    ELSE
        SET `exists`=false;
    END IF;
    RETURN `exists`;
END$$

CREATE PROCEDURE `confirm_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    IF (is_reservation_confirmed_or_denied(`reservation_id`))        
    THEN
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = '(date, timeslot) already exists in table confirmed_reservations or denied_reservations';
    ELSE
        INSERT INTO `confirmed_reservations` VALUES (`reservation_id`);
    END IF;
END$$

CREATE PROCEDURE `deny_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    IF (is_reservation_confirmed_or_denied(`reservation_id`))  
    THEN
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = '(date, timeslot) already exists in table confirmed_reservations or denied_reservations';
    ELSE
        INSERT INTO `denied_reservations` VALUES (`reservation_id`);
    END IF;
END$$

CREATE PROCEDURE `reset_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    IF (is_reservation_confirmed_or_denied(`reservation_id`))  
    THEN
        DELETE FROM `confirmed_reservations`
        WHERE `reservation`=`reservation_id`;
        DELETE FROM `denied_reservations`
        WHERE `reservation`=`reservation_id`;
    ELSE
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = '(date, timeslot) does not exists in table confirmed_reservations or denied_reservations';
    END IF;
END$$

CREATE PROCEDURE `delete_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    DELETE FROM `reservations` WHERE `id`=`reservation_id`;
END$$