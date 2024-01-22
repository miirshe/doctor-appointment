-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2024 at 06:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor_appointment`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_doctor` (IN `email` VARCHAR(255) CHARSET utf8, IN `password` VARCHAR(255))   BEGIN
SET @hashed_password = MD5(password);
PREPARE stmt FROM 'SELECT * FROM doctors WHERE doctors.email = ? AND doctors.password = ? ' ;
EXECUTE stmt USING email , @hashed_password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_patient` (IN `email` VARCHAR(255) CHARSET utf8, IN `password` VARCHAR(255) CHARSET utf8)   BEGIN
SET @hashed_password = MD5(password);
PREPARE stmt FROM 'SELECT * FROM patients WHERE patients.email = ? AND patients.password = ?';
EXECUTE stmt USING email , @hashed_password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_user` (IN `email` VARCHAR(255) CHARSET utf8, IN `password` VARCHAR(255) CHARSET utf8)   BEGIN
SET @hashed_password = MD5(password);
PREPARE stmt FROM 'SELECT * FROM users WHERE users.email = ? AND users.password = ?';
EXECUTE stmt USING email , @hashed_password;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` varchar(10) NOT NULL,
  `time` time NOT NULL,
  `day` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `doc_id` varchar(10) NOT NULL,
  `pat_id` varchar(10) NOT NULL,
  `symptom_desc` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `time`, `day`, `date`, `status`, `doc_id`, `pat_id`, `symptom_desc`, `created_at`) VALUES
('APT001', '06:00:00', 'Mon', '2024-01-15', 'pending', 'DOC002', 'PAT001', 'headache', '2024-01-05 17:08:59'),
('APT002', '06:00:00', 'Sat', '2024-01-20', 'pending', 'DOC003', 'PAT001', 'headache', '2024-01-05 17:10:19'),
('APT003', '06:00:00', 'Mon', '2024-01-15', 'pending', 'DOC002', 'PAT005', 'headache and nauseous', '2024-01-05 22:42:00'),
('APT004', '00:00:00', 'Tues', '2024-01-23', 'completed', 'DOC004', 'PAT005', 'headache and nauseous', '2024-01-08 11:22:28'),
('APT005', '08:00:00', 'Mon', '2024-01-22', 'pending', 'DOC003', 'PAT001', 'madaxa i la iga haayaa', '2024-01-06 08:39:38'),
('APT006', '06:00:00', 'Mon', '2024-01-15', 'pending', 'DOC002', 'PAT001', 'uyiwlu', '2024-01-06 12:19:10'),
('APT007', '20:30:00', 'Tues', '2024-01-23', 'completed', 'DOC004', 'PAT001', 'waaa leea haaya madaxa', '2024-01-08 11:33:31'),
('APT008', '08:00:00', 'Mon', '2024-01-22', 'pending', 'DOC003', 'PAT001', 'dssd', '2024-01-08 11:32:04'),
('APT009', '06:00:00', 'Sat', '2024-01-20', 'pending', 'DOC003', 'PAT001', 'headache and fiver', '2024-01-08 13:22:42'),
('APT010', '20:30:00', 'Tues', '2024-01-23', 'completed', 'DOC004', 'PAT001', 'hi jarane', '2024-01-08 13:28:25');

-- --------------------------------------------------------

--
-- Table structure for table `diagnoses`
--

CREATE TABLE `diagnoses` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diagnoses`
--

INSERT INTO `diagnoses` (`id`, `name`, `description`, `created_at`) VALUES
('DIA001', 'Common Cold', 'common cold is a viral infection that primarily affects the upper respiratory tract, including the nose and throat. It is one of the most prevalent illnesses and is typically caused by rhinoviruses, although other viruses can also contribute to cold sympt', '2023-12-14 07:54:04'),
('DIA003', 'Allergies', 'Allergies refer to a hypersensitivity reaction of the immune system to substances that are usually harmless to most people. These substances, known as allergens, can trigger an allergic response in susceptible individuals. Allergies can manifest in variou', '2023-12-14 08:01:21'),
('DIA004', 'Diabetes mellitu', 'A chronic', '2023-12-25 08:29:37');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` varchar(255) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `experience` varchar(10) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `hos_id` varchar(255) NOT NULL,
  `speciality` varchar(255) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `description` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `fname`, `lname`, `email`, `gender`, `experience`, `phone`, `address`, `hos_id`, `speciality`, `status`, `description`, `password`, `image`, `created_at`) VALUES
('DOC002', 'Emily', 'Smith', 'emilysmith@gmail.com', 'female', '8 years', 2147483647, '456 Elm St, City', 'HOS003', ' cardiology', 'verified', 'Emily Smith is a compassionate and dedicated Pediatrician with 8 years of experience. She specializes in providing medical care for infants, children, and adolescents, focusing on their physical, emotional, and developmental well-being. Emily is passionate about promoting children\'s health, providing vaccinations, conducting routine check-ups, and addressing any concerns parents may have.', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703569617/dr3_pzqk7q.png', '2023-12-26 17:33:34'),
('DOC003', 'David', 'Johnson', 'davidjohnson@gmail.com', 'male', '5 years', 2147483647, '789 Oak St, City', 'HOS004', 'orthopedic', 'unverified', 'Dr. David Johnson is a highly experienced Cardiologist with 10 years of practice. He specializes in diagnosing and treating diseases related to the heart and blood vessels. David is skilled in performing various cardiovascular procedures, such as angioplasty and stent placement. He is dedicated to providing exceptional cardiac care to his patients, emphasizing preventive measures and personalized', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703569886/usman-yousaf-pTrhfmj2jDA-unsplash_1_zvemoe.jpg', '2023-12-26 17:33:41'),
('DOC004', 'Sarah', 'Davis', 'sarahdavis@gmail.com', 'female', '4 years', 2147483647, '987 Pine St, City', 'HOS005', 'orthopedic', 'verified', 'Dr. Sarah Davis is a knowledgeable Dermatologist with 3 years of experience in diagnosing and treating various skin conditions. She specializes in medical and cosmetic dermatology, providing treatments for acne, eczema, psoriasis, and performing procedures such as skin biopsies and mole removal. Sarah is dedicated to helping her patients achieve healthy and radiant skin.', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703570195/pexels-antoni-shkraba-5215024_foqzvz.jpg', '2023-12-26 17:33:48'),
('DOC005', 'Michael', 'Brown', 'michaelbrown@gmail.com', 'male', '8 years', 2147483647, '321 Cedar St, City', 'HOS004', 'Dentist', 'unverified', 'Dr. Michael Brown is a compassionate Psychiatrist with 6 years of experience in diagnosing and treating mental health disorders. He specializes in providing comprehensive psychiatric evaluations, therapy, and medication management for patients dealing with conditions such as depression, anxiety, bipolar disorder, and schizophrenia. Michael is committed to supporting his patients\' mental well-being and helping them lead fulfilling lives.', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703570317/austin-distel-7bMdiIqz_J4-unsplash_vuwlv8.jpg', '2023-12-26 17:33:55');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_schedules`
--

CREATE TABLE `doctor_schedules` (
  `id` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `day` varchar(20) NOT NULL,
  `from_time` time NOT NULL,
  `to_time` time NOT NULL,
  `status` varchar(20) NOT NULL,
  `appointment_limit` int(20) NOT NULL,
  `doc_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_schedules`
--

INSERT INTO `doctor_schedules` (`id`, `date`, `day`, `from_time`, `to_time`, `status`, `appointment_limit`, `doc_id`, `created_at`) VALUES
('DSH001', '2024-01-15 00:00:00', 'Mon', '06:00:00', '10:00:00', 'active', 20, 'DOC002', '2024-01-04 11:22:17'),
('DSH002', '2024-01-16 00:00:00', 'Tues', '06:00:00', '10:00:00', 'active', 20, 'DOC002', '2024-01-04 11:22:33'),
('DSH003', '2024-01-17 00:00:00', 'Wed', '06:00:00', '10:00:00', 'active', 20, 'DOC002', '2024-01-04 11:22:46'),
('DSH004', '2024-01-20 00:00:00', 'Sat', '06:00:00', '10:00:00', 'active', 15, 'DOC003', '2024-01-04 11:27:18'),
('DSH005', '2024-01-21 00:00:00', 'Sun', '15:00:00', '17:00:00', 'active', 15, 'DOC003', '2024-01-04 11:28:54'),
('DSH006', '2024-01-22 00:00:00', 'Mon', '08:00:00', '11:00:00', 'active', 15, 'DOC003', '2024-01-04 11:30:04'),
('DSH007', '2024-01-23 00:00:00', 'Tues', '20:30:00', '22:30:00', 'active', 10, 'DOC004', '2024-01-04 11:30:59'),
('DSH008', '2024-01-24 00:00:00', 'Wed', '08:00:00', '11:00:00', 'active', 10, 'DOC004', '2024-01-04 11:32:05');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` varchar(255) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` int(20) NOT NULL,
  `location` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `name`, `email`, `phone`, `location`, `description`, `created_at`) VALUES
('HOS003', 'Kalkaal Specialty', 'info@kalkaalhospital.so', 2147483647, 'Digfeer Street Mogadishu- Somalia', 'Known as a center of excellence in the country, the hospital provides the highest quality as well as affordable healthcare. Also known for its integrity, respect, the hospital has earned a name for itself for its continuous self-improvement.\nThe hospital has multiple specializations, and some of them include orthopedics, urology, pediatrics, gynecology, etc.', '2023-12-23 07:54:46'),
('HOS004', 'Shaafi Hospital', 'info@shaafihospital.so', 2147483647, 'Dagmada Hodon Mogadishu Banaadir, Somalia', 'Established by some of the best physicians and healthcare professionals in the country, Shaafi Hospital is preferred by people for its advanced medical care.\nFounded in 2016, the hospital specializes in several departments, which include general surgery, dentistry, pediatrics, gynecology, urology, etc.', '2023-12-23 07:57:43'),
('HOS005', 'Somali Sudanese Specialized Hospital (SSSH)', 'info@ssshhospital.so', 2147483647, 'Hodan Mogadishu BN, Somalia', 'Key specialties of hospital are: Urology, General Physician, Ob-Gyn, Neurology, Neonatology, Dental', '2023-12-23 07:59:34');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` varchar(255) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `email`, `phone`, `address`, `password`, `image`, `created_at`) VALUES
('PAT001', 'abdikafi isse', 'miirshe@gmail.com', 618302314, 'mogadishu , xamar jajab', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1704055067/image_px03nj.jpg', '2023-12-31 20:38:23'),
('PAT002', 'zaki ahmet', 'zaki@gmail.com', 616556767, 'mogadishu,banadir', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1704055254/image_sudsgr.jpg', '2023-12-31 20:40:59'),
('PAT003', 'anas omar', 'booste@gmail.com', 614586748, 'mogadishu , hodan', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1704055632/image_gtetp3.jpg', '2023-12-31 20:47:15'),
('PAT004', 'hanad omar', 'hanad@gmail.com', 574854385, 'mogadishu , somalia', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1704055737/image_zqjdys.jpg', '2023-12-31 20:48:58'),
('PAT005', 'asad isse', 'asad@gmail.com', 617357382, 'mogadishu,banadir', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1704056676/image_uiu3i2.jpg', '2023-12-31 21:04:36'),
('PAT006', 'mohamed isse', 'mohamed@gmail.com', 618302314, 'mogadishu , banadir', '16d7a4fca7442dda3ad93c9a726597e4', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1704056800/image_fh0w1b.jpg', '2023-12-31 21:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `professions`
--

CREATE TABLE `professions` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `doc_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `specialities`
--

CREATE TABLE `specialities` (
  `id` varchar(255) NOT NULL,
  `speciality` varchar(60) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `doc_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialities`
--

INSERT INTO `specialities` (`id`, `speciality`, `image`, `created_at`, `doc_id`) VALUES
('SP002', 'urology', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703404285/urology_wxoa8m.png', '2023-12-26 05:18:14', 'DOC001'),
('SP005', 'orthopedic', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703402003/orthopedics_lgw5rf.png', '2023-12-26 05:18:44', 'DOC001'),
('SP006', 'cardiology', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703402555/physician_rdia3y.png', '2023-12-26 05:19:00', 'DOC001'),
('SP007', 'Dentist', 'https://res.cloudinary.com/drkp17pqk/image/upload/v1703404411/tooth_fqti0r.png', '2023-12-24 07:53:33', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
('USR001', 'miirshe', 'miirshe@gmail.com', '6bcf14e6799a294a62d703a830d87b6f', 'user', '2023-12-10 20:30:44'),
('USR003', 'mohamed shuuriye', 'shuuriye@gmail.com', '16d7a4fca7442dda3ad93c9a726597e4', 'user', '2023-12-24 11:42:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_appointments` (`doc_id`) USING BTREE,
  ADD KEY `patient_appointments` (`pat_id`);

--
-- Indexes for table `diagnoses`
--
ALTER TABLE `diagnoses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hospital_doctors` (`hos_id`);

--
-- Indexes for table `doctor_schedules`
--
ALTER TABLE `doctor_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_schedules` (`doc_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `professions`
--
ALTER TABLE `professions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `doc_id` (`doc_id`);

--
-- Indexes for table `specialities`
--
ALTER TABLE `specialities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `patient_appointments` FOREIGN KEY (`pat_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `hospital_doctors` FOREIGN KEY (`hos_id`) REFERENCES `hospitals` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `doctor_schedules`
--
ALTER TABLE `doctor_schedules`
  ADD CONSTRAINT `doctor_schedules` FOREIGN KEY (`doc_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `professions`
--
ALTER TABLE `professions`
  ADD CONSTRAINT `doctor_professions` FOREIGN KEY (`doc_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
