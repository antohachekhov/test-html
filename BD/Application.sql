
-- -----------------------------------------------------
-- Database Application
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS `Application` DEFAULT CHARACTER SET utf8 ;
USE `Application` ;

-- -----------------------------------------------------
-- Table `Application`.`User`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`User` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `last_name` NVARCHAR(45) NOT NULL,
  `first_name` NVARCHAR(30) NOT NULL,
  `patronymic` NVARCHAR(30) NULL,
  `nickname` NVARCHAR(30) NOT NULL,
  `password` NVARCHAR(50) NOT NULL,
  `e_mail` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(14) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE,
  UNIQUE INDEX `e_mail_UNIQUE` (`e_mail` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Application`.`Species`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Species` (
  `species_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `species_name` NVARCHAR(255) NOT NULL,
  PRIMARY KEY (`species_id`),
  UNIQUE INDEX `species_id_UNIQUE` (`species_id` ASC) VISIBLE,
  UNIQUE INDEX `species_name_UNIQUE` (`species_name` ASC) VISIBLE)
  ENGINE = InnoDB;
  
-- -----------------------------------------------------
-- Table `Application`.`Breed`
-- -----------------------------------------------------   
 
CREATE TABLE IF NOT EXISTS `Application`.`Breed` (
  `breed_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `breed_name` NVARCHAR(255) NOT NULL,
  `species_id` INT UNSIGNED NOT NULL,
  `description` NVARCHAR(255) NULL,
  PRIMARY KEY (`breed_id`),
  UNIQUE INDEX `breed_id_UNIQUE` (`breed_id` ASC) VISIBLE,
  UNIQUE INDEX `breed_name_UNIQUE` (`breed_name` ASC) VISIBLE,
  UNIQUE (`breed_name`, `species_id`),
  INDEX `breed_name_idx` (`breed_name` ASC) VISIBLE,
  INDEX `species_id_idx` (`species_id` ASC) VISIBLE,
  CONSTRAINT `species_id`
    FOREIGN KEY (`species_id`)
    REFERENCES `Application`.`Species` (`species_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Application`.`Pet`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Pet` (
  `pet_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `pet_name` NVARCHAR(30) NOT NULL,
  `pet_gender` INT NOT NULL,
  `breed_id` INT UNSIGNED NOT NULL DEFAULT 0,
  `species_id` INT UNSIGNED NULL,
  `pet_date_of_birth` DATE NULL,
  `pet_weight` FLOAT UNSIGNED NULL DEFAULT 0,
  CHECK (`pet_weight` >= 0),
  `activeness_type` INT UNSIGNED NOT NULL DEFAULT 0,
  CHECK (`activeness_type` <= 3),
  `photos` MEDIUMBLOB NULL,
  `documents` MEDIUMBLOB NULL,
  `med_info` MEDIUMBLOB NULL,
  PRIMARY KEY (`pet_id`),
  UNIQUE INDEX `pet_id_UNIQUE` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `breed_id`
    FOREIGN KEY (`breed_id`)
    REFERENCES `Application`.`Breed` (`breed_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Application`.`Owner`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Owner` (
  `owner_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `pet_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`owner_id`),
  UNIQUE INDEX `owner_id_UNIQUE` (`owner_id` ASC) VISIBLE,
  UNIQUE (`user_id`, `pet_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `pet_id_idx` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Application`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `pet_id`
    FOREIGN KEY (`pet_id`)
    REFERENCES `Application`.`Pet` (`pet_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Application`.`Food`
-- -----------------------------------------------------    
    
CREATE TABLE IF NOT EXISTS `Application`.`Food` (
	`food_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` NVARCHAR(255) NOT NULL,
    `brand` NVARCHAR(255) NOT NULL,
    `type` ENUM('wet', 'dry', 'natural'),
    `sterilised` BOOLEAN NOT NULL, 
    `age` INT UNSIGNED NOT NULL DEFAULT 0,
	`species_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`food_id`),
    UNIQUE INDEX `food_id_UNIQUE` (`food_id` ASC) VISIBLE,
    UNIQUE (`name`, `brand`),
    INDEX `name_idx` (`name` ASC) VISIBLE,
    INDEX `brand_idx` (`brand` ASC) VISIBLE,
	CONSTRAINT `food_species_id`
      FOREIGN KEY (`species_id`)
      REFERENCES `Application`.`Species`(`species_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE)
      ENGINE = InnoDB;
      
-- -----------------------------------------------------
-- Table `Application`.`Instruction`
-- ----------------------------------------------------- 

CREATE TABLE IF NOT EXISTS `Application`.`Instruction` (
	`instruction_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_id` INT UNSIGNED NOT NULL,
    `pet_weight` FLOAT UNSIGNED NOT NULL DEFAULT 0,
    `food_per_day` FLOAT UNSIGNED NOT NULL DEFAULT 0,
    `activeness_type` INT UNSIGNED NOT NULL DEFAULT 0,
    CHECK (`activeness_type` <= 3),
    PRIMARY KEY (`instruction_id`),
    UNIQUE INDEX `instruction_id_UNIQUE` 
    (`instruction_id` ASC) VISIBLE,
    UNIQUE (`food_id`, `pet_weight`, `activeness_type`),
    INDEX `food_id_idx` (`food_id` ASC) VISIBLE,
    INDEX `pet_weight_idx` (`pet_weight` ASC) VISIBLE,
    INDEX `activeness_type_idx` (`activeness_type` ASC) VISIBLE,
    CONSTRAINT `food_id`
      FOREIGN KEY (`food_id`)
      REFERENCES `Application`.`Food` (`food_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE)
      ENGINE = InnoDB;
    
-- -----------------------------------------------------
-- Table `Applicaton`.`Diet`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Diet` (
	`diet_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` NVARCHAR(30) NOT NULL DEFAULT "Стандартный рацион",
    `pet_id` INT UNSIGNED NOT NULL,
    `auto_calc_diet` BOOLEAN NOT NULL DEFAULT TRUE,
    `pet_weight` INT UNSIGNED NOT NULL DEFAULT 0,
    CHECK (`pet_weight` > 0),
    `activeness_type` INT UNSIGNED NOT NULL DEFAULT 0,
    CHECK (`activeness_type` <= 3),
    `food_id` INT UNSIGNED NOT NULL,
    `food_per_day` FLOAT UNSIGNED NOT NULL DEFAULT 0,
    CHECK ((`auto_calc_diet`= True 
    AND `food_per_day` = 0)
    OR (`auto_calc_diet` = False
    AND `food_per_day` != 0)),
	PRIMARY KEY (`diet_id`),
    UNIQUE INDEX `diet_id_UNIQUE` (`diet_id` ASC) VISIBLE,
    UNIQUE (`name`, `pet_id`),
    INDEX `name_idx` (`name` ASC) VISIBLE,
    INDEX `pet_id_idx` (`pet_id` ASC) VISIBLE,
    CONSTRAINT `diet_pet_id`
      FOREIGN KEY (`pet_id`)
      REFERENCES `Application`.`Pet` (`pet_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
	CONSTRAINT `diet_food_id`
      FOREIGN KEY (`food_id`)
      REFERENCES `Application`.`Food` (`food_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE)
      ENGINE = InnoDB;
      
-- -----------------------------------------------------
-- Table `Application`.`Portion`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Portion` (
	`portion_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `time` TIME NOT NULL,
    `portion_size` FLOAT UNSIGNED NOT NULL,
    `diet_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`portion_id`),
    UNIQUE INDEX `portion_id_UNIQUE` (`portion_id` ASC) VISIBLE,
    CONSTRAINT `portion_diet_id`
      FOREIGN KEY (`diet_id`)
      REFERENCES `Application`.`Diet` (`diet_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE)
      ENGINE = InnoDB;
      
-- -----------------------------------------------------
-- Table `Application`.`Feeding`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Feeding` (
	`feeding_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `portion_id` INT UNSIGNED NOT NULL,
    `is_fed` BOOL NOT NULL,
    `date` DATE NULL,
    PRIMARY KEY (`feeding_id`),
    UNIQUE INDEX `feeding_id_UNIQUE` (`feeding_id` ASC) VISIBLE,
    CONSTRAINT `portion_id`
      FOREIGN KEY (`portion_id`)
      REFERENCES `Application`.`Portion` (`portion_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE)
      ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Application`.`Advice`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Advice` (
	`advice_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `advice_name` NVARCHAR(57) NOT NULL,
    `advice_description` NVARCHAR(500) NOT NULL,
    `picture` MEDIUMBLOB NULL,
    PRIMARY KEY (`advice_id`),
    UNIQUE INDEX `advice_id_UNIQUE` (`advice_id` ASC) VISIBLE,
    UNIQUE INDEX `advice_description_UNIQUE` (`advice_description` ASC) VISIBLE)
    ENGINE = InnoDB;
    
-- -----------------------------------------------------
-- Table `Application`.`Advice_x_Breed`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application`.`Advice_x_Breed` (
	`common_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `advice_id` INT UNSIGNED NOT NULL,
    `breed_id` INT UNSIGNED NULL,
    PRIMARY KEY (`common_id`),
    UNIQUE INDEX `common_id_UNIQUE` (`common_id` ASC) VISIBLE,
    UNIQUE (`advice_id`, `breed_id`),
    INDEX `advice_id_idx` (`advice_id` ASC) VISIBLE,
    INDEX `breed_id_idx` (`breed_id` ASC) VISIBLE,
    CONSTRAINT `advice_id`
      FOREIGN KEY (`advice_id`)
      REFERENCES `Application`.`Advice` (`advice_id`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
	CONSTRAINT `advice_breed_id`
     FOREIGN KEY (`breed_id`)
     REFERENCES `Application`.`Breed` (`breed_id`)
     ON DELETE CASCADE
     ON UPDATE CASCADE)
	ENGINE = InnoDB;
    
-- -----------------------------------------------------
-- Trigger INSERT `Application`.`User` (`patronymic`)
-- -----------------------------------------------------

DELIMITER //
CREATE TRIGGER `insert_patronymic_null`
BEFORE INSERT
ON `User`
FOR EACH ROW
IF NEW.`patronymic` = ''  THEN
SET NEW.`patronymic` = NULL;
END IF//

-- -----------------------------------------------------
-- Trigger UPDATE `Application`.`User` (`patronymic`)
-- -----------------------------------------------------

DELIMITER //
CREATE TRIGGER `update_patronymic_null`
BEFORE UPDATE
ON `User`
FOR EACH ROW
IF NEW.`patronymic` = ''  THEN
SET NEW.`patronymic` = NULL;
END IF//

-- -----------------------------------------------------
-- Trigger INSERT `Application`.`User` (`phone`)
-- -----------------------------------------------------

DELIMITER //
CREATE TRIGGER `insert_phone_null`
BEFORE INSERT
ON `User`
FOR EACH ROW
IF NEW.`phone` = ''  THEN
SET NEW.`phone` = NULL;
END IF//

-- -----------------------------------------------------
-- Trigger UPDATE `Application`.`User` (`phone`)
-- -----------------------------------------------------

DELIMITER //
CREATE TRIGGER `update_phone_null`
BEFORE UPDATE
ON `User`
FOR EACH ROW
IF NEW.`phone` = ''  THEN
SET NEW.`phone` = NULL;
END IF//
    
-- -----------------------------------------------------
-- Trigger INSERT `Application`.`Pet` (`species_id`)
-- -----------------------------------------------------

DELIMITER //
CREATE TRIGGER `insert_species_id`
BEFORE INSERT
ON `Pet`
FOR EACH ROW
SET NEW.`species_id` = (SELECT `Breed`.`species_id` FROM `Breed`
		WHERE `Breed`.`breed_id` = NEW.`breed_id`)
//      

-- -----------------------------------------------------
-- Trigger UPDATE `Application`.`Pet` (`species_id`)
-- -----------------------------------------------------

DELIMITER //
CREATE TRIGGER `update_species_id`
BEFORE UPDATE
ON `Pet`
FOR EACH ROW
SET NEW.`species_id` = (SELECT `Breed`.`species_id` FROM `Breed`
		WHERE `Breed`.`breed_id` = NEW.`breed_id`)
//      
      
      
      


      
      
GRANT ALL
  ON `Application`.*
  TO 'root'@'db'
  WITH GRANT OPTION;

    
    
    
      
	
    
    
    


