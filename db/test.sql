DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `TEST`;

\. db/tables.sql
\. db/views.sql
\. db/procedures.sql

INSERT INTO `users`(`email`, `name`, `password`) VALUES ('foo@bar.se', 'FooBar', 'SomePassword');

INSERT INTO `rooms` VALUES ('Focus', 'foo@bar.se');
INSERT INTO `rooms` VALUES ('Hilbert', 'foo@bar.se');

INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Focus', '12:00:00', '14:00:00', 0);
INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Focus', '14:00:00', '16:00:00', 0);
INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Focus', '16:00:00', '18:00:00', 5);
INSERT INTO `timeslots`(`room`, `from`, `to`, `weekday`) VALUES ('Hilbert', '14:00:00', '16:00:00', 1);

INSERT INTO `inspection_times` VALUES ('14:00:00', 1, 'Focus');
INSERT INTO `inspection_times` VALUES ('16:00:00', 2, 'Focus');

INSERT INTO `reservations`(`date`, `timeslot`, `room`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`) VALUES ('2021-01-14', 1, 'Focus', '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');
INSERT INTO `reservations`(`date`, `timeslot`, `room`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`) VALUES ('2021-01-14', 2, 'Focus', '16:00:00', 'foobar@barfoo.com', 'Bar', 'dbbbaa', 'FooBarSoc', 'Event 2');
INSERT INTO `reservations`(`date`, `timeslot`, `room`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`) VALUES ('2021-01-15', 1, 'Focus', '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 3');
INSERT INTO `reservations`(`date`, `timeslot`, `room`, `inspection_time`, `email`, `name`, `cid` , `society`, `description`) VALUES ('2021-01-15', 2, 'Focus', '16:00:00', 'foobar@barfoo.com', 'Bar', 'dbbbaa', 'FooBarSoc', 'Event 4');
