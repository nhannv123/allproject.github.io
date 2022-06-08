-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2022 at 10:36 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devcamp_pizza365`
--

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` bigint(20) NOT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `country_code`, `country_name`) VALUES
(1, 'VN', 'Việt Nam'),
(2, 'EN', 'EngLand');

-- --------------------------------------------------------

--
-- Table structure for table `drinks`
--

CREATE TABLE `drinks` (
  `id` bigint(20) NOT NULL,
  `don_gia` bigint(20) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ma_nuoc_uong` varchar(255) DEFAULT NULL,
  `ngay_cap_nhat` datetime DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ten_nuoc_uong` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drinks`
--

INSERT INTO `drinks` (`id`, `don_gia`, `ghi_chu`, `ma_nuoc_uong`, `ngay_cap_nhat`, `ngay_tao`, `ten_nuoc_uong`) VALUES
(4, 10000, '', 'COCA', NULL, '2022-05-24 13:19:10', 'Cocala');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL,
  `don_gia` bigint(20) DEFAULT NULL,
  `duong_kinh_pizza` bigint(20) DEFAULT NULL,
  `salad` bigint(20) DEFAULT NULL,
  `size_pizza` varchar(255) DEFAULT NULL,
  `so_luong_nuoc_ngot` bigint(20) DEFAULT NULL,
  `suon` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `don_gia`, `duong_kinh_pizza`, `salad`, `size_pizza`, `so_luong_nuoc_ngot`, `suon`) VALUES
(4, 150000, 25, 200, 'S', 2, 2),
(5, 250000, 30, 400, 'M', 4, 4),
(6, 350000, 35, 500, 'L', 8, 8);

-- --------------------------------------------------------

--
-- Table structure for table `pizza_order`
--

CREATE TABLE `pizza_order` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `order_code` varchar(255) NOT NULL,
  `paid` bigint(20) DEFAULT NULL,
  `pizza_size` varchar(255) NOT NULL,
  `pizza_type` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `voucher_code` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pizza_order`
--

INSERT INTO `pizza_order` (`id`, `created_at`, `order_code`, `paid`, `pizza_size`, `pizza_type`, `price`, `updated_at`, `voucher_code`, `user_id`) VALUES
(1, '2022-05-24 15:21:55', 'SA2', 15000, 'L', 'Hải Sản', 180000, NULL, '12333', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pizza_user`
--

CREATE TABLE `pizza_user` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pizza_user`
--

INSERT INTO `pizza_user` (`id`, `address`, `created_at`, `email`, `fullname`, `phone`, `updated_at`) VALUES
(1, '99/1', '2022-05-24 15:18:54', 'lan@gmail.com', 'Nguyễn Lan', 'lan@gmail.com', NULL),
(2, '99/2', '2022-05-24 15:22:22', '12@gmail.com', 'Nguyễn Nhân', '12@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `id` bigint(20) NOT NULL,
  `region_code` varchar(255) DEFAULT NULL,
  `region_name` varchar(255) DEFAULT NULL,
  `country_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`id`, `region_code`, `region_name`, `country_id`) VALUES
(1, 'HN', 'Hà Nội', 1),
(2, 'DN', 'Đà Nẵng', 1),
(4, 'LDN', 'Luân Đôn', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint(20) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ma_voucher` varchar(255) DEFAULT NULL,
  `ngay_cap_nhat` datetime DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `phan_tram_giam_gia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `ghi_chu`, `ma_voucher`, `ngay_cap_nhat`, `ngay_tao`, `phan_tram_giam_gia`) VALUES
(4, 'giảm giá 10%', '100', '2022-05-24 12:04:33', '2022-05-24 12:03:30', '10'),
(5, '', '101', NULL, '2022-05-24 12:03:37', '20'),
(6, '', '102', NULL, '2022-05-24 12:03:47', '30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_oqixmig4k8qxc8oba3fl4gqkr` (`country_code`);

--
-- Indexes for table `drinks`
--
ALTER TABLE `drinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizza_order`
--
ALTER TABLE `pizza_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4m2uqi3kgsy65p5bkwhjs613k` (`user_id`);

--
-- Indexes for table `pizza_user`
--
ALTER TABLE `pizza_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_is5udyhip6itt1wt8tj8hx5wq` (`region_code`),
  ADD KEY `FK7vb2cqcnkr9391hfn72louxkq` (`country_id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_5mm09tcdn38s2m21c2uwglpmr` (`ma_voucher`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `drinks`
--
ALTER TABLE `drinks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pizza_order`
--
ALTER TABLE `pizza_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pizza_user`
--
ALTER TABLE `pizza_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pizza_order`
--
ALTER TABLE `pizza_order`
  ADD CONSTRAINT `FK4m2uqi3kgsy65p5bkwhjs613k` FOREIGN KEY (`user_id`) REFERENCES `pizza_user` (`id`);

--
-- Constraints for table `region`
--
ALTER TABLE `region`
  ADD CONSTRAINT `FK7vb2cqcnkr9391hfn72louxkq` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
