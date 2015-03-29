SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `MTG`
--
CREATE DATABASE IF NOT EXISTS `mtg` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mtg`;

-- --------------------------------------------------------

--
-- Structure de la table `mtgcard`
--
DROP TABLE IF EXISTS `mtgcardscolors`;
DROP TABLE IF EXISTS `mtgcolors`;
DROP TABLE IF EXISTS `mtgcardslegalities`;
DROP TABLE IF EXISTS `mtglegalities`;
DROP TABLE IF EXISTS `mtgcard`;
DROP TABLE IF EXISTS `mtgedition`;

--
-- Structure de la table `mtgedition`
--

CREATE TABLE IF NOT EXISTS `mtgedition` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_mtgedition_CODE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------


CREATE TABLE IF NOT EXISTS `mtgcard` (
  `id` int(11) NOT NULL,
  `multiverseid` int(11) DEFAULT NULL,
  `editionId` int(11) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `rarity` varchar(500) NOT NULL,
  `cmc` int(11) DEFAULT NULL,
  `manaCost` varchar(50) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `power` varchar(10) DEFAULT NULL,
  `toughness` varchar(10) DEFAULT NULL,
  `loyalty` int(11) DEFAULT NULL,
  `supertypes` varchar(1000) DEFAULT NULL,
  `types` varchar(1000) DEFAULT NULL,
  `subtypes` varchar(1000) DEFAULT NULL,
  `text` varchar(2000) DEFAULT NULL,
  `flavor` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_mtgcard_MULTIVERSEID` (`multiverseid`),
  KEY `IX_mtgcard_POWER` (`power`,`toughness`,`loyalty`),
  KEY `IX_mtgcard_MANACOST` (`cmc`,`manaCost`),
  KEY `IX_mtgcard_TYPE` (`type`,`types`(255),`subtypes`(255),`supertypes`(255)),
  CONSTRAINT `FK_mtgcard_EDITIONID` FOREIGN KEY (`editionId`) REFERENCES mtgedition(id),
  KEY `IX_mtgcard_RARITY` (`rarity`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `mtgusers`
--

CREATE TABLE `mtgusers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(45) DEFAULT NULL,
  `pseudo` varchar(30) DEFAULT NULL,
  `mail` varchar(80) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `ip` varchar(30) DEFAULT NULL,
  `mail_valid` int(11) DEFAULT '0',
  `ban` int(11) DEFAULT '0',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



--
-- Structure de la table `mtgdeck`
--
CREATE TABLE `mtg`.`mtgdeck` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_mtgusers` INT UNSIGNED NOT NULL,
  `name` VARCHAR(60) NOT NULL DEFAULT 'my deck',
  `comment` VARCHAR(300) NULL,
  `created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_mtguser_ID` FOREIGN KEY (`id_mtgusers`) REFERENCES mtgusers(id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

--
-- Structure de la table `mtglegalities`
--
CREATE TABLE `mtg`.`mtglegalities` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `format` VARCHAR(300) NULL,
  `legality` VARCHAR(300) NULL,
  PRIMARY KEY (`id`),
  KEY `IX_mtglegalities_FORMAT` (`format`(255)))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

CREATE TABLE `mtg`.`mtgcardslegalities` (
  `id_cards` int(11) NOT NULL,
  `id_legalities` INT UNSIGNED NOT NULL,
  CONSTRAINT `FK_mtgcard_ID` FOREIGN KEY (`id_cards`) REFERENCES mtgcard(id),
  CONSTRAINT `FK_mtglegalities_id` FOREIGN KEY (`id_legalities`) REFERENCES mtglegalities(id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

--
-- Structure de la table `mtgcolors`
--
CREATE TABLE `mtg`.`mtgcolors` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  KEY `IX_mtgcolors_color` (`color`(50)))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

CREATE TABLE `mtg`.`mtgcardscolors` (
  `id_cards` int(11) NOT NULL,
  `id_colors` INT UNSIGNED NOT NULL,
  CONSTRAINT `FK_mtgcard_ID` FOREIGN KEY (`id_cards`) REFERENCES mtgcard(id),
  CONSTRAINT `FK_mtgcolors_id` FOREIGN KEY (`id_colors`) REFERENCES mtgcolors(id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

commit;