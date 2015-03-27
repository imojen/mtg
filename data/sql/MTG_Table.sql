SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `MTG`
--
CREATE DATABASE IF NOT EXISTS `MTG` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `MTG`;

-- --------------------------------------------------------

--
-- Structure de la table `mtgcard`
--

DROP TABLE IF EXISTS `mtgcard`;
CREATE TABLE IF NOT EXISTS `mtgcard` (
  `id` int(11) NOT NULL,
  `multiverseid` int(11) DEFAULT NULL,
  `editionId` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `rarity` varchar(500) NOT NULL,
  `cmc` int(11) DEFAULT NULL,
  `manaCost` varchar(50) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `power` int(11) DEFAULT NULL,
  `toughness` int(11) DEFAULT NULL,
  `loyalty` int(11) DEFAULT NULL,
  `supertypes` varchar(500) DEFAULT NULL,
  `types` varchar(500) DEFAULT NULL,
  `subtypes` varchar(500) DEFAULT NULL,
  `legalities` varchar(500) DEFAULT NULL,
  `text` varchar(500) DEFAULT NULL,
  `flavor` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_mtgcard_MULTIVERSEID` (`multiverseid`),
  KEY `IX_mtgcard_POWER` (`power`,`toughness`,`loyalty`),
  KEY `IX_mtgcard_MANACOST` (`cmc`,`manaCost`),
  KEY `IX_mtgcard_TYPE` (`type`,`types`(255),`subtypes`(255),`supertypes`(255)),
  KEY `FK_mtgcard_EDITIONID` (`editionId`),
  KEY `IX_mtgcard_RARITY` (`rarity`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `mtgedition`
--

DROP TABLE IF EXISTS `mtgedition`;
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

--
-- Structure de la table `mtgusers`
--

DROP TABLE IF EXISTS `mtgusers`;
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
  `updated` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `id_mtgusers`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;
