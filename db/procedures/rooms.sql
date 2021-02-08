CREATE PROCEDURE `get_rooms` ()
READS SQL DATA
BEGIN
    SELECT `id`, `name` FROM `rooms`;
END$$

CREATE PROCEDURE `get_room_manager` (
    IN `room_id` INT UNSIGNED
)
READS SQL DATA
BEGIN 
    SELECT `manager` FROM `rooms` WHERE `id`=`room_id`;
END$$

CREATE PROCEDURE `create_room` (
    IN `room_name` VARCHAR(100),
    IN `room_manager` INT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    INSERT INTO `rooms`(`name`) VALUES (`room_name`);
END$$

CREATE PROCEDURE `update_room` (
    `room_id` INT UNSIGNED,
    `room_name` VARCHAR(100),
    `room_manager` INT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    UPDATE `rooms`
    SET `rooms`.`name`=`room_name`, `rooms`.`manager`=`room_manager`
    WHERE `rooms`.`id`=`room_id`;
END$$

CREATE PROCEDURE `delete_room` (
    IN `room_id` INT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    DELETE FROM `rooms`
    WHERE `rooms`.`id`=`room_id`;
END$$