-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 18 Sep 2021 pada 01.34
-- Versi server: 8.0.26-0ubuntu0.20.04.2
-- Versi PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `room_id` varchar(25) NOT NULL,
  `message_id` varchar(25) NOT NULL,
  `message` varchar(400) NOT NULL,
  `created_at` varchar(30) NOT NULL,
  `created_by` int NOT NULL,
  `is_read` enum('false','true') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`room_id`, `message_id`, `message`, `created_at`, `created_by`, `is_read`) VALUES
('ROOM-1631896796248', 'MSG-1631896796248', 'Halo, Selamat Pagi User 2', '2021-09-17T16:39:56.248Z', 1, 'true'),
('ROOM-1631896796248', 'MSG-1631897804884', 'Halo Selamat Pagi Juga User 1', '2021-09-17T16:56:44.884Z', 2, 'true'),
('ROOM-1631896796248', 'MSG-1631900813872', 'Udah makan belom User 2?', '2021-09-17T17:46:53.872Z', 1, 'true'),
('ROOM-1631896796248', 'MSG-1631901606562', 'Udah nih User 1, lagi di KE EF CE', '2021-09-17T18:00:06.562Z', 2, 'true');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rooms`
--

CREATE TABLE `rooms` (
  `room_id` varchar(20) NOT NULL,
  `user_id_receiver` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `rooms`
--

INSERT INTO `rooms` (`room_id`, `user_id_receiver`, `created_by`, `created_at`, `updated_at`) VALUES
('ROOM-1631896796248', 2, 1, '2021-09-17T16:39:56.248Z', '2021-09-17T18:00:06.562Z');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'USER 1', 'user1@test.com', '$2a$12$aL9MdmNUcT3tXGsuC/AHIefRIS3SBs.j1Y6NXMPeqSSrAD53zf7jq', '2021-09-17T16:14:50.150Z', '2021-09-17T16:14:50.150Z'),
(2, 'USER 2', 'user2@test.com', '$2a$12$I67Au64.rKwnRsgUJRKXyuRQXVrOomyLH5GMkU3t9nX.sLLt7OsFu', '2021-09-17T16:15:03.330Z', '2021-09-17T16:15:03.330Z'),
(3, 'USER 3', 'user3@test.com', '$2a$12$HAw153Mu5Z/yYGTiV6ZHB.3gyFrPjLj3Ad4HPghHHZZ5BzhFtFcoK', '2021-09-17T16:15:12.682Z', '2021-09-17T16:15:12.682Z'),
(4, 'USER 4', 'user4@test.com', '$2a$12$XNbc..r4C68NoSp6bgKM.ukLjIbFjZ0tfpYU1QyJhS5AYj.TP3b1i', '2021-09-17T16:15:22.701Z', '2021-09-17T16:15:22.701Z'),
(5, 'USER 5', 'user5@test.com', '$2a$12$98ZxACn7yD68mGQtEzrunOzK6Kal0OcyZlpqgjdyyZx8oMkuiuhLe', '2021-09-17T16:15:29.530Z', '2021-09-17T16:15:29.530Z'),
(6, 'USER 6', 'user6@test.com', '$2a$12$t7xThTRQ.x923LuMrEEIXuZOLLDccGvvh/eRdA1HB0JmkoL21ANem', '2021-09-17T16:21:14.161Z', '2021-09-17T16:21:14.161Z'),
(7, 'USER 7', 'user7@test.com', '$2a$12$PE29m/UzwPFaND5A8rn/mea5C3OGe7AplAzm8j37oUCXxXrNRInay', '2021-09-17T17:48:53.405Z', '2021-09-17T17:48:53.405Z');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `rooms` (`room_id`);

--
-- Indeks untuk tabel `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`) USING BTREE,
  ADD KEY `created_by` (`created_by`),
  ADD KEY `user_id_receiver` (`user_id_receiver`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`);

--
-- Ketidakleluasaan untuk tabel `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`user_id_receiver`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
