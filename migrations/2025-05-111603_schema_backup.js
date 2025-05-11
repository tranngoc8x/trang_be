
exports.up = async function(knex) {
  // Tạo lại cấu trúc database

  // Tạo bảng about_uses
  await knex.raw(`CREATE TABLE \`about_uses\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`slug\` varchar(255) DEFAULT NULL,
  \`content\` longtext,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`about_uses_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`about_uses_created_by_id_fk\` (\`created_by_id\`),
  KEY \`about_uses_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`about_uses_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`about_uses_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng about_uses_cmps
  await knex.raw(`CREATE TABLE \`about_uses_cmps\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`entity_id\` int unsigned DEFAULT NULL,
  \`cmp_id\` int unsigned DEFAULT NULL,
  \`component_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`about_uses_uq\` (\`entity_id\`,\`cmp_id\`,\`field\`,\`component_type\`),
  KEY \`about_uses_field_idx\` (\`field\`),
  KEY \`about_uses_component_type_idx\` (\`component_type\`),
  KEY \`about_uses_entity_fk\` (\`entity_id\`),
  CONSTRAINT \`about_uses_entity_fk\` FOREIGN KEY (\`entity_id\`) REFERENCES \`about_uses\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng admin_permissions
  await knex.raw(`CREATE TABLE \`admin_permissions\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`action\` varchar(255) DEFAULT NULL,
  \`action_parameters\` json DEFAULT NULL,
  \`subject\` varchar(255) DEFAULT NULL,
  \`properties\` json DEFAULT NULL,
  \`conditions\` json DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`admin_permissions_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`admin_permissions_created_by_id_fk\` (\`created_by_id\`),
  KEY \`admin_permissions_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`admin_permissions_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`admin_permissions_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng admin_permissions_role_lnk
  await knex.raw(`CREATE TABLE \`admin_permissions_role_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`permission_id\` int unsigned DEFAULT NULL,
  \`role_id\` int unsigned DEFAULT NULL,
  \`permission_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`admin_permissions_role_lnk_uq\` (\`permission_id\`,\`role_id\`),
  KEY \`admin_permissions_role_lnk_fk\` (\`permission_id\`),
  KEY \`admin_permissions_role_lnk_ifk\` (\`role_id\`),
  KEY \`admin_permissions_role_lnk_oifk\` (\`permission_ord\`),
  CONSTRAINT \`admin_permissions_role_lnk_fk\` FOREIGN KEY (\`permission_id\`) REFERENCES \`admin_permissions\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`admin_permissions_role_lnk_ifk\` FOREIGN KEY (\`role_id\`) REFERENCES \`admin_roles\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng admin_roles
  await knex.raw(`CREATE TABLE \`admin_roles\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`code\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`admin_roles_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`admin_roles_created_by_id_fk\` (\`created_by_id\`),
  KEY \`admin_roles_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`admin_roles_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`admin_roles_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng admin_users
  await knex.raw(`CREATE TABLE \`admin_users\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`firstname\` varchar(255) DEFAULT NULL,
  \`lastname\` varchar(255) DEFAULT NULL,
  \`username\` varchar(255) DEFAULT NULL,
  \`email\` varchar(255) DEFAULT NULL,
  \`password\` varchar(255) DEFAULT NULL,
  \`reset_password_token\` varchar(255) DEFAULT NULL,
  \`registration_token\` varchar(255) DEFAULT NULL,
  \`is_active\` tinyint(1) DEFAULT NULL,
  \`blocked\` tinyint(1) DEFAULT NULL,
  \`prefered_language\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`admin_users_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`admin_users_created_by_id_fk\` (\`created_by_id\`),
  KEY \`admin_users_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`admin_users_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`admin_users_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng admin_users_roles_lnk
  await knex.raw(`CREATE TABLE \`admin_users_roles_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`user_id\` int unsigned DEFAULT NULL,
  \`role_id\` int unsigned DEFAULT NULL,
  \`role_ord\` double unsigned DEFAULT NULL,
  \`user_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`admin_users_roles_lnk_uq\` (\`user_id\`,\`role_id\`),
  KEY \`admin_users_roles_lnk_fk\` (\`user_id\`),
  KEY \`admin_users_roles_lnk_ifk\` (\`role_id\`),
  KEY \`admin_users_roles_lnk_ofk\` (\`role_ord\`),
  KEY \`admin_users_roles_lnk_oifk\` (\`user_ord\`),
  CONSTRAINT \`admin_users_roles_lnk_fk\` FOREIGN KEY (\`user_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`admin_users_roles_lnk_ifk\` FOREIGN KEY (\`role_id\`) REFERENCES \`admin_roles\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng articles
  await knex.raw(`CREATE TABLE \`articles\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`description\` longtext,
  \`slug\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`articles_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`articles_created_by_id_fk\` (\`created_by_id\`),
  KEY \`articles_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`articles_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`articles_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng articles_cmps
  await knex.raw(`CREATE TABLE \`articles_cmps\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`entity_id\` int unsigned DEFAULT NULL,
  \`cmp_id\` int unsigned DEFAULT NULL,
  \`component_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`articles_uq\` (\`entity_id\`,\`cmp_id\`,\`field\`,\`component_type\`),
  KEY \`articles_field_idx\` (\`field\`),
  KEY \`articles_component_type_idx\` (\`component_type\`),
  KEY \`articles_entity_fk\` (\`entity_id\`),
  CONSTRAINT \`articles_entity_fk\` FOREIGN KEY (\`entity_id\`) REFERENCES \`articles\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng bao_gia_and_tu_vans
  await knex.raw(`CREATE TABLE \`bao_gia_and_tu_vans\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`customer_name\` varchar(255) DEFAULT NULL,
  \`customer_phone\` varchar(255) DEFAULT NULL,
  \`content\` longtext,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`bao_gia_and_tu_vans_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`bao_gia_and_tu_vans_created_by_id_fk\` (\`created_by_id\`),
  KEY \`bao_gia_and_tu_vans_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`bao_gia_and_tu_vans_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`bao_gia_and_tu_vans_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_articles
  await knex.raw(`CREATE TABLE \`components_shared_articles\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) DEFAULT NULL,
  \`button_link\` varchar(255) DEFAULT NULL,
  \`description\` longtext,
  \`button_name\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_media
  await knex.raw(`CREATE TABLE \`components_shared_media\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_quotes
  await knex.raw(`CREATE TABLE \`components_shared_quotes\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) DEFAULT NULL,
  \`body\` longtext,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_rich_texts
  await knex.raw(`CREATE TABLE \`components_shared_rich_texts\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) DEFAULT NULL,
  \`description\` longtext,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_rich_texts_cmps
  await knex.raw(`CREATE TABLE \`components_shared_rich_texts_cmps\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`entity_id\` int unsigned DEFAULT NULL,
  \`cmp_id\` int unsigned DEFAULT NULL,
  \`component_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`components_shared_rich_texts_uq\` (\`entity_id\`,\`cmp_id\`,\`field\`,\`component_type\`),
  KEY \`components_shared_rich_texts_field_idx\` (\`field\`),
  KEY \`components_shared_rich_texts_component_type_idx\` (\`component_type\`),
  KEY \`components_shared_rich_texts_entity_fk\` (\`entity_id\`),
  CONSTRAINT \`components_shared_rich_texts_entity_fk\` FOREIGN KEY (\`entity_id\`) REFERENCES \`components_shared_rich_texts\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_seos
  await knex.raw(`CREATE TABLE \`components_shared_seos\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`meta_title\` varchar(255) DEFAULT NULL,
  \`meta_description\` longtext,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng components_shared_sliders
  await knex.raw(`CREATE TABLE \`components_shared_sliders\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng contacts
  await knex.raw(`CREATE TABLE \`contacts\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`address\` varchar(255) DEFAULT NULL,
  \`phone\` varchar(255) DEFAULT NULL,
  \`email\` varchar(255) DEFAULT NULL,
  \`tax_code\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`contacts_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`contacts_created_by_id_fk\` (\`created_by_id\`),
  KEY \`contacts_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`contacts_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`contacts_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng files
  await knex.raw(`CREATE TABLE \`files\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`alternative_text\` varchar(255) DEFAULT NULL,
  \`caption\` varchar(255) DEFAULT NULL,
  \`width\` int DEFAULT NULL,
  \`height\` int DEFAULT NULL,
  \`formats\` json DEFAULT NULL,
  \`hash\` varchar(255) DEFAULT NULL,
  \`ext\` varchar(255) DEFAULT NULL,
  \`mime\` varchar(255) DEFAULT NULL,
  \`size\` decimal(10,2) DEFAULT NULL,
  \`url\` varchar(255) DEFAULT NULL,
  \`preview_url\` varchar(255) DEFAULT NULL,
  \`provider\` varchar(255) DEFAULT NULL,
  \`provider_metadata\` json DEFAULT NULL,
  \`folder_path\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`upload_files_folder_path_index\` (\`folder_path\`),
  KEY \`upload_files_created_at_index\` (\`created_at\`),
  KEY \`upload_files_updated_at_index\` (\`updated_at\`),
  KEY \`upload_files_name_index\` (\`name\`),
  KEY \`upload_files_size_index\` (\`size\`),
  KEY \`upload_files_ext_index\` (\`ext\`),
  KEY \`files_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`files_created_by_id_fk\` (\`created_by_id\`),
  KEY \`files_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`files_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`files_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng files_folder_lnk
  await knex.raw(`CREATE TABLE \`files_folder_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`file_id\` int unsigned DEFAULT NULL,
  \`folder_id\` int unsigned DEFAULT NULL,
  \`file_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`files_folder_lnk_uq\` (\`file_id\`,\`folder_id\`),
  KEY \`files_folder_lnk_fk\` (\`file_id\`),
  KEY \`files_folder_lnk_ifk\` (\`folder_id\`),
  KEY \`files_folder_lnk_oifk\` (\`file_ord\`),
  CONSTRAINT \`files_folder_lnk_fk\` FOREIGN KEY (\`file_id\`) REFERENCES \`files\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`files_folder_lnk_ifk\` FOREIGN KEY (\`folder_id\`) REFERENCES \`upload_folders\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng files_related_mph
  await knex.raw(`CREATE TABLE \`files_related_mph\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`file_id\` int unsigned DEFAULT NULL,
  \`related_id\` int unsigned DEFAULT NULL,
  \`related_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`files_related_mph_fk\` (\`file_id\`),
  KEY \`files_related_mph_oidx\` (\`order\`),
  KEY \`files_related_mph_idix\` (\`related_id\`),
  CONSTRAINT \`files_related_mph_fk\` FOREIGN KEY (\`file_id\`) REFERENCES \`files\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng globals
  await knex.raw(`CREATE TABLE \`globals\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`site_name\` varchar(255) DEFAULT NULL,
  \`site_description\` longtext,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`globals_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`globals_created_by_id_fk\` (\`created_by_id\`),
  KEY \`globals_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`globals_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`globals_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng globals_cmps
  await knex.raw(`CREATE TABLE \`globals_cmps\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`entity_id\` int unsigned DEFAULT NULL,
  \`cmp_id\` int unsigned DEFAULT NULL,
  \`component_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`globals_uq\` (\`entity_id\`,\`cmp_id\`,\`field\`,\`component_type\`),
  KEY \`globals_field_idx\` (\`field\`),
  KEY \`globals_component_type_idx\` (\`component_type\`),
  KEY \`globals_entity_fk\` (\`entity_id\`),
  CONSTRAINT \`globals_entity_fk\` FOREIGN KEY (\`entity_id\`) REFERENCES \`globals\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng home_page_contents
  await knex.raw(`CREATE TABLE \`home_page_contents\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`home_page_contents_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`home_page_contents_created_by_id_fk\` (\`created_by_id\`),
  KEY \`home_page_contents_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`home_page_contents_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`home_page_contents_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng home_page_contents_cmps
  await knex.raw(`CREATE TABLE \`home_page_contents_cmps\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`entity_id\` int unsigned DEFAULT NULL,
  \`cmp_id\` int unsigned DEFAULT NULL,
  \`component_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`home_page_contents_uq\` (\`entity_id\`,\`cmp_id\`,\`field\`,\`component_type\`),
  KEY \`home_page_contents_field_idx\` (\`field\`),
  KEY \`home_page_contents_component_type_idx\` (\`component_type\`),
  KEY \`home_page_contents_entity_fk\` (\`entity_id\`),
  CONSTRAINT \`home_page_contents_entity_fk\` FOREIGN KEY (\`entity_id\`) REFERENCES \`home_page_contents\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng i18n_locale
  await knex.raw(`CREATE TABLE \`i18n_locale\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`code\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`i18n_locale_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`i18n_locale_created_by_id_fk\` (\`created_by_id\`),
  KEY \`i18n_locale_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`i18n_locale_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`i18n_locale_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng khach_hangs
  await knex.raw(`CREATE TABLE \`khach_hangs\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  \`website\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`khach_hangs_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`khach_hangs_created_by_id_fk\` (\`created_by_id\`),
  KEY \`khach_hangs_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`khach_hangs_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`khach_hangs_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng menus
  await knex.raw(`CREATE TABLE \`menus\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`slug\` varchar(255) DEFAULT NULL,
  \`items\` json DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`menus_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`menus_created_by_id_fk\` (\`created_by_id\`),
  KEY \`menus_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`menus_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`menus_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng news
  await knex.raw(`CREATE TABLE \`news\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`news_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`news_created_by_id_fk\` (\`created_by_id\`),
  KEY \`news_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`news_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`news_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng products
  await knex.raw(`CREATE TABLE \`products\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`slug\` varchar(255) DEFAULT NULL,
  \`description\` longtext,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`products_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`products_created_by_id_fk\` (\`created_by_id\`),
  KEY \`products_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`products_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`products_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng products_cmps
  await knex.raw(`CREATE TABLE \`products_cmps\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`entity_id\` int unsigned DEFAULT NULL,
  \`cmp_id\` int unsigned DEFAULT NULL,
  \`component_type\` varchar(255) DEFAULT NULL,
  \`field\` varchar(255) DEFAULT NULL,
  \`order\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`products_uq\` (\`entity_id\`,\`cmp_id\`,\`field\`,\`component_type\`),
  KEY \`products_field_idx\` (\`field\`),
  KEY \`products_component_type_idx\` (\`component_type\`),
  KEY \`products_entity_fk\` (\`entity_id\`),
  CONSTRAINT \`products_entity_fk\` FOREIGN KEY (\`entity_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng products_service_lnk
  await knex.raw(`CREATE TABLE \`products_service_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`product_id\` int unsigned DEFAULT NULL,
  \`service_id\` int unsigned DEFAULT NULL,
  \`product_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`products_service_lnk_uq\` (\`product_id\`,\`service_id\`),
  KEY \`products_service_lnk_fk\` (\`product_id\`),
  KEY \`products_service_lnk_ifk\` (\`service_id\`),
  KEY \`products_service_lnk_oifk\` (\`product_ord\`),
  CONSTRAINT \`products_service_lnk_fk\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`products_service_lnk_ifk\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng services
  await knex.raw(`CREATE TABLE \`services\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`title\` varchar(255) DEFAULT NULL,
  \`slug\` varchar(255) DEFAULT NULL,
  \`content\` longtext,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`services_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`services_created_by_id_fk\` (\`created_by_id\`),
  KEY \`services_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`services_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`services_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng slides
  await knex.raw(`CREATE TABLE \`slides\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`content\` longtext,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  \`position\` json DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`slides_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`slides_created_by_id_fk\` (\`created_by_id\`),
  KEY \`slides_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`slides_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`slides_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_api_token_permissions
  await knex.raw(`CREATE TABLE \`strapi_api_token_permissions\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`action\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_api_token_permissions_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_api_token_permissions_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_api_token_permissions_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_api_token_permissions_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_api_token_permissions_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_api_token_permissions_token_lnk
  await knex.raw(`CREATE TABLE \`strapi_api_token_permissions_token_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`api_token_permission_id\` int unsigned DEFAULT NULL,
  \`api_token_id\` int unsigned DEFAULT NULL,
  \`api_token_permission_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`strapi_api_token_permissions_token_lnk_uq\` (\`api_token_permission_id\`,\`api_token_id\`),
  KEY \`strapi_api_token_permissions_token_lnk_fk\` (\`api_token_permission_id\`),
  KEY \`strapi_api_token_permissions_token_lnk_ifk\` (\`api_token_id\`),
  KEY \`strapi_api_token_permissions_token_lnk_oifk\` (\`api_token_permission_ord\`),
  CONSTRAINT \`strapi_api_token_permissions_token_lnk_fk\` FOREIGN KEY (\`api_token_permission_id\`) REFERENCES \`strapi_api_token_permissions\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`strapi_api_token_permissions_token_lnk_ifk\` FOREIGN KEY (\`api_token_id\`) REFERENCES \`strapi_api_tokens\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_api_tokens
  await knex.raw(`CREATE TABLE \`strapi_api_tokens\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`type\` varchar(255) DEFAULT NULL,
  \`access_key\` varchar(255) DEFAULT NULL,
  \`last_used_at\` datetime(6) DEFAULT NULL,
  \`expires_at\` datetime(6) DEFAULT NULL,
  \`lifespan\` bigint DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  \`encrypted_key\` longtext,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_api_tokens_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_api_tokens_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_api_tokens_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_api_tokens_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_api_tokens_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_core_store_settings
  await knex.raw(`CREATE TABLE \`strapi_core_store_settings\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`key\` varchar(255) DEFAULT NULL,
  \`value\` longtext,
  \`type\` varchar(255) DEFAULT NULL,
  \`environment\` varchar(255) DEFAULT NULL,
  \`tag\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_database_schema
  await knex.raw(`CREATE TABLE \`strapi_database_schema\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`schema\` json DEFAULT NULL,
  \`time\` datetime DEFAULT NULL,
  \`hash\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_history_versions
  await knex.raw(`CREATE TABLE \`strapi_history_versions\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`content_type\` varchar(255) NOT NULL,
  \`related_document_id\` varchar(255) DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  \`status\` varchar(255) DEFAULT NULL,
  \`data\` json DEFAULT NULL,
  \`schema\` json DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_history_versions_created_by_id_fk\` (\`created_by_id\`),
  CONSTRAINT \`strapi_history_versions_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_migrations
  await knex.raw(`CREATE TABLE \`strapi_migrations\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`time\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_migrations_internal
  await knex.raw(`CREATE TABLE \`strapi_migrations_internal\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`time\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_release_actions
  await knex.raw(`CREATE TABLE \`strapi_release_actions\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`type\` varchar(255) DEFAULT NULL,
  \`content_type\` varchar(255) DEFAULT NULL,
  \`entry_document_id\` varchar(255) DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  \`is_entry_valid\` tinyint(1) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_release_actions_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_release_actions_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_release_actions_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_release_actions_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_release_actions_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_release_actions_release_lnk
  await knex.raw(`CREATE TABLE \`strapi_release_actions_release_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`release_action_id\` int unsigned DEFAULT NULL,
  \`release_id\` int unsigned DEFAULT NULL,
  \`release_action_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`strapi_release_actions_release_lnk_uq\` (\`release_action_id\`,\`release_id\`),
  KEY \`strapi_release_actions_release_lnk_fk\` (\`release_action_id\`),
  KEY \`strapi_release_actions_release_lnk_ifk\` (\`release_id\`),
  KEY \`strapi_release_actions_release_lnk_oifk\` (\`release_action_ord\`),
  CONSTRAINT \`strapi_release_actions_release_lnk_fk\` FOREIGN KEY (\`release_action_id\`) REFERENCES \`strapi_release_actions\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`strapi_release_actions_release_lnk_ifk\` FOREIGN KEY (\`release_id\`) REFERENCES \`strapi_releases\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_releases
  await knex.raw(`CREATE TABLE \`strapi_releases\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`released_at\` datetime(6) DEFAULT NULL,
  \`scheduled_at\` datetime(6) DEFAULT NULL,
  \`timezone\` varchar(255) DEFAULT NULL,
  \`status\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_releases_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_releases_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_releases_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_releases_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_releases_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_transfer_token_permissions
  await knex.raw(`CREATE TABLE \`strapi_transfer_token_permissions\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`action\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_transfer_token_permissions_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_transfer_token_permissions_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_transfer_token_permissions_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_transfer_token_permissions_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_transfer_token_permissions_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_transfer_token_permissions_token_lnk
  await knex.raw(`CREATE TABLE \`strapi_transfer_token_permissions_token_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`transfer_token_permission_id\` int unsigned DEFAULT NULL,
  \`transfer_token_id\` int unsigned DEFAULT NULL,
  \`transfer_token_permission_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`strapi_transfer_token_permissions_token_lnk_uq\` (\`transfer_token_permission_id\`,\`transfer_token_id\`),
  KEY \`strapi_transfer_token_permissions_token_lnk_fk\` (\`transfer_token_permission_id\`),
  KEY \`strapi_transfer_token_permissions_token_lnk_ifk\` (\`transfer_token_id\`),
  KEY \`strapi_transfer_token_permissions_token_lnk_oifk\` (\`transfer_token_permission_ord\`),
  CONSTRAINT \`strapi_transfer_token_permissions_token_lnk_fk\` FOREIGN KEY (\`transfer_token_permission_id\`) REFERENCES \`strapi_transfer_token_permissions\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`strapi_transfer_token_permissions_token_lnk_ifk\` FOREIGN KEY (\`transfer_token_id\`) REFERENCES \`strapi_transfer_tokens\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_transfer_tokens
  await knex.raw(`CREATE TABLE \`strapi_transfer_tokens\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`access_key\` varchar(255) DEFAULT NULL,
  \`last_used_at\` datetime(6) DEFAULT NULL,
  \`expires_at\` datetime(6) DEFAULT NULL,
  \`lifespan\` bigint DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_transfer_tokens_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_transfer_tokens_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_transfer_tokens_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_transfer_tokens_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_transfer_tokens_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_webhooks
  await knex.raw(`CREATE TABLE \`strapi_webhooks\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`url\` longtext,
  \`headers\` json DEFAULT NULL,
  \`events\` json DEFAULT NULL,
  \`enabled\` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_workflows
  await knex.raw(`CREATE TABLE \`strapi_workflows\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`content_types\` json DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_workflows_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_workflows_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_workflows_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_workflows_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_workflows_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_workflows_stage_required_to_publish_lnk
  await knex.raw(`CREATE TABLE \`strapi_workflows_stage_required_to_publish_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`workflow_id\` int unsigned DEFAULT NULL,
  \`workflow_stage_id\` int unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`strapi_workflows_stage_required_to_publish_lnk_uq\` (\`workflow_id\`,\`workflow_stage_id\`),
  KEY \`strapi_workflows_stage_required_to_publish_lnk_fk\` (\`workflow_id\`),
  KEY \`strapi_workflows_stage_required_to_publish_lnk_ifk\` (\`workflow_stage_id\`),
  CONSTRAINT \`strapi_workflows_stage_required_to_publish_lnk_fk\` FOREIGN KEY (\`workflow_id\`) REFERENCES \`strapi_workflows\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`strapi_workflows_stage_required_to_publish_lnk_ifk\` FOREIGN KEY (\`workflow_stage_id\`) REFERENCES \`strapi_workflows_stages\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_workflows_stages
  await knex.raw(`CREATE TABLE \`strapi_workflows_stages\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`color\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`strapi_workflows_stages_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`strapi_workflows_stages_created_by_id_fk\` (\`created_by_id\`),
  KEY \`strapi_workflows_stages_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`strapi_workflows_stages_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`strapi_workflows_stages_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_workflows_stages_permissions_lnk
  await knex.raw(`CREATE TABLE \`strapi_workflows_stages_permissions_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`workflow_stage_id\` int unsigned DEFAULT NULL,
  \`permission_id\` int unsigned DEFAULT NULL,
  \`permission_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`strapi_workflows_stages_permissions_lnk_uq\` (\`workflow_stage_id\`,\`permission_id\`),
  KEY \`strapi_workflows_stages_permissions_lnk_fk\` (\`workflow_stage_id\`),
  KEY \`strapi_workflows_stages_permissions_lnk_ifk\` (\`permission_id\`),
  KEY \`strapi_workflows_stages_permissions_lnk_ofk\` (\`permission_ord\`),
  CONSTRAINT \`strapi_workflows_stages_permissions_lnk_fk\` FOREIGN KEY (\`workflow_stage_id\`) REFERENCES \`strapi_workflows_stages\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`strapi_workflows_stages_permissions_lnk_ifk\` FOREIGN KEY (\`permission_id\`) REFERENCES \`admin_permissions\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng strapi_workflows_stages_workflow_lnk
  await knex.raw(`CREATE TABLE \`strapi_workflows_stages_workflow_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`workflow_stage_id\` int unsigned DEFAULT NULL,
  \`workflow_id\` int unsigned DEFAULT NULL,
  \`workflow_stage_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`strapi_workflows_stages_workflow_lnk_uq\` (\`workflow_stage_id\`,\`workflow_id\`),
  KEY \`strapi_workflows_stages_workflow_lnk_fk\` (\`workflow_stage_id\`),
  KEY \`strapi_workflows_stages_workflow_lnk_ifk\` (\`workflow_id\`),
  KEY \`strapi_workflows_stages_workflow_lnk_oifk\` (\`workflow_stage_ord\`),
  CONSTRAINT \`strapi_workflows_stages_workflow_lnk_fk\` FOREIGN KEY (\`workflow_stage_id\`) REFERENCES \`strapi_workflows_stages\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`strapi_workflows_stages_workflow_lnk_ifk\` FOREIGN KEY (\`workflow_id\`) REFERENCES \`strapi_workflows\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng up_permissions
  await knex.raw(`CREATE TABLE \`up_permissions\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`action\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`up_permissions_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`up_permissions_created_by_id_fk\` (\`created_by_id\`),
  KEY \`up_permissions_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`up_permissions_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`up_permissions_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng up_permissions_role_lnk
  await knex.raw(`CREATE TABLE \`up_permissions_role_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`permission_id\` int unsigned DEFAULT NULL,
  \`role_id\` int unsigned DEFAULT NULL,
  \`permission_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`up_permissions_role_lnk_uq\` (\`permission_id\`,\`role_id\`),
  KEY \`up_permissions_role_lnk_fk\` (\`permission_id\`),
  KEY \`up_permissions_role_lnk_ifk\` (\`role_id\`),
  KEY \`up_permissions_role_lnk_oifk\` (\`permission_ord\`),
  CONSTRAINT \`up_permissions_role_lnk_fk\` FOREIGN KEY (\`permission_id\`) REFERENCES \`up_permissions\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`up_permissions_role_lnk_ifk\` FOREIGN KEY (\`role_id\`) REFERENCES \`up_roles\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng up_roles
  await knex.raw(`CREATE TABLE \`up_roles\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`type\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`up_roles_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`up_roles_created_by_id_fk\` (\`created_by_id\`),
  KEY \`up_roles_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`up_roles_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`up_roles_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng up_users
  await knex.raw(`CREATE TABLE \`up_users\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`username\` varchar(255) DEFAULT NULL,
  \`email\` varchar(255) DEFAULT NULL,
  \`provider\` varchar(255) DEFAULT NULL,
  \`password\` varchar(255) DEFAULT NULL,
  \`reset_password_token\` varchar(255) DEFAULT NULL,
  \`confirmation_token\` varchar(255) DEFAULT NULL,
  \`confirmed\` tinyint(1) DEFAULT NULL,
  \`blocked\` tinyint(1) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`up_users_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`up_users_created_by_id_fk\` (\`created_by_id\`),
  KEY \`up_users_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`up_users_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`up_users_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng up_users_role_lnk
  await knex.raw(`CREATE TABLE \`up_users_role_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`user_id\` int unsigned DEFAULT NULL,
  \`role_id\` int unsigned DEFAULT NULL,
  \`user_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`up_users_role_lnk_uq\` (\`user_id\`,\`role_id\`),
  KEY \`up_users_role_lnk_fk\` (\`user_id\`),
  KEY \`up_users_role_lnk_ifk\` (\`role_id\`),
  KEY \`up_users_role_lnk_oifk\` (\`user_ord\`),
  CONSTRAINT \`up_users_role_lnk_fk\` FOREIGN KEY (\`user_id\`) REFERENCES \`up_users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`up_users_role_lnk_ifk\` FOREIGN KEY (\`role_id\`) REFERENCES \`up_roles\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng upload_folders
  await knex.raw(`CREATE TABLE \`upload_folders\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`document_id\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`path_id\` int DEFAULT NULL,
  \`path\` varchar(255) DEFAULT NULL,
  \`created_at\` datetime(6) DEFAULT NULL,
  \`updated_at\` datetime(6) DEFAULT NULL,
  \`published_at\` datetime(6) DEFAULT NULL,
  \`created_by_id\` int unsigned DEFAULT NULL,
  \`updated_by_id\` int unsigned DEFAULT NULL,
  \`locale\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`upload_folders_path_id_index\` (\`path_id\`),
  UNIQUE KEY \`upload_folders_path_index\` (\`path\`),
  KEY \`upload_folders_documents_idx\` (\`document_id\`,\`locale\`,\`published_at\`),
  KEY \`upload_folders_created_by_id_fk\` (\`created_by_id\`),
  KEY \`upload_folders_updated_by_id_fk\` (\`updated_by_id\`),
  CONSTRAINT \`upload_folders_created_by_id_fk\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`upload_folders_updated_by_id_fk\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Tạo bảng upload_folders_parent_lnk
  await knex.raw(`CREATE TABLE \`upload_folders_parent_lnk\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`folder_id\` int unsigned DEFAULT NULL,
  \`inv_folder_id\` int unsigned DEFAULT NULL,
  \`folder_ord\` double unsigned DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`upload_folders_parent_lnk_uq\` (\`folder_id\`,\`inv_folder_id\`),
  KEY \`upload_folders_parent_lnk_fk\` (\`folder_id\`),
  KEY \`upload_folders_parent_lnk_ifk\` (\`inv_folder_id\`),
  KEY \`upload_folders_parent_lnk_oifk\` (\`folder_ord\`),
  CONSTRAINT \`upload_folders_parent_lnk_fk\` FOREIGN KEY (\`folder_id\`) REFERENCES \`upload_folders\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`upload_folders_parent_lnk_ifk\` FOREIGN KEY (\`inv_folder_id\`) REFERENCES \`upload_folders\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  return Promise.resolve();
};

exports.down = async function(knex) {
  // Xóa tất cả các bảng theo thứ tự ngược lại

  await knex.schema.dropTableIfExists('upload_folders_parent_lnk');
  await knex.schema.dropTableIfExists('upload_folders');
  await knex.schema.dropTableIfExists('up_users_role_lnk');
  await knex.schema.dropTableIfExists('up_users');
  await knex.schema.dropTableIfExists('up_roles');
  await knex.schema.dropTableIfExists('up_permissions_role_lnk');
  await knex.schema.dropTableIfExists('up_permissions');
  await knex.schema.dropTableIfExists('strapi_workflows_stages_workflow_lnk');
  await knex.schema.dropTableIfExists('strapi_workflows_stages_permissions_lnk');
  await knex.schema.dropTableIfExists('strapi_workflows_stages');
  await knex.schema.dropTableIfExists('strapi_workflows_stage_required_to_publish_lnk');
  await knex.schema.dropTableIfExists('strapi_workflows');
  await knex.schema.dropTableIfExists('strapi_webhooks');
  await knex.schema.dropTableIfExists('strapi_transfer_tokens');
  await knex.schema.dropTableIfExists('strapi_transfer_token_permissions_token_lnk');
  await knex.schema.dropTableIfExists('strapi_transfer_token_permissions');
  await knex.schema.dropTableIfExists('strapi_releases');
  await knex.schema.dropTableIfExists('strapi_release_actions_release_lnk');
  await knex.schema.dropTableIfExists('strapi_release_actions');
  await knex.schema.dropTableIfExists('strapi_migrations_internal');
  await knex.schema.dropTableIfExists('strapi_migrations');
  await knex.schema.dropTableIfExists('strapi_history_versions');
  await knex.schema.dropTableIfExists('strapi_database_schema');
  await knex.schema.dropTableIfExists('strapi_core_store_settings');
  await knex.schema.dropTableIfExists('strapi_api_tokens');
  await knex.schema.dropTableIfExists('strapi_api_token_permissions_token_lnk');
  await knex.schema.dropTableIfExists('strapi_api_token_permissions');
  await knex.schema.dropTableIfExists('slides');
  await knex.schema.dropTableIfExists('services');
  await knex.schema.dropTableIfExists('products_service_lnk');
  await knex.schema.dropTableIfExists('products_cmps');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('news');
  await knex.schema.dropTableIfExists('menus');
  await knex.schema.dropTableIfExists('khach_hangs');
  await knex.schema.dropTableIfExists('i18n_locale');
  await knex.schema.dropTableIfExists('home_page_contents_cmps');
  await knex.schema.dropTableIfExists('home_page_contents');
  await knex.schema.dropTableIfExists('globals_cmps');
  await knex.schema.dropTableIfExists('globals');
  await knex.schema.dropTableIfExists('files_related_mph');
  await knex.schema.dropTableIfExists('files_folder_lnk');
  await knex.schema.dropTableIfExists('files');
  await knex.schema.dropTableIfExists('contacts');
  await knex.schema.dropTableIfExists('components_shared_sliders');
  await knex.schema.dropTableIfExists('components_shared_seos');
  await knex.schema.dropTableIfExists('components_shared_rich_texts_cmps');
  await knex.schema.dropTableIfExists('components_shared_rich_texts');
  await knex.schema.dropTableIfExists('components_shared_quotes');
  await knex.schema.dropTableIfExists('components_shared_media');
  await knex.schema.dropTableIfExists('components_shared_articles');
  await knex.schema.dropTableIfExists('bao_gia_and_tu_vans');
  await knex.schema.dropTableIfExists('articles_cmps');
  await knex.schema.dropTableIfExists('articles');
  await knex.schema.dropTableIfExists('admin_users_roles_lnk');
  await knex.schema.dropTableIfExists('admin_users');
  await knex.schema.dropTableIfExists('admin_roles');
  await knex.schema.dropTableIfExists('admin_permissions_role_lnk');
  await knex.schema.dropTableIfExists('admin_permissions');
  await knex.schema.dropTableIfExists('about_uses_cmps');
  await knex.schema.dropTableIfExists('about_uses');
  return Promise.resolve();
};
