\. ./db/tables/users.sql
\. ./db/tables/rooms.sql
\. ./db/tables/timeslots.sql
\. ./db/tables/inspection_times.sql
\. ./db/tables/reservations.sql

DELIMITER $$
\. ./db/procedures/users.sql
\. ./db/procedures/rooms.sql
\. ./db/procedures/timeslots.sql
\. ./db/procedures/inspection_times.sql
\. ./db/procedures/reservations.sql
DELIMITER ;