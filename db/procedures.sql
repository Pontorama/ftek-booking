DELIMITER $$

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
    INSERT INTO `confirmed_reservations` VALUES (`reservation_id`);
END$$

CREATE PROCEDURE `unconfirm_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
BEGIN
    DELETE FROM `confirmed_reservations` 

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

CREATE PROCEDURE `delete_reservation` (
    IN `reservation_id` BIGINT UNSIGNED
)
BEGIN
    DELETE FROM `reservations` WHERE `id`=`reservation_id`;
END$$

DELIMITER ;

