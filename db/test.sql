DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `TEST`;

\. ./db/create.sql

INSERT INTO `rooms`(`name`) VALUES ('Focus');
INSERT INTO `rooms`(`name`) VALUES ('Hilbert');

CALL `create_timeslot`(1, '08:00:00', '10:00:00', 0, 'Timeslot 0');
CALL `create_timeslot`(1, '12:00:00', '14:00:00', 0, 'Timeslot 1');
CALL `create_timeslot`(1, '14:00:00', '16:00:00', 0, 'Timeslot 2');
CALL `create_timeslot`(1, '16:00:00', '18:00:00', 5, 'Timeslot 1');
CALL `create_timeslot`(2, '14:00:00', '16:00:00', 1, 'Timeslot 1');

CALL `create_inspection_time`('14:00:00', 1);
CALL `create_inspection_time`('16:00:00', 2);

CALL `create_reservation`('2021-01-14', 1, '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');
CALL `create_reservation`('2021-01-14', 2, '16:00:00', 'foobar@barfoo.com', 'Bar', 'dbbbaa', 'FooBarSoc', 'Event 2');
CALL `create_reservation`('2021-01-15', 1, '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 3');
CALL `create_reservation`('2021-01-15', 2, '16:00:00', 'foobar@barfoo.com', 'Bar', 'dbbbaa', 'FooBarSoc', 'Event 4');

CALL `confirm_reservation`(1);
CALL `confirm_reservation`(3);

CALL `get_pending_reservations`();
CALL `get_confirmed_reservations_for_room`(1,2021,1);