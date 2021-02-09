DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `TEST`;

\. ./db/create.sql

INSERT INTO `rooms`(`name`) VALUES ('Focus');
INSERT INTO `rooms`(`name`) VALUES ('Hilbert');

CALL `create_timeslot`(1, '08:00:00', '10:00:00', 1, 'Timeslot 0');
CALL `create_timeslot`(1, '12:00:00', '14:00:00', 1, 'Timeslot 1');
CALL `create_timeslot`(1, '14:00:00', '16:00:00', 1, 'Timeslot 2');
CALL `create_timeslot`(1, '16:00:00', '18:00:00', 2, 'Timeslot 0');
CALL `create_timeslot`(1, '14:00:00', '16:00:00', 2, 'Timeslot 1');

SELECT * from `timeslots`;

CALL `create_inspection_time`('10:00:00', 1);
CALL `create_inspection_time`('14:00:00', 2);
CALL `create_inspection_time`('18:00:00', 4);

CALL `create_reservation`('2021-01-11', 1, '10:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');
CALL `create_reservation`('2021-01-11', 1, '10:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');
CALL `create_reservation`('2021-01-11', 2, '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');
CALL `create_reservation`('2021-01-12', 4, '18:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');

CALL `confirm_reservation`(1);
CALL `confirm_reservation`(3);
CALL `confirm_reservation`(4);

CALL `get_pending_reservations`('2021-01-05');
CALL `get_confirmed_reservations_by_room_and_month`(1,2021,1);