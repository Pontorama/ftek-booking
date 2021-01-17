DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `TEST`;

\. db/tables.sql
\. db/views.sql
\. db/procedures.sql


INSERT INTO `rooms` VALUES ('Focus', NULL);
INSERT INTO `rooms` VALUES ('Hilbert', NULL);

CALL `create_timeslot`('Focus', '12:00:00', '14:00:00', 0, 'Timeslot 1');
CALL `create_timeslot`('Focus', '14:00:00', '16:00:00', 0, 'Timeslot 2');
CALL `create_timeslot`('Focus', '16:00:00', '18:00:00', 5, 'Timeslot 1');
CALL `create_timeslot`('Hilbert', '14:00:00', '16:00:00', 1, 'Timeslot 1');

CALL `create_inspection_time`('14:00:00', 1);
CALL `create_inspection_time`('16:00:00', 2);

CALL `create_reservation`('2021-01-14', 1, '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 1');
CALL `create_reservation`('2021-01-14', 2, '16:00:00', 'foobar@barfoo.com', 'Bar', 'dbbbaa', 'FooBarSoc', 'Event 2');
CALL `create_reservation`('2021-01-15', 1, '14:00:00', 'foobar@barfoo.com', 'Foo', 'dbbbaa', NULL, 'Event 3');
CALL `create_reservation`('2021-01-15', 2, '16:00:00', 'foobar@barfoo.com', 'Bar', 'dbbbaa', 'FooBarSoc', 'Event 4');

CALL `confirm_reservation`(1);
CALL `confirm_reservation`(3);

CALL `get_pending_reservations`();
CALL `get_public_reservations`(2021,1);