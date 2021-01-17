CREATE PROCEDURE `create_inspection_time` (
    IN `p_time` TIME,
    IN `p_timeslot` INT UNSIGNED
)
BEGIN
    INSERT INTO `inspection_times`(`time`, `timeslot`) VALUES (`p_time`, `p_timeslot`);
END$$

CREATE PROCEDURE `get_inspection_times` (
    IN `p_timeslot` INT UNSIGNED
)
BEGIN
    SELECT `time` FROM `inspection_times` WHERE `timeslot`=`p_timeslot`;
END$$

CREATE PROCEDURE `delete_inspection_time` (
    IN `p_time` TIME,
    IN `p_timeslot` INT UNSIGNED
)
BEGIN
    DELETE FROM `timeslots` WHERE `time`=`p_time` AND `timeslot`=`p_timeslot`;
END$$