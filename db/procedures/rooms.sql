CREATE PROCEDURE `create_room` (
    IN `p_name` VARCHAR(100)
)
BEGIN
    INSERT INTO `rooms`(`name`) VALUES (`p_name`);
END$$

CREATE PROCEDURE `delete_room` (
    IN `p_id` INT UNSIGNED
)
BEGIN
    DELETE FROM `rooms` WHERE `id`=`p_id`;
END$$

CREATE PROCEDURE `get_rooms` ()
BEGIN
    SELECT `id`, `name` FROM `rooms`;
END$$

CREATE PROCEDURE `add_room_manager` (
    IN `room_id` INT UNSIGNED,
    IN `user_id` INT UNSIGNED
)
BEGIN
    UPDATE `rooms` SET `manager`=`user_id` WHERE `id`=`room_id`;
END$$

CREATE PROCEDURE `get_room_manager` (
    IN `room_id` INT UNSIGNED
)
BEGIN 
    SELECT `manager` FROM `rooms` WHERE `id`=`room_id`;
END$$