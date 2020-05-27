/*
 Navicat Premium Data Transfer

 Source Server         : Local MAMP
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : teste

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 26/05/2020 16:12:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for escale_api_combos
-- ----------------------------
DROP TABLE IF EXISTS `escale_api_combos`;
CREATE TABLE `escale_api_combos` (
  `id` int(11) NOT NULL,
  `tv` varchar(255) DEFAULT NULL,
  `internet` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `celular` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
