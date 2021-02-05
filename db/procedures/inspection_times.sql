CREATE PROCEDURE `get_inspection_times` (
    IN `inspection_time_timeslot` INT UNSIGNED
)
BEGIN
    SELECT `time`
    FROM `inspection_times`
    WHERE `timeslot`=`inspection_time_timeslot`;
END$$

CREATE PROCEDURE `create_inspection_time` (
    IN `inspection_time_time` TIME,
    IN `inspection_time_timeslot` INT UNSIGNED
)
BEGIN
    INSERT INTO `inspection_times`(`time`, `timeslot`) 
    VALUES (`inspection_time_time`, `inspection_time_timeslot`);
END$$

CREATE PROCEDURE `delete_inspection_time` (
    IN `inspection_time_time` TIME,
    IN `inspection_time_timeslot` INT UNSIGNED
)
BEGIN
    DELETE FROM `timeslots`
    WHERE `time`=`inspection_time_time`
    AND `timeslot`=`inspection_time_timeslot`;
END$$