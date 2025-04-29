-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 29, 2025 at 09:12 AM
-- Server version: 9.2.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_network_db`
--
CREATE DATABASE IF NOT EXISTS `social_network_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `social_network_db`;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `body`, `created_at`, `updated_at`) VALUES
('0acdae15-eac6-4424-a3d9-fa9d99614122', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'ok, i need to fix it, it. doesn\'t looks good', '2025-04-29 09:07:41', '2025-04-29 09:07:41'),
('4168911d-b3fa-49b7-9891-980143876c38', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'another check for that matter', '2025-04-29 09:07:28', '2025-04-29 09:07:28'),
('436b0552-27ba-408c-807e-6ab41e183be0', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'proud of you, and happy for our friendship', '2025-04-29 09:06:28', '2025-04-29 09:06:28'),
('4ece73d1-bdfd-43b9-8b9c-784d1282b7c0', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'does it keep pushing the comments aside? intersting... needed to fix it', '2025-04-29 09:07:17', '2025-04-29 09:07:17'),
('6fad8dea-a1e4-4f91-bbe0-2a7054c7176f', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'looking forward to hear more about it', '2025-04-29 09:06:07', '2025-04-29 09:06:07'),
('85f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', 'Great first post!', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('85f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', 'Welcome to the platform!', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('85f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', 'Hello back to you!', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('85f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', 'Glad you had a good day!', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('85f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc06', 'Good luck with your project!', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('85f8b8d0-6a79-4b1a-9b6a-e2e86d3adc06', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc07', 'What book was it?', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('b2afcd9c-efe7-4b20-acb6-9e680df9d727', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'Intersting... the way i see the post on my feed', '2025-04-29 09:06:52', '2025-04-29 09:06:52'),
('c84cc3f1-a325-4212-9ad2-0b13da12136d', '75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'Good luck David. you are more than welcome to tell me about your project, maybe I could help. ', '2025-04-29 09:05:52', '2025-04-29 09:05:52');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `follower_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `followee_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`follower_id`, `followee_id`, `created_at`, `updated_at`) VALUES
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '2025-04-29 09:04:31', '2025-04-29 09:04:31'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc06', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc07', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc08', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '2025-04-28 12:17:40', '2025-04-28 12:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `body`, `image_url`, `created_at`, `updated_at`) VALUES
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'My First Post', 'This is the content of my first post on this network!', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', 'Hello World', 'Just saying hello to everyone on this platform!', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', 'Amazing Day', 'Today was an amazing day and I wanted to share it with you all.', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', 'New Project', 'Starting a new project today. Wish me luck!', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', 'Book Recommendation', 'Just finished reading an incredible book. Highly recommend!', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc06', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc06', 'Tech News', 'Did you see the latest announcement from the tech conference?', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc07', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc07', 'Vacation Photos', 'Just got back from an amazing trip. Will share photos soon!', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40'),
('75f8b8d0-6a79-4b1a-9b6a-e2e86d3adc08', '65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc08', 'Learning Journey', 'My experience learning web development has been incredible.', NULL, '2025-04-28 12:17:40', '2025-04-28 12:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` text COLLATE utf8mb4_unicode_ci,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `postImage`, `created_at`, `image_url`, `updated_at`) VALUES
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc01', 'annie123', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Annie', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc02', 'bobby456', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Bobby', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc03', 'charlie7', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Charlie', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc04', 'david123', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'David', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc05', 'emma1234', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Emma', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc06', 'frank123', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Frank', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc07', 'grace123', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Grace', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('65f8b8d0-6a79-4b1a-9b6a-e2e86d3adc08', 'henry123', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Henry', NULL, '2025-04-28 10:15:59', NULL, '2025-04-28 14:30:52'),
('7e3a42c0-67a2-4331-826c-12e75d9bd08b', 'daniel99', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'Daniel', NULL, '2025-04-28 14:36:33', NULL, '2025-04-28 14:36:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`follower_id`,`followee_id`),
  ADD KEY `followee_id` (`followee_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `users_username` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
