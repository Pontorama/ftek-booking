\. ./tables/users.sql
\. ./tables/rooms.sql
\. ./tables/timeslots.sql
\. ./tables/inspection_times.sql
\. ./tables/reservations.sql

DELIMITER $$
\. ./procedures/users.sql
\. ./procedures/rooms.sql
\. ./procedures/timeslots.sql
\. ./procedures/inspection_times.sql
\. ./procedures/reservations.sql
DELIMITER ;