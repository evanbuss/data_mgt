CREATE DATABASE  IF NOT EXISTS `lims4` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `lims4`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `activation_code` varchar(45) DEFAULT NULL,
  `password_reset_code` varchar(45) DEFAULT NULL,
  `password_reset_time` varchar(45) DEFAULT NULL,
  `gravatar` varchar(100) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT DEFAULT NULL,
  `table_id` INT DEFAULT NULL,
  `table_name` VARCHAR(255) DEFAULT NULL,
  `category_name` VARCHAR(255) DEFAULT NULL,
  `created_by` VARCHAR(45) DEFAULT NULL,
  `created_at` VARCHAR(45) DEFAULT NULL,
  `updated_at` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `pcr_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `IDbyDNA_id` int(11) DEFAULT NULL,
  `Arup_Mnemonic` varchar(45) DEFAULT NULL,
  `test` varchar(45) DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `source_value` varchar(45) DEFAULT NULL,
  `organism` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=latin1;

CREATE TABLE `original_pcr_results` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `category_id` INT DEFAULT NULL,
    `table_id` int(11) DEFAULT NULL,
    `IDbyDNA_id` int(11) DEFAULT NULL,
    `accession` varchar(45) DEFAULT NULL,
    `patient_name` varchar(45) DEFAULT NULL,
    `order_test_mnemonic` varchar(45) DEFAULT NULL,
    `age` varchar(45) DEFAULT NULL,
    `sex` varchar(45) DEFAULT NULL,
    `client_id` varchar(45) DEFAULT NULL,
    `state` varchar(45) DEFAULT NULL,
    `zip_code` varchar(45) DEFAULT NULL,
    `collection_month` varchar(45) DEFAULT NULL,
    `collection_year` varchar(45) DEFAULT NULL,
    `collect_to_complete_total_hours` varchar(45) DEFAULT NULL,
    `specimen_type_code` varchar(45) DEFAULT NULL,
    `discard_date` varchar(45) DEFAULT NULL,
    `BORD_Source` varchar(45) DEFAULT NULL,
    `BParaPert` varchar(45) DEFAULT NULL,
    `BORD_TM` varchar(45) DEFAULT NULL,
    `BordPert_Source` varchar(45) DEFAULT NULL,
    `BPert` varchar(45) DEFAULT NULL,
    `NC_CT_BORD` varchar(45) DEFAULT NULL,
    `CHLAM_PNEUM_PCR` varchar(45) DEFAULT NULL,
    `CPneumo_Source` varchar(45) DEFAULT NULL,
    `NC_CT_CPNEU` varchar(45) DEFAULT NULL,
    `CWP_Result` varchar(45) DEFAULT NULL,
    `CWP_Source` varchar(45) DEFAULT NULL,
    `NC_CWP` varchar(45) DEFAULT NULL,
    `L_pneumophila` varchar(45) DEFAULT NULL,
    `L_species` varchar(45) DEFAULT NULL,
    `LEGION_Source` varchar(45) DEFAULT NULL,
    `NC_CT_L_pneumo` varchar(45) DEFAULT NULL,
    `NC_CT_L_species` varchar(45) DEFAULT NULL,
    `MPNEUMOPCR` varchar(45) DEFAULT NULL,
    `Myco_Source` varchar(45) DEFAULT NULL,
    `NC_CT_MPNEU` varchar(45) DEFAULT NULL,
    `NC_CT_PARAFLU` varchar(45) DEFAULT NULL,
    `PARAFLU_Source` varchar(45) DEFAULT NULL,
    `PARAFLU1_Result` varchar(45) DEFAULT NULL,
    `PARAFLU2_Result` varchar(45) DEFAULT NULL,
    `PARAFLU3_Result` varchar(45) DEFAULT NULL,
    `PARAFLU4_Result` varchar(45) DEFAULT NULL,
    `NC_CT_PCP` varchar(45) DEFAULT NULL,
    `PCP_Result` varchar(45) DEFAULT NULL,
    `PCP_Source` varchar(45) DEFAULT NULL,
    `PNEUM_SRC` varchar(45) DEFAULT NULL,
    `Pneumst` varchar(45) DEFAULT NULL,
    `PNEUMST_REFLEX` varchar(45) DEFAULT NULL,
    `Flu_A_PCR` varchar(45) DEFAULT NULL,
    `Flu_B_PCR` varchar(45) DEFAULT NULL,
    `NC_CT_RespMini` varchar(45) DEFAULT NULL,
    `RespMini_Source` varchar(45) DEFAULT NULL,
    `RespMini_TM` varchar(45) DEFAULT NULL,
    `RSV_PCR` varchar(45) DEFAULT NULL,
    `Adenov` varchar(45) DEFAULT NULL,
    `Flu_A` varchar(45) DEFAULT NULL,
    `Flu_B` varchar(45) DEFAULT NULL,
    `HMPV` varchar(45) DEFAULT NULL,
    `Pflu_1` varchar(45) DEFAULT NULL,
    `Pflu_2` varchar(45) DEFAULT NULL,
    `Pflu_3` varchar(45) DEFAULT NULL,
    `RS_V` varchar(45) DEFAULT NULL,
    `RSPFA_Source` varchar(45) DEFAULT NULL,
    `T_Media` varchar(45) DEFAULT NULL,
    `Adeno_B_E` varchar(45) DEFAULT NULL,
    `Adeno_C` varchar(45) DEFAULT NULL,
    `HMPV_RESULT` varchar(45) DEFAULT NULL,
    `Inf_A_2009` varchar(45) DEFAULT NULL,
    `Influenza_A` varchar(45) DEFAULT NULL,
    `Influenza_A_H1` varchar(45) DEFAULT NULL,
    `Influenza_A_H3` varchar(45) DEFAULT NULL,
    `Influenza_B` varchar(45) DEFAULT NULL,
    `Parainfluenza_1` varchar(45) DEFAULT NULL,
    `Parainfluenza_2` varchar(45) DEFAULT NULL,
    `Parainfluenza_3` varchar(45) DEFAULT NULL,
    `Rhino` varchar(45) DEFAULT NULL,
    `RSV_A` varchar(45) DEFAULT NULL,
    `RSV_B` varchar(45) DEFAULT NULL,
    `RVP_Source` varchar(45) DEFAULT NULL,
    `collection_when` varchar(45) DEFAULT NULL,
    `ver_when` varchar(45) DEFAULT NULL,
    `discardable_when` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=latin1;


CREATE TABLE `original_culture_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `IDbyDNA_id` varchar(45) DEFAULT NULL,
  `checked_out` varchar(45) DEFAULT NULL,
  `test_mnemonic` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `collection_month` varchar(45) DEFAULT NULL,
  `collection_year` varchar(45) DEFAULT NULL,
  `collect_to_complete_hours` varchar(45) DEFAULT NULL,
  `general_source` varchar(45) DEFAULT NULL,
  `body_site_source` varchar(45) DEFAULT NULL,
  `source_chart_name` varchar(45) DEFAULT NULL,
  `is_culture_positive` varchar(45) DEFAULT NULL,
  `organism_mnemonic` varchar(45) DEFAULT NULL,
  `result_long_text` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `culture_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `IDbyDNA_id` varchar(45) DEFAULT NULL,
  `checked_out` varchar(45) DEFAULT NULL,
  `test_mnemonic` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `collection_month` varchar(45) DEFAULT NULL,
  `collection_year` varchar(45) DEFAULT NULL,
  `collect_to_complete_hours` varchar(45) DEFAULT NULL,
  `general_source` varchar(45) DEFAULT NULL,
  `body_site_source` varchar(45) DEFAULT NULL,
  `source_chart_name` varchar(45) DEFAULT NULL,
  `is_culture_positive` varchar(45) DEFAULT NULL,
  `organism_mnemonic` varchar(45) DEFAULT NULL,
  `result_long_text` TEXT DEFAULT NULL,
  `test_code` varchar(45) DEFAULT NULL,
  `test_name` varchar(45) DEFAULT NULL,
  `organism` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `look_up` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_code` varchar(45) DEFAULT NULL,
  `test_name` text,
  `test_organism` varchar(255) DEFAULT NULL,
  `test_mnemonic` varchar(45) DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `look_up_robert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organism_mnemonic` varchar(45) DEFAULT NULL,
  `organism` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `plot_organisms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` INT DEFAULT NULL,
  `category_id` INT DEFAULT NULL,
  `table_id` INT DEFAULT NULL,
  `Unknown` INT DEFAULT NULL,
  `Bacillus` INT DEFAULT NULL,
  `Influenza Virus A and B` INT DEFAULT NULL,
  `Legionella` INT DEFAULT NULL,
  `Nocardia` INT DEFAULT NULL,
  `Ureaplasma Species and Mycoplasma hominis` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `plot_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` INT DEFAULT NULL,
  `category_id` INT DEFAULT NULL,
  `table_id` INT DEFAULT NULL,
  `positive` INT DEFAULT NULL,
  `negitive` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

