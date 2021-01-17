CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER UNSIGNED AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `user_unique_email` UNIQUE (`email`)
);
