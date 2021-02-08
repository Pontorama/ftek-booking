CREATE PROCEDURE `get_users` ()
READS SQL DATA
BEGIN
    SELECT `id`, `email`, `name`, `isAdmin`
    FROM `users`;
END$$

CREATE PROCEDURE `get_user_by_email` (
    IN `user_email` VARCHAR(100)
)
READS SQL DATA
BEGIN
    SELECT `id`, `name`, `isAdmin`, `password`
    FROM `users`
    WHERE `email`=`user_email`;
END$$

CREATE PROCEDURE `create_user` (
    IN `user_email` VARCHAR(100),
    IN `user_name` VARCHAR(50),
    IN `user_isAdmin` BOOLEAN,
    IN `user_password` VARCHAR(255)
)
MODIFIES SQL DATA
BEGIN
    INSERT INTO `users`(`email`, `name`, `isAdmin`, `password`)
    VALUES (`user_email`, `user_name`, `user_isAdmin`, `user_password`);
END$$

CREATE PROCEDURE `change_user_password` (
    IN `user_id` INT UNSIGNED,
    IN `user_password` INT UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    UPDATE `users`
    SET `users`.`password`=`user_password`
    WHERE `users`.`id`=`user_id`;
END$$

CREATE PROCEDURE `update_user` (
    IN `user_id` INT UNSIGNED,
    IN `user_email` VARCHAR(100),
    IN `user_name` VARCHAR(50),
    IN `user_isAdmin` BOOLEAN
)
MODIFIES SQL DATA
BEGIN
    UPDATE `users`
    SET `users`.`email`=`user_email`, `users`.`name`=`user_name`, `users`.`isAdmin`=`user_isAdmin`
    WHERE `users`.`id`=`user_id`;
END$$

CREATE PROCEDURE `delete_user` (
    IN `user_id` INTEGER UNSIGNED
)
MODIFIES SQL DATA
BEGIN
    DELETE FROM `users` 
    WHERE `users`.`id`=`user_id`;
END$$