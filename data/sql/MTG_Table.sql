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
-- Structure de la table `MTGCARD`
--

DROP TABLE IF EXISTS `MTGCARD`;
CREATE TABLE IF NOT EXISTS `MTGCARD` (
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
  KEY `IX_MTGCARD_MULTIVERSEID` (`multiverseid`),
  KEY `IX_MTGCARD_POWER` (`power`,`toughness`,`loyalty`),
  KEY `IX_MTGCARD_MANACOST` (`cmc`,`manaCost`),
  KEY `IX_MTGCARD_TYPE` (`type`,`types`(255),`subtypes`(255),`supertypes`(255)),
  KEY `FK_MTGCARD_EDITIONID` (`editionId`),
  KEY `IX_MTGCARD_RARITY` (`rarity`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `MTGEDITION`
--

DROP TABLE IF EXISTS `MTGEDITION`;
CREATE TABLE IF NOT EXISTS `MTGEDITION` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_MTGEDITION_CODE` (`code`)
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


