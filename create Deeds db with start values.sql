CREATE SCHEMA IF NOT EXISTS `deedsdb` DEFAULT CHARACTER SET utf8 ;
USE `deedsdb` ;

-- -----------------------------------------------------
-- Table `deedsdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deedsdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `discordId` VARCHAR(45) NOT NULL,
  `username` VARCHAR(25) NOT NULL,
  `avatar` VARCHAR(245) NOT NULL,
  PRIMARY KEY (`id`, `discordId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deedsdb`.`deeds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deedsdb`.`deeds` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `deedName` VARCHAR(45) NOT NULL,
  `goal` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deedsdb`.`users_progressions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deedsdb`.`users_progressions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `deedId` INT NOT NULL,
  `userId` INT NOT NULL,
  `progress` INT NOT NULL,
  PRIMARY KEY (`id`, `userId`, `deedId`),
  INDEX `deedId_idx` (`deedId` ASC) VISIBLE,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `deedId`
    FOREIGN KEY (`deedId`)
    REFERENCES `deedsdb`.`deeds` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `deedsdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;