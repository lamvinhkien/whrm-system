CREATE DATABASE  IF NOT EXISTS `jwt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jwt`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: jwt
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'Admin','Admin','2024-07-15 11:59:35','2024-11-20 07:42:33'),(2,'None','None','2024-07-15 11:59:35','2024-11-20 07:42:33'),(29,'Manager','Manager','2024-12-20 08:03:56','2024-12-20 08:03:56'),(30,'Employee','Employee','2024-12-20 08:03:56','2024-12-20 08:03:56');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_role`
--

DROP TABLE IF EXISTS `group_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupId` int DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_group_group_role` (`groupId`),
  CONSTRAINT `fk_group_group_role` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=591 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_role`
--

LOCK TABLES `group_role` WRITE;
/*!40000 ALTER TABLE `group_role` DISABLE KEYS */;
INSERT INTO `group_role` VALUES (531,1,40,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(532,1,43,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(533,1,4,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(534,1,46,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(535,1,42,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(536,1,48,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(537,1,16,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(538,1,44,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(539,1,12,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(540,1,47,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(541,1,17,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(542,1,41,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(543,1,15,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(544,1,45,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(545,1,1,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(546,1,52,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(547,1,54,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(548,1,53,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(549,1,49,'2024-12-20 07:27:12','2024-12-20 07:27:12'),(579,30,50,'2024-12-20 08:40:49','2024-12-20 08:40:49'),(580,30,51,'2024-12-20 08:40:49','2024-12-20 08:40:49'),(581,30,45,'2024-12-20 08:40:49','2024-12-20 08:40:49'),(583,29,46,'2024-12-20 08:41:29','2024-12-20 08:41:29'),(584,29,48,'2024-12-20 08:41:29','2024-12-20 08:41:29'),(586,29,47,'2024-12-20 08:41:29','2024-12-20 08:41:29'),(588,29,45,'2024-12-20 08:41:29','2024-12-20 08:41:29'),(589,29,49,'2024-12-20 08:41:29','2024-12-20 08:41:29');
/*!40000 ALTER TABLE `group_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'/user/show-all','View all users','2024-06-24 16:31:32','2024-08-03 05:03:15'),(4,'/user/create','Create new user','2024-07-25 09:22:03','2024-08-02 08:59:42'),(12,'/role/update','Update role','2024-08-01 09:32:24','2024-08-02 09:00:07'),(15,'/role/show-all','View all roles','2024-08-01 15:52:25','2024-08-01 15:52:25'),(16,'/user/delete','Delete user','2024-08-02 09:00:37','2024-08-02 09:00:37'),(17,'/user/update','Update user','2024-08-02 09:00:37','2024-08-02 09:00:37'),(40,'/group/assign-role-for-group','Assign role for group','2024-08-06 07:54:58','2024-09-08 23:48:42'),(41,'/group/show-all-with-pagination','View all groups','2024-08-07 08:36:34','2024-08-07 08:36:34'),(42,'/group/delete','Delete group','2024-08-07 08:46:39','2024-08-07 08:46:39'),(43,'/group/create','Create group','2024-08-07 08:46:39','2024-08-07 08:46:39'),(44,'/group/update','Update group','2024-08-07 08:46:39','2024-08-07 09:11:31'),(45,'/task/show-all','View all tasks','2024-11-25 12:00:00','2024-11-25 12:00:00'),(46,'/task/create','Create task','2024-11-25 12:00:00','2024-11-25 12:00:00'),(47,'/task/update','Update task','2024-11-25 12:00:00','2024-11-25 12:00:00'),(48,'/task/delete','Delete task','2024-11-25 12:00:00','2024-11-25 12:00:00'),(49,'/task/show-all-report-by-manager','View task report','2024-11-25 12:00:00','2024-11-25 12:00:00'),(50,'/task/create-report','Create task report','2024-11-25 12:00:00','2024-11-25 12:00:00'),(51,'/task/delete-report','Delete task report','2024-11-25 12:00:00','2024-11-25 12:00:00'),(52,'/group/show-all-for-assign','View groups assign','2024-11-25 12:00:00','2024-11-25 12:00:00'),(53,'/group/get-group-with-roles','View roles by group','2024-11-25 12:00:00','2024-11-25 12:00:00'),(54,'/role/show-all-for-assign','View roles assign','2024-11-25 12:00:00','2024-11-25 12:00:00');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240328035118-create-user.js'),('migrate-group-role.js'),('migrate-group.js'),('migrate-project-user.js'),('migrate-project.js'),('migrate-role.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `endDate` datetime DEFAULT NULL,
  `postBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (84,'Hello','hihi','2025-06-17 07:26:00','Lâm Vĩnh Kiện','2025-06-07 07:26:32','2025-06-07 07:26:32');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_document`
--

DROP TABLE IF EXISTS `task_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TaskID` int DEFAULT NULL,
  `FilePath` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_task_document_task` (`TaskID`),
  CONSTRAINT `fk_task_document_task` FOREIGN KEY (`TaskID`) REFERENCES `task` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_document`
--

LOCK TABLES `task_document` WRITE;
/*!40000 ALTER TABLE `task_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_user_document`
--

DROP TABLE IF EXISTS `task_user_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_user_document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `TaskID` int DEFAULT NULL,
  `FilePath` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_task_user_document_task` (`TaskID`),
  KEY `fk_task_user_document_user` (`UserID`),
  CONSTRAINT `fk_task_user_document_task` FOREIGN KEY (`TaskID`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_task_user_document_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_user_document`
--

LOCK TABLES `task_user_document` WRITE;
/*!40000 ALTER TABLE `task_user_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_user_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `groupId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `refreshToken` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `typeAccount` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `idFacebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idGoogle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `codeOTP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expiresLock` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wrongLogin` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (61,'lamvinhkien1709@gmail.com','$2a$10$Jpw/UjP/u3SvtT2Zudg.z.MrHd.nkNfXEiiXZoqTEXGeJqH.kX70e','Lâm Vĩnh Kiện','2003-09-17','Quận 4, Tp HCM','Male','0393630443','',1,'2024-07-19 14:40:52','2025-06-07 07:40:06','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImVtYWlsIjoibGFtdmluaGtpZW4xNzA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTMOibSBWxKluaCBLaeG7h24iLCJnZW5kZXIiOiJNYWxlIiwiYWRkcmVzcyI6IlF14bqtbiA0LCBUcCBIQ00iLCJhdmF0YXIiOiIiLCJkYXRlT2ZCaXJ0aCI6IjIwMDMtMDktMTciLCJwaG9uZSI6IjAzOTM2MzA0NDMiLCJ0eXBlQWNjb3VudCI6IkxPQ0FMIiwiZGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiZGVzY3JpcHRpb24iOiJBZG1pbiIsIlJvbGVzIjpbeyJpZCI6NDAsInVybCI6Ii9ncm91cC9hc3NpZ24tcm9sZS1mb3ItZ3JvdXAiLCJkZXNjcmlwdGlvbiI6IkFzc2lnbiByb2xlIGZvciBncm91cCJ9LHsiaWQiOjQzLCJ1cmwiOiIvZ3JvdXAvY3JlYXRlIiwiZGVzY3JpcHRpb24iOiJDcmVhdGUgZ3JvdXAifSx7ImlkIjo0LCJ1cmwiOiIvdXNlci9jcmVhdGUiLCJkZXNjcmlwdGlvbiI6IkNyZWF0ZSBuZXcgdXNlciJ9LHsiaWQiOjQ2LCJ1cmwiOiIvdGFzay9jcmVhdGUiLCJkZXNjcmlwdGlvbiI6IkNyZWF0ZSB0YXNrIn0seyJpZCI6NDIsInVybCI6Ii9ncm91cC9kZWxldGUiLCJkZXNjcmlwdGlvbiI6IkRlbGV0ZSBncm91cCJ9LHsiaWQiOjQ4LCJ1cmwiOiIvdGFzay9kZWxldGUiLCJkZXNjcmlwdGlvbiI6IkRlbGV0ZSB0YXNrIn0seyJpZCI6MTYsInVybCI6Ii91c2VyL2RlbGV0ZSIsImRlc2NyaXB0aW9uIjoiRGVsZXRlIHVzZXIifSx7ImlkIjo0NCwidXJsIjoiL2dyb3VwL3VwZGF0ZSIsImRlc2NyaXB0aW9uIjoiVXBkYXRlIGdyb3VwIn0seyJpZCI6MTIsInVybCI6Ii9yb2xlL3VwZGF0ZSIsImRlc2NyaXB0aW9uIjoiVXBkYXRlIHJvbGUifSx7ImlkIjo0NywidXJsIjoiL3Rhc2svdXBkYXRlIiwiZGVzY3JpcHRpb24iOiJVcGRhdGUgdGFzayJ9LHsiaWQiOjE3LCJ1cmwiOiIvdXNlci91cGRhdGUiLCJkZXNjcmlwdGlvbiI6IlVwZGF0ZSB1c2VyIn0seyJpZCI6NDEsInVybCI6Ii9ncm91cC9zaG93LWFsbC13aXRoLXBhZ2luYXRpb24iLCJkZXNjcmlwdGlvbiI6IlZpZXcgYWxsIGdyb3VwcyJ9LHsiaWQiOjE1LCJ1cmwiOiIvcm9sZS9zaG93LWFsbCIsImRlc2NyaXB0aW9uIjoiVmlldyBhbGwgcm9sZXMifSx7ImlkIjo0NSwidXJsIjoiL3Rhc2svc2hvdy1hbGwiLCJkZXNjcmlwdGlvbiI6IlZpZXcgYWxsIHRhc2tzIn0seyJpZCI6MSwidXJsIjoiL3VzZXIvc2hvdy1hbGwiLCJkZXNjcmlwdGlvbiI6IlZpZXcgYWxsIHVzZXJzIn0seyJpZCI6NTIsInVybCI6Ii9ncm91cC9zaG93LWFsbC1mb3ItYXNzaWduIiwiZGVzY3JpcHRpb24iOiJWaWV3IGdyb3VwcyBhc3NpZ24ifSx7ImlkIjo1NCwidXJsIjoiL3JvbGUvc2hvdy1hbGwtZm9yLWFzc2lnbiIsImRlc2NyaXB0aW9uIjoiVmlldyByb2xlcyBhc3NpZ24ifSx7ImlkIjo1MywidXJsIjoiL2dyb3VwL2dldC1ncm91cC13aXRoLXJvbGVzIiwiZGVzY3JpcHRpb24iOiJWaWV3IHJvbGVzIGJ5IGdyb3VwIn0seyJpZCI6NDksInVybCI6Ii90YXNrL3Nob3ctYWxsLXJlcG9ydC1ieS1tYW5hZ2VyIiwiZGVzY3JpcHRpb24iOiJWaWV3IHRhc2sgcmVwb3J0In1dfSwiaWF0IjoxNzQ5MjgyMDA2LCJleHAiOjE3NDk0NTQ4MDZ9.pSXBa96LOdAS8BIlIq91OVMfw4CDwGfDaGDMc8801to','LOCAL',NULL,NULL,'901394','0','0'),(141,'1050070008@sv.hcmunre.edu.vn','$2a$10$8fRFawZNonDvQoum31XjYefaxTpbTwwXMzAj1gl4aT2TMXGhC2qI6','Kiện Manager','2003-09-17','tphcm quận 4','Male','0329149822','',29,'2024-12-28 09:37:44','2025-06-07 07:39:18','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQxLCJlbWFpbCI6IjEwNTAwNzAwMDhAc3YuaGNtdW5yZS5lZHUudm4iLCJ1c2VybmFtZSI6Iktp4buHbiBNYW5hZ2VyIiwiZ2VuZGVyIjoiTWFsZSIsImFkZHJlc3MiOiJ0cGhjbSBxdeG6rW4gNCIsImF2YXRhciI6IiIsImRhdGVPZkJpcnRoIjoiMjAwMy0wOS0xNyIsInBob25lIjoiMDMyOTE0OTgyMiIsInR5cGVBY2NvdW50IjoiTE9DQUwiLCJkYXRhIjp7ImlkIjoyOSwibmFtZSI6Ik1hbmFnZXIiLCJkZXNjcmlwdGlvbiI6Ik1hbmFnZXIiLCJSb2xlcyI6W3siaWQiOjQ2LCJ1cmwiOiIvdGFzay9jcmVhdGUiLCJkZXNjcmlwdGlvbiI6IkNyZWF0ZSB0YXNrIn0seyJpZCI6NDgsInVybCI6Ii90YXNrL2RlbGV0ZSIsImRlc2NyaXB0aW9uIjoiRGVsZXRlIHRhc2sifSx7ImlkIjo0NywidXJsIjoiL3Rhc2svdXBkYXRlIiwiZGVzY3JpcHRpb24iOiJVcGRhdGUgdGFzayJ9LHsiaWQiOjQ1LCJ1cmwiOiIvdGFzay9zaG93LWFsbCIsImRlc2NyaXB0aW9uIjoiVmlldyBhbGwgdGFza3MifSx7ImlkIjo0OSwidXJsIjoiL3Rhc2svc2hvdy1hbGwtcmVwb3J0LWJ5LW1hbmFnZXIiLCJkZXNjcmlwdGlvbiI6IlZpZXcgdGFzayByZXBvcnQifV19LCJpYXQiOjE3NDkyODE5NTgsImV4cCI6MTc0OTQ1NDc1OH0.vvCvuwejubfKCNoNiP2avLB_1cunuOtoPMs_ucG-DRo','LOCAL',NULL,NULL,'291812','0','0'),(142,'kzer1700@gmail.com','$2a$10$1jw2Vxny1BCNycGgaoTt..7frWGy/LKqqodRlnwk/QLfBjldqXfIW','Kiện Employee','2024-12-20','','Male','0909318530','',30,'2024-12-28 09:41:32','2024-12-29 09:44:22','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyLCJlbWFpbCI6Imt6ZXIxNzAwQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiS2nhu4duIEVtcGxveWVlIiwiZ2VuZGVyIjoiTWFsZSIsImFkZHJlc3MiOiIiLCJhdmF0YXIiOiJhdmF0YXItMTczNTQ2NTMwNDA3NC1IQ01VTlJFLnBuZyIsImRhdGVPZkJpcnRoIjoiMjAyNC0xMi0yMCIsInBob25lIjoiMDkwOTMxODUzMCIsInR5cGVBY2NvdW50IjoiTE9DQUwiLCJkYXRhIjp7ImlkIjozMCwibmFtZSI6IkVtcGxveWVlIiwiZGVzY3JpcHRpb24iOiJFbXBsb3llZSIsIlJvbGVzIjpbeyJpZCI6NTAsInVybCI6Ii90YXNrL2NyZWF0ZS1yZXBvcnQiLCJkZXNjcmlwdGlvbiI6IkNyZWF0ZSB0YXNrIHJlcG9ydCJ9LHsiaWQiOjUxLCJ1cmwiOiIvdGFzay9kZWxldGUtcmVwb3J0IiwiZGVzY3JpcHRpb24iOiJEZWxldGUgdGFzayByZXBvcnQifSx7ImlkIjo0NSwidXJsIjoiL3Rhc2svc2hvdy1hbGwiLCJkZXNjcmlwdGlvbiI6IlZpZXcgYWxsIHRhc2tzIn1dfSwiaWF0IjoxNzM1NDY1NDYyLCJleHAiOjE3MzU2MzgyNjJ9.G0EE-l_rkS6i-OyHobCN3ro5_Jtc7oSCM7WMI1hR_WA','LOCAL',NULL,NULL,NULL,'0','0'),(147,'employee1@gmail.com','$2a$10$Jpw/UjP/u3SvtT2Zudg.z.MrHd.nkNfXEiiXZoqTEXGeJqH.kX70e','Employee A','1999-10-29','','Female','0329149222','',30,'2024-12-29 09:45:19','2024-12-29 09:47:37','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImVtcGxveWVlMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkVtcGxveWVlIEEiLCJnZW5kZXIiOiJGZW1hbGUiLCJhZGRyZXNzIjoiIiwiYXZhdGFyIjoiIiwiZGF0ZU9mQmlydGgiOiIxOTk5LTEwLTI5IiwicGhvbmUiOiIwMzI5MTQ5MjIyIiwidHlwZUFjY291bnQiOiJMT0NBTCIsImRhdGEiOnsiaWQiOjMwLCJuYW1lIjoiRW1wbG95ZWUiLCJkZXNjcmlwdGlvbiI6IkVtcGxveWVlIiwiUm9sZXMiOlt7ImlkIjo1MCwidXJsIjoiL3Rhc2svY3JlYXRlLXJlcG9ydCIsImRlc2NyaXB0aW9uIjoiQ3JlYXRlIHRhc2sgcmVwb3J0In0seyJpZCI6NTEsInVybCI6Ii90YXNrL2RlbGV0ZS1yZXBvcnQiLCJkZXNjcmlwdGlvbiI6IkRlbGV0ZSB0YXNrIHJlcG9ydCJ9LHsiaWQiOjQ1LCJ1cmwiOiIvdGFzay9zaG93LWFsbCIsImRlc2NyaXB0aW9uIjoiVmlldyBhbGwgdGFza3MifV19LCJpYXQiOjE3MzU0NjU2NTcsImV4cCI6MTczNTYzODQ1N30.Hql9SZEI-KYLGdVKqEAOG2zRIP9MtQ61H4EStUCZciE','LOCAL',NULL,NULL,NULL,'0','0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-07 14:41:38
