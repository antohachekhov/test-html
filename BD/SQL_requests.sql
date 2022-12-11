-- ---------------------------------------------------
-- Экран входа в приложение
-- ---------------------------------------------------

SELECT `user_id` FROM `User`
WHERE (`e_mail` = e_mail_var 
XOR `phone` =  phone_var)
AND `password` = password_var;

-- ---------------------------------------------------
-- Экран регистрации пользователя
-- ---------------------------------------------------

INSERT INTO User (`last_name`, `first_name`,
	`patronymic`, `nickname`, `password`,
    `e_mail`, `phone`)
VALUES (last_name_var, first_name_var, patronymic_var,
	nickname_var, password_var, e_mail_var, phone_var);
    
-- ---------------------------------------------------
-- Экран регистрации питомца
-- ---------------------------------------------------

INSERT INTO Pet (`pet_name`, `pet_gender`,
	`breed_id`, `pet_date_of_birth`,
    `pet_weight`, `activeness_type` ,`photos`, 
    `documents`, `med_info`)
VALUES (pet_name_var, pet_gender_var, breed_id_var,
	pet_date_of_birth_var, pet_weight_var, activeness_type_var,
    photos_var, documents_var, med_info_var);
    
-- Добавить связь между хозяином и питомцем    
    
INSERT INTO Owner (`User_id`, `Pet_id`)
VALUES (user_id_var, pet_id_var);

-- ---------------------------------------------------
-- Экран профиль пользователя (есть питомец)
-- ---------------------------------------------------

-- Вывести данные пользователя

SELECT `nickname`, `last_name`, `first_name`,
	`patronymic`
FROM User
WHERE `user_id` = user_id_var;

-- Вывести избранный совет	

SELECT `advice_name`, `advice_description`, `picture` 
FROM `Advice`
JOIN `Advice_x_Breed` 
ON `Advice`.`advice_id` = `Advice_x_Breed`.`advice_id`
JOIN `Pet` ON `Pet`.`breed_id` = `Advice_x_Breed`.`breed_id`
WHERE `pet_id` = pet_id_var;

-- Вывести данные питомца

SELECT `pet_name`, `breed_id`, `pet_gender`, 
	(YEAR(CURRENT_DATE)-YEAR(`pet_date_of_birth`))
	-(RIGHT(CURRENT_DATE,5)<RIGHT(`pet_date_of_birth`,5)) 
    AS `pet_age`
FROM Pet
WHERE `pet_id` IN 
	(SELECT `pet_id` FROM Owner
	WHERE `user_id` = user_id_var);

-- ---------------------------------------------------
-- Экран профиль пользователя (нет питомца)
-- ---------------------------------------------------

-- Вывести данные пользователя

SELECT `nickname`, `last_name`, `first_name`,
	`patronymic`
FROM User
WHERE `user_id` = user_id_var;

-- ---------------------------------------------------
-- Экран список питомцев пользователя
-- ---------------------------------------------------

SELECT
	`pet_name`,
	`breed_id`,
	(YEAR(CURRENT_DATE)-YEAR(`pet_date_of_birth`))
	-(RIGHT(CURRENT_DATE,5)<RIGHT(`pet_date_of_birth`,5)) 
    AS `pet_age`
FROM Pet 
WHERE `pet_id` IN 
	(SELECT `pet_id` FROM Owner
	WHERE `user_id` = user_id_var)
ORDER BY `pet_name`;

-- ---------------------------------------------------
-- Экран профиль питомца
-- ---------------------------------------------------

SELECT `pet_name`, `pet_gender`,
	`breed_id`, `pet_date_of_birth`,
    `pet_weight`, `photos`, `documents`, `med_info`
FROM Pet
WHERE `pet_id` = pet_id_var
AND `pet_id` IN 
	(SELECT `pet_id` FROM Owner
	WHERE `user_id` = user_id_var);

-- ---------------------------------------------------
-- Экран "Выбор корма"
-- ---------------------------------------------------

SELECT `name`, `brand`, `type`, `species_name`, `sterilised` 
FROM `Food`
JOIN `Species` ON `Food`.`species_id` = `Species`.`species_id`
WHERE `Species`.`species_id` = species_id_var;

-- ---------------------------------------------------
--  Экран выбора рациона
-- ---------------------------------------------------

-- Окно "выбранный корм"

SELECT `name`, `brand`, `type`, `species_name`, `sterilised` 
FROM `Food`
JOIN `Species` ON `Food`.`species_id` = `Species`.`species_id`
WHERE `Food`.`food_id` = food_id_var;


-- Окно "введите данные для расчета" 

INSERT INTO `Diet` (`name`, `pet_id`, `auto_calc_diet`, 
					`pet_weight`,
					`activeness_type`, `food_id`, `food_per_day`)
VALUES (name_var, pet_id_var, auto_calc_diet_var, 
		pet_weight_var, activeness_type_var, 
		food_id_var, food_per_day_var);

-- ---------------------------------------------------
-- Экран рациона
-- ---------------------------------------------------

-- Окно "Корм"

SELECT `name`, `brand`, `type`, `species_name`, `sterilised` 
FROM `Food`
JOIN `Species` ON `Food`.`species_id` = `Species`.`species_id`
WHERE `Food`.`food_id` = food_id_var;

-- Окно "расчетные данные" 

SELECT `pet_weight`, `activeness_type` FROM `Diet`
WHERE `Diet`.`diet_id` = diet_id_var;

-- Окно "суточный размер"

-- Размер указан пользователем

SELECT `food_per_day` FROM `Diet`
WHERE `diet_id` = diet_id_var;

-- Размер генерируется автоматически

SELECT `Instruction`.`food_per_day`
FROM `Instruction` 
JOIN `Diet` 
ON `Instruction`.`food_id` = `Diet`.`Food_id`
	WHERE `diet_id` =  diet_id_var
	AND `Diet`.`activeness_type` = `Instruction`.`activeness_type`
    ORDER BY ABS(`Instruction`.`pet_weight` - `Diet`.`pet_weight`)
    LIMIT 1;

-- Окно "порции"

INSERT INTO `Portion` (`time`, `portion_size`, `diet_id`)
VALUES (time_var, portion_size_var, diet_id_var);

-- ---------------------------------------------------
-- Редактировать название рациона
-- ---------------------------------------------------

UPDATE `Diet` SET `name` = new_name
WHERE `diet_id` = diet_id;

-- ---------------------------------------------------
-- Редактировать порции рациона
-- ---------------------------------------------------

UPDATE `Portion` 
SET `time` = new_time, `portion_size` = new_portion_size
WHERE `portion_id` = portion_id;

-- ---------------------------------------------------
-- Удалить порции рациона
-- ---------------------------------------------------

DELETE FROM `Portion`
WHERE `portiod_id` = portion_id;

-- ---------------------------------------------------
-- Удалить рацион
-- ---------------------------------------------------

DELETE FROM `Diet`
WHERE `diet_id` = diet_id;

-- ---------------------------------------------------
-- Экран рационы питания
-- ---------------------------------------------------

SELECT `Diet`.`name`, `Food`.`name`, 
		`Diet`.`pet_weight`, `Diet`.`activeness_type`
FROM `Diet` JOIN `Food`
ON `Food`.`food_id` = `Diet`.`diet_id`
WHERE `Diet`.`pet_id` = pet_id_var;

-- Размер указан пользователем

SELECT `food_per_day` FROM `Diet`
WHERE `diet_id` = diet_id_var;

-- Размер генерируется автоматически

SELECT `Instruction`.`food_per_day` 
FROM `Diet`
JOIN `Instruction` ON `Instruction`.`food_id` = `Diet`.`food_id`
	WHERE `diet_id` = diet_id_var
    AND `Diet`.`activeness_type` = `Instruction`.`activeness_type`
    ORDER BY ABS(`Instruction`.`pet_weight` - `Diet`.`pet_weight`)
    LIMIT 1;
    
-- ---------------------------------------------------
-- Экран смены пароля
-- ---------------------------------------------------

UPDATE `User` SET `password` = new_password
WHERE `user_id` = user_id
AND `password` = old_password;

-- ---------------------------------------------------
-- Экран "общий доступ к питомцу"
-- ---------------------------------------------------

SELECT `user_id` FROM `User`
WHERE `nickname` = nickname_var;

INSERT INTO `Owner` (`user_id`, `pet_id`)
VALUES (new_user_id_var,
        pet_id_var);
        
-- ---------------------------------------------------
-- Окно выбор совета
-- ---------------------------------------------------

SELECT `advice_name`, `advice_description`, `picture` 
FROM `Advice`
JOIN `Advice_x_Breed` 
ON `Advice`.`advice_id` = `Advice_x_Breed`.`advice_id`
JOIN `Pet` ON `Pet`.`breed_id` = `Advice_x_Breed`.`breed_id`
WHERE `pet_id` = pet_id_var;

-- ---------------------------------------------------
-- Редактировать профиль пользователя
-- ---------------------------------------------------

UPDATE `User`
SET `last_name` = last_name_var, 
	`first_name` = first_name_var,
	`patronymic` = patronymic_var, 
    `nickname` = nickname_var,
    `e_mail` = e_mail_var, 
    `phone` = phone_var
WHERE `user_id` = user_id_var;

-- ---------------------------------------------------
-- Редактировать профиль питомца
-- ---------------------------------------------------

UPDATE `Pet`
SET `pet_name` = pet_name_var, 
	`pet_gender` = pet_gender_var,
	`breed_id` = breed_id_var, 
    `pet_date_of_birth` = pet_date_of_birth_var,
    `pet_weight` = pet_weight_var, 
    `photos` = photos_var, 
    `documents` = documents_var,
    `med_info` = med_info_var
WHERE `pet_id` = pet_id_var;

-- ---------------------------------------------------
-- Сделать совет избранным
-- ---------------------------------------------------

INSERT INTO `Selected_advice` (`advice_id`, `pet_id`)
VALUES (advice_id_var, pet_id_var);

-- ---------------------------------------------------
-- Добавить новый вид в таблицу видов
-- ---------------------------------------------------

INSERT INTO `Species` (`species_name`)
VALUES (species_name_var);

-- ---------------------------------------------------
-- Добавить новую породу в таблицу пород
-- ---------------------------------------------------

INSERT INTO `Breed` (`breed_name`, `species_id`,  `description`)
VALUES (breed_name_var, species_id_var, description_var);
        
-- ---------------------------------------------------
-- Отметить корм как стерилизованный
-- ---------------------------------------------------

INSERT INTO `Food_for_sterilised` (`food_id`)
VALUES (food_id_var);











        
        

