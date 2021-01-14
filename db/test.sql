DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `TEST`;

\. db/tables.sql
\. db/triggers.sql

INSERT INTO `users`(`email`, `name`, `password`) VALUES ('foo@bar.se', 'FooBar', 'SomePassword');

INSERT INTO `rooms` VALUES ('Focus', 'foo@bar.se');
INSERT INTO `rooms` VALUES ('Hilbert', 'foo@bar.se');

INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Focus', '12:00:00', '14:00:00', 0);
INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Focus', '14:00:00', '16:00:00', 0);
INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Focus', '16:00:00', '18:00:00', 5);
INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Hilbert', '14:00:00', '16:00:00', 1);

DELETE FROM `timeslots` WHERE `room`='Focus' AND `id`=2;
SELECT * FROM `timeslots`;

INSERT INTO `inspection_times` VALUES ('15:00:00', 1, 'Focus');
INSERT INTO `inspection_times` VALUES ('16:00:00', 1, 'Focus');

INSERT INTO `reservations` VALUES ('2021-01-14', 1, 'Focus', '16:00:00', 'foobar@barfoo.com', 'FB', NULL, 'Some Event');