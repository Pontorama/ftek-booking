CREATE PROCEDURE `create_user` (
    IN `p_email` VARCHAR(100),
    IN `p_name` VARCHAR(50),
    IN `p_isAdmin` BOOLEAN,
    IN `p_password` VARCHAR(255)
)
BEGIN
    INSERT INTO `users`(`email`, `name`, `isAdmin`, `password`) VALUES (`p_email`, `p_name`, `p_isAdmin`, `p_password`);
END$$

CREATE PROCEDURE `delete_user` (
    IN `p_id` INTEGER UNSIGNED
)
BEGIN
    DELETE FROM `users` WHERE `id`=`p_id`;
END$$

CREATE PROCEDURE `get_user_by_email` (
    IN `p_email` VARCHAR(100)
)
BEGIN
    SELECT `id`, `name`, `isAdmin`, `password` FROM `users` WHERE `email`=`p_email`;
END$$