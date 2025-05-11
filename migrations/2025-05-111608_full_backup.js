
exports.up = async function(knex) {
  // Tạo lại cấu trúc database và dữ liệu

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

  // Thêm dữ liệu vào bảng about_uses
  if ((await knex('about_uses').count('* as count'))[0].count === 0) {
    await knex('about_uses').insert([
    {
        'id': 1,
        'document_id': 'zfv1t038k6kmgb3uyy3ejltu',
        'title': 'Lịch sử hình thành',
        'slug': 'lich-su-hinh-thanh',
        'content': 'Lịch sử hình thành',
        'created_at': '2025-05-06T23:52:17.017Z',
        'updated_at': '2025-05-06T23:52:39.073Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 2,
        'document_id': 'zfv1t038k6kmgb3uyy3ejltu',
        'title': 'Lịch sử hình thành',
        'slug': 'lich-su-hinh-thanh',
        'content': 'Lịch sử hình thành',
        'created_at': '2025-05-06T23:52:39.064Z',
        'updated_at': '2025-05-06T23:52:39.064Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'en'
    },
    {
        'id': 3,
        'document_id': 'zfv1t038k6kmgb3uyy3ejltu',
        'title': 'Lịch sử hình thành',
        'slug': 'lich-su-hinh-thanh',
        'content': 'Lịch sử hình thành',
        'created_at': '2025-05-06T23:52:39.064Z',
        'updated_at': '2025-05-06T23:52:39.064Z',
        'published_at': '2025-05-06T23:52:43.880Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'en'
    },
    {
        'id': 4,
        'document_id': 'zfv1t038k6kmgb3uyy3ejltu',
        'title': 'Lịch sử hình thành',
        'slug': 'lich-su-hinh-thanh',
        'content': 'Lịch sử hình thành',
        'created_at': '2025-05-06T23:52:17.017Z',
        'updated_at': '2025-05-06T23:52:43.891Z',
        'published_at': '2025-05-06T23:52:43.880Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 5,
        'document_id': 'nupeaeov3oq00hkwgmxafpvc',
        'title': 'Hình ảnh xưởng',
        'slug': 'about-us',
        'content': 'Hình ảnh xưởng …',
        'created_at': '2025-05-06T23:53:43.605Z',
        'updated_at': '2025-05-06T23:53:43.605Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 6,
        'document_id': 'nupeaeov3oq00hkwgmxafpvc',
        'title': 'Hình ảnh xưởng',
        'slug': 'about-us',
        'content': 'Hình ảnh xưởng …',
        'created_at': '2025-05-06T23:53:43.605Z',
        'updated_at': '2025-05-06T23:53:43.605Z',
        'published_at': '2025-05-06T23:53:43.618Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng admin_permissions
  if ((await knex('admin_permissions').count('* as count'))[0].count === 0) {
    await knex('admin_permissions').insert([
    {
        'id': 2,
        'document_id': 'sy8cx2umbvmlpuuymrz7yd23',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.692Z',
        'updated_at': '2025-05-06T23:55:30.800Z',
        'published_at': '2025-05-05T09:43:57.692Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 5,
        'document_id': 'xa9v3ep6oscddl5sf5ic38oq',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.697Z',
        'updated_at': '2025-05-05T09:43:57.697Z',
        'published_at': '2025-05-05T09:43:57.697Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 7,
        'document_id': 'anbylltx6rpzo6qnmeyk7rev',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.700Z',
        'updated_at': '2025-05-06T23:55:30.800Z',
        'published_at': '2025-05-05T09:43:57.700Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 10,
        'document_id': 'thczvr6ay8va8iltkggsorbz',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.705Z',
        'updated_at': '2025-05-05T09:43:57.705Z',
        'published_at': '2025-05-05T09:43:57.705Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 12,
        'document_id': 'yyzbxcyx395e4xpq92w2don3',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.708Z',
        'updated_at': '2025-05-06T23:55:30.800Z',
        'published_at': '2025-05-05T09:43:57.708Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 15,
        'document_id': 'mp0j9qsvjfcjc2yx8xyxv1ww',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.715Z',
        'updated_at': '2025-05-05T09:43:57.715Z',
        'published_at': '2025-05-05T09:43:57.715Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 17,
        'document_id': 'n1cafqr82fmv6e37sheyq2j1',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.717Z',
        'updated_at': '2025-05-05T09:43:57.717Z',
        'published_at': '2025-05-05T09:43:57.717Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 20,
        'document_id': 'fiu7mrs4a1j11b5aooijena5',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.722Z',
        'updated_at': '2025-05-05T09:43:57.722Z',
        'published_at': '2025-05-05T09:43:57.722Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 22,
        'document_id': 'wfqkpyl5sot1taxtn6qd5o7t',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.727Z',
        'updated_at': '2025-05-05T09:43:57.727Z',
        'published_at': '2025-05-05T09:43:57.727Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 25,
        'document_id': 'sl98y9jd7ux8u8x19hl6suhp',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.731Z',
        'updated_at': '2025-05-05T09:43:57.731Z',
        'published_at': '2025-05-05T09:43:57.731Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 26,
        'document_id': 'hryeh51hnnevfx2dugnsv7qk',
        'action': 'plugin::upload.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.733Z',
        'updated_at': '2025-05-05T09:43:57.733Z',
        'published_at': '2025-05-05T09:43:57.733Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 27,
        'document_id': 'taeedh1ocdrmkbuviy0vofdd',
        'action': 'plugin::upload.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.736Z',
        'updated_at': '2025-05-05T09:43:57.736Z',
        'published_at': '2025-05-05T09:43:57.736Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 28,
        'document_id': 'oaz4jz40t8s8ny03zepl8yyw',
        'action': 'plugin::upload.assets.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.737Z',
        'updated_at': '2025-05-05T09:43:57.737Z',
        'published_at': '2025-05-05T09:43:57.737Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 29,
        'document_id': 's193j2zcpuwmqigk96qbff9t',
        'action': 'plugin::upload.assets.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.739Z',
        'updated_at': '2025-05-05T09:43:57.739Z',
        'published_at': '2025-05-05T09:43:57.739Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 30,
        'document_id': 'u58tkvfqv755fq7v39g9jqkg',
        'action': 'plugin::upload.assets.download',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.740Z',
        'updated_at': '2025-05-05T09:43:57.740Z',
        'published_at': '2025-05-05T09:43:57.740Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 31,
        'document_id': 'rgkr4hhc32tuo6o6bs9z7lgl',
        'action': 'plugin::upload.assets.copy-link',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.741Z',
        'updated_at': '2025-05-05T09:43:57.741Z',
        'published_at': '2025-05-05T09:43:57.741Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 33,
        'document_id': 'eu0wdyrt23p1688isk05n8ff',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.746Z',
        'updated_at': '2025-05-06T23:55:30.800Z',
        'published_at': '2025-05-05T09:43:57.746Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 36,
        'document_id': 'xh75aou0vv0rqq5vgul824qx',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.751Z',
        'updated_at': '2025-05-05T09:43:57.751Z',
        'published_at': '2025-05-05T09:43:57.751Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 38,
        'document_id': 'd1j84y98gby84o5g4acf7dp4',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.753Z',
        'updated_at': '2025-05-06T23:55:30.800Z',
        'published_at': '2025-05-05T09:43:57.753Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 41,
        'document_id': 'ym0wa83379oay5ezgbzvmnp8',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.758Z',
        'updated_at': '2025-05-05T09:43:57.758Z',
        'published_at': '2025-05-05T09:43:57.758Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 43,
        'document_id': 'ghjvkdnh2lhgn11kt490886o',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.760Z',
        'updated_at': '2025-05-06T23:55:30.800Z',
        'published_at': '2025-05-05T09:43:57.760Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 46,
        'document_id': 'jhad1wyyqlsn3et845evvjfi',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.765Z',
        'updated_at': '2025-05-05T09:43:57.765Z',
        'published_at': '2025-05-05T09:43:57.765Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 48,
        'document_id': 'q04f503o29j4kk8copn1v5t3',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.768Z',
        'updated_at': '2025-05-05T09:43:57.768Z',
        'published_at': '2025-05-05T09:43:57.768Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 51,
        'document_id': 'i0mkq89t05fflfhwz7kk8f65',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {},
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.772Z',
        'updated_at': '2025-05-05T09:43:57.772Z',
        'published_at': '2025-05-05T09:43:57.772Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 52,
        'document_id': 'tu4s2yoka1cbav8l99ss6d5x',
        'action': 'plugin::upload.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.774Z',
        'updated_at': '2025-05-05T09:43:57.774Z',
        'published_at': '2025-05-05T09:43:57.774Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 53,
        'document_id': 'ldj0cvl4zwiso0rkyvy4ki72',
        'action': 'plugin::upload.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.776Z',
        'updated_at': '2025-05-05T09:43:57.776Z',
        'published_at': '2025-05-05T09:43:57.776Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 54,
        'document_id': 'qothyz0ols0lg6j06tep9h99',
        'action': 'plugin::upload.assets.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.777Z',
        'updated_at': '2025-05-05T09:43:57.777Z',
        'published_at': '2025-05-05T09:43:57.777Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 55,
        'document_id': 'y1xtk4qplw48tn3xsy92byzx',
        'action': 'plugin::upload.assets.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [
            'admin::is-creator'
        ],
        'created_at': '2025-05-05T09:43:57.779Z',
        'updated_at': '2025-05-05T09:43:57.779Z',
        'published_at': '2025-05-05T09:43:57.779Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 56,
        'document_id': 'bpgmeuenegrirwhe6upqh7p6',
        'action': 'plugin::upload.assets.download',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.781Z',
        'updated_at': '2025-05-05T09:43:57.781Z',
        'published_at': '2025-05-05T09:43:57.781Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 57,
        'document_id': 'uaxxt61m476dd6mqim6mfw78',
        'action': 'plugin::upload.assets.copy-link',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.782Z',
        'updated_at': '2025-05-05T09:43:57.782Z',
        'published_at': '2025-05-05T09:43:57.782Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 58,
        'document_id': 'cz9jmgedt8npnbkuk8t9hkvk',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'plugin::users-permissions.user',
        'properties': {
            'fields': [
                'username',
                'email',
                'provider',
                'password',
                'resetPasswordToken',
                'confirmationToken',
                'confirmed',
                'blocked',
                'role'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.793Z',
        'updated_at': '2025-05-05T09:43:57.793Z',
        'published_at': '2025-05-05T09:43:57.793Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 63,
        'document_id': 'c0xo5y6ds3n019qriorelso0',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.802Z',
        'updated_at': '2025-05-05T09:43:57.802Z',
        'published_at': '2025-05-05T09:43:57.802Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 64,
        'document_id': 'auwdv7618qtoyzhb64pvdvpe',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'plugin::users-permissions.user',
        'properties': {
            'fields': [
                'username',
                'email',
                'provider',
                'password',
                'resetPasswordToken',
                'confirmationToken',
                'confirmed',
                'blocked',
                'role'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.803Z',
        'updated_at': '2025-05-05T09:43:57.803Z',
        'published_at': '2025-05-05T09:43:57.803Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 69,
        'document_id': 'zerdhkd56yedycpfcwvjucyt',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.811Z',
        'updated_at': '2025-05-05T09:43:57.811Z',
        'published_at': '2025-05-05T09:43:57.811Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 70,
        'document_id': 'gu4mbgo5nwns2lchni48zm58',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'plugin::users-permissions.user',
        'properties': {
            'fields': [
                'username',
                'email',
                'provider',
                'password',
                'resetPasswordToken',
                'confirmationToken',
                'confirmed',
                'blocked',
                'role'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.813Z',
        'updated_at': '2025-05-05T09:43:57.813Z',
        'published_at': '2025-05-05T09:43:57.813Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 75,
        'document_id': 'sq40s4j4darnzvo439kynigq',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {
            'fields': [
                'siteName',
                'favicon',
                'siteDescription',
                'defaultSeo.metaTitle',
                'defaultSeo.metaDescription',
                'defaultSeo.shareImage'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.821Z',
        'updated_at': '2025-05-05T09:43:57.821Z',
        'published_at': '2025-05-05T09:43:57.821Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 76,
        'document_id': 'lxrfbxgyytfa110qowiw1wjb',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'plugin::users-permissions.user',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.823Z',
        'updated_at': '2025-05-05T09:43:57.823Z',
        'published_at': '2025-05-05T09:43:57.823Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 78,
        'document_id': 'i3lm96k8k9c11yzkz3vgo3nr',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.826Z',
        'updated_at': '2025-05-05T09:43:57.826Z',
        'published_at': '2025-05-05T09:43:57.826Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 81,
        'document_id': 'mbgwhnqf7tqbw6tmd2v39bja',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.830Z',
        'updated_at': '2025-05-05T09:43:57.830Z',
        'published_at': '2025-05-05T09:43:57.830Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 82,
        'document_id': 'ogca9m70tccvl54atjfgcn65',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'plugin::users-permissions.user',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.832Z',
        'updated_at': '2025-05-05T09:43:57.832Z',
        'published_at': '2025-05-05T09:43:57.832Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 84,
        'document_id': 'm9n2xrgga2bd3af73gmsztr6',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.834Z',
        'updated_at': '2025-05-05T09:43:57.834Z',
        'published_at': '2025-05-05T09:43:57.834Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 87,
        'document_id': 'iuclja7nqognqz6kxfwpsg1n',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::global.global',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.838Z',
        'updated_at': '2025-05-05T09:43:57.838Z',
        'published_at': '2025-05-05T09:43:57.838Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 88,
        'document_id': 'n0nwtno97v6u7urf12fmglhy',
        'action': 'plugin::content-manager.single-types.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.840Z',
        'updated_at': '2025-05-05T09:43:57.840Z',
        'published_at': '2025-05-05T09:43:57.840Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 89,
        'document_id': 'hsx8o18nx7vkm7omyxh6w9ay',
        'action': 'plugin::content-manager.collection-types.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.841Z',
        'updated_at': '2025-05-05T09:43:57.841Z',
        'published_at': '2025-05-05T09:43:57.841Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 90,
        'document_id': 'lbt5aofx1vda1h29iar95j6i',
        'action': 'plugin::content-manager.components.configure-layout',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.842Z',
        'updated_at': '2025-05-05T09:43:57.842Z',
        'published_at': '2025-05-05T09:43:57.842Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 91,
        'document_id': 'xyueipio1jy46b600nqomz2g',
        'action': 'plugin::content-type-builder.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.844Z',
        'updated_at': '2025-05-05T09:43:57.844Z',
        'published_at': '2025-05-05T09:43:57.844Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 92,
        'document_id': 'iuujxcnjm2rxpufilcxlhf3c',
        'action': 'plugin::email.settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.845Z',
        'updated_at': '2025-05-05T09:43:57.845Z',
        'published_at': '2025-05-05T09:43:57.845Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 93,
        'document_id': 'sw6ocleis1szh1aok4logk48',
        'action': 'plugin::upload.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.846Z',
        'updated_at': '2025-05-05T09:43:57.846Z',
        'published_at': '2025-05-05T09:43:57.846Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 94,
        'document_id': 'f43wwn07a7wiworydpg26jt8',
        'action': 'plugin::upload.assets.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.847Z',
        'updated_at': '2025-05-05T09:43:57.847Z',
        'published_at': '2025-05-05T09:43:57.847Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 95,
        'document_id': 'b92hsqdpy81a1gqy9hxq6fjp',
        'action': 'plugin::upload.assets.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.848Z',
        'updated_at': '2025-05-05T09:43:57.848Z',
        'published_at': '2025-05-05T09:43:57.849Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 96,
        'document_id': 'l37wd5m9sz6vcyf9hv0nd930',
        'action': 'plugin::upload.assets.download',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.850Z',
        'updated_at': '2025-05-05T09:43:57.850Z',
        'published_at': '2025-05-05T09:43:57.850Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 97,
        'document_id': 'o1dt1m2oy5yuy9zbh205390m',
        'action': 'plugin::upload.assets.copy-link',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.851Z',
        'updated_at': '2025-05-05T09:43:57.851Z',
        'published_at': '2025-05-05T09:43:57.851Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 98,
        'document_id': 'b7t4erxofhhi2sudikshul9w',
        'action': 'plugin::upload.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.852Z',
        'updated_at': '2025-05-05T09:43:57.852Z',
        'published_at': '2025-05-05T09:43:57.852Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 99,
        'document_id': 'xi201off0vudohdzihg6nluj',
        'action': 'plugin::upload.settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.853Z',
        'updated_at': '2025-05-05T09:43:57.853Z',
        'published_at': '2025-05-05T09:43:57.853Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 100,
        'document_id': 'uak6slsjx964mnhdgc5a3nt9',
        'action': 'plugin::i18n.locale.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.855Z',
        'updated_at': '2025-05-05T09:43:57.855Z',
        'published_at': '2025-05-05T09:43:57.855Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 101,
        'document_id': 'mee15ihe7q9k6q7bgcb4vr8a',
        'action': 'plugin::i18n.locale.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.856Z',
        'updated_at': '2025-05-05T09:43:57.856Z',
        'published_at': '2025-05-05T09:43:57.856Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 102,
        'document_id': 'kkgaqdllxie7mdgiczickg7v',
        'action': 'plugin::i18n.locale.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.857Z',
        'updated_at': '2025-05-05T09:43:57.857Z',
        'published_at': '2025-05-05T09:43:57.857Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 103,
        'document_id': 'isgk8llo5vuvxto9bjzw0qoh',
        'action': 'plugin::i18n.locale.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.858Z',
        'updated_at': '2025-05-05T09:43:57.858Z',
        'published_at': '2025-05-05T09:43:57.859Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 104,
        'document_id': 'i5xmn3s61syn9gpd3ilkw7qw',
        'action': 'plugin::users-permissions.roles.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.860Z',
        'updated_at': '2025-05-05T09:43:57.860Z',
        'published_at': '2025-05-05T09:43:57.860Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 105,
        'document_id': 'yzs4lso4sax1xkjs420utx22',
        'action': 'plugin::users-permissions.roles.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.862Z',
        'updated_at': '2025-05-05T09:43:57.862Z',
        'published_at': '2025-05-05T09:43:57.862Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 106,
        'document_id': 'p2n4sjz5fofoif41h2fgiajg',
        'action': 'plugin::users-permissions.roles.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.863Z',
        'updated_at': '2025-05-05T09:43:57.863Z',
        'published_at': '2025-05-05T09:43:57.863Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 107,
        'document_id': 'd4i5zj7uuzbptpph4bhpc7vr',
        'action': 'plugin::users-permissions.roles.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.864Z',
        'updated_at': '2025-05-05T09:43:57.864Z',
        'published_at': '2025-05-05T09:43:57.864Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 108,
        'document_id': 's27dq4gifoc0d8at9u5xflxi',
        'action': 'plugin::users-permissions.providers.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.867Z',
        'updated_at': '2025-05-05T09:43:57.867Z',
        'published_at': '2025-05-05T09:43:57.867Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 109,
        'document_id': 'du3mvja31s9ygta0ieackoza',
        'action': 'plugin::users-permissions.providers.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.868Z',
        'updated_at': '2025-05-05T09:43:57.868Z',
        'published_at': '2025-05-05T09:43:57.868Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 110,
        'document_id': 'fcqtg65x4473vjuouyzhth7i',
        'action': 'plugin::users-permissions.email-templates.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.870Z',
        'updated_at': '2025-05-05T09:43:57.870Z',
        'published_at': '2025-05-05T09:43:57.870Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 111,
        'document_id': 'pbd2xxe6u44hqkg55ve7ac66',
        'action': 'plugin::users-permissions.email-templates.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.872Z',
        'updated_at': '2025-05-05T09:43:57.872Z',
        'published_at': '2025-05-05T09:43:57.872Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 112,
        'document_id': 'h2j6xs32sxvek7n38e4a2kyj',
        'action': 'plugin::users-permissions.advanced-settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.873Z',
        'updated_at': '2025-05-05T09:43:57.873Z',
        'published_at': '2025-05-05T09:43:57.873Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 113,
        'document_id': 'owv5qmuvnxdv1usbdr75s23x',
        'action': 'plugin::users-permissions.advanced-settings.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.875Z',
        'updated_at': '2025-05-05T09:43:57.875Z',
        'published_at': '2025-05-05T09:43:57.875Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 114,
        'document_id': 'mhudm3evcfa6mvouiublilrr',
        'action': 'admin::marketplace.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.876Z',
        'updated_at': '2025-05-05T09:43:57.876Z',
        'published_at': '2025-05-05T09:43:57.876Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 115,
        'document_id': 'lybojgdthyxwa2mez71zla8k',
        'action': 'admin::webhooks.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.877Z',
        'updated_at': '2025-05-05T09:43:57.877Z',
        'published_at': '2025-05-05T09:43:57.877Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 116,
        'document_id': 'qzi47xl61b1nl2qpbe6t68o6',
        'action': 'admin::webhooks.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.879Z',
        'updated_at': '2025-05-05T09:43:57.879Z',
        'published_at': '2025-05-05T09:43:57.879Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 117,
        'document_id': 'eopm6x4vke3g47zn7zqjmfug',
        'action': 'admin::webhooks.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.881Z',
        'updated_at': '2025-05-05T09:43:57.881Z',
        'published_at': '2025-05-05T09:43:57.881Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 118,
        'document_id': 'n7jsrbgqwp9vhfvj6smyrzrv',
        'action': 'admin::webhooks.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.882Z',
        'updated_at': '2025-05-05T09:43:57.882Z',
        'published_at': '2025-05-05T09:43:57.882Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 119,
        'document_id': 'wbwbmztu89ff40ywo13x59la',
        'action': 'admin::users.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.883Z',
        'updated_at': '2025-05-05T09:43:57.883Z',
        'published_at': '2025-05-05T09:43:57.883Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 120,
        'document_id': 'qwhc7m6idiy18q5j8xnw70h9',
        'action': 'admin::users.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.884Z',
        'updated_at': '2025-05-05T09:43:57.884Z',
        'published_at': '2025-05-05T09:43:57.884Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 121,
        'document_id': 'r9wdqzw92ot3h19k5z7yq47b',
        'action': 'admin::users.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.886Z',
        'updated_at': '2025-05-05T09:43:57.886Z',
        'published_at': '2025-05-05T09:43:57.886Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 122,
        'document_id': 'f1c3yzpbtatifhur6nuoe1a5',
        'action': 'admin::users.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.887Z',
        'updated_at': '2025-05-05T09:43:57.887Z',
        'published_at': '2025-05-05T09:43:57.887Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 123,
        'document_id': 'cy2gq1bl0n7d2p6myap92fze',
        'action': 'admin::roles.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.888Z',
        'updated_at': '2025-05-05T09:43:57.888Z',
        'published_at': '2025-05-05T09:43:57.888Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 124,
        'document_id': 'j70opihdnj9jdce4b5q3d5px',
        'action': 'admin::roles.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.889Z',
        'updated_at': '2025-05-05T09:43:57.889Z',
        'published_at': '2025-05-05T09:43:57.889Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 125,
        'document_id': 'uiywzvec9d8m7cp9fi4bnmyo',
        'action': 'admin::roles.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.890Z',
        'updated_at': '2025-05-05T09:43:57.890Z',
        'published_at': '2025-05-05T09:43:57.890Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 126,
        'document_id': 'su8tiqpj9hxl6pza6dnoe6tq',
        'action': 'admin::roles.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.892Z',
        'updated_at': '2025-05-05T09:43:57.892Z',
        'published_at': '2025-05-05T09:43:57.892Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 127,
        'document_id': 'q1e2h31zi693bv12g5wfobsq',
        'action': 'admin::api-tokens.access',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.893Z',
        'updated_at': '2025-05-05T09:43:57.893Z',
        'published_at': '2025-05-05T09:43:57.893Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 128,
        'document_id': 'g9oa8kqj7s461niu72niq5em',
        'action': 'admin::api-tokens.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.894Z',
        'updated_at': '2025-05-05T09:43:57.894Z',
        'published_at': '2025-05-05T09:43:57.894Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 129,
        'document_id': 'dw33c4l68rbttcfy165m9gya',
        'action': 'admin::api-tokens.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.895Z',
        'updated_at': '2025-05-05T09:43:57.895Z',
        'published_at': '2025-05-05T09:43:57.895Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 130,
        'document_id': 'xslaux1z8s3vi3xk7e716r9r',
        'action': 'admin::api-tokens.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.896Z',
        'updated_at': '2025-05-05T09:43:57.896Z',
        'published_at': '2025-05-05T09:43:57.896Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 131,
        'document_id': 'scpg3gpth7nnn1xccktorkvw',
        'action': 'admin::api-tokens.regenerate',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.898Z',
        'updated_at': '2025-05-05T09:43:57.898Z',
        'published_at': '2025-05-05T09:43:57.898Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 132,
        'document_id': 'd3vn4i9u1v6hjs46fhyae57e',
        'action': 'admin::api-tokens.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.899Z',
        'updated_at': '2025-05-05T09:43:57.899Z',
        'published_at': '2025-05-05T09:43:57.899Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 133,
        'document_id': 'ht0tqz1q9dksqgoriexrvb2c',
        'action': 'admin::project-settings.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.901Z',
        'updated_at': '2025-05-05T09:43:57.901Z',
        'published_at': '2025-05-05T09:43:57.901Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 134,
        'document_id': 'y4zyy50yl0chezoflv6nz8ek',
        'action': 'admin::project-settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.902Z',
        'updated_at': '2025-05-05T09:43:57.902Z',
        'published_at': '2025-05-05T09:43:57.902Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 135,
        'document_id': 'tmwddqzd6v2mj00knjjlme5m',
        'action': 'admin::transfer.tokens.access',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.903Z',
        'updated_at': '2025-05-05T09:43:57.903Z',
        'published_at': '2025-05-05T09:43:57.903Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 136,
        'document_id': 'lvg8qnkz2cae549ra02deld5',
        'action': 'admin::transfer.tokens.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.904Z',
        'updated_at': '2025-05-05T09:43:57.904Z',
        'published_at': '2025-05-05T09:43:57.904Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 137,
        'document_id': 'ww9xp5243x5cd9366od7a3rq',
        'action': 'admin::transfer.tokens.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.906Z',
        'updated_at': '2025-05-05T09:43:57.906Z',
        'published_at': '2025-05-05T09:43:57.906Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 138,
        'document_id': 'ifwzrr7cqbd23umm9yxziofu',
        'action': 'admin::transfer.tokens.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.907Z',
        'updated_at': '2025-05-05T09:43:57.907Z',
        'published_at': '2025-05-05T09:43:57.907Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 139,
        'document_id': 'w5scw1v5lskueou4mm1gg2z3',
        'action': 'admin::transfer.tokens.regenerate',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.908Z',
        'updated_at': '2025-05-05T09:43:57.908Z',
        'published_at': '2025-05-05T09:43:57.908Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 140,
        'document_id': 'f0xyzpy72vgmytje4317i0do',
        'action': 'admin::transfer.tokens.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-05T09:43:57.910Z',
        'updated_at': '2025-05-05T09:43:57.910Z',
        'published_at': '2025-05-05T09:43:57.910Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 147,
        'document_id': 'j5akwwqim2d87jm2qy482n3o',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T16:13:38.930Z',
        'updated_at': '2025-05-06T16:13:38.930Z',
        'published_at': '2025-05-06T16:13:38.931Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 148,
        'document_id': 'sj5m2odv2cuhlja9aru4mxhe',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T16:13:38.933Z',
        'updated_at': '2025-05-06T16:13:38.933Z',
        'published_at': '2025-05-06T16:13:38.933Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 149,
        'document_id': 'zy1rsfaxihagptrz0tnhs8q8',
        'action': 'plugin::seo.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-06T16:15:11.816Z',
        'updated_at': '2025-05-06T16:15:11.816Z',
        'published_at': '2025-05-06T16:15:11.816Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 162,
        'document_id': 'j2st365tgc9omt7y3ar4q9y7',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T23:55:30.751Z',
        'updated_at': '2025-05-06T23:55:30.751Z',
        'published_at': '2025-05-06T23:55:30.752Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 164,
        'document_id': 'q5auvvca86j7rka2zuqi4l4i',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T23:55:30.764Z',
        'updated_at': '2025-05-06T23:55:30.764Z',
        'published_at': '2025-05-06T23:55:30.765Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 166,
        'document_id': 'p6r9mwenmjijnb8nefhtbbwr',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T23:55:30.773Z',
        'updated_at': '2025-05-06T23:55:30.773Z',
        'published_at': '2025-05-06T23:55:30.773Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 171,
        'document_id': 'mion81kzgrddtme12ubvrgbp',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T23:58:28.148Z',
        'updated_at': '2025-05-06T23:58:28.148Z',
        'published_at': '2025-05-06T23:58:28.148Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 172,
        'document_id': 'f3le0h88d8p9ddnk7ck7ob6s',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-06T23:58:28.156Z',
        'updated_at': '2025-05-06T23:58:28.156Z',
        'published_at': '2025-05-06T23:58:28.156Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 173,
        'document_id': 'sjcc45hj1slcro4mzvf9rm3c',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'fields': [
                'title',
                'slug',
                'content',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:01:32.784Z',
        'updated_at': '2025-05-07T00:01:32.784Z',
        'published_at': '2025-05-07T00:01:32.784Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 174,
        'document_id': 'q96ce6w3ac1rllsg33zl90r1',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'fields': [
                'title',
                'slug',
                'content',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:01:32.788Z',
        'updated_at': '2025-05-07T00:01:32.788Z',
        'published_at': '2025-05-07T00:01:32.789Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 175,
        'document_id': 'hug7hjv39985jimtzgu8wdud',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'fields': [
                'title',
                'slug',
                'content',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:01:32.792Z',
        'updated_at': '2025-05-07T00:01:32.792Z',
        'published_at': '2025-05-07T00:01:32.793Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 179,
        'document_id': 'ed9c13rphttxajuuydt38bik',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:03:32.487Z',
        'updated_at': '2025-05-07T00:03:32.487Z',
        'published_at': '2025-05-07T00:03:32.487Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 180,
        'document_id': 'nk8qx79qyleprs3ou21stuia',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:03:32.497Z',
        'updated_at': '2025-05-07T00:03:32.497Z',
        'published_at': '2025-05-07T00:03:32.497Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 187,
        'document_id': 'jqthu0be0fvzh6imob3lltrv',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:07:17.918Z',
        'updated_at': '2025-05-07T00:07:17.918Z',
        'published_at': '2025-05-07T00:07:17.919Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 188,
        'document_id': 'yaxdjprz5ah6afwp31qymkk9',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:07:17.923Z',
        'updated_at': '2025-05-07T00:07:17.923Z',
        'published_at': '2025-05-07T00:07:17.923Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 190,
        'document_id': 'b9gb6ohl06saqwbwwr8rrf1g',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'fields': [
                'title',
                'slug',
                'image',
                'content',
                'products'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:08:27.977Z',
        'updated_at': '2025-05-07T00:08:27.977Z',
        'published_at': '2025-05-07T00:08:27.977Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 192,
        'document_id': 'd8zjl5vuvvx1nn7csbn9c0az',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'fields': [
                'title',
                'slug',
                'image',
                'content',
                'products'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:08:28.008Z',
        'updated_at': '2025-05-07T00:08:28.008Z',
        'published_at': '2025-05-07T00:08:28.009Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 194,
        'document_id': 'g4uj3p8fsi48p0l1tmmt2cl0',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'fields': [
                'title',
                'slug',
                'image',
                'content',
                'products'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:08:28.016Z',
        'updated_at': '2025-05-07T00:08:28.016Z',
        'published_at': '2025-05-07T00:08:28.016Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 195,
        'document_id': 'mazxsv9hwzohlf5zqpmzg5i1',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'fields': [
                'title',
                'slug',
                'description',
                'image',
                'service',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:09:56.251Z',
        'updated_at': '2025-05-07T00:09:56.251Z',
        'published_at': '2025-05-07T00:09:56.252Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 196,
        'document_id': 'g8lz4b2twhz2ffcix265ybsu',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'fields': [
                'title',
                'slug',
                'description',
                'image',
                'service',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:09:56.259Z',
        'updated_at': '2025-05-07T00:09:56.259Z',
        'published_at': '2025-05-07T00:09:56.259Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 197,
        'document_id': 'b29llvq8fkz3x81n8g4um8oc',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'fields': [
                'title',
                'slug',
                'description',
                'image',
                'service',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:09:56.264Z',
        'updated_at': '2025-05-07T00:09:56.264Z',
        'published_at': '2025-05-07T00:09:56.264Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 198,
        'document_id': 'qb684ms6792a0u7dwiazvaam',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'fields': [
                'name',
                'address',
                'phone',
                'tax_code',
                'email',
                'image'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:12:39.630Z',
        'updated_at': '2025-05-07T00:12:39.630Z',
        'published_at': '2025-05-07T00:12:39.630Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 199,
        'document_id': 'hyagnyf856b63ltev4gef2iz',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'fields': [
                'name',
                'address',
                'phone',
                'tax_code',
                'email',
                'image'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:12:39.640Z',
        'updated_at': '2025-05-07T00:12:39.640Z',
        'published_at': '2025-05-07T00:12:39.640Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 200,
        'document_id': 'vevcsfl6rifn7wqpcf5obb2a',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'fields': [
                'name',
                'address',
                'phone',
                'tax_code',
                'email',
                'image'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-07T00:12:39.644Z',
        'updated_at': '2025-05-07T00:12:39.644Z',
        'published_at': '2025-05-07T00:12:39.644Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 201,
        'document_id': 'obxedxeoo0zfc24ttsegzezt',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {
            'fields': [
                'customer_name',
                'customer_phone',
                'content'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:02:26.188Z',
        'updated_at': '2025-05-09T16:02:26.188Z',
        'published_at': '2025-05-09T16:02:26.188Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 202,
        'document_id': 'uzsi2zkaoh3mgoree40jodas',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {
            'fields': [
                'customer_name',
                'customer_phone',
                'content'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:02:26.197Z',
        'updated_at': '2025-05-09T16:02:26.197Z',
        'published_at': '2025-05-09T16:02:26.197Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 203,
        'document_id': 'v88af06pzemc2l0wn961ynyc',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {
            'fields': [
                'customer_name',
                'customer_phone',
                'content'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:02:26.201Z',
        'updated_at': '2025-05-09T16:02:26.201Z',
        'published_at': '2025-05-09T16:02:26.201Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 204,
        'document_id': 'sjlhibyi25lvn6yklvgub2ku',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:02:26.206Z',
        'updated_at': '2025-05-09T16:02:26.206Z',
        'published_at': '2025-05-09T16:02:26.206Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 205,
        'document_id': 'pyqk7qyxfw6y78ppd2gul28k',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:02:26.209Z',
        'updated_at': '2025-05-09T16:02:26.209Z',
        'published_at': '2025-05-09T16:02:26.210Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 206,
        'document_id': 'ogxhval05zo7o54875ut485u',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'fields': [
                'title',
                'slug',
                'items'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:11:24.684Z',
        'updated_at': '2025-05-09T16:11:24.684Z',
        'published_at': '2025-05-09T16:11:24.685Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 207,
        'document_id': 'vaarv0agsxdgzfft20vvvohh',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'fields': [
                'title',
                'slug',
                'items'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:11:24.693Z',
        'updated_at': '2025-05-09T16:11:24.693Z',
        'published_at': '2025-05-09T16:11:24.693Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 208,
        'document_id': 'df13rl3ahraug6pfdy6eq6rf',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'fields': [
                'title',
                'slug',
                'items'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:11:24.698Z',
        'updated_at': '2025-05-09T16:11:24.698Z',
        'published_at': '2025-05-09T16:11:24.698Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 209,
        'document_id': 'cyy4zjspnc9s20ahkizr0zyd',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:11:24.702Z',
        'updated_at': '2025-05-09T16:11:24.702Z',
        'published_at': '2025-05-09T16:11:24.703Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 210,
        'document_id': 'z188dzhmz6ioh8khcyn0gryn',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:11:24.710Z',
        'updated_at': '2025-05-09T16:11:24.710Z',
        'published_at': '2025-05-09T16:11:24.710Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 211,
        'document_id': 'w7bmbp5cfbx0bnrdc2dsna1a',
        'action': 'plugin::content-manager.single-types.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.496Z',
        'updated_at': '2025-05-09T16:28:23.496Z',
        'published_at': '2025-05-09T16:28:23.497Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 212,
        'document_id': 'r8nd56cnb2qa6oayr7ushduh',
        'action': 'plugin::content-manager.collection-types.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.501Z',
        'updated_at': '2025-05-09T16:28:23.501Z',
        'published_at': '2025-05-09T16:28:23.501Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 213,
        'document_id': 'jpey4a22s5vj1g6uzel9yj6g',
        'action': 'plugin::content-manager.components.configure-layout',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.504Z',
        'updated_at': '2025-05-09T16:28:23.504Z',
        'published_at': '2025-05-09T16:28:23.505Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 214,
        'document_id': 'u5pyjc5s3ivj0c4satnborna',
        'action': 'plugin::content-type-builder.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.507Z',
        'updated_at': '2025-05-09T16:28:23.507Z',
        'published_at': '2025-05-09T16:28:23.507Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 215,
        'document_id': 'c87zkxtkkb63u9lr8hemfnq9',
        'action': 'plugin::upload.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.511Z',
        'updated_at': '2025-05-09T16:28:23.511Z',
        'published_at': '2025-05-09T16:28:23.511Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 216,
        'document_id': 'lx97wzgshxef4c5e758dp4gk',
        'action': 'plugin::upload.configure-view',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.517Z',
        'updated_at': '2025-05-09T16:28:23.517Z',
        'published_at': '2025-05-09T16:28:23.517Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 217,
        'document_id': 'gkkhiwe8mgbjf95n115zxc6s',
        'action': 'plugin::upload.assets.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.519Z',
        'updated_at': '2025-05-09T16:28:23.519Z',
        'published_at': '2025-05-09T16:28:23.519Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 218,
        'document_id': 'd1ese0myw4rncxcg0dhqwfv0',
        'action': 'plugin::upload.assets.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.523Z',
        'updated_at': '2025-05-09T16:28:23.523Z',
        'published_at': '2025-05-09T16:28:23.523Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 219,
        'document_id': 'cb0r5mug120yrz68xowmotk2',
        'action': 'plugin::upload.assets.download',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.527Z',
        'updated_at': '2025-05-09T16:28:23.527Z',
        'published_at': '2025-05-09T16:28:23.527Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 220,
        'document_id': 'uz4u60dnlq9e8v7scp7hw8mq',
        'action': 'plugin::upload.assets.copy-link',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.532Z',
        'updated_at': '2025-05-09T16:28:23.532Z',
        'published_at': '2025-05-09T16:28:23.532Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 221,
        'document_id': 'qdxorvhfg9dbsngk851jsp4j',
        'action': 'plugin::seo.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.536Z',
        'updated_at': '2025-05-09T16:28:23.536Z',
        'published_at': '2025-05-09T16:28:23.536Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 222,
        'document_id': 'pc2zhnn8692jlf0gcavi49vv',
        'action': 'plugin::users-permissions.roles.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.538Z',
        'updated_at': '2025-05-09T16:28:23.538Z',
        'published_at': '2025-05-09T16:28:23.538Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 223,
        'document_id': 'e73tdz7x1whdkv9avl7ti40g',
        'action': 'plugin::users-permissions.roles.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.541Z',
        'updated_at': '2025-05-09T16:28:23.541Z',
        'published_at': '2025-05-09T16:28:23.541Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 224,
        'document_id': 'm09l28y1bm4hraw9mgk43eft',
        'action': 'plugin::users-permissions.roles.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.545Z',
        'updated_at': '2025-05-09T16:28:23.545Z',
        'published_at': '2025-05-09T16:28:23.545Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 225,
        'document_id': 'vi9ohngwxhryxytltmcipuhw',
        'action': 'plugin::users-permissions.roles.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.548Z',
        'updated_at': '2025-05-09T16:28:23.548Z',
        'published_at': '2025-05-09T16:28:23.548Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 226,
        'document_id': 'tmv3t1jgpd10c761lurjfek0',
        'action': 'plugin::users-permissions.providers.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.551Z',
        'updated_at': '2025-05-09T16:28:23.551Z',
        'published_at': '2025-05-09T16:28:23.551Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 227,
        'document_id': 'jf2aq0yy4bxsjpq6dzppg13a',
        'action': 'plugin::users-permissions.providers.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.554Z',
        'updated_at': '2025-05-09T16:28:23.554Z',
        'published_at': '2025-05-09T16:28:23.554Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 228,
        'document_id': 'in0qtlc78k75bgsfbrq6d8xy',
        'action': 'plugin::users-permissions.email-templates.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.559Z',
        'updated_at': '2025-05-09T16:28:23.559Z',
        'published_at': '2025-05-09T16:28:23.559Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 229,
        'document_id': 'ye07dprdfjrq3n2wfqgxzew6',
        'action': 'plugin::users-permissions.email-templates.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.562Z',
        'updated_at': '2025-05-09T16:28:23.562Z',
        'published_at': '2025-05-09T16:28:23.562Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 230,
        'document_id': 'm5sy0h3vsai72nnfvwbmyoqp',
        'action': 'plugin::users-permissions.advanced-settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.564Z',
        'updated_at': '2025-05-09T16:28:23.564Z',
        'published_at': '2025-05-09T16:28:23.564Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 231,
        'document_id': 'bxjqzt0yxwotcaunnu1fyy4f',
        'action': 'plugin::users-permissions.advanced-settings.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.565Z',
        'updated_at': '2025-05-09T16:28:23.565Z',
        'published_at': '2025-05-09T16:28:23.566Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 232,
        'document_id': 'a5e8aqdoy4votcd4vl09vo6x',
        'action': 'plugin::email.settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.569Z',
        'updated_at': '2025-05-09T16:28:23.569Z',
        'published_at': '2025-05-09T16:28:23.569Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 233,
        'document_id': 'fog4s1o4ozxnsgap04oars3k',
        'action': 'plugin::upload.settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.572Z',
        'updated_at': '2025-05-09T16:28:23.572Z',
        'published_at': '2025-05-09T16:28:23.572Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 234,
        'document_id': 'peur173778ggvnomuzq9fjcl',
        'action': 'plugin::i18n.locale.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.575Z',
        'updated_at': '2025-05-09T16:28:23.575Z',
        'published_at': '2025-05-09T16:28:23.575Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 235,
        'document_id': 'vt0183fs23ur7qp22wq65w4e',
        'action': 'plugin::i18n.locale.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.579Z',
        'updated_at': '2025-05-09T16:28:23.579Z',
        'published_at': '2025-05-09T16:28:23.579Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 236,
        'document_id': 'xsin15msdxwb58o0cbnyqahb',
        'action': 'plugin::i18n.locale.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.586Z',
        'updated_at': '2025-05-09T16:28:23.586Z',
        'published_at': '2025-05-09T16:28:23.586Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 237,
        'document_id': 'wh8z8bka7h1dzu4s3qyywtkv',
        'action': 'plugin::i18n.locale.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.589Z',
        'updated_at': '2025-05-09T16:28:23.589Z',
        'published_at': '2025-05-09T16:28:23.590Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 238,
        'document_id': 'vuomd08rdl55rxf0lkexk8gc',
        'action': 'admin::marketplace.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.594Z',
        'updated_at': '2025-05-09T16:28:23.594Z',
        'published_at': '2025-05-09T16:28:23.594Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 239,
        'document_id': 'q6djpnlngm6x5w3ofl908cz5',
        'action': 'admin::webhooks.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.597Z',
        'updated_at': '2025-05-09T16:28:23.597Z',
        'published_at': '2025-05-09T16:28:23.597Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 240,
        'document_id': 'r17yqzvjn8jjbmokh1dubps7',
        'action': 'admin::webhooks.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.600Z',
        'updated_at': '2025-05-09T16:28:23.600Z',
        'published_at': '2025-05-09T16:28:23.600Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 241,
        'document_id': 'l56ed2e46rw97hqbruoecv1f',
        'action': 'admin::webhooks.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.605Z',
        'updated_at': '2025-05-09T16:28:23.605Z',
        'published_at': '2025-05-09T16:28:23.605Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 242,
        'document_id': 'pvt91xkdegi14x0bng2ded8y',
        'action': 'admin::webhooks.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.608Z',
        'updated_at': '2025-05-09T16:28:23.608Z',
        'published_at': '2025-05-09T16:28:23.608Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 243,
        'document_id': 'sgelt8abr4zleeixvntw9f10',
        'action': 'admin::users.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.611Z',
        'updated_at': '2025-05-09T16:28:23.611Z',
        'published_at': '2025-05-09T16:28:23.611Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 244,
        'document_id': 'yxdgtfn81q3oqcxn0hwbodm7',
        'action': 'admin::users.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.613Z',
        'updated_at': '2025-05-09T16:28:23.613Z',
        'published_at': '2025-05-09T16:28:23.613Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 245,
        'document_id': 'maze07k2m5op4la0czmek5wb',
        'action': 'admin::users.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.616Z',
        'updated_at': '2025-05-09T16:28:23.616Z',
        'published_at': '2025-05-09T16:28:23.616Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 246,
        'document_id': 'vz0pfuhkj5w3uhz7885ic31u',
        'action': 'admin::users.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.618Z',
        'updated_at': '2025-05-09T16:28:23.618Z',
        'published_at': '2025-05-09T16:28:23.618Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 247,
        'document_id': 'fa996tac06wpr90rms5w5u8p',
        'action': 'admin::roles.create',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.622Z',
        'updated_at': '2025-05-09T16:28:23.622Z',
        'published_at': '2025-05-09T16:28:23.622Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 248,
        'document_id': 'ce8q94z42r7mivalbs40jzyb',
        'action': 'admin::roles.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.624Z',
        'updated_at': '2025-05-09T16:28:23.624Z',
        'published_at': '2025-05-09T16:28:23.624Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 249,
        'document_id': 'f2m2foyggoslz3v9u4uagwbq',
        'action': 'admin::roles.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.627Z',
        'updated_at': '2025-05-09T16:28:23.627Z',
        'published_at': '2025-05-09T16:28:23.627Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 250,
        'document_id': 'wknsii99ohucm7psrq6ad6id',
        'action': 'admin::roles.delete',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.629Z',
        'updated_at': '2025-05-09T16:28:23.629Z',
        'published_at': '2025-05-09T16:28:23.629Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 251,
        'document_id': 'v469ata75nvkan93k1p0as6p',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'fields': [
                'title',
                'slug',
                'items'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.632Z',
        'updated_at': '2025-05-09T16:28:23.632Z',
        'published_at': '2025-05-09T16:28:23.632Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 252,
        'document_id': 'k4va0frm9ml3r8p7u6x5140c',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'fields': [
                'title',
                'slug',
                'items'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.635Z',
        'updated_at': '2025-05-09T16:28:23.635Z',
        'published_at': '2025-05-09T16:28:23.635Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 253,
        'document_id': 'ksnx2yj17ceznunioiobvsvo',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'fields': [
                'title',
                'slug',
                'items'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.641Z',
        'updated_at': '2025-05-09T16:28:23.641Z',
        'published_at': '2025-05-09T16:28:23.641Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 254,
        'document_id': 'jvt5sc9eqiz615ghh3rtsvd7',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.644Z',
        'updated_at': '2025-05-09T16:28:23.644Z',
        'published_at': '2025-05-09T16:28:23.644Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 255,
        'document_id': 'qw19q0znq5s5zihrbstkpils',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'plugin::tree-menus.menu',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.646Z',
        'updated_at': '2025-05-09T16:28:23.646Z',
        'published_at': '2025-05-09T16:28:23.646Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 256,
        'document_id': 'aji7qn6m7gqgzsi9nbihjbcl',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'fields': [
                'title',
                'slug',
                'content',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.648Z',
        'updated_at': '2025-05-09T16:28:23.648Z',
        'published_at': '2025-05-09T16:28:23.648Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 257,
        'document_id': 'gm8jnbe4aanghx1zqsn9r7yl',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'fields': [
                'title',
                'slug',
                'content',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.650Z',
        'updated_at': '2025-05-09T16:28:23.650Z',
        'published_at': '2025-05-09T16:28:23.651Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 258,
        'document_id': 'o01yexo445ks3m0kg1reqsv1',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'fields': [
                'title',
                'slug',
                'content',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.653Z',
        'updated_at': '2025-05-09T16:28:23.653Z',
        'published_at': '2025-05-09T16:28:23.653Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 259,
        'document_id': 'gejcoc285r7raoijybmgx2l1',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.655Z',
        'updated_at': '2025-05-09T16:28:23.655Z',
        'published_at': '2025-05-09T16:28:23.655Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 260,
        'document_id': 'uzkt8p1fil261zsrmmi24ys0',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::about-us.about-us',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.657Z',
        'updated_at': '2025-05-09T16:28:23.657Z',
        'published_at': '2025-05-09T16:28:23.657Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 261,
        'document_id': 'arls7pv5b6x41iuqfcoxc38r',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.659Z',
        'updated_at': '2025-05-09T16:28:23.659Z',
        'published_at': '2025-05-09T16:28:23.659Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 262,
        'document_id': 'nmwdfg7t56ubaqkqzpd8p29c',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.661Z',
        'updated_at': '2025-05-09T16:28:23.661Z',
        'published_at': '2025-05-09T16:28:23.661Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 263,
        'document_id': 'k48xm1zyxhqs9z5w6sy873lk',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {
            'fields': [
                'title',
                'description',
                'slug',
                'cover',
                'blocks'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.664Z',
        'updated_at': '2025-05-09T16:28:23.664Z',
        'published_at': '2025-05-09T16:28:23.664Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 264,
        'document_id': 'jedeijviflp4txhv62hkbnva',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.666Z',
        'updated_at': '2025-05-09T16:28:23.666Z',
        'published_at': '2025-05-09T16:28:23.666Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 265,
        'document_id': 'y93biivmmrmr5ih2b1k1f2k6',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::article.article',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.668Z',
        'updated_at': '2025-05-09T16:28:23.668Z',
        'published_at': '2025-05-09T16:28:23.668Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 266,
        'document_id': 'gmd4wnaumjgct34d6zekoz4z',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {
            'fields': [
                'customer_name',
                'customer_phone',
                'content'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.671Z',
        'updated_at': '2025-05-09T16:28:23.671Z',
        'published_at': '2025-05-09T16:28:23.671Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 267,
        'document_id': 'ukyuimlql74jsco85m59y0jz',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {
            'fields': [
                'customer_name',
                'customer_phone',
                'content'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.673Z',
        'updated_at': '2025-05-09T16:28:23.673Z',
        'published_at': '2025-05-09T16:28:23.673Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 268,
        'document_id': 'jsxophsxi9fnzdyn2w8b8e6p',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {
            'fields': [
                'customer_name',
                'customer_phone',
                'content'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.677Z',
        'updated_at': '2025-05-09T16:28:23.677Z',
        'published_at': '2025-05-09T16:28:23.677Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 269,
        'document_id': 'oggz8cx78slfogfgylgdoxq8',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.680Z',
        'updated_at': '2025-05-09T16:28:23.680Z',
        'published_at': '2025-05-09T16:28:23.680Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 270,
        'document_id': 'qxqkqvzh6k093tk135134t78',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.682Z',
        'updated_at': '2025-05-09T16:28:23.682Z',
        'published_at': '2025-05-09T16:28:23.682Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 271,
        'document_id': 'pa89a1e88x8ldrf76iemugea',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'fields': [
                'title',
                'slug',
                'description',
                'image',
                'service',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.685Z',
        'updated_at': '2025-05-09T16:28:23.685Z',
        'published_at': '2025-05-09T16:28:23.685Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 272,
        'document_id': 'lwqpj4grmyh0s6bxohtn4bgw',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'fields': [
                'title',
                'slug',
                'description',
                'image',
                'service',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.689Z',
        'updated_at': '2025-05-09T16:28:23.689Z',
        'published_at': '2025-05-09T16:28:23.689Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 273,
        'document_id': 'oyt26dzpr6zb3m9vsz91w562',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'fields': [
                'title',
                'slug',
                'description',
                'image',
                'service',
                'dynamic_content'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.691Z',
        'updated_at': '2025-05-09T16:28:23.691Z',
        'published_at': '2025-05-09T16:28:23.692Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 274,
        'document_id': 'hivtrksliu9xlfjnlyepf337',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.695Z',
        'updated_at': '2025-05-09T16:28:23.695Z',
        'published_at': '2025-05-09T16:28:23.695Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 275,
        'document_id': 'r55aqyax2c558yu6o58di4li',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::product.product',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.698Z',
        'updated_at': '2025-05-09T16:28:23.698Z',
        'published_at': '2025-05-09T16:28:23.698Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 276,
        'document_id': 'izczhreukgicqovh6773wch9',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'fields': [
                'title',
                'slug',
                'image',
                'content',
                'products'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.701Z',
        'updated_at': '2025-05-09T16:28:23.701Z',
        'published_at': '2025-05-09T16:28:23.701Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 277,
        'document_id': 'gwkvg4q8mw46at9heyu03p8r',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'fields': [
                'title',
                'slug',
                'image',
                'content',
                'products'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.704Z',
        'updated_at': '2025-05-09T16:28:23.704Z',
        'published_at': '2025-05-09T16:28:23.704Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 278,
        'document_id': 'zcluzw2jqjj2h5fw8jsrtz7j',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'fields': [
                'title',
                'slug',
                'image',
                'content',
                'products'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.707Z',
        'updated_at': '2025-05-09T16:28:23.707Z',
        'published_at': '2025-05-09T16:28:23.707Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 279,
        'document_id': 'lakms7yw4nd3r6qj1kdj7yml',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.711Z',
        'updated_at': '2025-05-09T16:28:23.711Z',
        'published_at': '2025-05-09T16:28:23.711Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 280,
        'document_id': 'hwcco84l4qko08os4m64vel7',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::service.service',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.713Z',
        'updated_at': '2025-05-09T16:28:23.713Z',
        'published_at': '2025-05-09T16:28:23.713Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 281,
        'document_id': 'i8ndy9x73rol40tifk1dewm9',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'fields': [
                'name',
                'address',
                'phone',
                'tax_code',
                'email',
                'image'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.715Z',
        'updated_at': '2025-05-09T16:28:23.715Z',
        'published_at': '2025-05-09T16:28:23.715Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 282,
        'document_id': 'lcp253dl1jkvn027gud5e724',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'fields': [
                'name',
                'address',
                'phone',
                'tax_code',
                'email',
                'image'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.717Z',
        'updated_at': '2025-05-09T16:28:23.717Z',
        'published_at': '2025-05-09T16:28:23.717Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 283,
        'document_id': 'k9c0vl1wd96ag6pzjrjdb52l',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'fields': [
                'name',
                'address',
                'phone',
                'tax_code',
                'email',
                'image'
            ],
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.719Z',
        'updated_at': '2025-05-09T16:28:23.719Z',
        'published_at': '2025-05-09T16:28:23.719Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 284,
        'document_id': 'eydq0cro5wwooysyukqhkero',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.722Z',
        'updated_at': '2025-05-09T16:28:23.722Z',
        'published_at': '2025-05-09T16:28:23.722Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 285,
        'document_id': 'e1fchycrhpiy4wb2ho7ibqjw',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::contact.contact',
        'properties': {
            'locales': [
                'en',
                'vi'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-09T16:28:23.729Z',
        'updated_at': '2025-05-09T16:28:23.729Z',
        'published_at': '2025-05-09T16:28:23.729Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 286,
        'document_id': 'jflwwbud63lboyq6l327mc7g',
        'action': 'plugin::documentation.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T04:22:05.645Z',
        'updated_at': '2025-05-10T04:22:05.645Z',
        'published_at': '2025-05-10T04:22:05.645Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 287,
        'document_id': 'ktf76cdt71blglq10wj1rsl2',
        'action': 'plugin::documentation.settings.update',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T04:22:05.652Z',
        'updated_at': '2025-05-10T04:22:05.652Z',
        'published_at': '2025-05-10T04:22:05.652Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 288,
        'document_id': 'pebn5acbypym04403bny7lla',
        'action': 'plugin::documentation.settings.regenerate',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T04:22:05.657Z',
        'updated_at': '2025-05-10T04:22:05.657Z',
        'published_at': '2025-05-10T04:22:05.657Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 289,
        'document_id': 'qfszsz9kk45ghiwtkvldnykr',
        'action': 'plugin::documentation.settings.read',
        'action_parameters': {},
        'subject': null,
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T04:22:05.661Z',
        'updated_at': '2025-05-10T04:22:05.661Z',
        'published_at': '2025-05-10T04:22:05.661Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 293,
        'document_id': 'l09phgr6uk9wwdn8acamqlu0',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::khach-hang.khach-hang',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T07:00:34.423Z',
        'updated_at': '2025-05-10T07:00:34.423Z',
        'published_at': '2025-05-10T07:00:34.423Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 294,
        'document_id': 'b4jvzhm7un4d2eu3ylqqesdw',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::khach-hang.khach-hang',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T07:00:34.430Z',
        'updated_at': '2025-05-10T07:00:34.430Z',
        'published_at': '2025-05-10T07:00:34.430Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 295,
        'document_id': 'inye4cho9vff2nsamgf0w9ao',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::khach-hang.khach-hang',
        'properties': {
            'fields': [
                'title',
                'logo',
                'website'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-10T07:02:05.411Z',
        'updated_at': '2025-05-10T07:02:05.411Z',
        'published_at': '2025-05-10T07:02:05.411Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 296,
        'document_id': 'wx5sz25cedq2s2syxzcoie7w',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::khach-hang.khach-hang',
        'properties': {
            'fields': [
                'title',
                'logo',
                'website'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-10T07:02:05.419Z',
        'updated_at': '2025-05-10T07:02:05.419Z',
        'published_at': '2025-05-10T07:02:05.419Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 297,
        'document_id': 'd7cl7l6prbagcda13cgyr0gf',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::khach-hang.khach-hang',
        'properties': {
            'fields': [
                'title',
                'logo',
                'website'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-10T07:02:05.427Z',
        'updated_at': '2025-05-10T07:02:05.427Z',
        'published_at': '2025-05-10T07:02:05.427Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 301,
        'document_id': 'oy5dfner1d6i92a8bmx8ihlx',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::slide.slide',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T14:11:33.258Z',
        'updated_at': '2025-05-10T14:11:33.258Z',
        'published_at': '2025-05-10T14:11:33.259Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 302,
        'document_id': 'bu6ach5g0alktvq9xbucfgys',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::slide.slide',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T14:11:33.263Z',
        'updated_at': '2025-05-10T14:11:33.263Z',
        'published_at': '2025-05-10T14:11:33.263Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 306,
        'document_id': 'ody1udxotijnt0xki5uf1l00',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::slide.slide',
        'properties': {
            'fields': [
                'image',
                'content',
                'position'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-10T15:37:10.300Z',
        'updated_at': '2025-05-10T15:37:10.300Z',
        'published_at': '2025-05-10T15:37:10.301Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 307,
        'document_id': 'iq2r7m6bdvk2w7we0o2iamof',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::slide.slide',
        'properties': {
            'fields': [
                'image',
                'content',
                'position'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-10T15:37:10.310Z',
        'updated_at': '2025-05-10T15:37:10.310Z',
        'published_at': '2025-05-10T15:37:10.310Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 308,
        'document_id': 'g5fvit7ypfnpkwx8wmvycrrf',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::slide.slide',
        'properties': {
            'fields': [
                'image',
                'content',
                'position'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-10T15:37:10.314Z',
        'updated_at': '2025-05-10T15:37:10.314Z',
        'published_at': '2025-05-10T15:37:10.314Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 312,
        'document_id': 'wb1ucpiy94tykdmykn0oprpj',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::home-page-content.home-page-content',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T15:46:02.748Z',
        'updated_at': '2025-05-10T15:46:02.748Z',
        'published_at': '2025-05-10T15:46:02.748Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 313,
        'document_id': 'ylg3snbc0yjngpje7bzz3b3w',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::home-page-content.home-page-content',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-10T15:46:02.751Z',
        'updated_at': '2025-05-10T15:46:02.751Z',
        'published_at': '2025-05-10T15:46:02.751Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 389,
        'document_id': 'ybhmqkk597e9fetry4a6ik6y',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::home-page-content.home-page-content',
        'properties': {
            'fields': [
                'partner.title',
                'partner.button_link',
                'partner.description',
                'partner.media',
                'partner.button_name',
                'service.title',
                'service.button_link',
                'service.description',
                'service.media',
                'service.button_name',
                'aboutus.title',
                'aboutus.button_link',
                'aboutus.description',
                'aboutus.media',
                'aboutus.button_name',
                'news.title',
                'news.button_link',
                'news.description',
                'news.media',
                'news.button_name',
                'company_achievement.title',
                'company_achievement.items.title',
                'company_achievement.items.body',
                'company_achievement.items.media',
                'company_achievement.description'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-11T14:59:51.524Z',
        'updated_at': '2025-05-11T14:59:51.524Z',
        'published_at': '2025-05-11T14:59:51.524Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 390,
        'document_id': 'lmsi16g0kvohshd24lhslxyg',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::home-page-content.home-page-content',
        'properties': {
            'fields': [
                'partner.title',
                'partner.button_link',
                'partner.description',
                'partner.media',
                'partner.button_name',
                'service.title',
                'service.button_link',
                'service.description',
                'service.media',
                'service.button_name',
                'aboutus.title',
                'aboutus.button_link',
                'aboutus.description',
                'aboutus.media',
                'aboutus.button_name',
                'news.title',
                'news.button_link',
                'news.description',
                'news.media',
                'news.button_name',
                'company_achievement.title',
                'company_achievement.items.title',
                'company_achievement.items.body',
                'company_achievement.items.media',
                'company_achievement.description'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-11T14:59:51.535Z',
        'updated_at': '2025-05-11T14:59:51.535Z',
        'published_at': '2025-05-11T14:59:51.535Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 391,
        'document_id': 'v73syso0qgvpvpxa0ndnyrrg',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::home-page-content.home-page-content',
        'properties': {
            'fields': [
                'partner.title',
                'partner.button_link',
                'partner.description',
                'partner.media',
                'partner.button_name',
                'service.title',
                'service.button_link',
                'service.description',
                'service.media',
                'service.button_name',
                'aboutus.title',
                'aboutus.button_link',
                'aboutus.description',
                'aboutus.media',
                'aboutus.button_name',
                'news.title',
                'news.button_link',
                'news.description',
                'news.media',
                'news.button_name',
                'company_achievement.title',
                'company_achievement.items.title',
                'company_achievement.items.body',
                'company_achievement.items.media',
                'company_achievement.description'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-11T14:59:51.539Z',
        'updated_at': '2025-05-11T14:59:51.539Z',
        'published_at': '2025-05-11T14:59:51.539Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 392,
        'document_id': 'y09ckwq70azo8tde5qe3e1id',
        'action': 'plugin::content-manager.explorer.create',
        'action_parameters': {},
        'subject': 'api::new.new',
        'properties': {
            'fields': [
                'title'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-11T15:45:47.726Z',
        'updated_at': '2025-05-11T15:45:47.726Z',
        'published_at': '2025-05-11T15:45:47.726Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 393,
        'document_id': 'v75l936k4h5m8ob0dtesqnla',
        'action': 'plugin::content-manager.explorer.read',
        'action_parameters': {},
        'subject': 'api::new.new',
        'properties': {
            'fields': [
                'title'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-11T15:45:47.733Z',
        'updated_at': '2025-05-11T15:45:47.733Z',
        'published_at': '2025-05-11T15:45:47.733Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 394,
        'document_id': 'g3gkujl7sh3p1lu19njum5ad',
        'action': 'plugin::content-manager.explorer.update',
        'action_parameters': {},
        'subject': 'api::new.new',
        'properties': {
            'fields': [
                'title'
            ]
        },
        'conditions': [],
        'created_at': '2025-05-11T15:45:47.736Z',
        'updated_at': '2025-05-11T15:45:47.736Z',
        'published_at': '2025-05-11T15:45:47.736Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 395,
        'document_id': 'dn3sa9qpehph3c4785w739sm',
        'action': 'plugin::content-manager.explorer.delete',
        'action_parameters': {},
        'subject': 'api::new.new',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-11T15:45:47.741Z',
        'updated_at': '2025-05-11T15:45:47.741Z',
        'published_at': '2025-05-11T15:45:47.741Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 396,
        'document_id': 'yxwbz6d65c2k1awz2n64tsr0',
        'action': 'plugin::content-manager.explorer.publish',
        'action_parameters': {},
        'subject': 'api::new.new',
        'properties': {},
        'conditions': [],
        'created_at': '2025-05-11T15:45:47.751Z',
        'updated_at': '2025-05-11T15:45:47.751Z',
        'published_at': '2025-05-11T15:45:47.751Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng admin_permissions_role_lnk
  if ((await knex('admin_permissions_role_lnk').count('* as count'))[0].count === 0) {
    await knex('admin_permissions_role_lnk').insert([
    {
        'id': 2,
        'permission_id': 2,
        'role_id': 2,
        'permission_ord': 2
    },
    {
        'id': 5,
        'permission_id': 5,
        'role_id': 2,
        'permission_ord': 5
    },
    {
        'id': 7,
        'permission_id': 7,
        'role_id': 2,
        'permission_ord': 7
    },
    {
        'id': 10,
        'permission_id': 10,
        'role_id': 2,
        'permission_ord': 10
    },
    {
        'id': 12,
        'permission_id': 12,
        'role_id': 2,
        'permission_ord': 12
    },
    {
        'id': 15,
        'permission_id': 15,
        'role_id': 2,
        'permission_ord': 15
    },
    {
        'id': 17,
        'permission_id': 17,
        'role_id': 2,
        'permission_ord': 17
    },
    {
        'id': 20,
        'permission_id': 20,
        'role_id': 2,
        'permission_ord': 20
    },
    {
        'id': 22,
        'permission_id': 22,
        'role_id': 2,
        'permission_ord': 22
    },
    {
        'id': 25,
        'permission_id': 25,
        'role_id': 2,
        'permission_ord': 25
    },
    {
        'id': 26,
        'permission_id': 26,
        'role_id': 2,
        'permission_ord': 26
    },
    {
        'id': 27,
        'permission_id': 27,
        'role_id': 2,
        'permission_ord': 27
    },
    {
        'id': 28,
        'permission_id': 28,
        'role_id': 2,
        'permission_ord': 28
    },
    {
        'id': 29,
        'permission_id': 29,
        'role_id': 2,
        'permission_ord': 29
    },
    {
        'id': 30,
        'permission_id': 30,
        'role_id': 2,
        'permission_ord': 30
    },
    {
        'id': 31,
        'permission_id': 31,
        'role_id': 2,
        'permission_ord': 31
    },
    {
        'id': 33,
        'permission_id': 33,
        'role_id': 3,
        'permission_ord': 2
    },
    {
        'id': 36,
        'permission_id': 36,
        'role_id': 3,
        'permission_ord': 5
    },
    {
        'id': 38,
        'permission_id': 38,
        'role_id': 3,
        'permission_ord': 7
    },
    {
        'id': 41,
        'permission_id': 41,
        'role_id': 3,
        'permission_ord': 10
    },
    {
        'id': 43,
        'permission_id': 43,
        'role_id': 3,
        'permission_ord': 12
    },
    {
        'id': 46,
        'permission_id': 46,
        'role_id': 3,
        'permission_ord': 15
    },
    {
        'id': 48,
        'permission_id': 48,
        'role_id': 3,
        'permission_ord': 17
    },
    {
        'id': 51,
        'permission_id': 51,
        'role_id': 3,
        'permission_ord': 20
    },
    {
        'id': 52,
        'permission_id': 52,
        'role_id': 3,
        'permission_ord': 21
    },
    {
        'id': 53,
        'permission_id': 53,
        'role_id': 3,
        'permission_ord': 22
    },
    {
        'id': 54,
        'permission_id': 54,
        'role_id': 3,
        'permission_ord': 23
    },
    {
        'id': 55,
        'permission_id': 55,
        'role_id': 3,
        'permission_ord': 24
    },
    {
        'id': 56,
        'permission_id': 56,
        'role_id': 3,
        'permission_ord': 25
    },
    {
        'id': 57,
        'permission_id': 57,
        'role_id': 3,
        'permission_ord': 26
    },
    {
        'id': 58,
        'permission_id': 58,
        'role_id': 1,
        'permission_ord': 1
    },
    {
        'id': 63,
        'permission_id': 63,
        'role_id': 1,
        'permission_ord': 6
    },
    {
        'id': 64,
        'permission_id': 64,
        'role_id': 1,
        'permission_ord': 7
    },
    {
        'id': 69,
        'permission_id': 69,
        'role_id': 1,
        'permission_ord': 12
    },
    {
        'id': 70,
        'permission_id': 70,
        'role_id': 1,
        'permission_ord': 13
    },
    {
        'id': 75,
        'permission_id': 75,
        'role_id': 1,
        'permission_ord': 18
    },
    {
        'id': 76,
        'permission_id': 76,
        'role_id': 1,
        'permission_ord': 19
    },
    {
        'id': 78,
        'permission_id': 78,
        'role_id': 1,
        'permission_ord': 21
    },
    {
        'id': 81,
        'permission_id': 81,
        'role_id': 1,
        'permission_ord': 24
    },
    {
        'id': 82,
        'permission_id': 82,
        'role_id': 1,
        'permission_ord': 25
    },
    {
        'id': 84,
        'permission_id': 84,
        'role_id': 1,
        'permission_ord': 27
    },
    {
        'id': 87,
        'permission_id': 87,
        'role_id': 1,
        'permission_ord': 30
    },
    {
        'id': 88,
        'permission_id': 88,
        'role_id': 1,
        'permission_ord': 31
    },
    {
        'id': 89,
        'permission_id': 89,
        'role_id': 1,
        'permission_ord': 32
    },
    {
        'id': 90,
        'permission_id': 90,
        'role_id': 1,
        'permission_ord': 33
    },
    {
        'id': 91,
        'permission_id': 91,
        'role_id': 1,
        'permission_ord': 34
    },
    {
        'id': 92,
        'permission_id': 92,
        'role_id': 1,
        'permission_ord': 35
    },
    {
        'id': 93,
        'permission_id': 93,
        'role_id': 1,
        'permission_ord': 36
    },
    {
        'id': 94,
        'permission_id': 94,
        'role_id': 1,
        'permission_ord': 37
    },
    {
        'id': 95,
        'permission_id': 95,
        'role_id': 1,
        'permission_ord': 38
    },
    {
        'id': 96,
        'permission_id': 96,
        'role_id': 1,
        'permission_ord': 39
    },
    {
        'id': 97,
        'permission_id': 97,
        'role_id': 1,
        'permission_ord': 40
    },
    {
        'id': 98,
        'permission_id': 98,
        'role_id': 1,
        'permission_ord': 41
    },
    {
        'id': 99,
        'permission_id': 99,
        'role_id': 1,
        'permission_ord': 42
    },
    {
        'id': 100,
        'permission_id': 100,
        'role_id': 1,
        'permission_ord': 43
    },
    {
        'id': 101,
        'permission_id': 101,
        'role_id': 1,
        'permission_ord': 44
    },
    {
        'id': 102,
        'permission_id': 102,
        'role_id': 1,
        'permission_ord': 45
    },
    {
        'id': 103,
        'permission_id': 103,
        'role_id': 1,
        'permission_ord': 46
    },
    {
        'id': 104,
        'permission_id': 104,
        'role_id': 1,
        'permission_ord': 47
    },
    {
        'id': 105,
        'permission_id': 105,
        'role_id': 1,
        'permission_ord': 48
    },
    {
        'id': 106,
        'permission_id': 106,
        'role_id': 1,
        'permission_ord': 49
    },
    {
        'id': 107,
        'permission_id': 107,
        'role_id': 1,
        'permission_ord': 50
    },
    {
        'id': 108,
        'permission_id': 108,
        'role_id': 1,
        'permission_ord': 51
    },
    {
        'id': 109,
        'permission_id': 109,
        'role_id': 1,
        'permission_ord': 52
    },
    {
        'id': 110,
        'permission_id': 110,
        'role_id': 1,
        'permission_ord': 53
    },
    {
        'id': 111,
        'permission_id': 111,
        'role_id': 1,
        'permission_ord': 54
    },
    {
        'id': 112,
        'permission_id': 112,
        'role_id': 1,
        'permission_ord': 55
    },
    {
        'id': 113,
        'permission_id': 113,
        'role_id': 1,
        'permission_ord': 56
    },
    {
        'id': 114,
        'permission_id': 114,
        'role_id': 1,
        'permission_ord': 57
    },
    {
        'id': 115,
        'permission_id': 115,
        'role_id': 1,
        'permission_ord': 58
    },
    {
        'id': 116,
        'permission_id': 116,
        'role_id': 1,
        'permission_ord': 59
    },
    {
        'id': 117,
        'permission_id': 117,
        'role_id': 1,
        'permission_ord': 60
    },
    {
        'id': 118,
        'permission_id': 118,
        'role_id': 1,
        'permission_ord': 61
    },
    {
        'id': 119,
        'permission_id': 119,
        'role_id': 1,
        'permission_ord': 62
    },
    {
        'id': 120,
        'permission_id': 120,
        'role_id': 1,
        'permission_ord': 63
    },
    {
        'id': 121,
        'permission_id': 121,
        'role_id': 1,
        'permission_ord': 64
    },
    {
        'id': 122,
        'permission_id': 122,
        'role_id': 1,
        'permission_ord': 65
    },
    {
        'id': 123,
        'permission_id': 123,
        'role_id': 1,
        'permission_ord': 66
    },
    {
        'id': 124,
        'permission_id': 124,
        'role_id': 1,
        'permission_ord': 67
    },
    {
        'id': 125,
        'permission_id': 125,
        'role_id': 1,
        'permission_ord': 68
    },
    {
        'id': 126,
        'permission_id': 126,
        'role_id': 1,
        'permission_ord': 69
    },
    {
        'id': 127,
        'permission_id': 127,
        'role_id': 1,
        'permission_ord': 70
    },
    {
        'id': 128,
        'permission_id': 128,
        'role_id': 1,
        'permission_ord': 71
    },
    {
        'id': 129,
        'permission_id': 129,
        'role_id': 1,
        'permission_ord': 72
    },
    {
        'id': 130,
        'permission_id': 130,
        'role_id': 1,
        'permission_ord': 73
    },
    {
        'id': 131,
        'permission_id': 131,
        'role_id': 1,
        'permission_ord': 74
    },
    {
        'id': 132,
        'permission_id': 132,
        'role_id': 1,
        'permission_ord': 75
    },
    {
        'id': 133,
        'permission_id': 133,
        'role_id': 1,
        'permission_ord': 76
    },
    {
        'id': 134,
        'permission_id': 134,
        'role_id': 1,
        'permission_ord': 77
    },
    {
        'id': 135,
        'permission_id': 135,
        'role_id': 1,
        'permission_ord': 78
    },
    {
        'id': 136,
        'permission_id': 136,
        'role_id': 1,
        'permission_ord': 79
    },
    {
        'id': 137,
        'permission_id': 137,
        'role_id': 1,
        'permission_ord': 80
    },
    {
        'id': 138,
        'permission_id': 138,
        'role_id': 1,
        'permission_ord': 81
    },
    {
        'id': 139,
        'permission_id': 139,
        'role_id': 1,
        'permission_ord': 82
    },
    {
        'id': 140,
        'permission_id': 140,
        'role_id': 1,
        'permission_ord': 83
    },
    {
        'id': 152,
        'permission_id': 147,
        'role_id': 1,
        'permission_ord': 90
    },
    {
        'id': 153,
        'permission_id': 148,
        'role_id': 1,
        'permission_ord': 91
    },
    {
        'id': 154,
        'permission_id': 149,
        'role_id': 1,
        'permission_ord': 92
    },
    {
        'id': 167,
        'permission_id': 162,
        'role_id': 1,
        'permission_ord': 96
    },
    {
        'id': 169,
        'permission_id': 164,
        'role_id': 1,
        'permission_ord': 98
    },
    {
        'id': 171,
        'permission_id': 166,
        'role_id': 1,
        'permission_ord': 100
    },
    {
        'id': 176,
        'permission_id': 171,
        'role_id': 1,
        'permission_ord': 105
    },
    {
        'id': 177,
        'permission_id': 172,
        'role_id': 1,
        'permission_ord': 106
    },
    {
        'id': 178,
        'permission_id': 173,
        'role_id': 1,
        'permission_ord': 107
    },
    {
        'id': 179,
        'permission_id': 174,
        'role_id': 1,
        'permission_ord': 108
    },
    {
        'id': 180,
        'permission_id': 175,
        'role_id': 1,
        'permission_ord': 109
    },
    {
        'id': 184,
        'permission_id': 179,
        'role_id': 1,
        'permission_ord': 113
    },
    {
        'id': 185,
        'permission_id': 180,
        'role_id': 1,
        'permission_ord': 114
    },
    {
        'id': 192,
        'permission_id': 187,
        'role_id': 1,
        'permission_ord': 121
    },
    {
        'id': 193,
        'permission_id': 188,
        'role_id': 1,
        'permission_ord': 122
    },
    {
        'id': 195,
        'permission_id': 190,
        'role_id': 1,
        'permission_ord': 124
    },
    {
        'id': 197,
        'permission_id': 192,
        'role_id': 1,
        'permission_ord': 126
    },
    {
        'id': 199,
        'permission_id': 194,
        'role_id': 1,
        'permission_ord': 128
    },
    {
        'id': 200,
        'permission_id': 195,
        'role_id': 1,
        'permission_ord': 129
    },
    {
        'id': 201,
        'permission_id': 196,
        'role_id': 1,
        'permission_ord': 130
    },
    {
        'id': 202,
        'permission_id': 197,
        'role_id': 1,
        'permission_ord': 131
    },
    {
        'id': 203,
        'permission_id': 198,
        'role_id': 1,
        'permission_ord': 132
    },
    {
        'id': 204,
        'permission_id': 199,
        'role_id': 1,
        'permission_ord': 133
    },
    {
        'id': 205,
        'permission_id': 200,
        'role_id': 1,
        'permission_ord': 134
    },
    {
        'id': 206,
        'permission_id': 201,
        'role_id': 1,
        'permission_ord': 135
    },
    {
        'id': 207,
        'permission_id': 202,
        'role_id': 1,
        'permission_ord': 136
    },
    {
        'id': 208,
        'permission_id': 203,
        'role_id': 1,
        'permission_ord': 137
    },
    {
        'id': 209,
        'permission_id': 204,
        'role_id': 1,
        'permission_ord': 138
    },
    {
        'id': 210,
        'permission_id': 205,
        'role_id': 1,
        'permission_ord': 139
    },
    {
        'id': 211,
        'permission_id': 206,
        'role_id': 1,
        'permission_ord': 140
    },
    {
        'id': 212,
        'permission_id': 207,
        'role_id': 1,
        'permission_ord': 141
    },
    {
        'id': 213,
        'permission_id': 208,
        'role_id': 1,
        'permission_ord': 142
    },
    {
        'id': 214,
        'permission_id': 209,
        'role_id': 1,
        'permission_ord': 143
    },
    {
        'id': 215,
        'permission_id': 210,
        'role_id': 1,
        'permission_ord': 144
    },
    {
        'id': 216,
        'permission_id': 211,
        'role_id': 4,
        'permission_ord': 1
    },
    {
        'id': 217,
        'permission_id': 212,
        'role_id': 4,
        'permission_ord': 2
    },
    {
        'id': 218,
        'permission_id': 213,
        'role_id': 4,
        'permission_ord': 3
    },
    {
        'id': 219,
        'permission_id': 214,
        'role_id': 4,
        'permission_ord': 4
    },
    {
        'id': 220,
        'permission_id': 215,
        'role_id': 4,
        'permission_ord': 5
    },
    {
        'id': 221,
        'permission_id': 216,
        'role_id': 4,
        'permission_ord': 6
    },
    {
        'id': 222,
        'permission_id': 217,
        'role_id': 4,
        'permission_ord': 7
    },
    {
        'id': 223,
        'permission_id': 218,
        'role_id': 4,
        'permission_ord': 8
    },
    {
        'id': 224,
        'permission_id': 219,
        'role_id': 4,
        'permission_ord': 9
    },
    {
        'id': 225,
        'permission_id': 220,
        'role_id': 4,
        'permission_ord': 10
    },
    {
        'id': 226,
        'permission_id': 221,
        'role_id': 4,
        'permission_ord': 11
    },
    {
        'id': 227,
        'permission_id': 222,
        'role_id': 4,
        'permission_ord': 12
    },
    {
        'id': 228,
        'permission_id': 223,
        'role_id': 4,
        'permission_ord': 13
    },
    {
        'id': 229,
        'permission_id': 224,
        'role_id': 4,
        'permission_ord': 14
    },
    {
        'id': 230,
        'permission_id': 225,
        'role_id': 4,
        'permission_ord': 15
    },
    {
        'id': 231,
        'permission_id': 226,
        'role_id': 4,
        'permission_ord': 16
    },
    {
        'id': 232,
        'permission_id': 227,
        'role_id': 4,
        'permission_ord': 17
    },
    {
        'id': 233,
        'permission_id': 228,
        'role_id': 4,
        'permission_ord': 18
    },
    {
        'id': 234,
        'permission_id': 229,
        'role_id': 4,
        'permission_ord': 19
    },
    {
        'id': 235,
        'permission_id': 230,
        'role_id': 4,
        'permission_ord': 20
    },
    {
        'id': 236,
        'permission_id': 231,
        'role_id': 4,
        'permission_ord': 21
    },
    {
        'id': 237,
        'permission_id': 232,
        'role_id': 4,
        'permission_ord': 22
    },
    {
        'id': 238,
        'permission_id': 233,
        'role_id': 4,
        'permission_ord': 23
    },
    {
        'id': 239,
        'permission_id': 234,
        'role_id': 4,
        'permission_ord': 24
    },
    {
        'id': 240,
        'permission_id': 235,
        'role_id': 4,
        'permission_ord': 25
    },
    {
        'id': 241,
        'permission_id': 236,
        'role_id': 4,
        'permission_ord': 26
    },
    {
        'id': 242,
        'permission_id': 237,
        'role_id': 4,
        'permission_ord': 27
    },
    {
        'id': 243,
        'permission_id': 238,
        'role_id': 4,
        'permission_ord': 28
    },
    {
        'id': 244,
        'permission_id': 239,
        'role_id': 4,
        'permission_ord': 29
    },
    {
        'id': 245,
        'permission_id': 240,
        'role_id': 4,
        'permission_ord': 30
    },
    {
        'id': 246,
        'permission_id': 241,
        'role_id': 4,
        'permission_ord': 31
    },
    {
        'id': 247,
        'permission_id': 242,
        'role_id': 4,
        'permission_ord': 32
    },
    {
        'id': 248,
        'permission_id': 243,
        'role_id': 4,
        'permission_ord': 33
    },
    {
        'id': 249,
        'permission_id': 244,
        'role_id': 4,
        'permission_ord': 34
    },
    {
        'id': 250,
        'permission_id': 245,
        'role_id': 4,
        'permission_ord': 35
    },
    {
        'id': 251,
        'permission_id': 246,
        'role_id': 4,
        'permission_ord': 36
    },
    {
        'id': 252,
        'permission_id': 247,
        'role_id': 4,
        'permission_ord': 37
    },
    {
        'id': 253,
        'permission_id': 248,
        'role_id': 4,
        'permission_ord': 38
    },
    {
        'id': 254,
        'permission_id': 249,
        'role_id': 4,
        'permission_ord': 39
    },
    {
        'id': 255,
        'permission_id': 250,
        'role_id': 4,
        'permission_ord': 40
    },
    {
        'id': 256,
        'permission_id': 251,
        'role_id': 4,
        'permission_ord': 41
    },
    {
        'id': 257,
        'permission_id': 252,
        'role_id': 4,
        'permission_ord': 42
    },
    {
        'id': 258,
        'permission_id': 253,
        'role_id': 4,
        'permission_ord': 43
    },
    {
        'id': 259,
        'permission_id': 254,
        'role_id': 4,
        'permission_ord': 44
    },
    {
        'id': 260,
        'permission_id': 255,
        'role_id': 4,
        'permission_ord': 45
    },
    {
        'id': 261,
        'permission_id': 256,
        'role_id': 4,
        'permission_ord': 46
    },
    {
        'id': 262,
        'permission_id': 257,
        'role_id': 4,
        'permission_ord': 47
    },
    {
        'id': 263,
        'permission_id': 258,
        'role_id': 4,
        'permission_ord': 48
    },
    {
        'id': 264,
        'permission_id': 259,
        'role_id': 4,
        'permission_ord': 49
    },
    {
        'id': 265,
        'permission_id': 260,
        'role_id': 4,
        'permission_ord': 50
    },
    {
        'id': 266,
        'permission_id': 261,
        'role_id': 4,
        'permission_ord': 51
    },
    {
        'id': 267,
        'permission_id': 262,
        'role_id': 4,
        'permission_ord': 52
    },
    {
        'id': 268,
        'permission_id': 263,
        'role_id': 4,
        'permission_ord': 53
    },
    {
        'id': 269,
        'permission_id': 264,
        'role_id': 4,
        'permission_ord': 54
    },
    {
        'id': 270,
        'permission_id': 265,
        'role_id': 4,
        'permission_ord': 55
    },
    {
        'id': 271,
        'permission_id': 266,
        'role_id': 4,
        'permission_ord': 56
    },
    {
        'id': 272,
        'permission_id': 267,
        'role_id': 4,
        'permission_ord': 57
    },
    {
        'id': 273,
        'permission_id': 268,
        'role_id': 4,
        'permission_ord': 58
    },
    {
        'id': 274,
        'permission_id': 269,
        'role_id': 4,
        'permission_ord': 59
    },
    {
        'id': 275,
        'permission_id': 270,
        'role_id': 4,
        'permission_ord': 60
    },
    {
        'id': 276,
        'permission_id': 271,
        'role_id': 4,
        'permission_ord': 61
    },
    {
        'id': 277,
        'permission_id': 272,
        'role_id': 4,
        'permission_ord': 62
    },
    {
        'id': 278,
        'permission_id': 273,
        'role_id': 4,
        'permission_ord': 63
    },
    {
        'id': 279,
        'permission_id': 274,
        'role_id': 4,
        'permission_ord': 64
    },
    {
        'id': 280,
        'permission_id': 275,
        'role_id': 4,
        'permission_ord': 65
    },
    {
        'id': 281,
        'permission_id': 276,
        'role_id': 4,
        'permission_ord': 66
    },
    {
        'id': 282,
        'permission_id': 277,
        'role_id': 4,
        'permission_ord': 67
    },
    {
        'id': 283,
        'permission_id': 278,
        'role_id': 4,
        'permission_ord': 68
    },
    {
        'id': 284,
        'permission_id': 279,
        'role_id': 4,
        'permission_ord': 69
    },
    {
        'id': 285,
        'permission_id': 280,
        'role_id': 4,
        'permission_ord': 70
    },
    {
        'id': 286,
        'permission_id': 281,
        'role_id': 4,
        'permission_ord': 71
    },
    {
        'id': 287,
        'permission_id': 282,
        'role_id': 4,
        'permission_ord': 72
    },
    {
        'id': 288,
        'permission_id': 283,
        'role_id': 4,
        'permission_ord': 73
    },
    {
        'id': 289,
        'permission_id': 284,
        'role_id': 4,
        'permission_ord': 74
    },
    {
        'id': 290,
        'permission_id': 285,
        'role_id': 4,
        'permission_ord': 75
    },
    {
        'id': 291,
        'permission_id': 286,
        'role_id': 1,
        'permission_ord': 145
    },
    {
        'id': 292,
        'permission_id': 287,
        'role_id': 1,
        'permission_ord': 146
    },
    {
        'id': 293,
        'permission_id': 288,
        'role_id': 1,
        'permission_ord': 147
    },
    {
        'id': 294,
        'permission_id': 289,
        'role_id': 1,
        'permission_ord': 148
    },
    {
        'id': 298,
        'permission_id': 293,
        'role_id': 1,
        'permission_ord': 152
    },
    {
        'id': 299,
        'permission_id': 294,
        'role_id': 1,
        'permission_ord': 153
    },
    {
        'id': 300,
        'permission_id': 295,
        'role_id': 1,
        'permission_ord': 154
    },
    {
        'id': 301,
        'permission_id': 296,
        'role_id': 1,
        'permission_ord': 155
    },
    {
        'id': 302,
        'permission_id': 297,
        'role_id': 1,
        'permission_ord': 156
    },
    {
        'id': 306,
        'permission_id': 301,
        'role_id': 1,
        'permission_ord': 160
    },
    {
        'id': 307,
        'permission_id': 302,
        'role_id': 1,
        'permission_ord': 161
    },
    {
        'id': 311,
        'permission_id': 306,
        'role_id': 1,
        'permission_ord': 162
    },
    {
        'id': 312,
        'permission_id': 307,
        'role_id': 1,
        'permission_ord': 163
    },
    {
        'id': 313,
        'permission_id': 308,
        'role_id': 1,
        'permission_ord': 164
    },
    {
        'id': 317,
        'permission_id': 312,
        'role_id': 1,
        'permission_ord': 168
    },
    {
        'id': 318,
        'permission_id': 313,
        'role_id': 1,
        'permission_ord': 169
    },
    {
        'id': 394,
        'permission_id': 389,
        'role_id': 1,
        'permission_ord': 170
    },
    {
        'id': 395,
        'permission_id': 390,
        'role_id': 1,
        'permission_ord': 171
    },
    {
        'id': 396,
        'permission_id': 391,
        'role_id': 1,
        'permission_ord': 172
    },
    {
        'id': 397,
        'permission_id': 392,
        'role_id': 1,
        'permission_ord': 173
    },
    {
        'id': 398,
        'permission_id': 393,
        'role_id': 1,
        'permission_ord': 174
    },
    {
        'id': 399,
        'permission_id': 394,
        'role_id': 1,
        'permission_ord': 175
    },
    {
        'id': 400,
        'permission_id': 395,
        'role_id': 1,
        'permission_ord': 176
    },
    {
        'id': 401,
        'permission_id': 396,
        'role_id': 1,
        'permission_ord': 177
    }
]);
  }

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

  // Thêm dữ liệu vào bảng admin_roles
  if ((await knex('admin_roles').count('* as count'))[0].count === 0) {
    await knex('admin_roles').insert([
    {
        'id': 1,
        'document_id': 'h64lc9ivdegff5xaiuzszxr8',
        'name': 'Super Admin',
        'code': 'strapi-super-admin',
        'description': 'Super Admins can access and manage all features and settings.',
        'created_at': '2025-05-05T09:43:57.680Z',
        'updated_at': '2025-05-05T09:43:57.680Z',
        'published_at': '2025-05-05T09:43:57.680Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'r2cvmun5qjwvcqzwt6q9rr7b',
        'name': 'Editor',
        'code': 'strapi-editor',
        'description': 'Editors can manage and publish contents including those of other users.',
        'created_at': '2025-05-05T09:43:57.684Z',
        'updated_at': '2025-05-05T09:43:57.684Z',
        'published_at': '2025-05-05T09:43:57.684Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 3,
        'document_id': 'jzlrpaj15xophpp0i2ul2lkp',
        'name': 'Author',
        'code': 'strapi-author',
        'description': 'Authors can manage the content they have created.',
        'created_at': '2025-05-05T09:43:57.685Z',
        'updated_at': '2025-05-05T09:43:57.685Z',
        'published_at': '2025-05-05T09:43:57.685Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 4,
        'document_id': 'uzbj2jxyhx885ig02jfsqivm',
        'name': 'Admin',
        'code': 'admin-mah0fysv',
        'description': 'Created May 9th, 2025',
        'created_at': '2025-05-09T16:28:23.407Z',
        'updated_at': '2025-05-09T16:28:23.407Z',
        'published_at': '2025-05-09T16:28:23.408Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng admin_users
  if ((await knex('admin_users').count('* as count'))[0].count === 0) {
    await knex('admin_users').insert([
    {
        'id': 1,
        'document_id': 'texjc3jpi2k56m7c3a84mp7t',
        'firstname': 'Trần',
        'lastname': 'Ngọc',
        'username': null,
        'email': 'tranngocthang89@gmail.com',
        'password': '$2a$10$7eVxl8N2vWKUqPK2eHq.1edF9kIyWjlHEbOLDQ2OkHzaQq4zvLfBu',
        'reset_password_token': null,
        'registration_token': null,
        'is_active': 1,
        'blocked': 0,
        'prefered_language': null,
        'created_at': '2025-05-05T09:45:30.740Z',
        'updated_at': '2025-05-05T09:45:30.740Z',
        'published_at': '2025-05-05T09:45:30.740Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng admin_users_roles_lnk
  if ((await knex('admin_users_roles_lnk').count('* as count'))[0].count === 0) {
    await knex('admin_users_roles_lnk').insert([
    {
        'id': 1,
        'user_id': 1,
        'role_id': 1,
        'role_ord': 1,
        'user_ord': 1
    }
]);
  }

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

  // Thêm dữ liệu vào bảng articles
  if ((await knex('articles').count('* as count'))[0].count === 0) {
    await knex('articles').insert([
    {
        'id': 1,
        'document_id': 'v6bs07vmca6m33s1otrxgwm1',
        'title': 'The internet's Own boy',
        'description': 'Follow the story of Aaron Swartz, the boy who could change the world',
        'slug': 'the-internet-s-own-boy',
        'created_at': '2025-05-05T09:43:59.362Z',
        'updated_at': '2025-05-05T09:43:59.362Z',
        'published_at': null,
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'a5fj6r0dri7kwjpdjvt04lhc',
        'title': 'This shrimp is awesome',
        'description': 'Mantis shrimps, or stomatopods, are marine crustaceans of the order Stomatopoda.',
        'slug': 'this-shrimp-is-awesome',
        'created_at': '2025-05-05T09:43:59.498Z',
        'updated_at': '2025-05-05T09:43:59.498Z',
        'published_at': null,
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 3,
        'document_id': 'hkakvyk8ywxotom5s5rz5xnl',
        'title': 'A bug is becoming a meme on the internet',
        'description': 'How a bug on MySQL is becoming a meme on the internet',
        'slug': 'a-bug-is-becoming-a-meme-on-the-internet',
        'created_at': '2025-05-05T09:43:59.648Z',
        'updated_at': '2025-05-05T09:43:59.648Z',
        'published_at': null,
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 4,
        'document_id': 'llvdphgzlreodlvci57sstqt',
        'title': 'Beautiful picture',
        'description': 'Description of a beautiful picture',
        'slug': 'beautiful-picture',
        'created_at': '2025-05-05T09:43:59.829Z',
        'updated_at': '2025-05-05T09:43:59.829Z',
        'published_at': null,
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 5,
        'document_id': 'gj73c4zo6tp1ch0zn8ov48u1',
        'title': 'What's inside a Black Hole',
        'description': 'Maybe the answer is in this article, or not...',
        'slug': 'what-s-inside-a-black-hole',
        'created_at': '2025-05-05T09:43:59.884Z',
        'updated_at': '2025-05-05T09:43:59.884Z',
        'published_at': null,
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng articles_cmps
  if ((await knex('articles_cmps').count('* as count'))[0].count === 0) {
    await knex('articles_cmps').insert([
    {
        'id': 1,
        'entity_id': 1,
        'cmp_id': 1,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 1
    },
    {
        'id': 2,
        'entity_id': 1,
        'cmp_id': 1,
        'component_type': 'shared.quote',
        'field': 'blocks',
        'order': 2
    },
    {
        'id': 3,
        'entity_id': 1,
        'cmp_id': 1,
        'component_type': 'shared.media',
        'field': 'blocks',
        'order': 3
    },
    {
        'id': 4,
        'entity_id': 1,
        'cmp_id': 2,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 4
    },
    {
        'id': 5,
        'entity_id': 1,
        'cmp_id': 1,
        'component_type': 'shared.slider',
        'field': 'blocks',
        'order': 5
    },
    {
        'id': 6,
        'entity_id': 2,
        'cmp_id': 3,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 1
    },
    {
        'id': 7,
        'entity_id': 2,
        'cmp_id': 2,
        'component_type': 'shared.quote',
        'field': 'blocks',
        'order': 2
    },
    {
        'id': 8,
        'entity_id': 2,
        'cmp_id': 2,
        'component_type': 'shared.media',
        'field': 'blocks',
        'order': 3
    },
    {
        'id': 9,
        'entity_id': 2,
        'cmp_id': 4,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 4
    },
    {
        'id': 10,
        'entity_id': 2,
        'cmp_id': 2,
        'component_type': 'shared.slider',
        'field': 'blocks',
        'order': 5
    },
    {
        'id': 11,
        'entity_id': 3,
        'cmp_id': 5,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 1
    },
    {
        'id': 12,
        'entity_id': 3,
        'cmp_id': 3,
        'component_type': 'shared.quote',
        'field': 'blocks',
        'order': 2
    },
    {
        'id': 13,
        'entity_id': 3,
        'cmp_id': 3,
        'component_type': 'shared.media',
        'field': 'blocks',
        'order': 3
    },
    {
        'id': 14,
        'entity_id': 3,
        'cmp_id': 6,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 4
    },
    {
        'id': 15,
        'entity_id': 3,
        'cmp_id': 3,
        'component_type': 'shared.slider',
        'field': 'blocks',
        'order': 5
    },
    {
        'id': 16,
        'entity_id': 4,
        'cmp_id': 7,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 1
    },
    {
        'id': 17,
        'entity_id': 4,
        'cmp_id': 4,
        'component_type': 'shared.quote',
        'field': 'blocks',
        'order': 2
    },
    {
        'id': 18,
        'entity_id': 4,
        'cmp_id': 4,
        'component_type': 'shared.media',
        'field': 'blocks',
        'order': 3
    },
    {
        'id': 19,
        'entity_id': 4,
        'cmp_id': 8,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 4
    },
    {
        'id': 20,
        'entity_id': 4,
        'cmp_id': 4,
        'component_type': 'shared.slider',
        'field': 'blocks',
        'order': 5
    },
    {
        'id': 21,
        'entity_id': 5,
        'cmp_id': 9,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 1
    },
    {
        'id': 22,
        'entity_id': 5,
        'cmp_id': 5,
        'component_type': 'shared.quote',
        'field': 'blocks',
        'order': 2
    },
    {
        'id': 23,
        'entity_id': 5,
        'cmp_id': 5,
        'component_type': 'shared.media',
        'field': 'blocks',
        'order': 3
    },
    {
        'id': 24,
        'entity_id': 5,
        'cmp_id': 10,
        'component_type': 'shared.rich-text',
        'field': 'blocks',
        'order': 4
    },
    {
        'id': 25,
        'entity_id': 5,
        'cmp_id': 5,
        'component_type': 'shared.slider',
        'field': 'blocks',
        'order': 5
    }
]);
  }

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

  // Thêm dữ liệu vào bảng components_shared_articles
  if ((await knex('components_shared_articles').count('* as count'))[0].count === 0) {
    await knex('components_shared_articles').insert([
    {
        'id': 1,
        'title': 'Đối tác của chúng tôi',
        'button_link': null,
        'description': '<p style=\'text-align:center;\'>We have been working with some Fortune 500+ clients</p>',
        'button_name': null
    },
    {
        'id': 2,
        'title': 'Sản phẩm & Dịch vụ',
        'button_link': '/services',
        'description': '<p class=\'p1\'>Our membership management software that will help you run your entire membership program</p>',
        'button_name': 'Xem thêm'
    },
    {
        'id': 3,
        'title': 'Về công ty',
        'button_link': '/abouts',
        'description': '<p class=\'p1\'>Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.</p>',
        'button_name': 'Chi tiết'
    },
    {
        'id': 4,
        'title': 'Caring is the new marketing',
        'button_link': '/news',
        'description': '<p class=\'p1\'>The Nexcent blog is the best place to read about the latest membership insights, trends and more. See who's joining the community, read about how our community are increasing their membership income and lots more</p>',
        'button_name': 'Read more'
    },
    {
        'id': 21,
        'title': 'Đối tác của chúng tôi',
        'button_link': null,
        'description': '<p style=\'text-align:center;\'>We have been working with some Fortune 500+ clients</p>',
        'button_name': null
    },
    {
        'id': 22,
        'title': 'Sản phẩm & Dịch vụ',
        'button_link': '/services',
        'description': '<p class=\'p1\'>Our membership management software that will help you run your entire membership program</p>',
        'button_name': 'Xem thêm'
    },
    {
        'id': 23,
        'title': 'Về công ty',
        'button_link': '/abouts',
        'description': '<p class=\'p1\'>Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.</p>',
        'button_name': 'Chi tiết'
    },
    {
        'id': 24,
        'title': 'Caring is the new marketing',
        'button_link': '/news',
        'description': '<p class=\'p1\'>The Nexcent blog is the best place to read about the latest membership insights, trends and more. See who's joining the community, read about how our community are increasing their membership income and lots more</p>',
        'button_name': 'Read more'
    }
]);
  }

  // Tạo bảng components_shared_media
  await knex.raw(`CREATE TABLE \`components_shared_media\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Thêm dữ liệu vào bảng components_shared_media
  if ((await knex('components_shared_media').count('* as count'))[0].count === 0) {
    await knex('components_shared_media').insert([
    {
        'id': 1
    },
    {
        'id': 2
    },
    {
        'id': 3
    },
    {
        'id': 4
    },
    {
        'id': 5
    },
    {
        'id': 6
    }
]);
  }

  // Tạo bảng components_shared_quotes
  await knex.raw(`CREATE TABLE \`components_shared_quotes\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) DEFAULT NULL,
  \`body\` longtext,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Thêm dữ liệu vào bảng components_shared_quotes
  if ((await knex('components_shared_quotes').count('* as count'))[0].count === 0) {
    await knex('components_shared_quotes').insert([
    {
        'id': 1,
        'title': 'Thelonius Monk',
        'body': 'You've got to dig it to dig it, you dig?'
    },
    {
        'id': 2,
        'title': 'Thelonius Monk',
        'body': 'You've got to dig it to dig it, you dig?'
    },
    {
        'id': 3,
        'title': 'Thelonius Monk',
        'body': 'You've got to dig it to dig it, you dig?'
    },
    {
        'id': 4,
        'title': 'Thelonius Monk',
        'body': 'You've got to dig it to dig it, you dig?'
    },
    {
        'id': 5,
        'title': 'Thelonius Monk',
        'body': 'You've got to dig it to dig it, you dig?'
    },
    {
        'id': 6,
        'title': 'Thelonius Monk',
        'body': 'You've got to dig it to dig it, you dig?'
    },
    {
        'id': 7,
        'title': '15K +',
        'body': 'Clients'
    },
    {
        'id': 11,
        'title': '150K+',
        'body': 'Downloads'
    },
    {
        'id': 12,
        'title': '15',
        'body': 'Country'
    },
    {
        'id': 13,
        'title': '100 +',
        'body': 'Partners'
    },
    {
        'id': 18,
        'title': '15K +',
        'body': 'Clients'
    },
    {
        'id': 19,
        'title': '150K+',
        'body': 'Downloads'
    },
    {
        'id': 20,
        'title': '15',
        'body': 'Country'
    },
    {
        'id': 21,
        'title': '100 +',
        'body': 'Partners'
    }
]);
  }

  // Tạo bảng components_shared_rich_texts
  await knex.raw(`CREATE TABLE \`components_shared_rich_texts\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) DEFAULT NULL,
  \`description\` longtext,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Thêm dữ liệu vào bảng components_shared_rich_texts
  if ((await knex('components_shared_rich_texts').count('* as count'))[0].count === 0) {
    await knex('components_shared_rich_texts').insert([
    {
        'id': 1,
        'title': null,
        'description': null
    },
    {
        'id': 2,
        'title': null,
        'description': null
    },
    {
        'id': 3,
        'title': null,
        'description': null
    },
    {
        'id': 4,
        'title': null,
        'description': null
    },
    {
        'id': 5,
        'title': null,
        'description': null
    },
    {
        'id': 6,
        'title': null,
        'description': null
    },
    {
        'id': 7,
        'title': null,
        'description': null
    },
    {
        'id': 8,
        'title': null,
        'description': null
    },
    {
        'id': 9,
        'title': null,
        'description': null
    },
    {
        'id': 10,
        'title': null,
        'description': null
    },
    {
        'id': 11,
        'title': null,
        'description': null
    },
    {
        'id': 12,
        'title': 'Helping a local business reinvent itself',
        'description': 'We reached here with our hard work and dedication'
    },
    {
        'id': 13,
        'title': '150K+',
        'description': null
    },
    {
        'id': 14,
        'title': '15',
        'description': null
    },
    {
        'id': 15,
        'title': '100+',
        'description': null
    },
    {
        'id': 17,
        'title': '150K+',
        'description': null
    },
    {
        'id': 18,
        'title': '15',
        'description': null
    },
    {
        'id': 19,
        'title': '100+',
        'description': null
    },
    {
        'id': 21,
        'title': 'Helping a local business reinvent itself',
        'description': 'We reached here with our hard work and dedication'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng components_shared_rich_texts_cmps
  if ((await knex('components_shared_rich_texts_cmps').count('* as count'))[0].count === 0) {
    await knex('components_shared_rich_texts_cmps').insert([
    {
        'id': 1,
        'entity_id': 12,
        'cmp_id': 7,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 1
    },
    {
        'id': 6,
        'entity_id': 12,
        'cmp_id': 11,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 2
    },
    {
        'id': 7,
        'entity_id': 12,
        'cmp_id': 12,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 3
    },
    {
        'id': 8,
        'entity_id': 12,
        'cmp_id': 13,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 4
    },
    {
        'id': 22,
        'entity_id': 21,
        'cmp_id': 18,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 1
    },
    {
        'id': 23,
        'entity_id': 21,
        'cmp_id': 19,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 2
    },
    {
        'id': 24,
        'entity_id': 21,
        'cmp_id': 20,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 3
    },
    {
        'id': 25,
        'entity_id': 21,
        'cmp_id': 21,
        'component_type': 'shared.quote',
        'field': 'items',
        'order': 4
    }
]);
  }

  // Tạo bảng components_shared_seos
  await knex.raw(`CREATE TABLE \`components_shared_seos\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`meta_title\` varchar(255) DEFAULT NULL,
  \`meta_description\` longtext,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Thêm dữ liệu vào bảng components_shared_seos
  if ((await knex('components_shared_seos').count('* as count'))[0].count === 0) {
    await knex('components_shared_seos').insert([
    {
        'id': 1,
        'meta_title': 'Page',
        'meta_description': 'A blog made with Strapi'
    }
]);
  }

  // Tạo bảng components_shared_sliders
  await knex.raw(`CREATE TABLE \`components_shared_sliders\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Thêm dữ liệu vào bảng components_shared_sliders
  if ((await knex('components_shared_sliders').count('* as count'))[0].count === 0) {
    await knex('components_shared_sliders').insert([
    {
        'id': 1
    },
    {
        'id': 2
    },
    {
        'id': 3
    },
    {
        'id': 4
    },
    {
        'id': 5
    }
]);
  }

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

  // Thêm dữ liệu vào bảng contacts
  if ((await knex('contacts').count('* as count'))[0].count === 0) {
    await knex('contacts').insert([
    {
        'id': 1,
        'document_id': 'u1arlzxj674punwkqsacgwao',
        'name': 'Cty Trang',
        'address': 'Việt Nam',
        'phone': '0989569918',
        'email': 'tranngocthang89@gmail.com',
        'tax_code': '01238910898',
        'created_at': '2025-05-07T00:11:03.270Z',
        'updated_at': '2025-05-07T00:11:03.270Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 2,
        'document_id': 'u1arlzxj674punwkqsacgwao',
        'name': 'Cty Trang',
        'address': 'Việt Nam',
        'phone': '0989569918',
        'email': 'tranngocthang89@gmail.com',
        'tax_code': '01238910898',
        'created_at': '2025-05-07T00:11:03.270Z',
        'updated_at': '2025-05-07T00:11:03.270Z',
        'published_at': '2025-05-07T00:11:03.279Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng files
  if ((await knex('files').count('* as count'))[0].count === 0) {
    await knex('files').insert([
    {
        'id': 1,
        'document_id': 'ovlk8tucgj2kzvmc7rkga6cs',
        'name': 'daviddoe@strapi',
        'alternative_text': 'An image uploaded to Strapi called daviddoe@strapi',
        'caption': 'daviddoe@strapi',
        'width': 2418,
        'height': 2711,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_daviddoe_strapi_014517f260.jpeg',
                'hash': 'large_daviddoe_strapi_014517f260',
                'mime': 'image/jpeg',
                'name': 'large_daviddoe@strapi',
                'path': null,
                'size': 74.82,
                'width': 892,
                'height': 1000,
                'sizeInBytes': 74823
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_daviddoe_strapi_014517f260.jpeg',
                'hash': 'small_daviddoe_strapi_014517f260',
                'mime': 'image/jpeg',
                'name': 'small_daviddoe@strapi',
                'path': null,
                'size': 22.43,
                'width': 446,
                'height': 500,
                'sizeInBytes': 22427
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_daviddoe_strapi_014517f260.jpeg',
                'hash': 'medium_daviddoe_strapi_014517f260',
                'mime': 'image/jpeg',
                'name': 'medium_daviddoe@strapi',
                'path': null,
                'size': 44.32,
                'width': 669,
                'height': 750,
                'sizeInBytes': 44315
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_daviddoe_strapi_014517f260.jpeg',
                'hash': 'thumbnail_daviddoe_strapi_014517f260',
                'mime': 'image/jpeg',
                'name': 'thumbnail_daviddoe@strapi',
                'path': null,
                'size': 4.2,
                'width': 139,
                'height': 156,
                'sizeInBytes': 4201
            }
        },
        'hash': 'daviddoe_strapi_014517f260',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '587.69',
        'url': '/uploads/daviddoe_strapi_014517f260.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:58.176Z',
        'updated_at': '2025-05-05T09:43:58.176Z',
        'published_at': '2025-05-05T09:43:58.177Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'p1nlzh990ce9clx0zabudqjx',
        'name': 'sarahbaker@strapi',
        'alternative_text': 'An image uploaded to Strapi called sarahbaker@strapi',
        'caption': 'sarahbaker@strapi',
        'width': 3321,
        'height': 2746,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_sarahbaker_strapi_2097030c76.jpeg',
                'hash': 'large_sarahbaker_strapi_2097030c76',
                'mime': 'image/jpeg',
                'name': 'large_sarahbaker@strapi',
                'path': null,
                'size': 101.83,
                'width': 1000,
                'height': 827,
                'sizeInBytes': 101826
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_sarahbaker_strapi_2097030c76.jpeg',
                'hash': 'small_sarahbaker_strapi_2097030c76',
                'mime': 'image/jpeg',
                'name': 'small_sarahbaker@strapi',
                'path': null,
                'size': 30.54,
                'width': 500,
                'height': 413,
                'sizeInBytes': 30537
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_sarahbaker_strapi_2097030c76.jpeg',
                'hash': 'medium_sarahbaker_strapi_2097030c76',
                'mime': 'image/jpeg',
                'name': 'medium_sarahbaker@strapi',
                'path': null,
                'size': 61.49,
                'width': 750,
                'height': 620,
                'sizeInBytes': 61487
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_sarahbaker_strapi_2097030c76.jpeg',
                'hash': 'thumbnail_sarahbaker_strapi_2097030c76',
                'mime': 'image/jpeg',
                'name': 'thumbnail_sarahbaker@strapi',
                'path': null,
                'size': 6.68,
                'width': 189,
                'height': 156,
                'sizeInBytes': 6684
            }
        },
        'hash': 'sarahbaker_strapi_2097030c76',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '795.13',
        'url': '/uploads/sarahbaker_strapi_2097030c76.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:58.359Z',
        'updated_at': '2025-05-05T09:43:58.359Z',
        'published_at': '2025-05-05T09:43:58.359Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 3,
        'document_id': 'c0mlnda1xv91uj108muggq9l',
        'name': 'the-internet-s-own-boy',
        'alternative_text': 'An image uploaded to Strapi called the-internet-s-own-boy',
        'caption': 'the-internet-s-own-boy',
        'width': 1200,
        'height': 707,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_the_internet_s_own_boy_460ae551ed.jpeg',
                'hash': 'large_the_internet_s_own_boy_460ae551ed',
                'mime': 'image/jpeg',
                'name': 'large_the-internet-s-own-boy',
                'path': null,
                'size': 70.12,
                'width': 1000,
                'height': 589,
                'sizeInBytes': 70123
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_the_internet_s_own_boy_460ae551ed.jpeg',
                'hash': 'small_the_internet_s_own_boy_460ae551ed',
                'mime': 'image/jpeg',
                'name': 'small_the-internet-s-own-boy',
                'path': null,
                'size': 25.18,
                'width': 500,
                'height': 295,
                'sizeInBytes': 25184
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_the_internet_s_own_boy_460ae551ed.jpeg',
                'hash': 'medium_the_internet_s_own_boy_460ae551ed',
                'mime': 'image/jpeg',
                'name': 'medium_the-internet-s-own-boy',
                'path': null,
                'size': 45.97,
                'width': 750,
                'height': 442,
                'sizeInBytes': 45972
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_the_internet_s_own_boy_460ae551ed.jpeg',
                'hash': 'thumbnail_the_internet_s_own_boy_460ae551ed',
                'mime': 'image/jpeg',
                'name': 'thumbnail_the-internet-s-own-boy',
                'path': null,
                'size': 8.36,
                'width': 245,
                'height': 144,
                'sizeInBytes': 8363
            }
        },
        'hash': 'the_internet_s_own_boy_460ae551ed',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '91.55',
        'url': '/uploads/the_internet_s_own_boy_460ae551ed.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:58.413Z',
        'updated_at': '2025-05-05T09:43:58.413Z',
        'published_at': '2025-05-05T09:43:58.414Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 4,
        'document_id': 'xifs602arlmmsygzznfp6xbw',
        'name': 'coffee-art',
        'alternative_text': 'An image uploaded to Strapi called coffee-art',
        'caption': 'coffee-art',
        'width': 5824,
        'height': 3259,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_coffee_art_5e09914642.jpeg',
                'hash': 'large_coffee_art_5e09914642',
                'mime': 'image/jpeg',
                'name': 'large_coffee-art',
                'path': null,
                'size': 40.76,
                'width': 1000,
                'height': 559,
                'sizeInBytes': 40757
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_coffee_art_5e09914642.jpeg',
                'hash': 'small_coffee_art_5e09914642',
                'mime': 'image/jpeg',
                'name': 'small_coffee-art',
                'path': null,
                'size': 15.26,
                'width': 500,
                'height': 280,
                'sizeInBytes': 15256
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_coffee_art_5e09914642.jpeg',
                'hash': 'medium_coffee_art_5e09914642',
                'mime': 'image/jpeg',
                'name': 'medium_coffee-art',
                'path': null,
                'size': 27.05,
                'width': 750,
                'height': 419,
                'sizeInBytes': 27046
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_coffee_art_5e09914642.jpeg',
                'hash': 'thumbnail_coffee_art_5e09914642',
                'mime': 'image/jpeg',
                'name': 'thumbnail_coffee-art',
                'path': null,
                'size': 5.86,
                'width': 245,
                'height': 137,
                'sizeInBytes': 5855
            }
        },
        'hash': 'coffee_art_5e09914642',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '978.11',
        'url': '/uploads/coffee_art_5e09914642.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:58.809Z',
        'updated_at': '2025-05-05T09:43:58.809Z',
        'published_at': '2025-05-05T09:43:58.810Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 5,
        'document_id': 'u63ya1njndyt9v3jodvmri79',
        'name': 'coffee-beans',
        'alternative_text': 'An image uploaded to Strapi called coffee-beans',
        'caption': 'coffee-beans',
        'width': 5021,
        'height': 3347,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_coffee_beans_4a2d2995ad.jpeg',
                'hash': 'large_coffee_beans_4a2d2995ad',
                'mime': 'image/jpeg',
                'name': 'large_coffee-beans',
                'path': null,
                'size': 115.63,
                'width': 1000,
                'height': 666,
                'sizeInBytes': 115625
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_coffee_beans_4a2d2995ad.jpeg',
                'hash': 'small_coffee_beans_4a2d2995ad',
                'mime': 'image/jpeg',
                'name': 'small_coffee-beans',
                'path': null,
                'size': 31.12,
                'width': 500,
                'height': 333,
                'sizeInBytes': 31119
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_coffee_beans_4a2d2995ad.jpeg',
                'hash': 'medium_coffee_beans_4a2d2995ad',
                'mime': 'image/jpeg',
                'name': 'medium_coffee-beans',
                'path': null,
                'size': 67.8,
                'width': 750,
                'height': 500,
                'sizeInBytes': 67800
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_coffee_beans_4a2d2995ad.jpeg',
                'hash': 'thumbnail_coffee_beans_4a2d2995ad',
                'mime': 'image/jpeg',
                'name': 'thumbnail_coffee-beans',
                'path': null,
                'size': 7.97,
                'width': 234,
                'height': 156,
                'sizeInBytes': 7969
            }
        },
        'hash': 'coffee_beans_4a2d2995ad',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '2346.20',
        'url': '/uploads/coffee_beans_4a2d2995ad.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:59.349Z',
        'updated_at': '2025-05-05T09:43:59.349Z',
        'published_at': '2025-05-05T09:43:59.349Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 6,
        'document_id': 'ex0ahlbxuu7uipg8qpjp114r',
        'name': 'this-shrimp-is-awesome',
        'alternative_text': 'An image uploaded to Strapi called this-shrimp-is-awesome',
        'caption': 'this-shrimp-is-awesome',
        'width': 1200,
        'height': 630,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_this_shrimp_is_awesome_4165e35d9f.jpeg',
                'hash': 'large_this_shrimp_is_awesome_4165e35d9f',
                'mime': 'image/jpeg',
                'name': 'large_this-shrimp-is-awesome',
                'path': null,
                'size': 72.91,
                'width': 1000,
                'height': 525,
                'sizeInBytes': 72911
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_this_shrimp_is_awesome_4165e35d9f.jpeg',
                'hash': 'small_this_shrimp_is_awesome_4165e35d9f',
                'mime': 'image/jpeg',
                'name': 'small_this-shrimp-is-awesome',
                'path': null,
                'size': 27.02,
                'width': 500,
                'height': 263,
                'sizeInBytes': 27016
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_this_shrimp_is_awesome_4165e35d9f.jpeg',
                'hash': 'medium_this_shrimp_is_awesome_4165e35d9f',
                'mime': 'image/jpeg',
                'name': 'medium_this-shrimp-is-awesome',
                'path': null,
                'size': 48.24,
                'width': 750,
                'height': 394,
                'sizeInBytes': 48237
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_this_shrimp_is_awesome_4165e35d9f.jpeg',
                'hash': 'thumbnail_this_shrimp_is_awesome_4165e35d9f',
                'mime': 'image/jpeg',
                'name': 'thumbnail_this-shrimp-is-awesome',
                'path': null,
                'size': 9.63,
                'width': 245,
                'height': 129,
                'sizeInBytes': 9629
            }
        },
        'hash': 'this_shrimp_is_awesome_4165e35d9f',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '95.48',
        'url': '/uploads/this_shrimp_is_awesome_4165e35d9f.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:59.435Z',
        'updated_at': '2025-05-05T09:43:59.435Z',
        'published_at': '2025-05-05T09:43:59.435Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 7,
        'document_id': 'p2ewf2hfjgvbf29cmd3wnt9s',
        'name': 'a-bug-is-becoming-a-meme-on-the-internet',
        'alternative_text': 'An image uploaded to Strapi called a-bug-is-becoming-a-meme-on-the-internet',
        'caption': 'a-bug-is-becoming-a-meme-on-the-internet',
        'width': 3628,
        'height': 2419,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb.jpeg',
                'hash': 'large_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb',
                'mime': 'image/jpeg',
                'name': 'large_a-bug-is-becoming-a-meme-on-the-internet',
                'path': null,
                'size': 50.97,
                'width': 1000,
                'height': 666,
                'sizeInBytes': 50972
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb.jpeg',
                'hash': 'small_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb',
                'mime': 'image/jpeg',
                'name': 'small_a-bug-is-becoming-a-meme-on-the-internet',
                'path': null,
                'size': 19.25,
                'width': 500,
                'height': 333,
                'sizeInBytes': 19245
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb.jpeg',
                'hash': 'medium_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb',
                'mime': 'image/jpeg',
                'name': 'medium_a-bug-is-becoming-a-meme-on-the-internet',
                'path': null,
                'size': 33.59,
                'width': 750,
                'height': 500,
                'sizeInBytes': 33590
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb.jpeg',
                'hash': 'thumbnail_a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb',
                'mime': 'image/jpeg',
                'name': 'thumbnail_a-bug-is-becoming-a-meme-on-the-internet',
                'path': null,
                'size': 6.73,
                'width': 234,
                'height': 156,
                'sizeInBytes': 6728
            }
        },
        'hash': 'a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '234.02',
        'url': '/uploads/a_bug_is_becoming_a_meme_on_the_internet_36324b6ecb.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:59.639Z',
        'updated_at': '2025-05-05T09:43:59.639Z',
        'published_at': '2025-05-05T09:43:59.639Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 8,
        'document_id': 'x8q0pxlxy1wq2sb2ct7g1x1r',
        'name': 'beautiful-picture',
        'alternative_text': 'An image uploaded to Strapi called beautiful-picture',
        'caption': 'beautiful-picture',
        'width': 3824,
        'height': 2548,
        'formats': {
            'large': {
                'ext': '.jpeg',
                'url': '/uploads/large_beautiful_picture_b5ee809a5b.jpeg',
                'hash': 'large_beautiful_picture_b5ee809a5b',
                'mime': 'image/jpeg',
                'name': 'large_beautiful-picture',
                'path': null,
                'size': 83.36,
                'width': 1000,
                'height': 666,
                'sizeInBytes': 83355
            },
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_beautiful_picture_b5ee809a5b.jpeg',
                'hash': 'small_beautiful_picture_b5ee809a5b',
                'mime': 'image/jpeg',
                'name': 'small_beautiful-picture',
                'path': null,
                'size': 23.35,
                'width': 500,
                'height': 333,
                'sizeInBytes': 23351
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_beautiful_picture_b5ee809a5b.jpeg',
                'hash': 'medium_beautiful_picture_b5ee809a5b',
                'mime': 'image/jpeg',
                'name': 'medium_beautiful-picture',
                'path': null,
                'size': 47.81,
                'width': 750,
                'height': 500,
                'sizeInBytes': 47812
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_beautiful_picture_b5ee809a5b.jpeg',
                'hash': 'thumbnail_beautiful_picture_b5ee809a5b',
                'mime': 'image/jpeg',
                'name': 'thumbnail_beautiful-picture',
                'path': null,
                'size': 6.44,
                'width': 234,
                'height': 156,
                'sizeInBytes': 6436
            }
        },
        'hash': 'beautiful_picture_b5ee809a5b',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '710.28',
        'url': '/uploads/beautiful_picture_b5ee809a5b.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:59.815Z',
        'updated_at': '2025-05-05T09:43:59.815Z',
        'published_at': '2025-05-05T09:43:59.815Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 9,
        'document_id': 'rgg0gmluyt52s76w2tnu1683',
        'name': 'what-s-inside-a-black-hole',
        'alternative_text': 'An image uploaded to Strapi called what-s-inside-a-black-hole',
        'caption': 'what-s-inside-a-black-hole',
        'width': 800,
        'height': 466,
        'formats': {
            'small': {
                'ext': '.jpeg',
                'url': '/uploads/small_what_s_inside_a_black_hole_f7d5984fcf.jpeg',
                'hash': 'small_what_s_inside_a_black_hole_f7d5984fcf',
                'mime': 'image/jpeg',
                'name': 'small_what-s-inside-a-black-hole',
                'path': null,
                'size': 3.87,
                'width': 500,
                'height': 291,
                'sizeInBytes': 3867
            },
            'medium': {
                'ext': '.jpeg',
                'url': '/uploads/medium_what_s_inside_a_black_hole_f7d5984fcf.jpeg',
                'hash': 'medium_what_s_inside_a_black_hole_f7d5984fcf',
                'mime': 'image/jpeg',
                'name': 'medium_what-s-inside-a-black-hole',
                'path': null,
                'size': 6.92,
                'width': 750,
                'height': 437,
                'sizeInBytes': 6923
            },
            'thumbnail': {
                'ext': '.jpeg',
                'url': '/uploads/thumbnail_what_s_inside_a_black_hole_f7d5984fcf.jpeg',
                'hash': 'thumbnail_what_s_inside_a_black_hole_f7d5984fcf',
                'mime': 'image/jpeg',
                'name': 'thumbnail_what-s-inside-a-black-hole',
                'path': null,
                'size': 1.56,
                'width': 245,
                'height': 143,
                'sizeInBytes': 1556
            }
        },
        'hash': 'what_s_inside_a_black_hole_f7d5984fcf',
        'ext': '.jpeg',
        'mime': 'image/jpeg',
        'size': '7.50',
        'url': '/uploads/what_s_inside_a_black_hole_f7d5984fcf.jpeg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:59.861Z',
        'updated_at': '2025-05-05T09:43:59.861Z',
        'published_at': '2025-05-05T09:43:59.861Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 10,
        'document_id': 'o2w3owvclidfpcbi7tswppn9',
        'name': 'favicon',
        'alternative_text': 'An image uploaded to Strapi called favicon',
        'caption': 'favicon',
        'width': 512,
        'height': 512,
        'formats': {
            'small': {
                'ext': '.png',
                'url': '/uploads/small_favicon_a47d4f1270.png',
                'hash': 'small_favicon_a47d4f1270',
                'mime': 'image/png',
                'name': 'small_favicon',
                'path': null,
                'size': 17.8,
                'width': 500,
                'height': 500,
                'sizeInBytes': 17800
            },
            'thumbnail': {
                'ext': '.png',
                'url': '/uploads/thumbnail_favicon_a47d4f1270.png',
                'hash': 'thumbnail_favicon_a47d4f1270',
                'mime': 'image/png',
                'name': 'thumbnail_favicon',
                'path': null,
                'size': 4.61,
                'width': 156,
                'height': 156,
                'sizeInBytes': 4605
            }
        },
        'hash': 'favicon_a47d4f1270',
        'ext': '.png',
        'mime': 'image/png',
        'size': '2.74',
        'url': '/uploads/favicon_a47d4f1270.png',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:43:59.931Z',
        'updated_at': '2025-05-05T09:43:59.931Z',
        'published_at': '2025-05-05T09:43:59.931Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 11,
        'document_id': 'iglu1ovly1q0j0boj6egmrk0',
        'name': 'default-image',
        'alternative_text': 'An image uploaded to Strapi called default-image',
        'caption': 'default-image',
        'width': 1208,
        'height': 715,
        'formats': {
            'large': {
                'ext': '.png',
                'url': '/uploads/large_default_image_b5521847cc.png',
                'hash': 'large_default_image_b5521847cc',
                'mime': 'image/png',
                'name': 'large_default-image',
                'path': null,
                'size': 328.03,
                'width': 1000,
                'height': 592,
                'sizeInBytes': 328028
            },
            'small': {
                'ext': '.png',
                'url': '/uploads/small_default_image_b5521847cc.png',
                'hash': 'small_default_image_b5521847cc',
                'mime': 'image/png',
                'name': 'small_default-image',
                'path': null,
                'size': 75.54,
                'width': 500,
                'height': 296,
                'sizeInBytes': 75538
            },
            'medium': {
                'ext': '.png',
                'url': '/uploads/medium_default_image_b5521847cc.png',
                'hash': 'medium_default_image_b5521847cc',
                'mime': 'image/png',
                'name': 'medium_default-image',
                'path': null,
                'size': 174.97,
                'width': 750,
                'height': 444,
                'sizeInBytes': 174967
            },
            'thumbnail': {
                'ext': '.png',
                'url': '/uploads/thumbnail_default_image_b5521847cc.png',
                'hash': 'thumbnail_default_image_b5521847cc',
                'mime': 'image/png',
                'name': 'thumbnail_default-image',
                'path': null,
                'size': 21.22,
                'width': 245,
                'height': 145,
                'sizeInBytes': 21219
            }
        },
        'hash': 'default_image_b5521847cc',
        'ext': '.png',
        'mime': 'image/png',
        'size': '81.73',
        'url': '/uploads/default_image_b5521847cc.png',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-05T09:44:00.079Z',
        'updated_at': '2025-05-05T09:44:00.079Z',
        'published_at': '2025-05-05T09:44:00.080Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 12,
        'document_id': 'm8gh0d2j48875m5h40ut6wuq',
        'name': 'hero-illustration.svg',
        'alternative_text': null,
        'caption': null,
        'width': 500,
        'height': 400,
        'formats': null,
        'hash': 'hero_illustration_5a096060e4',
        'ext': '.svg',
        'mime': 'image/svg+xml',
        'size': '2.49',
        'url': '/uploads/hero_illustration_5a096060e4.svg',
        'preview_url': null,
        'provider': 'local',
        'provider_metadata': null,
        'folder_path': '/',
        'created_at': '2025-05-10T15:11:46.586Z',
        'updated_at': '2025-05-10T15:11:46.586Z',
        'published_at': '2025-05-10T15:11:46.587Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng files_related_mph
  if ((await knex('files_related_mph').count('* as count'))[0].count === 0) {
    await knex('files_related_mph').insert([
    {
        'id': 1,
        'file_id': 1,
        'related_id': 1,
        'related_type': 'api::author.author',
        'field': 'avatar',
        'order': 1
    },
    {
        'id': 2,
        'file_id': 2,
        'related_id': 2,
        'related_type': 'api::author.author',
        'field': 'avatar',
        'order': 1
    },
    {
        'id': 3,
        'file_id': 4,
        'related_id': 1,
        'related_type': 'shared.media',
        'field': 'file',
        'order': 1
    },
    {
        'id': 4,
        'file_id': 4,
        'related_id': 1,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 1
    },
    {
        'id': 5,
        'file_id': 5,
        'related_id': 1,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 2
    },
    {
        'id': 6,
        'file_id': 3,
        'related_id': 1,
        'related_type': 'api::article.article',
        'field': 'cover',
        'order': 1
    },
    {
        'id': 7,
        'file_id': 4,
        'related_id': 2,
        'related_type': 'shared.media',
        'field': 'file',
        'order': 1
    },
    {
        'id': 8,
        'file_id': 4,
        'related_id': 2,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 1
    },
    {
        'id': 9,
        'file_id': 5,
        'related_id': 2,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 2
    },
    {
        'id': 10,
        'file_id': 6,
        'related_id': 2,
        'related_type': 'api::article.article',
        'field': 'cover',
        'order': 1
    },
    {
        'id': 11,
        'file_id': 4,
        'related_id': 3,
        'related_type': 'shared.media',
        'field': 'file',
        'order': 1
    },
    {
        'id': 12,
        'file_id': 4,
        'related_id': 3,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 1
    },
    {
        'id': 13,
        'file_id': 5,
        'related_id': 3,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 2
    },
    {
        'id': 14,
        'file_id': 7,
        'related_id': 3,
        'related_type': 'api::article.article',
        'field': 'cover',
        'order': 1
    },
    {
        'id': 15,
        'file_id': 4,
        'related_id': 4,
        'related_type': 'shared.media',
        'field': 'file',
        'order': 1
    },
    {
        'id': 16,
        'file_id': 4,
        'related_id': 4,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 1
    },
    {
        'id': 17,
        'file_id': 5,
        'related_id': 4,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 2
    },
    {
        'id': 18,
        'file_id': 8,
        'related_id': 4,
        'related_type': 'api::article.article',
        'field': 'cover',
        'order': 1
    },
    {
        'id': 19,
        'file_id': 4,
        'related_id': 5,
        'related_type': 'shared.media',
        'field': 'file',
        'order': 1
    },
    {
        'id': 20,
        'file_id': 4,
        'related_id': 5,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 1
    },
    {
        'id': 21,
        'file_id': 5,
        'related_id': 5,
        'related_type': 'shared.slider',
        'field': 'files',
        'order': 2
    },
    {
        'id': 22,
        'file_id': 9,
        'related_id': 5,
        'related_type': 'api::article.article',
        'field': 'cover',
        'order': 1
    },
    {
        'id': 23,
        'file_id': 11,
        'related_id': 1,
        'related_type': 'shared.seo',
        'field': 'shareImage',
        'order': 1
    },
    {
        'id': 24,
        'file_id': 10,
        'related_id': 1,
        'related_type': 'api::global.global',
        'field': 'favicon',
        'order': 1
    },
    {
        'id': 25,
        'file_id': 4,
        'related_id': 6,
        'related_type': 'shared.media',
        'field': 'file',
        'order': 1
    },
    {
        'id': 26,
        'file_id': 8,
        'related_id': 1,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 27,
        'file_id': 8,
        'related_id': 2,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 28,
        'file_id': 10,
        'related_id': 3,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 29,
        'file_id': 10,
        'related_id': 4,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 30,
        'file_id': 11,
        'related_id': 5,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 31,
        'file_id': 11,
        'related_id': 6,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 32,
        'file_id': 7,
        'related_id': 7,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 33,
        'file_id': 7,
        'related_id': 8,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 34,
        'file_id': 6,
        'related_id': 9,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 35,
        'file_id': 6,
        'related_id': 10,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 36,
        'file_id': 5,
        'related_id': 11,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 37,
        'file_id': 5,
        'related_id': 12,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 38,
        'file_id': 4,
        'related_id': 13,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 39,
        'file_id': 4,
        'related_id': 14,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 40,
        'file_id': 3,
        'related_id': 15,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 41,
        'file_id': 3,
        'related_id': 16,
        'related_type': 'api::khach-hang.khach-hang',
        'field': 'logo',
        'order': 1
    },
    {
        'id': 52,
        'file_id': 12,
        'related_id': 1,
        'related_type': 'api::slide.slide',
        'field': 'image',
        'order': 1
    },
    {
        'id': 53,
        'file_id': 12,
        'related_id': 7,
        'related_type': 'api::slide.slide',
        'field': 'image',
        'order': 1
    },
    {
        'id': 54,
        'file_id': 12,
        'related_id': 3,
        'related_type': 'api::slide.slide',
        'field': 'image',
        'order': 1
    },
    {
        'id': 55,
        'file_id': 12,
        'related_id': 8,
        'related_type': 'api::slide.slide',
        'field': 'image',
        'order': 1
    },
    {
        'id': 77,
        'file_id': 10,
        'related_id': 14,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 78,
        'file_id': 10,
        'related_id': 15,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 79,
        'file_id': 10,
        'related_id': 12,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 80,
        'file_id': 10,
        'related_id': 13,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 83,
        'file_id': 10,
        'related_id': 16,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 84,
        'file_id': 10,
        'related_id': 17,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 85,
        'file_id': 10,
        'related_id': 18,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 86,
        'file_id': 10,
        'related_id': 19,
        'related_type': 'shared.rich-text',
        'field': 'media',
        'order': 1
    },
    {
        'id': 115,
        'file_id': 12,
        'related_id': 2,
        'related_type': 'shared.article',
        'field': 'media',
        'order': 1
    },
    {
        'id': 116,
        'file_id': 12,
        'related_id': 3,
        'related_type': 'shared.article',
        'field': 'media',
        'order': 1
    },
    {
        'id': 117,
        'file_id': 10,
        'related_id': 7,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 118,
        'file_id': 10,
        'related_id': 11,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 119,
        'file_id': 10,
        'related_id': 12,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 120,
        'file_id': 10,
        'related_id': 13,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 121,
        'file_id': 12,
        'related_id': 22,
        'related_type': 'shared.article',
        'field': 'media',
        'order': 1
    },
    {
        'id': 122,
        'file_id': 12,
        'related_id': 23,
        'related_type': 'shared.article',
        'field': 'media',
        'order': 1
    },
    {
        'id': 123,
        'file_id': 10,
        'related_id': 18,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 124,
        'file_id': 10,
        'related_id': 19,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 125,
        'file_id': 10,
        'related_id': 20,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    },
    {
        'id': 126,
        'file_id': 10,
        'related_id': 21,
        'related_type': 'shared.quote',
        'field': 'media',
        'order': 1
    }
]);
  }

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

  // Thêm dữ liệu vào bảng globals
  if ((await knex('globals').count('* as count'))[0].count === 0) {
    await knex('globals').insert([
    {
        'id': 1,
        'document_id': 'w28pd454smd6klrfbnllxsz3',
        'site_name': 'Strapi Blog',
        'site_description': 'A Blog made with Strapi',
        'created_at': '2025-05-05T09:44:00.087Z',
        'updated_at': '2025-05-05T09:44:00.087Z',
        'published_at': '2025-05-05T09:44:00.083Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng globals_cmps
  if ((await knex('globals_cmps').count('* as count'))[0].count === 0) {
    await knex('globals_cmps').insert([
    {
        'id': 1,
        'entity_id': 1,
        'cmp_id': 1,
        'component_type': 'shared.seo',
        'field': 'defaultSeo',
        'order': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng home_page_contents
  if ((await knex('home_page_contents').count('* as count'))[0].count === 0) {
    await knex('home_page_contents').insert([
    {
        'id': 1,
        'document_id': 'bujyoup8zltuk9akof58tuct',
        'created_at': '2025-05-10T15:48:17.337Z',
        'updated_at': '2025-05-11T15:20:06.631Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null
    },
    {
        'id': 7,
        'document_id': 'bujyoup8zltuk9akof58tuct',
        'created_at': '2025-05-10T15:48:17.337Z',
        'updated_at': '2025-05-11T15:20:06.631Z',
        'published_at': '2025-05-11T15:20:06.673Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng home_page_contents_cmps
  if ((await knex('home_page_contents_cmps').count('* as count'))[0].count === 0) {
    await knex('home_page_contents_cmps').insert([
    {
        'id': 1,
        'entity_id': 1,
        'cmp_id': 1,
        'component_type': 'shared.article',
        'field': 'partner',
        'order': 1
    },
    {
        'id': 2,
        'entity_id': 1,
        'cmp_id': 2,
        'component_type': 'shared.article',
        'field': 'service',
        'order': 3
    },
    {
        'id': 5,
        'entity_id': 1,
        'cmp_id': 3,
        'component_type': 'shared.article',
        'field': 'aboutus',
        'order': 5
    },
    {
        'id': 9,
        'entity_id': 1,
        'cmp_id': 4,
        'component_type': 'shared.article',
        'field': 'news',
        'order': 6
    },
    {
        'id': 34,
        'entity_id': 1,
        'cmp_id': 12,
        'component_type': 'shared.rich-text',
        'field': 'company_achievement',
        'order': 1
    },
    {
        'id': 87,
        'entity_id': 7,
        'cmp_id': 21,
        'component_type': 'shared.article',
        'field': 'partner',
        'order': null
    },
    {
        'id': 88,
        'entity_id': 7,
        'cmp_id': 22,
        'component_type': 'shared.article',
        'field': 'service',
        'order': null
    },
    {
        'id': 89,
        'entity_id': 7,
        'cmp_id': 23,
        'component_type': 'shared.article',
        'field': 'aboutus',
        'order': null
    },
    {
        'id': 90,
        'entity_id': 7,
        'cmp_id': 24,
        'component_type': 'shared.article',
        'field': 'news',
        'order': null
    },
    {
        'id': 91,
        'entity_id': 7,
        'cmp_id': 21,
        'component_type': 'shared.rich-text',
        'field': 'company_achievement',
        'order': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng i18n_locale
  if ((await knex('i18n_locale').count('* as count'))[0].count === 0) {
    await knex('i18n_locale').insert([
    {
        'id': 1,
        'document_id': 'k5op53pok0vt1lnhm8vwtora',
        'name': 'English (en)',
        'code': 'en',
        'created_at': '2025-05-05T09:43:57.644Z',
        'updated_at': '2025-05-05T09:43:57.644Z',
        'published_at': '2025-05-05T09:43:57.644Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'l9fhnjn0w9tenjhn1ga5j0wx',
        'name': 'Vietnamese (vi)',
        'code': 'vi',
        'created_at': '2025-05-06T16:13:38.875Z',
        'updated_at': '2025-05-06T16:13:44.604Z',
        'published_at': '2025-05-06T16:13:38.876Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng khach_hangs
  if ((await knex('khach_hangs').count('* as count'))[0].count === 0) {
    await knex('khach_hangs').insert([
    {
        'id': 1,
        'document_id': 'kd4hpm9ngabbee8u9kmk86dp',
        'title': 'Công ty A',
        'created_at': '2025-05-10T07:05:06.505Z',
        'updated_at': '2025-05-10T07:05:06.505Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 2,
        'document_id': 'kd4hpm9ngabbee8u9kmk86dp',
        'title': 'Công ty A',
        'created_at': '2025-05-10T07:05:06.505Z',
        'updated_at': '2025-05-10T07:05:06.505Z',
        'published_at': '2025-05-10T07:05:06.516Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 3,
        'document_id': 'zdso6yb01hxqyfhzvzgz4zfh',
        'title': 'Công ty B',
        'created_at': '2025-05-10T07:05:18.486Z',
        'updated_at': '2025-05-10T07:05:18.486Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 4,
        'document_id': 'zdso6yb01hxqyfhzvzgz4zfh',
        'title': 'Công ty B',
        'created_at': '2025-05-10T07:05:18.486Z',
        'updated_at': '2025-05-10T07:05:18.486Z',
        'published_at': '2025-05-10T07:05:18.494Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 5,
        'document_id': 'c107ati221l8lcd1dbteaxgn',
        'title': 'Công ty C',
        'created_at': '2025-05-10T07:05:33.605Z',
        'updated_at': '2025-05-10T07:05:33.605Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 6,
        'document_id': 'c107ati221l8lcd1dbteaxgn',
        'title': 'Công ty C',
        'created_at': '2025-05-10T07:05:33.605Z',
        'updated_at': '2025-05-10T07:05:33.605Z',
        'published_at': '2025-05-10T07:05:33.624Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 7,
        'document_id': 'igyc9f6vpkdoxrpycj0ahspn',
        'title': 'Công ty D',
        'created_at': '2025-05-10T07:05:45.348Z',
        'updated_at': '2025-05-10T07:05:45.348Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 8,
        'document_id': 'igyc9f6vpkdoxrpycj0ahspn',
        'title': 'Công ty D',
        'created_at': '2025-05-10T07:05:45.348Z',
        'updated_at': '2025-05-10T07:05:45.348Z',
        'published_at': '2025-05-10T07:05:45.357Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 9,
        'document_id': 'lvhr3tdwrzfhoynpqj3m2xar',
        'title': 'Công ty E',
        'created_at': '2025-05-10T07:05:54.056Z',
        'updated_at': '2025-05-10T07:05:54.056Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 10,
        'document_id': 'lvhr3tdwrzfhoynpqj3m2xar',
        'title': 'Công ty E',
        'created_at': '2025-05-10T07:05:54.056Z',
        'updated_at': '2025-05-10T07:05:54.056Z',
        'published_at': '2025-05-10T07:05:54.065Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 11,
        'document_id': 'm4960p067ha2xpp9s8xfldc0',
        'title': 'Công ty F',
        'created_at': '2025-05-10T07:06:11.335Z',
        'updated_at': '2025-05-10T07:06:11.335Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 12,
        'document_id': 'm4960p067ha2xpp9s8xfldc0',
        'title': 'Công ty F',
        'created_at': '2025-05-10T07:06:11.335Z',
        'updated_at': '2025-05-10T07:06:11.335Z',
        'published_at': '2025-05-10T07:06:11.346Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 13,
        'document_id': 'zhcq38emex8v583qrsb45ceh',
        'title': 'Công ty G',
        'created_at': '2025-05-10T07:06:28.288Z',
        'updated_at': '2025-05-10T07:06:28.288Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 14,
        'document_id': 'zhcq38emex8v583qrsb45ceh',
        'title': 'Công ty G',
        'created_at': '2025-05-10T07:06:28.288Z',
        'updated_at': '2025-05-10T07:06:28.288Z',
        'published_at': '2025-05-10T07:06:28.297Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 15,
        'document_id': 'atqkrqaoaps4ylervc2pcb2z',
        'title': 'Công ty H',
        'created_at': '2025-05-10T07:06:40.618Z',
        'updated_at': '2025-05-10T07:06:40.618Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    },
    {
        'id': 16,
        'document_id': 'atqkrqaoaps4ylervc2pcb2z',
        'title': 'Công ty H',
        'created_at': '2025-05-10T07:06:40.618Z',
        'updated_at': '2025-05-10T07:06:40.618Z',
        'published_at': '2025-05-10T07:06:40.626Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'website': 'https://google.com'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng menus
  if ((await knex('menus').count('* as count'))[0].count === 0) {
    await knex('menus').insert([
    {
        'id': 1,
        'document_id': 'i6kb98r2hnc69kxvcaz8gxc4',
        'title': 'Main menu',
        'slug': 'main-menu',
        'items': [
            {
                'id': '1',
                'url': '/',
                'title': 'Trang chủ',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '2',
                'url': '/gioi-thieu',
                'title': 'Giới thiệu',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '3',
                'url': '/san-pham-dich-vu',
                'title': 'Sản phẩm / Dịch vụ',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '4',
                'url': '/du-an-tieu-bieu',
                'title': 'Dự án tiêu biểu',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '5',
                'url': '/bao-gia-tu-van',
                'title': 'Báo giá & tư vấn',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '6',
                'url': '/lien-he',
                'title': 'Liên hệ',
                'target': '_self',
                'children': [],
                'isProtected': true
            }
        ],
        'created_at': '2025-05-09T16:12:21.345Z',
        'updated_at': '2025-05-09T16:23:33.502Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 2,
        'document_id': 'i6kb98r2hnc69kxvcaz8gxc4',
        'title': 'Main menu',
        'slug': 'main-menu',
        'items': [
            {
                'id': '1',
                'url': '/',
                'title': 'Trang chủ',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '2',
                'url': '/gioi-thieu',
                'title': 'Giới thiệu',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '3',
                'url': '/san-pham-dich-vu',
                'title': 'Sản phẩm / Dịch vụ',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '4',
                'url': '/du-an-tieu-bieu',
                'title': 'Dự án tiêu biểu',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '5',
                'url': '/bao-gia-tu-van',
                'title': 'Báo giá & tư vấn',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '6',
                'url': '/lien-he',
                'title': 'Liên hệ',
                'target': '_self',
                'children': [],
                'isProtected': true
            }
        ],
        'created_at': '2025-05-09T16:12:21.345Z',
        'updated_at': '2025-05-09T16:23:33.512Z',
        'published_at': '2025-05-09T16:21:17.058Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 3,
        'document_id': 'i6kb98r2hnc69kxvcaz8gxc4',
        'title': 'Main menu',
        'slug': 'main-menu',
        'items': [
            {
                'id': '1',
                'url': '/',
                'title': 'Home',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '2',
                'url': '/about',
                'title': 'About',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '3',
                'url': '/services',
                'title': 'Services',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '4',
                'url': '/projects',
                'title': 'Projects',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '5',
                'url': '/quotation-consultation',
                'title': 'Quotation & Consultation',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '6',
                'url': '/contact',
                'title': 'Contact',
                'target': '_self',
                'children': [],
                'isProtected': true
            }
        ],
        'created_at': '2025-05-09T16:23:29.801Z',
        'updated_at': '2025-05-09T16:23:33.498Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'en'
    },
    {
        'id': 4,
        'document_id': 'i6kb98r2hnc69kxvcaz8gxc4',
        'title': 'Main menu',
        'slug': 'main-menu',
        'items': [
            {
                'id': '1',
                'url': '/',
                'title': 'Home',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '2',
                'url': '/about',
                'title': 'About',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '3',
                'url': '/services',
                'title': 'Services',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '4',
                'url': '/projects',
                'title': 'Projects',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '5',
                'url': '/quotation-consultation',
                'title': 'Quotation & Consultation',
                'target': '_self',
                'children': [],
                'isProtected': true
            },
            {
                'id': '6',
                'url': '/contact',
                'title': 'Contact',
                'target': '_self',
                'children': [],
                'isProtected': true
            }
        ],
        'created_at': '2025-05-09T16:23:29.801Z',
        'updated_at': '2025-05-09T16:23:33.498Z',
        'published_at': '2025-05-09T16:23:33.506Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'en'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng services
  if ((await knex('services').count('* as count'))[0].count === 0) {
    await knex('services').insert([
    {
        'id': 1,
        'document_id': 'd80rhj0nu7r2aezebjyh81xp',
        'title': 'Đồ gá cơ khí',
        'slug': 'do-ga-co-khi',
        'content': null,
        'created_at': '2025-05-09T15:49:56.335Z',
        'updated_at': '2025-05-09T15:49:56.335Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 2,
        'document_id': 'd80rhj0nu7r2aezebjyh81xp',
        'title': 'Đồ gá cơ khí',
        'slug': 'do-ga-co-khi',
        'content': null,
        'created_at': '2025-05-09T15:49:56.335Z',
        'updated_at': '2025-05-09T15:49:56.335Z',
        'published_at': '2025-05-09T15:49:56.356Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 3,
        'document_id': 'p2cm56gf2rz5ztjsw6ahf6vm',
        'title': 'Xe đẩy inox/thép',
        'slug': 'xe-day-inox-thep',
        'content': null,
        'created_at': '2025-05-09T15:52:24.431Z',
        'updated_at': '2025-05-09T15:52:24.431Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 4,
        'document_id': 'p2cm56gf2rz5ztjsw6ahf6vm',
        'title': 'Xe đẩy inox/thép',
        'slug': 'xe-day-inox-thep',
        'content': null,
        'created_at': '2025-05-09T15:52:24.431Z',
        'updated_at': '2025-05-09T15:52:24.431Z',
        'published_at': '2025-05-09T15:52:24.447Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 5,
        'document_id': 'kww2kzajcndnv5ictgvd2xvb',
        'title': 'Tủ điện công nghiệp',
        'slug': 'tu-dien-cong-nghiep',
        'content': null,
        'created_at': '2025-05-09T15:52:48.166Z',
        'updated_at': '2025-05-09T15:52:48.166Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    },
    {
        'id': 6,
        'document_id': 'kww2kzajcndnv5ictgvd2xvb',
        'title': 'Tủ điện công nghiệp',
        'slug': 'tu-dien-cong-nghiep',
        'content': null,
        'created_at': '2025-05-09T15:52:48.166Z',
        'updated_at': '2025-05-09T15:52:48.166Z',
        'published_at': '2025-05-09T15:52:48.177Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': 'vi'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng slides
  if ((await knex('slides').count('* as count'))[0].count === 0) {
    await knex('slides').insert([
    {
        'id': 1,
        'document_id': 'dp58ubewjn2ay0h3n6o3bgw5',
        'content': '<div class=\'hero-text\'><h1>Take your career <span>to the next level</span></h1><p>Join thousands of professionals who have transformed their business with our solutions.</p><p><a class=\'btn btn-primary\' href=\'/get-started\'>Get Started</a></p></div>',
        'created_at': '2025-05-10T15:15:18.412Z',
        'updated_at': '2025-05-10T15:39:24.672Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'position': [
            'right'
        ]
    },
    {
        'id': 3,
        'document_id': 'ib68achu3dl8j0qdtngazw3n',
        'content': '<h1>Take your career <span>to the next level</span></h1><p>Join thousands of professionals who have transformed their business with our solutions.</p><p><a class=\'btn btn-primary\' href=\'/get-started\'>Get Started</a></p>',
        'created_at': '2025-05-10T15:25:41.558Z',
        'updated_at': '2025-05-10T15:41:31.386Z',
        'published_at': null,
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'position': [
            'center'
        ]
    },
    {
        'id': 7,
        'document_id': 'dp58ubewjn2ay0h3n6o3bgw5',
        'content': '<div class=\'hero-text\'><h1>Take your career <span>to the next level</span></h1><p>Join thousands of professionals who have transformed their business with our solutions.</p><p><a class=\'btn btn-primary\' href=\'/get-started\'>Get Started</a></p></div>',
        'created_at': '2025-05-10T15:15:18.412Z',
        'updated_at': '2025-05-10T15:39:24.672Z',
        'published_at': '2025-05-10T15:39:24.683Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'position': [
            'right'
        ]
    },
    {
        'id': 8,
        'document_id': 'ib68achu3dl8j0qdtngazw3n',
        'content': '<h1>Take your career <span>to the next level</span></h1><p>Join thousands of professionals who have transformed their business with our solutions.</p><p><a class=\'btn btn-primary\' href=\'/get-started\'>Get Started</a></p>',
        'created_at': '2025-05-10T15:25:41.558Z',
        'updated_at': '2025-05-10T15:41:31.386Z',
        'published_at': '2025-05-10T15:41:31.396Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null,
        'position': [
            'center'
        ]
    }
]);
  }

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

  // Thêm dữ liệu vào bảng strapi_api_token_permissions
  if ((await knex('strapi_api_token_permissions').count('* as count'))[0].count === 0) {
    await knex('strapi_api_token_permissions').insert([
    {
        'id': 1,
        'document_id': 'vxcuhxqwujm6bp1pujo3shob',
        'action': 'api::about-us.about-us.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.804Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'feu61ttufuljvh4g6hlhju8s',
        'action': 'api::about-us.about-us.findOne',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.804Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 3,
        'document_id': 'fjwqri70q029xr7lyjwsalgk',
        'action': 'api::article.article.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.804Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 4,
        'document_id': 't4yn3u2akvj36x3t92jsfimz',
        'action': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.804Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 5,
        'document_id': 'd8khemkkrhmh6axiizomuwpv',
        'action': 'api::article.article.findOne',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.804Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 6,
        'document_id': 'kolwvdh006hgp61z2gjv45ha',
        'action': 'api::bao-gia-and-tu-van.bao-gia-and-tu-van.findOne',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 7,
        'document_id': 't26jl9szgqnz0dczr9kt0cyl',
        'action': 'api::contact.contact.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 8,
        'document_id': 'dbtm1yrungjr2lsuhjl793q0',
        'action': 'api::global.global.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 9,
        'document_id': 'uq5yu8c0j4f7b7ihoumfb44z',
        'action': 'api::product.product.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 10,
        'document_id': 'wi2sbs3k0ihptddhqq1tj9ts',
        'action': 'api::product.product.findOne',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 11,
        'document_id': 'dmytc8y5oztwtxw5ufoce2os',
        'action': 'api::service.service.find',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 12,
        'document_id': 'hef3nbrofu55rmcwuaxw99c0',
        'action': 'api::service.service.findOne',
        'created_at': '2025-05-10T04:57:16.804Z',
        'updated_at': '2025-05-10T04:57:16.804Z',
        'published_at': '2025-05-10T04:57:16.805Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 15,
        'document_id': 'y9m2qsipm1d0pw6hv6y9sfyf',
        'action': 'plugin::tree-menus.menu.find',
        'created_at': '2025-05-10T05:01:18.933Z',
        'updated_at': '2025-05-10T05:01:18.933Z',
        'published_at': '2025-05-10T05:01:18.934Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 16,
        'document_id': 'n1p6m275cvxe5aff48jnyadg',
        'action': 'plugin::tree-menus.menu.findOne',
        'created_at': '2025-05-10T05:01:18.933Z',
        'updated_at': '2025-05-10T05:01:18.933Z',
        'published_at': '2025-05-10T05:01:18.934Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 17,
        'document_id': 'fji3is5x1brp9lvpyrzg38pw',
        'action': 'api::khach-hang.khach-hang.find',
        'created_at': '2025-05-10T07:04:22.060Z',
        'updated_at': '2025-05-10T07:04:22.060Z',
        'published_at': '2025-05-10T07:04:22.060Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 18,
        'document_id': 'bglvqsw27bvyrv96nm3q4pke',
        'action': 'api::khach-hang.khach-hang.findOne',
        'created_at': '2025-05-10T07:04:22.060Z',
        'updated_at': '2025-05-10T07:04:22.060Z',
        'published_at': '2025-05-10T07:04:22.060Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 19,
        'document_id': 'xt95xwmoodudkvju05jscabc',
        'action': 'api::slide.slide.find',
        'created_at': '2025-05-10T14:57:35.383Z',
        'updated_at': '2025-05-10T14:57:35.383Z',
        'published_at': '2025-05-10T14:57:35.384Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 20,
        'document_id': 'k93lbcmm2vgmomqnxmolvmy1',
        'action': 'api::slide.slide.findOne',
        'created_at': '2025-05-10T14:57:35.383Z',
        'updated_at': '2025-05-10T14:57:35.383Z',
        'published_at': '2025-05-10T14:57:35.384Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 21,
        'document_id': 'mojdehzw4nq6j40ld9l3bspv',
        'action': 'api::home-page-content.home-page-content.find',
        'created_at': '2025-05-11T09:32:24.465Z',
        'updated_at': '2025-05-11T09:32:24.465Z',
        'published_at': '2025-05-11T09:32:24.465Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng strapi_api_token_permissions_token_lnk
  if ((await knex('strapi_api_token_permissions_token_lnk').count('* as count'))[0].count === 0) {
    await knex('strapi_api_token_permissions_token_lnk').insert([
    {
        'id': 1,
        'api_token_permission_id': 4,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 2,
        'api_token_permission_id': 2,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 3,
        'api_token_permission_id': 6,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 4,
        'api_token_permission_id': 8,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 5,
        'api_token_permission_id': 5,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 6,
        'api_token_permission_id': 1,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 7,
        'api_token_permission_id': 10,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 9,
        'api_token_permission_id': 3,
        'api_token_id': 1,
        'api_token_permission_ord': 1
    },
    {
        'id': 10,
        'api_token_permission_id': 9,
        'api_token_id': 1,
        'api_token_permission_ord': 2
    },
    {
        'id': 11,
        'api_token_permission_id': 11,
        'api_token_id': 1,
        'api_token_permission_ord': 2
    },
    {
        'id': 12,
        'api_token_permission_id': 12,
        'api_token_id': 1,
        'api_token_permission_ord': 3
    },
    {
        'id': 14,
        'api_token_permission_id': 7,
        'api_token_id': 1,
        'api_token_permission_ord': 3
    },
    {
        'id': 15,
        'api_token_permission_id': 15,
        'api_token_id': 1,
        'api_token_permission_ord': 4
    },
    {
        'id': 16,
        'api_token_permission_id': 16,
        'api_token_id': 1,
        'api_token_permission_ord': 4
    },
    {
        'id': 17,
        'api_token_permission_id': 17,
        'api_token_id': 1,
        'api_token_permission_ord': 5
    },
    {
        'id': 18,
        'api_token_permission_id': 18,
        'api_token_id': 1,
        'api_token_permission_ord': 5
    },
    {
        'id': 19,
        'api_token_permission_id': 19,
        'api_token_id': 1,
        'api_token_permission_ord': 6
    },
    {
        'id': 20,
        'api_token_permission_id': 20,
        'api_token_id': 1,
        'api_token_permission_ord': 6
    },
    {
        'id': 21,
        'api_token_permission_id': 21,
        'api_token_id': 1,
        'api_token_permission_ord': 7
    }
]);
  }

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

  // Thêm dữ liệu vào bảng strapi_api_tokens
  if ((await knex('strapi_api_tokens').count('* as count'))[0].count === 0) {
    await knex('strapi_api_tokens').insert([
    {
        'id': 1,
        'document_id': 'a8bg271mxezlyg4vox3zts1a',
        'name': 'Read Only',
        'description': 'A default API token with read-only permissions, only used for accessing resources',
        'type': 'custom',
        'access_key': '75964ab57d64ddf5fc3b36886bb450384eb275d2aa389910007fabe8b84b4523b6c3878a92922d0838893e388db25a24e63124470362e1a86614ffe351161632',
        'last_used_at': null,
        'expires_at': null,
        'lifespan': null,
        'created_at': '2025-05-05T09:43:57.951Z',
        'updated_at': '2025-05-11T09:32:24.461Z',
        'published_at': '2025-05-05T09:43:57.951Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null,
        'encrypted_key': null
    },
    {
        'id': 2,
        'document_id': 'p2idteam2e77qexmyziyx4a4',
        'name': 'Full Access',
        'description': 'A default API token with full access permissions, used for accessing or modifying resources',
        'type': 'full-access',
        'access_key': 'ad9145e17efba456d492ebdc26deb5bf25ce35a2742143226028862d56cd791efe31baee77d03648e5b91db1543cc9e416d23798df5ed59ffec0777cac620f44',
        'last_used_at': null,
        'expires_at': null,
        'lifespan': null,
        'created_at': '2025-05-05T09:43:57.954Z',
        'updated_at': '2025-05-10T04:01:51.290Z',
        'published_at': '2025-05-05T09:43:57.954Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null,
        'encrypted_key': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng strapi_core_store_settings
  if ((await knex('strapi_core_store_settings').count('* as count'))[0].count === 0) {
    await knex('strapi_core_store_settings').insert([
    {
        'id': 1,
        'key': 'strapi_content_types_schema',
        'value': '{\'plugin::upload.file\':{\'collectionName\':\'files\',\'info\':{\'singularName\':\'file\',\'pluralName\':\'files\',\'displayName\':\'File\',\'description\':\'\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'alternativeText\':{\'type\':\'string\',\'configurable\':false},\'caption\':{\'type\':\'string\',\'configurable\':false},\'width\':{\'type\':\'integer\',\'configurable\':false},\'height\':{\'type\':\'integer\',\'configurable\':false},\'formats\':{\'type\':\'json\',\'configurable\':false},\'hash\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'ext\':{\'type\':\'string\',\'configurable\':false},\'mime\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'size\':{\'type\':\'decimal\',\'configurable\':false,\'required\':true},\'url\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'previewUrl\':{\'type\':\'string\',\'configurable\':false},\'provider\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'provider_metadata\':{\'type\':\'json\',\'configurable\':false},\'related\':{\'type\':\'relation\',\'relation\':\'morphToMany\',\'configurable\':false},\'folder\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::upload.folder\',\'inversedBy\':\'files\',\'private\':true},\'folderPath\':{\'type\':\'string\',\'minLength\':1,\'required\':true,\'private\':true,\'searchable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::upload.file\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'files\'}}},\'indexes\':[{\'name\':\'upload_files_folder_path_index\',\'columns\':[\'folder_path\'],\'type\':null},{\'name\':\'upload_files_created_at_index\',\'columns\':[\'created_at\'],\'type\':null},{\'name\':\'upload_files_updated_at_index\',\'columns\':[\'updated_at\'],\'type\':null},{\'name\':\'upload_files_name_index\',\'columns\':[\'name\'],\'type\':null},{\'name\':\'upload_files_size_index\',\'columns\':[\'size\'],\'type\':null},{\'name\':\'upload_files_ext_index\',\'columns\':[\'ext\'],\'type\':null}],\'plugin\':\'upload\',\'globalId\':\'UploadFile\',\'uid\':\'plugin::upload.file\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'files\',\'info\':{\'singularName\':\'file\',\'pluralName\':\'files\',\'displayName\':\'File\',\'description\':\'\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'alternativeText\':{\'type\':\'string\',\'configurable\':false},\'caption\':{\'type\':\'string\',\'configurable\':false},\'width\':{\'type\':\'integer\',\'configurable\':false},\'height\':{\'type\':\'integer\',\'configurable\':false},\'formats\':{\'type\':\'json\',\'configurable\':false},\'hash\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'ext\':{\'type\':\'string\',\'configurable\':false},\'mime\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'size\':{\'type\':\'decimal\',\'configurable\':false,\'required\':true},\'url\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'previewUrl\':{\'type\':\'string\',\'configurable\':false},\'provider\':{\'type\':\'string\',\'configurable\':false,\'required\':true},\'provider_metadata\':{\'type\':\'json\',\'configurable\':false},\'related\':{\'type\':\'relation\',\'relation\':\'morphToMany\',\'configurable\':false},\'folder\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::upload.folder\',\'inversedBy\':\'files\',\'private\':true},\'folderPath\':{\'type\':\'string\',\'minLength\':1,\'required\':true,\'private\':true,\'searchable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'file\'},\'plugin::upload.folder\':{\'collectionName\':\'upload_folders\',\'info\':{\'singularName\':\'folder\',\'pluralName\':\'folders\',\'displayName\':\'Folder\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'required\':true},\'pathId\':{\'type\':\'integer\',\'unique\':true,\'required\':true},\'parent\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::upload.folder\',\'inversedBy\':\'children\'},\'children\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::upload.folder\',\'mappedBy\':\'parent\'},\'files\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::upload.file\',\'mappedBy\':\'folder\'},\'path\':{\'type\':\'string\',\'minLength\':1,\'required\':true},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::upload.folder\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'upload_folders\'}}},\'indexes\':[{\'name\':\'upload_folders_path_id_index\',\'columns\':[\'path_id\'],\'type\':\'unique\'},{\'name\':\'upload_folders_path_index\',\'columns\':[\'path\'],\'type\':\'unique\'}],\'plugin\':\'upload\',\'globalId\':\'UploadFolder\',\'uid\':\'plugin::upload.folder\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'upload_folders\',\'info\':{\'singularName\':\'folder\',\'pluralName\':\'folders\',\'displayName\':\'Folder\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'required\':true},\'pathId\':{\'type\':\'integer\',\'unique\':true,\'required\':true},\'parent\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::upload.folder\',\'inversedBy\':\'children\'},\'children\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::upload.folder\',\'mappedBy\':\'parent\'},\'files\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::upload.file\',\'mappedBy\':\'folder\'},\'path\':{\'type\':\'string\',\'minLength\':1,\'required\':true}},\'kind\':\'collectionType\'},\'modelName\':\'folder\'},\'plugin::i18n.locale\':{\'info\':{\'singularName\':\'locale\',\'pluralName\':\'locales\',\'collectionName\':\'locales\',\'displayName\':\'Locale\',\'description\':\'\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'min\':1,\'max\':50,\'configurable\':false},\'code\':{\'type\':\'string\',\'unique\':true,\'configurable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::i18n.locale\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'i18n_locale\'}}},\'plugin\':\'i18n\',\'collectionName\':\'i18n_locale\',\'globalId\':\'I18NLocale\',\'uid\':\'plugin::i18n.locale\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'i18n_locale\',\'info\':{\'singularName\':\'locale\',\'pluralName\':\'locales\',\'collectionName\':\'locales\',\'displayName\':\'Locale\',\'description\':\'\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'min\':1,\'max\':50,\'configurable\':false},\'code\':{\'type\':\'string\',\'unique\':true,\'configurable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'locale\'},\'plugin::content-releases.release\':{\'collectionName\':\'strapi_releases\',\'info\':{\'singularName\':\'release\',\'pluralName\':\'releases\',\'displayName\':\'Release\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'required\':true},\'releasedAt\':{\'type\':\'datetime\'},\'scheduledAt\':{\'type\':\'datetime\'},\'timezone\':{\'type\':\'string\'},\'status\':{\'type\':\'enumeration\',\'enum\':[\'ready\',\'blocked\',\'failed\',\'done\',\'empty\'],\'required\':true},\'actions\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::content-releases.release-action\',\'mappedBy\':\'release\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::content-releases.release\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_releases\'}}},\'plugin\':\'content-releases\',\'globalId\':\'ContentReleasesRelease\',\'uid\':\'plugin::content-releases.release\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_releases\',\'info\':{\'singularName\':\'release\',\'pluralName\':\'releases\',\'displayName\':\'Release\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'required\':true},\'releasedAt\':{\'type\':\'datetime\'},\'scheduledAt\':{\'type\':\'datetime\'},\'timezone\':{\'type\':\'string\'},\'status\':{\'type\':\'enumeration\',\'enum\':[\'ready\',\'blocked\',\'failed\',\'done\',\'empty\'],\'required\':true},\'actions\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::content-releases.release-action\',\'mappedBy\':\'release\'}},\'kind\':\'collectionType\'},\'modelName\':\'release\'},\'plugin::content-releases.release-action\':{\'collectionName\':\'strapi_release_actions\',\'info\':{\'singularName\':\'release-action\',\'pluralName\':\'release-actions\',\'displayName\':\'Release Action\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'type\':{\'type\':\'enumeration\',\'enum\':[\'publish\',\'unpublish\'],\'required\':true},\'contentType\':{\'type\':\'string\',\'required\':true},\'entryDocumentId\':{\'type\':\'string\'},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'release\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::content-releases.release\',\'inversedBy\':\'actions\'},\'isEntryValid\':{\'type\':\'boolean\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::content-releases.release-action\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_release_actions\'}}},\'plugin\':\'content-releases\',\'globalId\':\'ContentReleasesReleaseAction\',\'uid\':\'plugin::content-releases.release-action\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_release_actions\',\'info\':{\'singularName\':\'release-action\',\'pluralName\':\'release-actions\',\'displayName\':\'Release Action\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'type\':{\'type\':\'enumeration\',\'enum\':[\'publish\',\'unpublish\'],\'required\':true},\'contentType\':{\'type\':\'string\',\'required\':true},\'entryDocumentId\':{\'type\':\'string\'},\'locale\':{\'type\':\'string\'},\'release\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::content-releases.release\',\'inversedBy\':\'actions\'},\'isEntryValid\':{\'type\':\'boolean\'}},\'kind\':\'collectionType\'},\'modelName\':\'release-action\'},\'plugin::review-workflows.workflow\':{\'collectionName\':\'strapi_workflows\',\'info\':{\'name\':\'Workflow\',\'description\':\'\',\'singularName\':\'workflow\',\'pluralName\':\'workflows\',\'displayName\':\'Workflow\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'required\':true,\'unique\':true},\'stages\':{\'type\':\'relation\',\'target\':\'plugin::review-workflows.workflow-stage\',\'relation\':\'oneToMany\',\'mappedBy\':\'workflow\'},\'stageRequiredToPublish\':{\'type\':\'relation\',\'target\':\'plugin::review-workflows.workflow-stage\',\'relation\':\'oneToOne\',\'required\':false},\'contentTypes\':{\'type\':\'json\',\'required\':true,\'default\':\'[]\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::review-workflows.workflow\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_workflows\'}}},\'plugin\':\'review-workflows\',\'globalId\':\'ReviewWorkflowsWorkflow\',\'uid\':\'plugin::review-workflows.workflow\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_workflows\',\'info\':{\'name\':\'Workflow\',\'description\':\'\',\'singularName\':\'workflow\',\'pluralName\':\'workflows\',\'displayName\':\'Workflow\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'required\':true,\'unique\':true},\'stages\':{\'type\':\'relation\',\'target\':\'plugin::review-workflows.workflow-stage\',\'relation\':\'oneToMany\',\'mappedBy\':\'workflow\'},\'stageRequiredToPublish\':{\'type\':\'relation\',\'target\':\'plugin::review-workflows.workflow-stage\',\'relation\':\'oneToOne\',\'required\':false},\'contentTypes\':{\'type\':\'json\',\'required\':true,\'default\':\'[]\'}},\'kind\':\'collectionType\'},\'modelName\':\'workflow\'},\'plugin::review-workflows.workflow-stage\':{\'collectionName\':\'strapi_workflows_stages\',\'info\':{\'name\':\'Workflow Stage\',\'description\':\'\',\'singularName\':\'workflow-stage\',\'pluralName\':\'workflow-stages\',\'displayName\':\'Stages\'},\'options\':{\'version\':\'1.1.0\',\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'configurable\':false},\'color\':{\'type\':\'string\',\'configurable\':false,\'default\':\'#4945FF\'},\'workflow\':{\'type\':\'relation\',\'target\':\'plugin::review-workflows.workflow\',\'relation\':\'manyToOne\',\'inversedBy\':\'stages\',\'configurable\':false},\'permissions\':{\'type\':\'relation\',\'target\':\'admin::permission\',\'relation\':\'manyToMany\',\'configurable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::review-workflows.workflow-stage\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_workflows_stages\'}}},\'plugin\':\'review-workflows\',\'globalId\':\'ReviewWorkflowsWorkflowStage\',\'uid\':\'plugin::review-workflows.workflow-stage\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_workflows_stages\',\'info\':{\'name\':\'Workflow Stage\',\'description\':\'\',\'singularName\':\'workflow-stage\',\'pluralName\':\'workflow-stages\',\'displayName\':\'Stages\'},\'options\':{\'version\':\'1.1.0\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'configurable\':false},\'color\':{\'type\':\'string\',\'configurable\':false,\'default\':\'#4945FF\'},\'workflow\':{\'type\':\'relation\',\'target\':\'plugin::review-workflows.workflow\',\'relation\':\'manyToOne\',\'inversedBy\':\'stages\',\'configurable\':false},\'permissions\':{\'type\':\'relation\',\'target\':\'admin::permission\',\'relation\':\'manyToMany\',\'configurable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'workflow-stage\'},\'plugin::users-permissions.permission\':{\'collectionName\':\'up_permissions\',\'info\':{\'name\':\'permission\',\'description\':\'\',\'singularName\':\'permission\',\'pluralName\':\'permissions\',\'displayName\':\'Permission\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'required\':true,\'configurable\':false},\'role\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::users-permissions.role\',\'inversedBy\':\'permissions\',\'configurable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.permission\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'up_permissions\'}}},\'plugin\':\'users-permissions\',\'globalId\':\'UsersPermissionsPermission\',\'uid\':\'plugin::users-permissions.permission\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'up_permissions\',\'info\':{\'name\':\'permission\',\'description\':\'\',\'singularName\':\'permission\',\'pluralName\':\'permissions\',\'displayName\':\'Permission\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'required\':true,\'configurable\':false},\'role\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::users-permissions.role\',\'inversedBy\':\'permissions\',\'configurable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'permission\',\'options\':{\'draftAndPublish\':false}},\'plugin::users-permissions.role\':{\'collectionName\':\'up_roles\',\'info\':{\'name\':\'role\',\'description\':\'\',\'singularName\':\'role\',\'pluralName\':\'roles\',\'displayName\':\'Role\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':3,\'required\':true,\'configurable\':false},\'description\':{\'type\':\'string\',\'configurable\':false},\'type\':{\'type\':\'string\',\'unique\':true,\'configurable\':false},\'permissions\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.permission\',\'mappedBy\':\'role\',\'configurable\':false},\'users\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.user\',\'mappedBy\':\'role\',\'configurable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.role\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'up_roles\'}}},\'plugin\':\'users-permissions\',\'globalId\':\'UsersPermissionsRole\',\'uid\':\'plugin::users-permissions.role\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'up_roles\',\'info\':{\'name\':\'role\',\'description\':\'\',\'singularName\':\'role\',\'pluralName\':\'roles\',\'displayName\':\'Role\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':3,\'required\':true,\'configurable\':false},\'description\':{\'type\':\'string\',\'configurable\':false},\'type\':{\'type\':\'string\',\'unique\':true,\'configurable\':false},\'permissions\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.permission\',\'mappedBy\':\'role\',\'configurable\':false},\'users\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.user\',\'mappedBy\':\'role\',\'configurable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'role\',\'options\':{\'draftAndPublish\':false}},\'plugin::users-permissions.user\':{\'collectionName\':\'up_users\',\'info\':{\'name\':\'user\',\'description\':\'\',\'singularName\':\'user\',\'pluralName\':\'users\',\'displayName\':\'User\'},\'options\':{\'timestamps\':true,\'draftAndPublish\':false},\'attributes\':{\'username\':{\'type\':\'string\',\'minLength\':3,\'unique\':true,\'configurable\':false,\'required\':true},\'email\':{\'type\':\'email\',\'minLength\':6,\'configurable\':false,\'required\':true},\'provider\':{\'type\':\'string\',\'configurable\':false},\'password\':{\'type\':\'password\',\'minLength\':6,\'configurable\':false,\'private\':true,\'searchable\':false},\'resetPasswordToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'confirmationToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'confirmed\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false},\'blocked\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false},\'role\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::users-permissions.role\',\'inversedBy\':\'users\',\'configurable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::users-permissions.user\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'up_users\'}}},\'config\':{\'attributes\':{\'resetPasswordToken\':{\'hidden\':true},\'confirmationToken\':{\'hidden\':true},\'provider\':{\'hidden\':true}}},\'plugin\':\'users-permissions\',\'globalId\':\'UsersPermissionsUser\',\'uid\':\'plugin::users-permissions.user\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'up_users\',\'info\':{\'name\':\'user\',\'description\':\'\',\'singularName\':\'user\',\'pluralName\':\'users\',\'displayName\':\'User\'},\'options\':{\'timestamps\':true},\'attributes\':{\'username\':{\'type\':\'string\',\'minLength\':3,\'unique\':true,\'configurable\':false,\'required\':true},\'email\':{\'type\':\'email\',\'minLength\':6,\'configurable\':false,\'required\':true},\'provider\':{\'type\':\'string\',\'configurable\':false},\'password\':{\'type\':\'password\',\'minLength\':6,\'configurable\':false,\'private\':true,\'searchable\':false},\'resetPasswordToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'confirmationToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'confirmed\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false},\'blocked\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false},\'role\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'plugin::users-permissions.role\',\'inversedBy\':\'users\',\'configurable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'user\'},\'plugin::tree-menus.menu\':{\'kind\':\'collectionType\',\'collectionName\':\'menus\',\'info\':{\'name\':\'Menu\',\'singularName\':\'menu\',\'pluralName\':\'menus\',\'displayName\':\'Menu\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'content-manager\':{\'visible\':true},\'content-type-builder\':{\'visible\':true},\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'pluginOptions\':{\'i18n\':{\'localized\':false}},\'type\':\'string\',\'required\':true,\'maxLength\':100,\'configurable\':false},\'slug\':{\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'type\':\'uid\',\'targetField\':\'title\',\'required\':true,\'configurable\':false},\'items\':{\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'type\':\'json\',\'options\':{\'schemas\':\'{\\n  \\\'attributes\\\': [\\n    {\\n      \\\'id\\\': \\\'title\\\',\\n      \\\'label\\\': \\\'Title\\\',\\n      \\\'placeholder\\\': \\\'Enter item title\\\',\\n      \\\'type\\\': \\\'text\\\',\\n      \\\'validationType\\\': \\\'string\\\',\\n      \\\'value\\\': \\\'New items\\\',\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'required\\\',\\n          \\\'params\\\': [\\n            \\\'this field is required\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'max\\\',\\n          \\\'params\\\': [\\n            100,\\n            \\\'Title cannot be more than 100 characters\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            \\\'New items\\\'\\n          ]\\n        }\\n      ]\\n    },\\n    {\\n      \\\'id\\\': \\\'url\\\',\\n      \\\'label\\\': \\\'Url\\\',\\n      \\\'placeholder\\\': \\\'Enter url\\\',\\n      \\\'type\\\': \\\'text\\\',\\n      \\\'validationType\\\': \\\'string\\\',\\n      \\\'value\\\': \\\'/\\\',\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'required\\\',\\n          \\\'params\\\': [\\n            \\\'this field is required\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'max\\\',\\n          \\\'params\\\': [\\n            200,\\n            \\\'Url cannot be more than 200 characters\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            \\\'/\\\'\\n          ]\\n        }\\n      ]\\n    },\\n    {\\n      \\\'id\\\': \\\'target\\\',\\n      \\\'label\\\': \\\'Target\\\',\\n      \\\'placeholder\\\': \\\'Enter target\\\',\\n      \\\'type\\\': \\\'select\\\',\\n      \\\'validationType\\\': \\\'mixed\\\',\\n      \\\'value\\\': \\\'_self\\\',\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'oneOf\\\',\\n          \\\'params\\\': [\\n            [\\n              \\\'_blank\\\',\\n              \\\'_parent\\\',\\n              \\\'_self\\\',\\n              \\\'_top\\\'\\n            ],\\n            \\\'this field needs to be one of the following: _blank, _parent, _self, _top\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            \\\'_self\\\'\\n          ]\\n        }\\n      ],\\n      \\\'options\\\': [\\n        {\\n          \\\'key\\\': \\\'_blank\\\',\\n          \\\'value\\\': \\\'_blank\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._blank\\\',\\n              \\\'defaultMessage\\\': \\\'New window (_blank)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        },\\n        {\\n          \\\'key\\\': \\\'_parent\\\',\\n          \\\'value\\\': \\\'_parent\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._parent\\\',\\n              \\\'defaultMessage\\\': \\\'Parent window (_parent)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        },\\n        {\\n          \\\'key\\\': \\\'_self\\\',\\n          \\\'value\\\': \\\'_self\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._self\\\',\\n              \\\'defaultMessage\\\': \\\'Same window (_self)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        },\\n        {\\n          \\\'key\\\': \\\'_top\\\',\\n          \\\'value\\\': \\\'_top\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._top\\\',\\n              \\\'defaultMessage\\\': \\\'Top window (_top)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        }\\n      ]\\n    },\\n    {\\n      \\\'id\\\': \\\'isProtected\\\',\\n      \\\'label\\\': \\\'isProtected\\\',\\n      \\\'placeholder\\\': \\\'Choose isProtected\\\',\\n      \\\'type\\\': \\\'bool\\\',\\n      \\\'validationType\\\': \\\'boolean\\\',\\n      \\\'value\\\': false,\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'required\\\',\\n          \\\'params\\\': [\\n            \\\'Need to choose isProtected\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            false\\n          ]\\n        }\\n      ]\\n    }\\n  ]\\n}\'},\'required\':true,\'customField\':\'plugin::tree-menus.tree\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':false,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'plugin::tree-menus.menu\',\'writable\':false,\'private\':false,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'menus\'}}},\'plugin\':\'tree-menus\',\'globalId\':\'TreeMenusMenu\',\'uid\':\'plugin::tree-menus.menu\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'menus\',\'info\':{\'name\':\'Menu\',\'singularName\':\'menu\',\'pluralName\':\'menus\',\'displayName\':\'Menu\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'content-manager\':{\'visible\':true},\'content-type-builder\':{\'visible\':true},\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'pluginOptions\':{\'i18n\':{\'localized\':false}},\'type\':\'string\',\'required\':true,\'maxLength\':100,\'configurable\':false},\'slug\':{\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'type\':\'uid\',\'targetField\':\'title\',\'required\':true,\'configurable\':false},\'items\':{\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'type\':\'customField\',\'options\':{\'schemas\':\'{\\n  \\\'attributes\\\': [\\n    {\\n      \\\'id\\\': \\\'title\\\',\\n      \\\'label\\\': \\\'Title\\\',\\n      \\\'placeholder\\\': \\\'Enter item title\\\',\\n      \\\'type\\\': \\\'text\\\',\\n      \\\'validationType\\\': \\\'string\\\',\\n      \\\'value\\\': \\\'New items\\\',\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'required\\\',\\n          \\\'params\\\': [\\n            \\\'this field is required\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'max\\\',\\n          \\\'params\\\': [\\n            100,\\n            \\\'Title cannot be more than 100 characters\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            \\\'New items\\\'\\n          ]\\n        }\\n      ]\\n    },\\n    {\\n      \\\'id\\\': \\\'url\\\',\\n      \\\'label\\\': \\\'Url\\\',\\n      \\\'placeholder\\\': \\\'Enter url\\\',\\n      \\\'type\\\': \\\'text\\\',\\n      \\\'validationType\\\': \\\'string\\\',\\n      \\\'value\\\': \\\'/\\\',\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'required\\\',\\n          \\\'params\\\': [\\n            \\\'this field is required\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'max\\\',\\n          \\\'params\\\': [\\n            200,\\n            \\\'Url cannot be more than 200 characters\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            \\\'/\\\'\\n          ]\\n        }\\n      ]\\n    },\\n    {\\n      \\\'id\\\': \\\'target\\\',\\n      \\\'label\\\': \\\'Target\\\',\\n      \\\'placeholder\\\': \\\'Enter target\\\',\\n      \\\'type\\\': \\\'select\\\',\\n      \\\'validationType\\\': \\\'mixed\\\',\\n      \\\'value\\\': \\\'_self\\\',\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'oneOf\\\',\\n          \\\'params\\\': [\\n            [\\n              \\\'_blank\\\',\\n              \\\'_parent\\\',\\n              \\\'_self\\\',\\n              \\\'_top\\\'\\n            ],\\n            \\\'this field needs to be one of the following: _blank, _parent, _self, _top\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            \\\'_self\\\'\\n          ]\\n        }\\n      ],\\n      \\\'options\\\': [\\n        {\\n          \\\'key\\\': \\\'_blank\\\',\\n          \\\'value\\\': \\\'_blank\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._blank\\\',\\n              \\\'defaultMessage\\\': \\\'New window (_blank)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        },\\n        {\\n          \\\'key\\\': \\\'_parent\\\',\\n          \\\'value\\\': \\\'_parent\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._parent\\\',\\n              \\\'defaultMessage\\\': \\\'Parent window (_parent)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        },\\n        {\\n          \\\'key\\\': \\\'_self\\\',\\n          \\\'value\\\': \\\'_self\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._self\\\',\\n              \\\'defaultMessage\\\': \\\'Same window (_self)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        },\\n        {\\n          \\\'key\\\': \\\'_top\\\',\\n          \\\'value\\\': \\\'_top\\\',\\n          \\\'metadatas\\\': {\\n            \\\'intlLabel\\\': {\\n              \\\'id\\\': \\\'tree-menus.target.options._top\\\',\\n              \\\'defaultMessage\\\': \\\'Top window (_top)\\\'\\n            },\\n            \\\'disabled\\\': false,\\n            \\\'hidden\\\': false\\n          }\\n        }\\n      ]\\n    },\\n    {\\n      \\\'id\\\': \\\'isProtected\\\',\\n      \\\'label\\\': \\\'isProtected\\\',\\n      \\\'placeholder\\\': \\\'Choose isProtected\\\',\\n      \\\'type\\\': \\\'bool\\\',\\n      \\\'validationType\\\': \\\'boolean\\\',\\n      \\\'value\\\': false,\\n      \\\'required\\\': true,\\n      \\\'validations\\\': [\\n        {\\n          \\\'type\\\': \\\'required\\\',\\n          \\\'params\\\': [\\n            \\\'Need to choose isProtected\\\'\\n          ]\\n        },\\n        {\\n          \\\'type\\\': \\\'default\\\',\\n          \\\'params\\\': [\\n            false\\n          ]\\n        }\\n      ]\\n    }\\n  ]\\n}\'},\'required\':true,\'customField\':\'plugin::tree-menus.tree\'}},\'kind\':\'collectionType\'},\'modelName\':\'menu\'},\'api::about-us.about-us\':{\'kind\':\'collectionType\',\'collectionName\':\'about_uses\',\'info\':{\'singularName\':\'about-us\',\'pluralName\':\'about-uses\',\'displayName\':\'Giới thiệu\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'type\':\'string\',\'required\':true,\'pluginOptions\':{\'i18n\':{\'localized\':true}}},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\',\'required\':true},\'content\':{\'type\':\'richtext\',\'options\':{\'preset\':\'defaultMarkdown\'},\'customField\':\'plugin::ckeditor5.CKEditor\'},\'dynamic_content\':{\'type\':\'dynamiczone\',\'components\':[\'shared.slider\',\'shared.rich-text\',\'shared.media\'],\'pluginOptions\':{\'i18n\':{\'localized\':false}}},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':false,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::about-us.about-us\',\'writable\':false,\'private\':false,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'about_uses\'}}},\'apiName\':\'about-us\',\'globalId\':\'AboutUs\',\'uid\':\'api::about-us.about-us\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'about_uses\',\'info\':{\'singularName\':\'about-us\',\'pluralName\':\'about-uses\',\'displayName\':\'Giới thiệu\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'type\':\'string\',\'required\':true,\'pluginOptions\':{\'i18n\':{\'localized\':true}}},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\',\'required\':true},\'content\':{\'type\':\'customField\',\'options\':{\'preset\':\'defaultMarkdown\'},\'customField\':\'plugin::ckeditor5.CKEditor\'},\'dynamic_content\':{\'type\':\'dynamiczone\',\'components\':[\'shared.slider\',\'shared.rich-text\',\'shared.media\'],\'pluginOptions\':{\'i18n\':{\'localized\':false}}}},\'kind\':\'collectionType\'},\'modelName\':\'about-us\',\'actions\':{},\'lifecycles\':{}},\'api::article.article\':{\'kind\':\'collectionType\',\'collectionName\':\'articles\',\'info\':{\'singularName\':\'article\',\'pluralName\':\'articles\',\'displayName\':\'Dự án tiêu biểu\',\'description\':\'Create your blog content\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{},\'attributes\':{\'title\':{\'type\':\'string\'},\'description\':{\'type\':\'text\',\'maxLength\':80},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\'},\'cover\':{\'type\':\'media\',\'multiple\':false,\'required\':false,\'allowedTypes\':[\'images\',\'files\',\'videos\']},\'blocks\':{\'type\':\'dynamiczone\',\'components\':[\'shared.media\',\'shared.quote\',\'shared.rich-text\',\'shared.slider\']},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::article.article\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'articles\'}}},\'apiName\':\'article\',\'globalId\':\'Article\',\'uid\':\'api::article.article\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'articles\',\'info\':{\'singularName\':\'article\',\'pluralName\':\'articles\',\'displayName\':\'Dự án tiêu biểu\',\'description\':\'Create your blog content\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{},\'attributes\':{\'title\':{\'type\':\'string\'},\'description\':{\'type\':\'text\',\'maxLength\':80},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\'},\'cover\':{\'type\':\'media\',\'multiple\':false,\'required\':false,\'allowedTypes\':[\'images\',\'files\',\'videos\']},\'blocks\':{\'type\':\'dynamiczone\',\'components\':[\'shared.media\',\'shared.quote\',\'shared.rich-text\',\'shared.slider\']}},\'kind\':\'collectionType\'},\'modelName\':\'article\',\'actions\':{},\'lifecycles\':{}},\'api::bao-gia-and-tu-van.bao-gia-and-tu-van\':{\'kind\':\'collectionType\',\'collectionName\':\'bao_gia_and_tu_vans\',\'info\':{\'singularName\':\'bao-gia-and-tu-van\',\'pluralName\':\'bao-gia-and-tu-vans\',\'displayName\':\'Báo giá & tư vấn\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'customer_name\':{\'type\':\'string\',\'required\':true},\'customer_phone\':{\'type\':\'string\',\'required\':true},\'content\':{\'type\':\'richtext\',\'required\':true},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::bao-gia-and-tu-van.bao-gia-and-tu-van\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'bao_gia_and_tu_vans\'}}},\'apiName\':\'bao-gia-and-tu-van\',\'globalId\':\'BaoGiaAndTuVan\',\'uid\':\'api::bao-gia-and-tu-van.bao-gia-and-tu-van\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'bao_gia_and_tu_vans\',\'info\':{\'singularName\':\'bao-gia-and-tu-van\',\'pluralName\':\'bao-gia-and-tu-vans\',\'displayName\':\'Báo giá & tư vấn\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'customer_name\':{\'type\':\'string\',\'required\':true},\'customer_phone\':{\'type\':\'string\',\'required\':true},\'content\':{\'type\':\'richtext\',\'required\':true}},\'kind\':\'collectionType\'},\'modelName\':\'bao-gia-and-tu-van\',\'actions\':{},\'lifecycles\':{}},\'api::contact.contact\':{\'kind\':\'singleType\',\'collectionName\':\'contacts\',\'info\':{\'singularName\':\'contact\',\'pluralName\':\'contacts\',\'displayName\':\'Contact\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'name\':{\'type\':\'string\',\'required\':true},\'address\':{\'type\':\'string\',\'required\':true},\'phone\':{\'type\':\'string\'},\'tax_code\':{\'type\':\'string\',\'required\':true},\'email\':{\'type\':\'email\',\'required\':true},\'image\':{\'allowedTypes\':[\'images\',\'files\',\'videos\',\'audios\'],\'type\':\'media\',\'multiple\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':false,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::contact.contact\',\'writable\':false,\'private\':false,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'contacts\'}}},\'apiName\':\'contact\',\'globalId\':\'Contact\',\'uid\':\'api::contact.contact\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'contacts\',\'info\':{\'singularName\':\'contact\',\'pluralName\':\'contacts\',\'displayName\':\'Contact\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'name\':{\'type\':\'string\',\'required\':true},\'address\':{\'type\':\'string\',\'required\':true},\'phone\':{\'type\':\'string\'},\'tax_code\':{\'type\':\'string\',\'required\':true},\'email\':{\'type\':\'email\',\'required\':true},\'image\':{\'allowedTypes\':[\'images\',\'files\',\'videos\',\'audios\'],\'type\':\'media\',\'multiple\':false}},\'kind\':\'singleType\'},\'modelName\':\'contact\',\'actions\':{},\'lifecycles\':{}},\'api::global.global\':{\'kind\':\'singleType\',\'collectionName\':\'globals\',\'info\':{\'singularName\':\'global\',\'pluralName\':\'globals\',\'displayName\':\'Global\',\'description\':\'Define global settings\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{},\'attributes\':{\'siteName\':{\'type\':\'string\',\'required\':true},\'favicon\':{\'type\':\'media\',\'multiple\':false,\'required\':false,\'allowedTypes\':[\'images\',\'files\',\'videos\']},\'siteDescription\':{\'type\':\'text\',\'required\':true},\'defaultSeo\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.seo\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::global.global\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'globals\'}}},\'apiName\':\'global\',\'globalId\':\'Global\',\'uid\':\'api::global.global\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'globals\',\'info\':{\'singularName\':\'global\',\'pluralName\':\'globals\',\'displayName\':\'Global\',\'description\':\'Define global settings\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{},\'attributes\':{\'siteName\':{\'type\':\'string\',\'required\':true},\'favicon\':{\'type\':\'media\',\'multiple\':false,\'required\':false,\'allowedTypes\':[\'images\',\'files\',\'videos\']},\'siteDescription\':{\'type\':\'text\',\'required\':true},\'defaultSeo\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.seo\'}},\'kind\':\'singleType\'},\'modelName\':\'global\',\'actions\':{},\'lifecycles\':{}},\'api::home-page-content.home-page-content\':{\'kind\':\'singleType\',\'collectionName\':\'home_page_contents\',\'info\':{\'singularName\':\'home-page-content\',\'pluralName\':\'home-page-contents\',\'displayName\':\'HomePage Content\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'partner\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'service\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'aboutus\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'news\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'company_achievement\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.rich-text\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::home-page-content.home-page-content\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'home_page_contents\'}}},\'apiName\':\'home-page-content\',\'globalId\':\'HomePageContent\',\'uid\':\'api::home-page-content.home-page-content\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'home_page_contents\',\'info\':{\'singularName\':\'home-page-content\',\'pluralName\':\'home-page-contents\',\'displayName\':\'HomePage Content\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'partner\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'service\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'aboutus\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'news\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.article\'},\'company_achievement\':{\'type\':\'component\',\'repeatable\':false,\'component\':\'shared.rich-text\'}},\'kind\':\'singleType\'},\'modelName\':\'home-page-content\',\'actions\':{},\'lifecycles\':{}},\'api::khach-hang.khach-hang\':{\'kind\':\'collectionType\',\'collectionName\':\'khach_hangs\',\'info\':{\'singularName\':\'khach-hang\',\'pluralName\':\'khach-hangs\',\'displayName\':\'Khách hàng\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'title\':{\'type\':\'string\',\'required\':true},\'logo\':{\'type\':\'media\',\'multiple\':false,\'required\':true,\'allowedTypes\':[\'images\',\'files\']},\'website\':{\'type\':\'string\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::khach-hang.khach-hang\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'khach_hangs\'}}},\'apiName\':\'khach-hang\',\'globalId\':\'KhachHang\',\'uid\':\'api::khach-hang.khach-hang\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'khach_hangs\',\'info\':{\'singularName\':\'khach-hang\',\'pluralName\':\'khach-hangs\',\'displayName\':\'Khách hàng\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'title\':{\'type\':\'string\',\'required\':true},\'logo\':{\'type\':\'media\',\'multiple\':false,\'required\':true,\'allowedTypes\':[\'images\',\'files\']},\'website\':{\'type\':\'string\'}},\'kind\':\'collectionType\'},\'modelName\':\'khach-hang\',\'actions\':{},\'lifecycles\':{}},\'api::new.new\':{\'kind\':\'collectionType\',\'collectionName\':\'news\',\'info\':{\'singularName\':\'new\',\'pluralName\':\'news\',\'displayName\':\'New\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'title\':{\'type\':\'string\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::new.new\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'news\'}}},\'apiName\':\'new\',\'globalId\':\'New\',\'uid\':\'api::new.new\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'news\',\'info\':{\'singularName\':\'new\',\'pluralName\':\'news\',\'displayName\':\'New\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'title\':{\'type\':\'string\'}},\'kind\':\'collectionType\'},\'modelName\':\'new\',\'actions\':{},\'lifecycles\':{}},\'api::product.product\':{\'kind\':\'collectionType\',\'collectionName\':\'products\',\'info\':{\'singularName\':\'product\',\'pluralName\':\'products\',\'displayName\':\'Sản phẩm\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'type\':\'string\',\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'required\':true},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\',\'required\':true},\'description\':{\'type\':\'richtext\',\'required\':true,\'pluginOptions\':{\'i18n\':{\'localized\':true}}},\'image\':{\'type\':\'media\',\'multiple\':false,\'required\':true,\'allowedTypes\':[\'images\',\'files\',\'videos\',\'audios\']},\'service\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'api::service.service\',\'inversedBy\':\'products\'},\'dynamic_content\':{\'type\':\'dynamiczone\',\'components\':[\'shared.slider\',\'shared.rich-text\',\'shared.quote\',\'shared.media\',\'shared.seo\']},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':false,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::product.product\',\'writable\':false,\'private\':false,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'products\'}}},\'apiName\':\'product\',\'globalId\':\'Product\',\'uid\':\'api::product.product\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'products\',\'info\':{\'singularName\':\'product\',\'pluralName\':\'products\',\'displayName\':\'Sản phẩm\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'type\':\'string\',\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'required\':true},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\',\'required\':true},\'description\':{\'type\':\'richtext\',\'required\':true,\'pluginOptions\':{\'i18n\':{\'localized\':true}}},\'image\':{\'type\':\'media\',\'multiple\':false,\'required\':true,\'allowedTypes\':[\'images\',\'files\',\'videos\',\'audios\']},\'service\':{\'type\':\'relation\',\'relation\':\'manyToOne\',\'target\':\'api::service.service\',\'inversedBy\':\'products\'},\'dynamic_content\':{\'type\':\'dynamiczone\',\'components\':[\'shared.slider\',\'shared.rich-text\',\'shared.quote\',\'shared.media\',\'shared.seo\']}},\'kind\':\'collectionType\'},\'modelName\':\'product\',\'actions\':{},\'lifecycles\':{}},\'api::service.service\':{\'kind\':\'collectionType\',\'collectionName\':\'services\',\'info\':{\'singularName\':\'service\',\'pluralName\':\'services\',\'displayName\':\'Dịch vụ\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'type\':\'string\',\'required\':true,\'pluginOptions\':{\'i18n\':{\'localized\':true}}},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\',\'required\':true},\'image\':{\'type\':\'media\',\'multiple\':false,\'required\':false,\'allowedTypes\':[\'images\',\'files\',\'videos\',\'audios\']},\'content\':{\'type\':\'richtext\',\'options\':{\'preset\':\'defaultMarkdown\'},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'customField\':\'plugin::ckeditor5.CKEditor\'},\'products\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::product.product\',\'mappedBy\':\'service\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':false,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::service.service\',\'writable\':false,\'private\':false,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'services\'}}},\'apiName\':\'service\',\'globalId\':\'Service\',\'uid\':\'api::service.service\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'services\',\'info\':{\'singularName\':\'service\',\'pluralName\':\'services\',\'displayName\':\'Dịch vụ\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'attributes\':{\'title\':{\'type\':\'string\',\'required\':true,\'pluginOptions\':{\'i18n\':{\'localized\':true}}},\'slug\':{\'type\':\'uid\',\'targetField\':\'title\',\'required\':true},\'image\':{\'type\':\'media\',\'multiple\':false,\'required\':false,\'allowedTypes\':[\'images\',\'files\',\'videos\',\'audios\']},\'content\':{\'type\':\'customField\',\'options\':{\'preset\':\'defaultMarkdown\'},\'pluginOptions\':{\'i18n\':{\'localized\':true}},\'customField\':\'plugin::ckeditor5.CKEditor\'},\'products\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::product.product\',\'mappedBy\':\'service\'}},\'kind\':\'collectionType\'},\'modelName\':\'service\',\'actions\':{},\'lifecycles\':{}},\'api::slide.slide\':{\'kind\':\'collectionType\',\'collectionName\':\'slides\',\'info\':{\'singularName\':\'slide\',\'pluralName\':\'slides\',\'displayName\':\'Slide\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'image\':{\'type\':\'media\',\'multiple\':false,\'required\':true,\'allowedTypes\':[\'images\',\'files\']},\'content\':{\'type\':\'richtext\',\'options\':{\'preset\':\'defaultHtml\'},\'customField\':\'plugin::ckeditor5.CKEditor\'},\'position\':{\'type\':\'json\',\'default\':\'['center']\',\'options\':[\'left\',\'right\',\'center\'],\'customField\':\'plugin::multi-select.multi-select\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'api::slide.slide\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'slides\'}}},\'apiName\':\'slide\',\'globalId\':\'Slide\',\'uid\':\'api::slide.slide\',\'modelType\':\'contentType\',\'__schema__\':{\'collectionName\':\'slides\',\'info\':{\'singularName\':\'slide\',\'pluralName\':\'slides\',\'displayName\':\'Slide\',\'description\':\'\'},\'options\':{\'draftAndPublish\':true},\'attributes\':{\'image\':{\'type\':\'media\',\'multiple\':false,\'required\':true,\'allowedTypes\':[\'images\',\'files\']},\'content\':{\'type\':\'customField\',\'options\':{\'preset\':\'defaultHtml\'},\'customField\':\'plugin::ckeditor5.CKEditor\'},\'position\':{\'type\':\'customField\',\'default\':\'['center']\',\'options\':[\'left\',\'right\',\'center\'],\'customField\':\'plugin::multi-select.multi-select\'}},\'kind\':\'collectionType\'},\'modelName\':\'slide\',\'actions\':{},\'lifecycles\':{}},\'admin::permission\':{\'collectionName\':\'admin_permissions\',\'info\':{\'name\':\'Permission\',\'description\':\'\',\'singularName\':\'permission\',\'pluralName\':\'permissions\',\'displayName\':\'Permission\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'actionParameters\':{\'type\':\'json\',\'configurable\':false,\'required\':false,\'default\':{}},\'subject\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':false},\'properties\':{\'type\':\'json\',\'configurable\':false,\'required\':false,\'default\':{}},\'conditions\':{\'type\':\'json\',\'configurable\':false,\'required\':false,\'default\':[]},\'role\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToOne\',\'inversedBy\':\'permissions\',\'target\':\'admin::role\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::permission\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'admin_permissions\'}}},\'plugin\':\'admin\',\'globalId\':\'AdminPermission\',\'uid\':\'admin::permission\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'admin_permissions\',\'info\':{\'name\':\'Permission\',\'description\':\'\',\'singularName\':\'permission\',\'pluralName\':\'permissions\',\'displayName\':\'Permission\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'actionParameters\':{\'type\':\'json\',\'configurable\':false,\'required\':false,\'default\':{}},\'subject\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':false},\'properties\':{\'type\':\'json\',\'configurable\':false,\'required\':false,\'default\':{}},\'conditions\':{\'type\':\'json\',\'configurable\':false,\'required\':false,\'default\':[]},\'role\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToOne\',\'inversedBy\':\'permissions\',\'target\':\'admin::role\'}},\'kind\':\'collectionType\'},\'modelName\':\'permission\'},\'admin::user\':{\'collectionName\':\'admin_users\',\'info\':{\'name\':\'User\',\'description\':\'\',\'singularName\':\'user\',\'pluralName\':\'users\',\'displayName\':\'User\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'firstname\':{\'type\':\'string\',\'unique\':false,\'minLength\':1,\'configurable\':false,\'required\':false},\'lastname\':{\'type\':\'string\',\'unique\':false,\'minLength\':1,\'configurable\':false,\'required\':false},\'username\':{\'type\':\'string\',\'unique\':false,\'configurable\':false,\'required\':false},\'email\':{\'type\':\'email\',\'minLength\':6,\'configurable\':false,\'required\':true,\'unique\':true,\'private\':true},\'password\':{\'type\':\'password\',\'minLength\':6,\'configurable\':false,\'required\':false,\'private\':true,\'searchable\':false},\'resetPasswordToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'registrationToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'isActive\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false,\'private\':true},\'roles\':{\'configurable\':false,\'private\':true,\'type\':\'relation\',\'relation\':\'manyToMany\',\'inversedBy\':\'users\',\'target\':\'admin::role\',\'collectionName\':\'strapi_users_roles\'},\'blocked\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false,\'private\':true},\'preferedLanguage\':{\'type\':\'string\',\'configurable\':false,\'required\':false,\'searchable\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::user\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'admin_users\'}}},\'config\':{\'attributes\':{\'resetPasswordToken\':{\'hidden\':true},\'registrationToken\':{\'hidden\':true}}},\'plugin\':\'admin\',\'globalId\':\'AdminUser\',\'uid\':\'admin::user\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'admin_users\',\'info\':{\'name\':\'User\',\'description\':\'\',\'singularName\':\'user\',\'pluralName\':\'users\',\'displayName\':\'User\'},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'firstname\':{\'type\':\'string\',\'unique\':false,\'minLength\':1,\'configurable\':false,\'required\':false},\'lastname\':{\'type\':\'string\',\'unique\':false,\'minLength\':1,\'configurable\':false,\'required\':false},\'username\':{\'type\':\'string\',\'unique\':false,\'configurable\':false,\'required\':false},\'email\':{\'type\':\'email\',\'minLength\':6,\'configurable\':false,\'required\':true,\'unique\':true,\'private\':true},\'password\':{\'type\':\'password\',\'minLength\':6,\'configurable\':false,\'required\':false,\'private\':true,\'searchable\':false},\'resetPasswordToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'registrationToken\':{\'type\':\'string\',\'configurable\':false,\'private\':true,\'searchable\':false},\'isActive\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false,\'private\':true},\'roles\':{\'configurable\':false,\'private\':true,\'type\':\'relation\',\'relation\':\'manyToMany\',\'inversedBy\':\'users\',\'target\':\'admin::role\',\'collectionName\':\'strapi_users_roles\'},\'blocked\':{\'type\':\'boolean\',\'default\':false,\'configurable\':false,\'private\':true},\'preferedLanguage\':{\'type\':\'string\',\'configurable\':false,\'required\':false,\'searchable\':false}},\'kind\':\'collectionType\'},\'modelName\':\'user\',\'options\':{\'draftAndPublish\':false}},\'admin::role\':{\'collectionName\':\'admin_roles\',\'info\':{\'name\':\'Role\',\'description\':\'\',\'singularName\':\'role\',\'pluralName\':\'roles\',\'displayName\':\'Role\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'unique\':true,\'configurable\':false,\'required\':true},\'code\':{\'type\':\'string\',\'minLength\':1,\'unique\':true,\'configurable\':false,\'required\':true},\'description\':{\'type\':\'string\',\'configurable\':false},\'users\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToMany\',\'mappedBy\':\'roles\',\'target\':\'admin::user\'},\'permissions\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'oneToMany\',\'mappedBy\':\'role\',\'target\':\'admin::permission\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::role\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'admin_roles\'}}},\'plugin\':\'admin\',\'globalId\':\'AdminRole\',\'uid\':\'admin::role\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'admin_roles\',\'info\':{\'name\':\'Role\',\'description\':\'\',\'singularName\':\'role\',\'pluralName\':\'roles\',\'displayName\':\'Role\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'unique\':true,\'configurable\':false,\'required\':true},\'code\':{\'type\':\'string\',\'minLength\':1,\'unique\':true,\'configurable\':false,\'required\':true},\'description\':{\'type\':\'string\',\'configurable\':false},\'users\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToMany\',\'mappedBy\':\'roles\',\'target\':\'admin::user\'},\'permissions\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'oneToMany\',\'mappedBy\':\'role\',\'target\':\'admin::permission\'}},\'kind\':\'collectionType\'},\'modelName\':\'role\'},\'admin::api-token\':{\'collectionName\':\'strapi_api_tokens\',\'info\':{\'name\':\'Api Token\',\'singularName\':\'api-token\',\'pluralName\':\'api-tokens\',\'displayName\':\'Api Token\',\'description\':\'\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true,\'unique\':true},\'description\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':false,\'default\':\'\'},\'type\':{\'type\':\'enumeration\',\'enum\':[\'read-only\',\'full-access\',\'custom\'],\'configurable\':false,\'required\':true,\'default\':\'read-only\'},\'accessKey\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true,\'searchable\':false},\'encryptedKey\':{\'type\':\'text\',\'minLength\':1,\'configurable\':false,\'required\':false,\'searchable\':false},\'lastUsedAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'permissions\':{\'type\':\'relation\',\'target\':\'admin::api-token-permission\',\'relation\':\'oneToMany\',\'mappedBy\':\'token\',\'configurable\':false,\'required\':false},\'expiresAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'lifespan\':{\'type\':\'biginteger\',\'configurable\':false,\'required\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::api-token\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_api_tokens\'}}},\'plugin\':\'admin\',\'globalId\':\'AdminApiToken\',\'uid\':\'admin::api-token\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_api_tokens\',\'info\':{\'name\':\'Api Token\',\'singularName\':\'api-token\',\'pluralName\':\'api-tokens\',\'displayName\':\'Api Token\',\'description\':\'\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true,\'unique\':true},\'description\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':false,\'default\':\'\'},\'type\':{\'type\':\'enumeration\',\'enum\':[\'read-only\',\'full-access\',\'custom\'],\'configurable\':false,\'required\':true,\'default\':\'read-only\'},\'accessKey\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true,\'searchable\':false},\'encryptedKey\':{\'type\':\'text\',\'minLength\':1,\'configurable\':false,\'required\':false,\'searchable\':false},\'lastUsedAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'permissions\':{\'type\':\'relation\',\'target\':\'admin::api-token-permission\',\'relation\':\'oneToMany\',\'mappedBy\':\'token\',\'configurable\':false,\'required\':false},\'expiresAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'lifespan\':{\'type\':\'biginteger\',\'configurable\':false,\'required\':false}},\'kind\':\'collectionType\'},\'modelName\':\'api-token\'},\'admin::api-token-permission\':{\'collectionName\':\'strapi_api_token_permissions\',\'info\':{\'name\':\'API Token Permission\',\'description\':\'\',\'singularName\':\'api-token-permission\',\'pluralName\':\'api-token-permissions\',\'displayName\':\'API Token Permission\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'token\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToOne\',\'inversedBy\':\'permissions\',\'target\':\'admin::api-token\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::api-token-permission\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_api_token_permissions\'}}},\'plugin\':\'admin\',\'globalId\':\'AdminApiTokenPermission\',\'uid\':\'admin::api-token-permission\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_api_token_permissions\',\'info\':{\'name\':\'API Token Permission\',\'description\':\'\',\'singularName\':\'api-token-permission\',\'pluralName\':\'api-token-permissions\',\'displayName\':\'API Token Permission\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'token\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToOne\',\'inversedBy\':\'permissions\',\'target\':\'admin::api-token\'}},\'kind\':\'collectionType\'},\'modelName\':\'api-token-permission\'},\'admin::transfer-token\':{\'collectionName\':\'strapi_transfer_tokens\',\'info\':{\'name\':\'Transfer Token\',\'singularName\':\'transfer-token\',\'pluralName\':\'transfer-tokens\',\'displayName\':\'Transfer Token\',\'description\':\'\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true,\'unique\':true},\'description\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':false,\'default\':\'\'},\'accessKey\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'lastUsedAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'permissions\':{\'type\':\'relation\',\'target\':\'admin::transfer-token-permission\',\'relation\':\'oneToMany\',\'mappedBy\':\'token\',\'configurable\':false,\'required\':false},\'expiresAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'lifespan\':{\'type\':\'biginteger\',\'configurable\':false,\'required\':false},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::transfer-token\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_transfer_tokens\'}}},\'plugin\':\'admin\',\'globalId\':\'AdminTransferToken\',\'uid\':\'admin::transfer-token\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_transfer_tokens\',\'info\':{\'name\':\'Transfer Token\',\'singularName\':\'transfer-token\',\'pluralName\':\'transfer-tokens\',\'displayName\':\'Transfer Token\',\'description\':\'\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'name\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true,\'unique\':true},\'description\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':false,\'default\':\'\'},\'accessKey\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'lastUsedAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'permissions\':{\'type\':\'relation\',\'target\':\'admin::transfer-token-permission\',\'relation\':\'oneToMany\',\'mappedBy\':\'token\',\'configurable\':false,\'required\':false},\'expiresAt\':{\'type\':\'datetime\',\'configurable\':false,\'required\':false},\'lifespan\':{\'type\':\'biginteger\',\'configurable\':false,\'required\':false}},\'kind\':\'collectionType\'},\'modelName\':\'transfer-token\'},\'admin::transfer-token-permission\':{\'collectionName\':\'strapi_transfer_token_permissions\',\'info\':{\'name\':\'Transfer Token Permission\',\'description\':\'\',\'singularName\':\'transfer-token-permission\',\'pluralName\':\'transfer-token-permissions\',\'displayName\':\'Transfer Token Permission\'},\'options\':{\'draftAndPublish\':false},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'token\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToOne\',\'inversedBy\':\'permissions\',\'target\':\'admin::transfer-token\'},\'createdAt\':{\'type\':\'datetime\'},\'updatedAt\':{\'type\':\'datetime\'},\'publishedAt\':{\'type\':\'datetime\',\'configurable\':false,\'writable\':true,\'visible\':false},\'createdBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'updatedBy\':{\'type\':\'relation\',\'relation\':\'oneToOne\',\'target\':\'admin::user\',\'configurable\':false,\'writable\':false,\'visible\':false,\'useJoinTable\':false,\'private\':true},\'locale\':{\'writable\':true,\'private\':true,\'configurable\':false,\'visible\':false,\'type\':\'string\'},\'localizations\':{\'type\':\'relation\',\'relation\':\'oneToMany\',\'target\':\'admin::transfer-token-permission\',\'writable\':false,\'private\':true,\'configurable\':false,\'visible\':false,\'unstable_virtual\':true,\'joinColumn\':{\'name\':\'document_id\',\'referencedColumn\':\'document_id\',\'referencedTable\':\'strapi_transfer_token_permissions\'}}},\'plugin\':\'admin\',\'globalId\':\'AdminTransferTokenPermission\',\'uid\':\'admin::transfer-token-permission\',\'modelType\':\'contentType\',\'kind\':\'collectionType\',\'__schema__\':{\'collectionName\':\'strapi_transfer_token_permissions\',\'info\':{\'name\':\'Transfer Token Permission\',\'description\':\'\',\'singularName\':\'transfer-token-permission\',\'pluralName\':\'transfer-token-permissions\',\'displayName\':\'Transfer Token Permission\'},\'options\':{},\'pluginOptions\':{\'content-manager\':{\'visible\':false},\'content-type-builder\':{\'visible\':false}},\'attributes\':{\'action\':{\'type\':\'string\',\'minLength\':1,\'configurable\':false,\'required\':true},\'token\':{\'configurable\':false,\'type\':\'relation\',\'relation\':\'manyToOne\',\'inversedBy\':\'permissions\',\'target\':\'admin::transfer-token\'}},\'kind\':\'collectionType\'},\'modelName\':\'transfer-token-permission\'}}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 2,
        'key': 'plugin_content_manager_configuration_components::shared.slider',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'id\',\'defaultSortBy\':\'id\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':false,\'sortable\':false}},\'files\':{\'edit\':{\'label\':\'files\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'files\',\'searchable\':false,\'sortable\':false}}},\'layouts\':{\'list\':[\'id\',\'files\'],\'edit\':[[{\'name\':\'files\',\'size\':6}]]},\'uid\':\'shared.slider\',\'isComponent\':true}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 3,
        'key': 'plugin_content_manager_configuration_components::shared.rich-text',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'id\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':false,\'sortable\':false}},\'title\':{\'edit\':{\'label\':\'Tên chỉ số\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'items\':{\'edit\':{\'label\':\'items\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'items\',\'searchable\':false,\'sortable\':false}},\'description\':{\'edit\':{\'label\':\'Mô tả ngắn\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':false,\'sortable\':false}}},\'layouts\':{\'list\':[\'id\',\'title\'],\'edit\':[[{\'name\':\'title\',\'size\':12}],[{\'name\':\'description\',\'size\':12}],[{\'name\':\'items\',\'size\':12}]]},\'uid\':\'shared.rich-text\',\'isComponent\':true}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 4,
        'key': 'plugin_content_manager_configuration_components::shared.quote',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':false,\'sortable\':false}},\'title\':{\'edit\':{\'label\':\'title\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'body\':{\'edit\':{\'label\':\'body\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'body\',\'searchable\':true,\'sortable\':true}},\'media\':{\'edit\':{\'label\':\'media\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'media\',\'searchable\':false,\'sortable\':false}}},\'layouts\':{\'list\':[\'id\',\'title\',\'body\',\'media\'],\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'body\',\'size\':6}],[{\'name\':\'media\',\'size\':12}]]},\'uid\':\'shared.quote\',\'isComponent\':true}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 5,
        'key': 'plugin_content_manager_configuration_components::shared.seo',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'metaTitle\',\'defaultSortBy\':\'metaTitle\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':false,\'sortable\':false}},\'metaTitle\':{\'edit\':{\'label\':\'metaTitle\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'metaTitle\',\'searchable\':true,\'sortable\':true}},\'metaDescription\':{\'edit\':{\'label\':\'metaDescription\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'metaDescription\',\'searchable\':true,\'sortable\':true}},\'shareImage\':{\'edit\':{\'label\':\'shareImage\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'shareImage\',\'searchable\':false,\'sortable\':false}}},\'layouts\':{\'list\':[\'id\',\'metaTitle\',\'metaDescription\',\'shareImage\'],\'edit\':[[{\'name\':\'metaTitle\',\'size\':6},{\'name\':\'metaDescription\',\'size\':6}],[{\'name\':\'shareImage\',\'size\':6}]]},\'uid\':\'shared.seo\',\'isComponent\':true}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 6,
        'key': 'plugin_content_manager_configuration_components::shared.media',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'id\',\'defaultSortBy\':\'id\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':false,\'sortable\':false}},\'file\':{\'edit\':{\'label\':\'file\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'file\',\'searchable\':false,\'sortable\':false}}},\'layouts\':{\'list\':[\'id\',\'file\'],\'edit\':[[{\'name\':\'file\',\'size\':6}]]},\'uid\':\'shared.media\',\'isComponent\':true}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 7,
        'key': 'plugin_content_manager_configuration_content_types::plugin::upload.file',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'alternativeText\':{\'edit\':{\'label\':\'alternativeText\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'alternativeText\',\'searchable\':true,\'sortable\':true}},\'caption\':{\'edit\':{\'label\':\'caption\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'caption\',\'searchable\':true,\'sortable\':true}},\'width\':{\'edit\':{\'label\':\'width\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'width\',\'searchable\':true,\'sortable\':true}},\'height\':{\'edit\':{\'label\':\'height\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'height\',\'searchable\':true,\'sortable\':true}},\'formats\':{\'edit\':{\'label\':\'formats\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'formats\',\'searchable\':false,\'sortable\':false}},\'hash\':{\'edit\':{\'label\':\'hash\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'hash\',\'searchable\':true,\'sortable\':true}},\'ext\':{\'edit\':{\'label\':\'ext\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'ext\',\'searchable\':true,\'sortable\':true}},\'mime\':{\'edit\':{\'label\':\'mime\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'mime\',\'searchable\':true,\'sortable\':true}},\'size\':{\'edit\':{\'label\':\'size\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'size\',\'searchable\':true,\'sortable\':true}},\'url\':{\'edit\':{\'label\':\'url\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'url\',\'searchable\':true,\'sortable\':true}},\'previewUrl\':{\'edit\':{\'label\':\'previewUrl\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'previewUrl\',\'searchable\':true,\'sortable\':true}},\'provider\':{\'edit\':{\'label\':\'provider\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'provider\',\'searchable\':true,\'sortable\':true}},\'provider_metadata\':{\'edit\':{\'label\':\'provider_metadata\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'provider_metadata\',\'searchable\':false,\'sortable\':false}},\'folder\':{\'edit\':{\'label\':\'folder\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'folder\',\'searchable\':true,\'sortable\':true}},\'folderPath\':{\'edit\':{\'label\':\'folderPath\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'folderPath\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'alternativeText\',\'caption\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'alternativeText\',\'size\':6}],[{\'name\':\'caption\',\'size\':6},{\'name\':\'width\',\'size\':4}],[{\'name\':\'height\',\'size\':4}],[{\'name\':\'formats\',\'size\':12}],[{\'name\':\'hash\',\'size\':6},{\'name\':\'ext\',\'size\':6}],[{\'name\':\'mime\',\'size\':6},{\'name\':\'size\',\'size\':4}],[{\'name\':\'url\',\'size\':6},{\'name\':\'previewUrl\',\'size\':6}],[{\'name\':\'provider\',\'size\':6}],[{\'name\':\'provider_metadata\',\'size\':12}],[{\'name\':\'folder\',\'size\':6},{\'name\':\'folderPath\',\'size\':6}]]},\'uid\':\'plugin::upload.file\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 8,
        'key': 'plugin_content_manager_configuration_content_types::plugin::upload.folder',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'pathId\':{\'edit\':{\'label\':\'pathId\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'pathId\',\'searchable\':true,\'sortable\':true}},\'parent\':{\'edit\':{\'label\':\'parent\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'parent\',\'searchable\':true,\'sortable\':true}},\'children\':{\'edit\':{\'label\':\'children\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'children\',\'searchable\':false,\'sortable\':false}},\'files\':{\'edit\':{\'label\':\'files\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'files\',\'searchable\':false,\'sortable\':false}},\'path\':{\'edit\':{\'label\':\'path\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'path\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'pathId\',\'parent\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'pathId\',\'size\':4}],[{\'name\':\'parent\',\'size\':6},{\'name\':\'children\',\'size\':6}],[{\'name\':\'files\',\'size\':6},{\'name\':\'path\',\'size\':6}]]},\'uid\':\'plugin::upload.folder\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 9,
        'key': 'plugin_content_manager_configuration_content_types::plugin::content-releases.release',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'releasedAt\':{\'edit\':{\'label\':\'releasedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'releasedAt\',\'searchable\':true,\'sortable\':true}},\'scheduledAt\':{\'edit\':{\'label\':\'scheduledAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'scheduledAt\',\'searchable\':true,\'sortable\':true}},\'timezone\':{\'edit\':{\'label\':\'timezone\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'timezone\',\'searchable\':true,\'sortable\':true}},\'status\':{\'edit\':{\'label\':\'status\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'status\',\'searchable\':true,\'sortable\':true}},\'actions\':{\'edit\':{\'label\':\'actions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'contentType\'},\'list\':{\'label\':\'actions\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'releasedAt\',\'scheduledAt\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'releasedAt\',\'size\':6}],[{\'name\':\'scheduledAt\',\'size\':6},{\'name\':\'timezone\',\'size\':6}],[{\'name\':\'status\',\'size\':6},{\'name\':\'actions\',\'size\':6}]]},\'uid\':\'plugin::content-releases.release\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 10,
        'key': 'plugin_content_manager_configuration_content_types::plugin::i18n.locale',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'code\':{\'edit\':{\'label\':\'code\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'code\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'code\',\'createdAt\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'code\',\'size\':6}]]},\'uid\':\'plugin::i18n.locale\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 11,
        'key': 'plugin_content_manager_configuration_content_types::plugin::content-releases.release-action',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'contentType\',\'defaultSortBy\':\'contentType\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'type\':{\'edit\':{\'label\':\'type\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'type\',\'searchable\':true,\'sortable\':true}},\'contentType\':{\'edit\':{\'label\':\'contentType\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'contentType\',\'searchable\':true,\'sortable\':true}},\'entryDocumentId\':{\'edit\':{\'label\':\'entryDocumentId\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'entryDocumentId\',\'searchable\':true,\'sortable\':true}},\'release\':{\'edit\':{\'label\':\'release\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'release\',\'searchable\':true,\'sortable\':true}},\'isEntryValid\':{\'edit\':{\'label\':\'isEntryValid\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'isEntryValid\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'type\',\'contentType\',\'entryDocumentId\'],\'edit\':[[{\'name\':\'type\',\'size\':6},{\'name\':\'contentType\',\'size\':6}],[{\'name\':\'entryDocumentId\',\'size\':6},{\'name\':\'release\',\'size\':6}],[{\'name\':\'isEntryValid\',\'size\':4}]]},\'uid\':\'plugin::content-releases.release-action\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 12,
        'key': 'plugin_content_manager_configuration_content_types::plugin::review-workflows.workflow',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'stages\':{\'edit\':{\'label\':\'stages\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'stages\',\'searchable\':false,\'sortable\':false}},\'stageRequiredToPublish\':{\'edit\':{\'label\':\'stageRequiredToPublish\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'stageRequiredToPublish\',\'searchable\':true,\'sortable\':true}},\'contentTypes\':{\'edit\':{\'label\':\'contentTypes\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'contentTypes\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'stages\',\'stageRequiredToPublish\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'stages\',\'size\':6}],[{\'name\':\'stageRequiredToPublish\',\'size\':6}],[{\'name\':\'contentTypes\',\'size\':12}]]},\'uid\':\'plugin::review-workflows.workflow\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 13,
        'key': 'plugin_content_manager_configuration_content_types::plugin::review-workflows.workflow-stage',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'color\':{\'edit\':{\'label\':\'color\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'color\',\'searchable\':true,\'sortable\':true}},\'workflow\':{\'edit\':{\'label\':\'workflow\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'workflow\',\'searchable\':true,\'sortable\':true}},\'permissions\':{\'edit\':{\'label\':\'permissions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'action\'},\'list\':{\'label\':\'permissions\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'color\',\'workflow\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'color\',\'size\':6}],[{\'name\':\'workflow\',\'size\':6},{\'name\':\'permissions\',\'size\':6}]]},\'uid\':\'plugin::review-workflows.workflow-stage\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 14,
        'key': 'plugin_content_manager_configuration_content_types::plugin::users-permissions.permission',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'action\',\'defaultSortBy\':\'action\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'action\':{\'edit\':{\'label\':\'action\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'action\',\'searchable\':true,\'sortable\':true}},\'role\':{\'edit\':{\'label\':\'role\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'role\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'action\',\'role\',\'createdAt\'],\'edit\':[[{\'name\':\'action\',\'size\':6},{\'name\':\'role\',\'size\':6}]]},\'uid\':\'plugin::users-permissions.permission\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 15,
        'key': 'plugin_content_manager_configuration_content_types::plugin::users-permissions.role',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'description\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':true,\'sortable\':true}},\'type\':{\'edit\':{\'label\':\'type\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'type\',\'searchable\':true,\'sortable\':true}},\'permissions\':{\'edit\':{\'label\':\'permissions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'action\'},\'list\':{\'label\':\'permissions\',\'searchable\':false,\'sortable\':false}},\'users\':{\'edit\':{\'label\':\'users\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'username\'},\'list\':{\'label\':\'users\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'description\',\'type\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'description\',\'size\':6}],[{\'name\':\'type\',\'size\':6},{\'name\':\'permissions\',\'size\':6}],[{\'name\':\'users\',\'size\':6}]]},\'uid\':\'plugin::users-permissions.role\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 16,
        'key': 'plugin_content_manager_configuration_content_types::plugin::users-permissions.user',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'username\',\'defaultSortBy\':\'username\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'username\':{\'edit\':{\'label\':\'username\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'username\',\'searchable\':true,\'sortable\':true}},\'email\':{\'edit\':{\'label\':\'email\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'email\',\'searchable\':true,\'sortable\':true}},\'provider\':{\'edit\':{\'label\':\'provider\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'provider\',\'searchable\':true,\'sortable\':true}},\'password\':{\'edit\':{\'label\':\'password\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'password\',\'searchable\':true,\'sortable\':true}},\'resetPasswordToken\':{\'edit\':{\'label\':\'resetPasswordToken\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'resetPasswordToken\',\'searchable\':true,\'sortable\':true}},\'confirmationToken\':{\'edit\':{\'label\':\'confirmationToken\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'confirmationToken\',\'searchable\':true,\'sortable\':true}},\'confirmed\':{\'edit\':{\'label\':\'confirmed\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'confirmed\',\'searchable\':true,\'sortable\':true}},\'blocked\':{\'edit\':{\'label\':\'blocked\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'blocked\',\'searchable\':true,\'sortable\':true}},\'role\':{\'edit\':{\'label\':\'role\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'role\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'username\',\'email\',\'confirmed\'],\'edit\':[[{\'name\':\'username\',\'size\':6},{\'name\':\'email\',\'size\':6}],[{\'name\':\'password\',\'size\':6},{\'name\':\'confirmed\',\'size\':4}],[{\'name\':\'blocked\',\'size\':4},{\'name\':\'role\',\'size\':6}]]},\'uid\':\'plugin::users-permissions.user\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 18,
        'key': 'plugin_content_manager_configuration_content_types::api::article.article',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'title\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'description\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':true,\'sortable\':true}},\'slug\':{\'edit\':{\'label\':\'slug\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'slug\',\'searchable\':true,\'sortable\':true}},\'cover\':{\'edit\':{\'label\':\'cover\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'cover\',\'searchable\':false,\'sortable\':false}},\'blocks\':{\'edit\':{\'label\':\'blocks\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'blocks\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'title\',\'description\',\'slug\'],\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'description\',\'size\':6}],[{\'name\':\'slug\',\'size\':6},{\'name\':\'cover\',\'size\':6}],[{\'name\':\'blocks\',\'size\':12}]]},\'uid\':\'api::article.article\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 20,
        'key': 'plugin_content_manager_configuration_content_types::admin::user',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'firstname\',\'defaultSortBy\':\'firstname\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'firstname\':{\'edit\':{\'label\':\'firstname\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'firstname\',\'searchable\':true,\'sortable\':true}},\'lastname\':{\'edit\':{\'label\':\'lastname\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'lastname\',\'searchable\':true,\'sortable\':true}},\'username\':{\'edit\':{\'label\':\'username\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'username\',\'searchable\':true,\'sortable\':true}},\'email\':{\'edit\':{\'label\':\'email\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'email\',\'searchable\':true,\'sortable\':true}},\'password\':{\'edit\':{\'label\':\'password\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'password\',\'searchable\':true,\'sortable\':true}},\'resetPasswordToken\':{\'edit\':{\'label\':\'resetPasswordToken\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'resetPasswordToken\',\'searchable\':true,\'sortable\':true}},\'registrationToken\':{\'edit\':{\'label\':\'registrationToken\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'registrationToken\',\'searchable\':true,\'sortable\':true}},\'isActive\':{\'edit\':{\'label\':\'isActive\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'isActive\',\'searchable\':true,\'sortable\':true}},\'roles\':{\'edit\':{\'label\':\'roles\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'roles\',\'searchable\':false,\'sortable\':false}},\'blocked\':{\'edit\':{\'label\':\'blocked\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'blocked\',\'searchable\':true,\'sortable\':true}},\'preferedLanguage\':{\'edit\':{\'label\':\'preferedLanguage\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'preferedLanguage\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'firstname\',\'lastname\',\'username\'],\'edit\':[[{\'name\':\'firstname\',\'size\':6},{\'name\':\'lastname\',\'size\':6}],[{\'name\':\'username\',\'size\':6},{\'name\':\'email\',\'size\':6}],[{\'name\':\'password\',\'size\':6},{\'name\':\'isActive\',\'size\':4}],[{\'name\':\'roles\',\'size\':6},{\'name\':\'blocked\',\'size\':4}],[{\'name\':\'preferedLanguage\',\'size\':6}]]},\'uid\':\'admin::user\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 21,
        'key': 'plugin_content_manager_configuration_content_types::admin::role',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'code\':{\'edit\':{\'label\':\'code\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'code\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'description\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':true,\'sortable\':true}},\'users\':{\'edit\':{\'label\':\'users\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'users\',\'searchable\':false,\'sortable\':false}},\'permissions\':{\'edit\':{\'label\':\'permissions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'action\'},\'list\':{\'label\':\'permissions\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'code\',\'description\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'code\',\'size\':6}],[{\'name\':\'description\',\'size\':6},{\'name\':\'users\',\'size\':6}],[{\'name\':\'permissions\',\'size\':6}]]},\'uid\':\'admin::role\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 22,
        'key': 'plugin_content_manager_configuration_content_types::admin::api-token',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'description\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':true,\'sortable\':true}},\'type\':{\'edit\':{\'label\':\'type\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'type\',\'searchable\':true,\'sortable\':true}},\'accessKey\':{\'edit\':{\'label\':\'accessKey\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'accessKey\',\'searchable\':true,\'sortable\':true}},\'encryptedKey\':{\'edit\':{\'label\':\'encryptedKey\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'encryptedKey\',\'searchable\':true,\'sortable\':true}},\'lastUsedAt\':{\'edit\':{\'label\':\'lastUsedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'lastUsedAt\',\'searchable\':true,\'sortable\':true}},\'permissions\':{\'edit\':{\'label\':\'permissions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'action\'},\'list\':{\'label\':\'permissions\',\'searchable\':false,\'sortable\':false}},\'expiresAt\':{\'edit\':{\'label\':\'expiresAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'expiresAt\',\'searchable\':true,\'sortable\':true}},\'lifespan\':{\'edit\':{\'label\':\'lifespan\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'lifespan\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'description\',\'type\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'description\',\'size\':6}],[{\'name\':\'type\',\'size\':6},{\'name\':\'accessKey\',\'size\':6}],[{\'name\':\'lastUsedAt\',\'size\':6},{\'name\':\'permissions\',\'size\':6}],[{\'name\':\'expiresAt\',\'size\':6},{\'name\':\'lifespan\',\'size\':4}],[{\'name\':\'encryptedKey\',\'size\':6}]]},\'uid\':\'admin::api-token\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 23,
        'key': 'plugin_content_manager_configuration_content_types::admin::api-token-permission',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'action\',\'defaultSortBy\':\'action\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'action\':{\'edit\':{\'label\':\'action\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'action\',\'searchable\':true,\'sortable\':true}},\'token\':{\'edit\':{\'label\':\'token\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'token\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'action\',\'token\',\'createdAt\'],\'edit\':[[{\'name\':\'action\',\'size\':6},{\'name\':\'token\',\'size\':6}]]},\'uid\':\'admin::api-token-permission\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 24,
        'key': 'plugin_content_manager_configuration_content_types::admin::transfer-token',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'description\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':true,\'sortable\':true}},\'accessKey\':{\'edit\':{\'label\':\'accessKey\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'accessKey\',\'searchable\':true,\'sortable\':true}},\'lastUsedAt\':{\'edit\':{\'label\':\'lastUsedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'lastUsedAt\',\'searchable\':true,\'sortable\':true}},\'permissions\':{\'edit\':{\'label\':\'permissions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'action\'},\'list\':{\'label\':\'permissions\',\'searchable\':false,\'sortable\':false}},\'expiresAt\':{\'edit\':{\'label\':\'expiresAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'expiresAt\',\'searchable\':true,\'sortable\':true}},\'lifespan\':{\'edit\':{\'label\':\'lifespan\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'lifespan\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'name\',\'description\',\'accessKey\'],\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'description\',\'size\':6}],[{\'name\':\'accessKey\',\'size\':6},{\'name\':\'lastUsedAt\',\'size\':6}],[{\'name\':\'permissions\',\'size\':6},{\'name\':\'expiresAt\',\'size\':6}],[{\'name\':\'lifespan\',\'size\':4}]]},\'uid\':\'admin::transfer-token\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 25,
        'key': 'plugin_content_manager_configuration_content_types::admin::transfer-token-permission',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'action\',\'defaultSortBy\':\'action\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'action\':{\'edit\':{\'label\':\'action\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'action\',\'searchable\':true,\'sortable\':true}},\'token\':{\'edit\':{\'label\':\'token\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'token\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'action\',\'token\',\'createdAt\'],\'edit\':[[{\'name\':\'action\',\'size\':6},{\'name\':\'token\',\'size\':6}]]},\'uid\':\'admin::transfer-token-permission\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 27,
        'key': 'plugin_content_manager_configuration_content_types::admin::permission',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'action\',\'defaultSortBy\':\'action\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'action\':{\'edit\':{\'label\':\'action\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'action\',\'searchable\':true,\'sortable\':true}},\'actionParameters\':{\'edit\':{\'label\':\'actionParameters\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'actionParameters\',\'searchable\':false,\'sortable\':false}},\'subject\':{\'edit\':{\'label\':\'subject\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'subject\',\'searchable\':true,\'sortable\':true}},\'properties\':{\'edit\':{\'label\':\'properties\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'properties\',\'searchable\':false,\'sortable\':false}},\'conditions\':{\'edit\':{\'label\':\'conditions\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'conditions\',\'searchable\':false,\'sortable\':false}},\'role\':{\'edit\':{\'label\':\'role\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'name\'},\'list\':{\'label\':\'role\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'action\',\'subject\',\'role\'],\'edit\':[[{\'name\':\'action\',\'size\':6}],[{\'name\':\'actionParameters\',\'size\':12}],[{\'name\':\'subject\',\'size\':6}],[{\'name\':\'properties\',\'size\':12}],[{\'name\':\'conditions\',\'size\':12}],[{\'name\':\'role\',\'size\':6}]]},\'uid\':\'admin::permission\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 28,
        'key': 'plugin_content_manager_configuration_content_types::api::global.global',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'siteName\',\'defaultSortBy\':\'siteName\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'siteName\':{\'edit\':{\'label\':\'siteName\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'siteName\',\'searchable\':true,\'sortable\':true}},\'favicon\':{\'edit\':{\'label\':\'favicon\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'favicon\',\'searchable\':false,\'sortable\':false}},\'siteDescription\':{\'edit\':{\'label\':\'siteDescription\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'siteDescription\',\'searchable\':true,\'sortable\':true}},\'defaultSeo\':{\'edit\':{\'label\':\'defaultSeo\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'defaultSeo\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'siteName\',\'favicon\',\'siteDescription\'],\'edit\':[[{\'name\':\'siteName\',\'size\':12}],[{\'name\':\'siteDescription\',\'size\':8},{\'name\':\'favicon\',\'size\':4}],[{\'name\':\'defaultSeo\',\'size\':12}]]},\'uid\':\'api::global.global\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 29,
        'key': 'plugin_upload_settings',
        'value': '{\'sizeOptimization\':true,\'responsiveDimensions\':true,\'autoOrientation\':false}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 30,
        'key': 'plugin_upload_view_configuration',
        'value': '{\'pageSize\':10,\'sort\':\'createdAt:DESC\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 31,
        'key': 'plugin_upload_metrics',
        'value': '{\'weeklySchedule\':\'27 45 16 * * 1\',\'lastWeeklyUpdate\':1746438327050}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 32,
        'key': 'plugin_i18n_default_locale',
        'value': '\'vi\'',
        'type': 'string',
        'environment': null,
        'tag': null
    },
    {
        'id': 33,
        'key': 'plugin_users-permissions_grant',
        'value': '{\'email\':{\'icon\':\'envelope\',\'enabled\':true},\'discord\':{\'icon\':\'discord\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/discord/callback\',\'scope\':[\'identify\',\'email\']},\'facebook\':{\'icon\':\'facebook-square\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/facebook/callback\',\'scope\':[\'email\']},\'google\':{\'icon\':\'google\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/google/callback\',\'scope\':[\'email\']},\'github\':{\'icon\':\'github\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/github/callback\',\'scope\':[\'user\',\'user:email\']},\'microsoft\':{\'icon\':\'windows\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/microsoft/callback\',\'scope\':[\'user.read\']},\'twitter\':{\'icon\':\'twitter\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/twitter/callback\'},\'instagram\':{\'icon\':\'instagram\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/instagram/callback\',\'scope\':[\'user_profile\']},\'vk\':{\'icon\':\'vk\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/vk/callback\',\'scope\':[\'email\']},\'twitch\':{\'icon\':\'twitch\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/twitch/callback\',\'scope\':[\'user:read:email\']},\'linkedin\':{\'icon\':\'linkedin\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callbackUrl\':\'api/auth/linkedin/callback\',\'scope\':[\'r_liteprofile\',\'r_emailaddress\']},\'cognito\':{\'icon\':\'aws\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'subdomain\':\'my.subdomain.com\',\'callback\':\'api/auth/cognito/callback\',\'scope\':[\'email\',\'openid\',\'profile\']},\'reddit\':{\'icon\':\'reddit\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callback\':\'api/auth/reddit/callback\',\'scope\':[\'identity\']},\'auth0\':{\'icon\':\'\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'subdomain\':\'my-tenant.eu\',\'callback\':\'api/auth/auth0/callback\',\'scope\':[\'openid\',\'email\',\'profile\']},\'cas\':{\'icon\':\'book\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callback\':\'api/auth/cas/callback\',\'scope\':[\'openid email\'],\'subdomain\':\'my.subdomain.com/cas\'},\'patreon\':{\'icon\':\'\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'callback\':\'api/auth/patreon/callback\',\'scope\':[\'identity\',\'identity[email]\']},\'keycloak\':{\'icon\':\'\',\'enabled\':false,\'key\':\'\',\'secret\':\'\',\'subdomain\':\'myKeycloakProvider.com/realms/myrealm\',\'callback\':\'api/auth/keycloak/callback\',\'scope\':[\'openid\',\'email\',\'profile\']}}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 34,
        'key': 'plugin_users-permissions_email',
        'value': '{\'reset_password\':{\'display\':\'Email.template.reset_password\',\'icon\':\'sync\',\'options\':{\'from\':{\'name\':\'Administration Panel\',\'email\':\'no-reply@strapi.io\'},\'response_email\':\'\',\'object\':\'Reset password\',\'message\':\'<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\'}},\'email_confirmation\':{\'display\':\'Email.template.email_confirmation\',\'icon\':\'check-square\',\'options\':{\'from\':{\'name\':\'Administration Panel\',\'email\':\'no-reply@strapi.io\'},\'response_email\':\'\',\'object\':\'Account confirmation\',\'message\':\'<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\'}}}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 35,
        'key': 'plugin_users-permissions_advanced',
        'value': '{\'unique_email\':true,\'allow_register\':false,\'email_confirmation\':false,\'email_reset_password\':null,\'email_confirmation_redirection\':\'\',\'default_role\':\'authenticated\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 36,
        'key': 'core_admin_auth',
        'value': '{\'providers\':{\'autoRegister\':false,\'defaultRole\':null,\'ssoLockedRoles\':null}}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 37,
        'key': 'type_setup_initHasRun',
        'value': 'true',
        'type': 'boolean',
        'environment': 'development',
        'tag': null
    },
    {
        'id': 38,
        'key': 'plugin_content_manager_configuration_content_types::api::about-us.about-us',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'Tiêu đề\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'slug\':{\'edit\':{\'label\':\'Slug\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'slug\',\'searchable\':true,\'sortable\':true}},\'content\':{\'edit\':{\'label\':\'Nội dung\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'content\',\'searchable\':false,\'sortable\':false}},\'dynamic_content\':{\'edit\':{\'label\':\'dynamic_content\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'dynamic_content\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'title\',\'slug\',\'createdAt\'],\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'slug\',\'size\':6}],[{\'name\':\'content\',\'size\':12}],[{\'name\':\'dynamic_content\',\'size\':12}]]},\'uid\':\'api::about-us.about-us\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 39,
        'key': 'plugin_content_manager_configuration_content_types::api::contact.contact',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'name\',\'defaultSortBy\':\'name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'name\':{\'edit\':{\'label\':\'Tên công ty\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'name\',\'searchable\':true,\'sortable\':true}},\'address\':{\'edit\':{\'label\':\'Địa chỉ\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'address\',\'searchable\':true,\'sortable\':true}},\'phone\':{\'edit\':{\'label\':\'Số điện thoại\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'phone\',\'searchable\':true,\'sortable\':true}},\'tax_code\':{\'edit\':{\'label\':\'Mã số thuế\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'tax_code\',\'searchable\':true,\'sortable\':true}},\'email\':{\'edit\':{\'label\':\'E-mail\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'email\',\'searchable\':true,\'sortable\':true}},\'image\':{\'edit\':{\'label\':\'Logo công ty\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'image\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'edit\':[[{\'name\':\'name\',\'size\':6},{\'name\':\'address\',\'size\':6}],[{\'name\':\'phone\',\'size\':6},{\'name\':\'email\',\'size\':6}],[{\'name\':\'tax_code\',\'size\':6},{\'name\':\'image\',\'size\':6}]],\'list\':[\'id\',\'name\',\'address\',\'phone\']},\'uid\':\'api::contact.contact\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 40,
        'key': 'plugin_content_manager_configuration_content_types::api::service.service',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'Tên dịch vụ\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'slug\':{\'edit\':{\'label\':\'slug\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'slug\',\'searchable\':true,\'sortable\':true}},\'image\':{\'edit\':{\'label\':\'Ảnh\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'image\',\'searchable\':false,\'sortable\':false}},\'content\':{\'edit\':{\'label\':\'Chi tiết\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'content\',\'searchable\':false,\'sortable\':false}},\'products\':{\'edit\':{\'label\':\'products\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'title\'},\'list\':{\'label\':\'products\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'slug\',\'size\':6}],[{\'name\':\'image\',\'size\':12}],[{\'name\':\'content\',\'size\':12}]],\'list\':[\'id\',\'title\',\'slug\',\'image\']},\'uid\':\'api::service.service\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 41,
        'key': 'plugin_content_manager_configuration_content_types::api::product.product',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'title\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'slug\':{\'edit\':{\'label\':\'slug\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'slug\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'description\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':false,\'sortable\':false}},\'image\':{\'edit\':{\'label\':\'image\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'image\',\'searchable\':false,\'sortable\':false}},\'service\':{\'edit\':{\'label\':\'service\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true,\'mainField\':\'title\'},\'list\':{\'label\':\'service\',\'searchable\':true,\'sortable\':true}},\'dynamic_content\':{\'edit\':{\'label\':\'dynamic_content\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'dynamic_content\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'title\',\'slug\',\'image\'],\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'slug\',\'size\':6}],[{\'name\':\'description\',\'size\':12}],[{\'name\':\'image\',\'size\':6},{\'name\':\'service\',\'size\':6}],[{\'name\':\'dynamic_content\',\'size\':12}]]},\'uid\':\'api::product.product\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 42,
        'key': 'plugin_content_manager_configuration_content_types::api::bao-gia-and-tu-van.bao-gia-and-tu-van',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'customer_name\',\'defaultSortBy\':\'customer_name\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'customer_name\':{\'edit\':{\'label\':\'customer_name\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'customer_name\',\'searchable\':true,\'sortable\':true}},\'customer_phone\':{\'edit\':{\'label\':\'customer_phone\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'customer_phone\',\'searchable\':true,\'sortable\':true}},\'content\':{\'edit\':{\'label\':\'content\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'content\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'customer_name\',\'customer_phone\',\'createdAt\'],\'edit\':[[{\'name\':\'customer_name\',\'size\':6},{\'name\':\'customer_phone\',\'size\':6}],[{\'name\':\'content\',\'size\':12}]]},\'uid\':\'api::bao-gia-and-tu-van.bao-gia-and-tu-van\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 43,
        'key': 'plugin_content_manager_configuration_content_types::plugin::tree-menus.menu',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'title\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'slug\':{\'edit\':{\'label\':\'slug\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'slug\',\'searchable\':true,\'sortable\':true}},\'items\':{\'edit\':{\'label\':\'items\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'items\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'title\',\'slug\',\'createdAt\'],\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'slug\',\'size\':6}],[{\'name\':\'items\',\'size\':12}]]},\'uid\':\'plugin::tree-menus.menu\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 44,
        'key': 'plugin_documentation_config',
        'value': '{\'restrictedAccess\':true,\'password\':\'$2a$10$vLPBMVCAwjG7AdAIohxJ5O8kXNZlYLaH6oKR.GaBcbO8boHp9EErW\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 45,
        'key': 'plugin_content_manager_configuration_content_types::api::khach-hang.khach-hang',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'Tên khách hàng\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'logo\':{\'edit\':{\'label\':\'logo\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'logo\',\'searchable\':false,\'sortable\':false}},\'website\':{\'edit\':{\'label\':\'Website\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'website\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'edit\':[[{\'name\':\'title\',\'size\':6},{\'name\':\'website\',\'size\':6}],[{\'name\':\'logo\',\'size\':12}]],\'list\':[\'id\',\'title\',\'logo\',\'createdAt\']},\'uid\':\'api::khach-hang.khach-hang\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 46,
        'key': 'plugin_content_manager_configuration_content_types::api::slide.slide',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'id\',\'defaultSortBy\':\'id\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'image\':{\'edit\':{\'label\':\'Ảnh slide\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'image\',\'searchable\':false,\'sortable\':false}},\'content\':{\'edit\':{\'label\':\'Nội dung slide\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'content\',\'searchable\':false,\'sortable\':false}},\'position\':{\'edit\':{\'label\':\'Vị trí ảnh slide\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'position\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'edit\':[[{\'name\':\'content\',\'size\':12}],[{\'name\':\'image\',\'size\':12}],[{\'name\':\'position\',\'size\':12}]],\'list\':[\'id\',\'image\',\'createdAt\',\'updatedAt\']},\'uid\':\'api::slide.slide\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 47,
        'key': 'plugin_content_manager_configuration_content_types::api::home-page-content.home-page-content',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'id\',\'defaultSortBy\':\'id\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'partner\':{\'edit\':{\'label\':\'Đối tác\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'partner\',\'searchable\':false,\'sortable\':false}},\'service\':{\'edit\':{\'label\':\'Dịch vụ\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'service\',\'searchable\':false,\'sortable\':false}},\'aboutus\':{\'edit\':{\'label\':\'Giới thiệu\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'aboutus\',\'searchable\':false,\'sortable\':false}},\'news\':{\'edit\':{\'label\':\'Tin tức\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'news\',\'searchable\':false,\'sortable\':false}},\'company_achievement\':{\'edit\':{\'label\':\'Thành tích của công ty\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'company_achievement\',\'searchable\':false,\'sortable\':false}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'createdAt\',\'updatedAt\',\'partner\'],\'edit\':[[{\'name\':\'partner\',\'size\':12}],[{\'name\':\'service\',\'size\':12}],[{\'name\':\'aboutus\',\'size\':12}],[{\'name\':\'news\',\'size\':12}],[{\'name\':\'company_achievement\',\'size\':12}]]},\'uid\':\'api::home-page-content.home-page-content\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 50,
        'key': 'plugin_content_manager_configuration_components::shared.article',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':false,\'sortable\':false}},\'title\':{\'edit\':{\'label\':\'Tên\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'button_link\':{\'edit\':{\'label\':\'Đường link khi bấm nút\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'button_link\',\'searchable\':true,\'sortable\':true}},\'description\':{\'edit\':{\'label\':\'Mô tả ngắn\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'description\',\'searchable\':false,\'sortable\':false}},\'media\':{\'edit\':{\'label\':\'Media\',\'description\':\'File, ảnh, video ...\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'media\',\'searchable\':false,\'sortable\':false}},\'button_name\':{\'edit\':{\'label\':\'Tên của nút(nếu có)\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'button_name\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'edit\':[[{\'name\':\'title\',\'size\':12}],[{\'name\':\'button_name\',\'size\':6},{\'name\':\'button_link\',\'size\':6}],[{\'name\':\'media\',\'size\':12}],[{\'name\':\'description\',\'size\':12}]],\'list\':[\'id\',\'title\',\'button_link\',\'button_name\']},\'uid\':\'shared.article\',\'isComponent\':true}',
        'type': 'object',
        'environment': null,
        'tag': null
    },
    {
        'id': 51,
        'key': 'plugin_migrations_version',
        'value': '0',
        'type': 'number',
        'environment': null,
        'tag': null
    },
    {
        'id': 52,
        'key': 'plugin_content_manager_configuration_content_types::api::new.new',
        'value': '{\'settings\':{\'bulkable\':true,\'filterable\':true,\'searchable\':true,\'pageSize\':10,\'mainField\':\'title\',\'defaultSortBy\':\'title\',\'defaultSortOrder\':\'ASC\'},\'metadatas\':{\'id\':{\'edit\':{},\'list\':{\'label\':\'id\',\'searchable\':true,\'sortable\':true}},\'title\':{\'edit\':{\'label\':\'title\',\'description\':\'\',\'placeholder\':\'\',\'visible\':true,\'editable\':true},\'list\':{\'label\':\'title\',\'searchable\':true,\'sortable\':true}},\'createdAt\':{\'edit\':{\'label\':\'createdAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'createdAt\',\'searchable\':true,\'sortable\':true}},\'updatedAt\':{\'edit\':{\'label\':\'updatedAt\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true},\'list\':{\'label\':\'updatedAt\',\'searchable\':true,\'sortable\':true}},\'createdBy\':{\'edit\':{\'label\':\'createdBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'createdBy\',\'searchable\':true,\'sortable\':true}},\'updatedBy\':{\'edit\':{\'label\':\'updatedBy\',\'description\':\'\',\'placeholder\':\'\',\'visible\':false,\'editable\':true,\'mainField\':\'firstname\'},\'list\':{\'label\':\'updatedBy\',\'searchable\':true,\'sortable\':true}}},\'layouts\':{\'list\':[\'id\',\'title\',\'createdAt\',\'updatedAt\'],\'edit\':[[{\'name\':\'title\',\'size\':6}]]},\'uid\':\'api::new.new\'}',
        'type': 'object',
        'environment': null,
        'tag': null
    }
]);
  }

  // Tạo bảng strapi_database_schema
  await knex.raw(`CREATE TABLE \`strapi_database_schema\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`schema\` json DEFAULT NULL,
  \`time\` datetime DEFAULT NULL,
  \`hash\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

  // Thêm dữ liệu vào bảng strapi_database_schema
  if ((await knex('strapi_database_schema').count('* as count'))[0].count === 0) {
    await knex('strapi_database_schema').insert([
    {
        'id': 48,
        'schema': {
            'tables': [
                {
                    'name': 'files',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'alternative_text',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'caption',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'width',
                            'type': 'integer',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'height',
                            'type': 'integer',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'formats',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'hash',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'ext',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'mime',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                10,
                                2
                            ],
                            'name': 'size',
                            'type': 'decimal',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'url',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'preview_url',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'provider',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'provider_metadata',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'folder_path',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'upload_files_folder_path_index',
                            'type': null,
                            'columns': [
                                'folder_path'
                            ]
                        },
                        {
                            'name': 'upload_files_created_at_index',
                            'type': null,
                            'columns': [
                                'created_at'
                            ]
                        },
                        {
                            'name': 'upload_files_updated_at_index',
                            'type': null,
                            'columns': [
                                'updated_at'
                            ]
                        },
                        {
                            'name': 'upload_files_name_index',
                            'type': null,
                            'columns': [
                                'name'
                            ]
                        },
                        {
                            'name': 'upload_files_size_index',
                            'type': null,
                            'columns': [
                                'size'
                            ]
                        },
                        {
                            'name': 'upload_files_ext_index',
                            'type': null,
                            'columns': [
                                'ext'
                            ]
                        },
                        {
                            'name': 'files_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'files_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'files_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'files_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'files_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'upload_folders',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'path_id',
                            'type': 'integer',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'path',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'upload_folders_path_id_index',
                            'type': 'unique',
                            'columns': [
                                'path_id'
                            ]
                        },
                        {
                            'name': 'upload_folders_path_index',
                            'type': 'unique',
                            'columns': [
                                'path'
                            ]
                        },
                        {
                            'name': 'upload_folders_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'upload_folders_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'upload_folders_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'upload_folders_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'upload_folders_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'i18n_locale',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'code',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'i18n_locale_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'i18n_locale_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'i18n_locale_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'i18n_locale_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'i18n_locale_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_releases',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'released_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'scheduled_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'timezone',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'status',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_releases_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_releases_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_releases_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_releases_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_releases_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_release_actions',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'content_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'entry_document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'is_entry_valid',
                            'type': 'boolean',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_release_actions_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_release_actions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_workflows',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'content_types',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_workflows_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_workflows_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_workflows_stages',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'color',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_workflows_stages_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_workflows_stages_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'up_permissions',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'action',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'up_permissions_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'up_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'up_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'up_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'up_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'up_roles',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'description',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'up_roles_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'up_roles_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'up_roles_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'up_roles_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'up_roles_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'up_users',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'username',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'email',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'provider',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'password',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'reset_password_token',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'confirmation_token',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'confirmed',
                            'type': 'boolean',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'blocked',
                            'type': 'boolean',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'up_users_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'up_users_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'up_users_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'up_users_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'up_users_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'menus',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'slug',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'items',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'menus_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'menus_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'menus_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'menus_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'menus_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'about_uses_cmps',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'entity_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'cmp_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'component_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'about_uses_field_idx',
                            'columns': [
                                'field'
                            ]
                        },
                        {
                            'name': 'about_uses_component_type_idx',
                            'columns': [
                                'component_type'
                            ]
                        },
                        {
                            'name': 'about_uses_entity_fk',
                            'columns': [
                                'entity_id'
                            ]
                        },
                        {
                            'name': 'about_uses_uq',
                            'type': 'unique',
                            'columns': [
                                'entity_id',
                                'cmp_id',
                                'field',
                                'component_type'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'about_uses_entity_fk',
                            'columns': [
                                'entity_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'about_uses',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'about_uses',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'slug',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'content',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'about_uses_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'about_uses_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'about_uses_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'about_uses_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'about_uses_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'articles_cmps',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'entity_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'cmp_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'component_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'articles_field_idx',
                            'columns': [
                                'field'
                            ]
                        },
                        {
                            'name': 'articles_component_type_idx',
                            'columns': [
                                'component_type'
                            ]
                        },
                        {
                            'name': 'articles_entity_fk',
                            'columns': [
                                'entity_id'
                            ]
                        },
                        {
                            'name': 'articles_uq',
                            'type': 'unique',
                            'columns': [
                                'entity_id',
                                'cmp_id',
                                'field',
                                'component_type'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'articles_entity_fk',
                            'columns': [
                                'entity_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'articles',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'articles',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'description',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'slug',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'articles_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'articles_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'articles_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'articles_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'articles_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'bao_gia_and_tu_vans',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'customer_name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'customer_phone',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'content',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'bao_gia_and_tu_vans_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'bao_gia_and_tu_vans_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'bao_gia_and_tu_vans_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'bao_gia_and_tu_vans_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'bao_gia_and_tu_vans_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'contacts',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'address',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'phone',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'tax_code',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'email',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'contacts_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'contacts_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'contacts_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'contacts_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'contacts_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'globals_cmps',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'entity_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'cmp_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'component_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'globals_field_idx',
                            'columns': [
                                'field'
                            ]
                        },
                        {
                            'name': 'globals_component_type_idx',
                            'columns': [
                                'component_type'
                            ]
                        },
                        {
                            'name': 'globals_entity_fk',
                            'columns': [
                                'entity_id'
                            ]
                        },
                        {
                            'name': 'globals_uq',
                            'type': 'unique',
                            'columns': [
                                'entity_id',
                                'cmp_id',
                                'field',
                                'component_type'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'globals_entity_fk',
                            'columns': [
                                'entity_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'globals',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'globals',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'site_name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'site_description',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'globals_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'globals_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'globals_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'globals_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'globals_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'home_page_contents_cmps',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'entity_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'cmp_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'component_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'home_page_contents_field_idx',
                            'columns': [
                                'field'
                            ]
                        },
                        {
                            'name': 'home_page_contents_component_type_idx',
                            'columns': [
                                'component_type'
                            ]
                        },
                        {
                            'name': 'home_page_contents_entity_fk',
                            'columns': [
                                'entity_id'
                            ]
                        },
                        {
                            'name': 'home_page_contents_uq',
                            'type': 'unique',
                            'columns': [
                                'entity_id',
                                'cmp_id',
                                'field',
                                'component_type'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'home_page_contents_entity_fk',
                            'columns': [
                                'entity_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'home_page_contents',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'home_page_contents',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'home_page_contents_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'home_page_contents_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'home_page_contents_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'home_page_contents_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'home_page_contents_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'khach_hangs',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'website',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'khach_hangs_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'khach_hangs_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'khach_hangs_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'khach_hangs_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'khach_hangs_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'news',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'news_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'news_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'news_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'news_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'news_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'products_cmps',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'entity_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'cmp_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'component_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'products_field_idx',
                            'columns': [
                                'field'
                            ]
                        },
                        {
                            'name': 'products_component_type_idx',
                            'columns': [
                                'component_type'
                            ]
                        },
                        {
                            'name': 'products_entity_fk',
                            'columns': [
                                'entity_id'
                            ]
                        },
                        {
                            'name': 'products_uq',
                            'type': 'unique',
                            'columns': [
                                'entity_id',
                                'cmp_id',
                                'field',
                                'component_type'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'products_entity_fk',
                            'columns': [
                                'entity_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'products',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'products',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'slug',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'description',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'products_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'products_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'products_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'products_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'products_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'services',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'slug',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'content',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'services_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'services_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'services_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'services_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'services_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'slides',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'content',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'position',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'slides_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'slides_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'slides_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'slides_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'slides_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'admin_permissions',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'action',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'action_parameters',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'subject',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'properties',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'conditions',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'admin_permissions_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'admin_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'admin_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'admin_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'admin_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'admin_users',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'firstname',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'lastname',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'username',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'email',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'password',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'reset_password_token',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'registration_token',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'is_active',
                            'type': 'boolean',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'blocked',
                            'type': 'boolean',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'prefered_language',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'admin_users_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'admin_users_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'admin_users_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'admin_users_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'admin_users_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'admin_roles',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'code',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'description',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'admin_roles_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'admin_roles_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'admin_roles_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'admin_roles_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'admin_roles_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_api_tokens',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'description',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'access_key',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'encrypted_key',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'last_used_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'expires_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'lifespan',
                            'type': 'bigInteger',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_api_tokens_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_api_tokens_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_api_tokens_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_api_tokens_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_api_tokens_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_api_token_permissions',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'action',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_api_token_permissions_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_api_token_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_transfer_tokens',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'description',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'access_key',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'last_used_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'expires_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'lifespan',
                            'type': 'bigInteger',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_transfer_tokens_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_tokens_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_tokens_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_transfer_tokens_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_tokens_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_transfer_token_permissions',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'action',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'updated_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'published_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'updated_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_transfer_token_permissions_documents_idx',
                            'columns': [
                                'document_id',
                                'locale',
                                'published_at'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_transfer_token_permissions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_updated_by_id_fk',
                            'columns': [
                                'updated_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'components_shared_sliders',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'components_shared_seos',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'meta_title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'meta_description',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'components_shared_rich_texts_cmps',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'entity_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'cmp_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'component_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'components_shared_rich_texts_field_idx',
                            'columns': [
                                'field'
                            ]
                        },
                        {
                            'name': 'components_shared_rich_texts_component_type_idx',
                            'columns': [
                                'component_type'
                            ]
                        },
                        {
                            'name': 'components_shared_rich_texts_entity_fk',
                            'columns': [
                                'entity_id'
                            ]
                        },
                        {
                            'name': 'components_shared_rich_texts_uq',
                            'type': 'unique',
                            'columns': [
                                'entity_id',
                                'cmp_id',
                                'field',
                                'component_type'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'components_shared_rich_texts_entity_fk',
                            'columns': [
                                'entity_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'components_shared_rich_texts',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'components_shared_rich_texts',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'description',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'components_shared_quotes',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'body',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'components_shared_media',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'components_shared_articles',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'title',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'button_link',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'description',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'button_name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'strapi_core_store_settings',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'key',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'value',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'environment',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'tag',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'strapi_webhooks',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'name',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                'longtext'
                            ],
                            'name': 'url',
                            'type': 'text',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'headers',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'events',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'enabled',
                            'type': 'boolean',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [],
                    'foreignKeys': []
                },
                {
                    'name': 'strapi_history_versions',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'content_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'related_document_id',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'locale',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'status',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'data',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'schema',
                            'type': 'jsonb',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [
                                {
                                    'useTz': false,
                                    'precision': 6
                                }
                            ],
                            'name': 'created_at',
                            'type': 'datetime',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'created_by_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_history_versions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_history_versions_created_by_id_fk',
                            'columns': [
                                'created_by_id'
                            ],
                            'onDelete': 'SET NULL',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'files_related_mph',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'file_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'related_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'related_type',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'field',
                            'type': 'string',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'order',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'files_related_mph_fk',
                            'columns': [
                                'file_id'
                            ]
                        },
                        {
                            'name': 'files_related_mph_oidx',
                            'columns': [
                                'order'
                            ]
                        },
                        {
                            'name': 'files_related_mph_idix',
                            'columns': [
                                'related_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'files_related_mph_fk',
                            'columns': [
                                'file_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'files',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'files_folder_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'file_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'folder_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'file_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'files_folder_lnk_fk',
                            'columns': [
                                'file_id'
                            ]
                        },
                        {
                            'name': 'files_folder_lnk_ifk',
                            'columns': [
                                'folder_id'
                            ]
                        },
                        {
                            'name': 'files_folder_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'file_id',
                                'folder_id'
                            ]
                        },
                        {
                            'name': 'files_folder_lnk_oifk',
                            'columns': [
                                'file_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'files_folder_lnk_fk',
                            'columns': [
                                'file_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'files',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'files_folder_lnk_ifk',
                            'columns': [
                                'folder_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'upload_folders',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'upload_folders_parent_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'folder_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'inv_folder_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'folder_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'upload_folders_parent_lnk_fk',
                            'columns': [
                                'folder_id'
                            ]
                        },
                        {
                            'name': 'upload_folders_parent_lnk_ifk',
                            'columns': [
                                'inv_folder_id'
                            ]
                        },
                        {
                            'name': 'upload_folders_parent_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'folder_id',
                                'inv_folder_id'
                            ]
                        },
                        {
                            'name': 'upload_folders_parent_lnk_oifk',
                            'columns': [
                                'folder_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'upload_folders_parent_lnk_fk',
                            'columns': [
                                'folder_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'upload_folders',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'upload_folders_parent_lnk_ifk',
                            'columns': [
                                'inv_folder_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'upload_folders',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_release_actions_release_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'release_action_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'release_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'release_action_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_release_actions_release_lnk_fk',
                            'columns': [
                                'release_action_id'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_release_lnk_ifk',
                            'columns': [
                                'release_id'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_release_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'release_action_id',
                                'release_id'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_release_lnk_oifk',
                            'columns': [
                                'release_action_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_release_actions_release_lnk_fk',
                            'columns': [
                                'release_action_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_release_actions',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_release_actions_release_lnk_ifk',
                            'columns': [
                                'release_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_releases',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_workflows_stage_required_to_publish_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'workflow_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'workflow_stage_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_workflows_stage_required_to_publish_lnk_fk',
                            'columns': [
                                'workflow_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stage_required_to_publish_lnk_ifk',
                            'columns': [
                                'workflow_stage_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stage_required_to_publish_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'workflow_id',
                                'workflow_stage_id'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_workflows_stage_required_to_publish_lnk_fk',
                            'columns': [
                                'workflow_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_workflows',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stage_required_to_publish_lnk_ifk',
                            'columns': [
                                'workflow_stage_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_workflows_stages',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_workflows_stages_workflow_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'workflow_stage_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'workflow_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'workflow_stage_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_workflows_stages_workflow_lnk_fk',
                            'columns': [
                                'workflow_stage_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_workflow_lnk_ifk',
                            'columns': [
                                'workflow_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_workflow_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'workflow_stage_id',
                                'workflow_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_workflow_lnk_oifk',
                            'columns': [
                                'workflow_stage_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_workflows_stages_workflow_lnk_fk',
                            'columns': [
                                'workflow_stage_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_workflows_stages',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_workflow_lnk_ifk',
                            'columns': [
                                'workflow_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_workflows',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_workflows_stages_permissions_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'workflow_stage_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'permission_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'permission_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_workflows_stages_permissions_lnk_fk',
                            'columns': [
                                'workflow_stage_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_permissions_lnk_ifk',
                            'columns': [
                                'permission_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_permissions_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'workflow_stage_id',
                                'permission_id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_permissions_lnk_ofk',
                            'columns': [
                                'permission_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_workflows_stages_permissions_lnk_fk',
                            'columns': [
                                'workflow_stage_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_workflows_stages',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_workflows_stages_permissions_lnk_ifk',
                            'columns': [
                                'permission_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'admin_permissions',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'up_permissions_role_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'permission_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'role_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'permission_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'up_permissions_role_lnk_fk',
                            'columns': [
                                'permission_id'
                            ]
                        },
                        {
                            'name': 'up_permissions_role_lnk_ifk',
                            'columns': [
                                'role_id'
                            ]
                        },
                        {
                            'name': 'up_permissions_role_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'permission_id',
                                'role_id'
                            ]
                        },
                        {
                            'name': 'up_permissions_role_lnk_oifk',
                            'columns': [
                                'permission_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'up_permissions_role_lnk_fk',
                            'columns': [
                                'permission_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'up_permissions',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'up_permissions_role_lnk_ifk',
                            'columns': [
                                'role_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'up_roles',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'up_users_role_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'user_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'role_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'user_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'up_users_role_lnk_fk',
                            'columns': [
                                'user_id'
                            ]
                        },
                        {
                            'name': 'up_users_role_lnk_ifk',
                            'columns': [
                                'role_id'
                            ]
                        },
                        {
                            'name': 'up_users_role_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'user_id',
                                'role_id'
                            ]
                        },
                        {
                            'name': 'up_users_role_lnk_oifk',
                            'columns': [
                                'user_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'up_users_role_lnk_fk',
                            'columns': [
                                'user_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'up_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'up_users_role_lnk_ifk',
                            'columns': [
                                'role_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'up_roles',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'products_service_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'product_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'service_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'product_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'products_service_lnk_fk',
                            'columns': [
                                'product_id'
                            ]
                        },
                        {
                            'name': 'products_service_lnk_ifk',
                            'columns': [
                                'service_id'
                            ]
                        },
                        {
                            'name': 'products_service_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'product_id',
                                'service_id'
                            ]
                        },
                        {
                            'name': 'products_service_lnk_oifk',
                            'columns': [
                                'product_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'products_service_lnk_fk',
                            'columns': [
                                'product_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'products',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'products_service_lnk_ifk',
                            'columns': [
                                'service_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'services',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'admin_permissions_role_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'permission_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'role_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'permission_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'admin_permissions_role_lnk_fk',
                            'columns': [
                                'permission_id'
                            ]
                        },
                        {
                            'name': 'admin_permissions_role_lnk_ifk',
                            'columns': [
                                'role_id'
                            ]
                        },
                        {
                            'name': 'admin_permissions_role_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'permission_id',
                                'role_id'
                            ]
                        },
                        {
                            'name': 'admin_permissions_role_lnk_oifk',
                            'columns': [
                                'permission_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'admin_permissions_role_lnk_fk',
                            'columns': [
                                'permission_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'admin_permissions',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'admin_permissions_role_lnk_ifk',
                            'columns': [
                                'role_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'admin_roles',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'admin_users_roles_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'user_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'role_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'role_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'user_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'admin_users_roles_lnk_fk',
                            'columns': [
                                'user_id'
                            ]
                        },
                        {
                            'name': 'admin_users_roles_lnk_ifk',
                            'columns': [
                                'role_id'
                            ]
                        },
                        {
                            'name': 'admin_users_roles_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'user_id',
                                'role_id'
                            ]
                        },
                        {
                            'name': 'admin_users_roles_lnk_ofk',
                            'columns': [
                                'role_ord'
                            ]
                        },
                        {
                            'name': 'admin_users_roles_lnk_oifk',
                            'columns': [
                                'user_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'admin_users_roles_lnk_fk',
                            'columns': [
                                'user_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'admin_users',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'admin_users_roles_lnk_ifk',
                            'columns': [
                                'role_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'admin_roles',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_api_token_permissions_token_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'api_token_permission_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'api_token_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'api_token_permission_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_api_token_permissions_token_lnk_fk',
                            'columns': [
                                'api_token_permission_id'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_token_lnk_ifk',
                            'columns': [
                                'api_token_id'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_token_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'api_token_permission_id',
                                'api_token_id'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_token_lnk_oifk',
                            'columns': [
                                'api_token_permission_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_api_token_permissions_token_lnk_fk',
                            'columns': [
                                'api_token_permission_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_api_token_permissions',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_api_token_permissions_token_lnk_ifk',
                            'columns': [
                                'api_token_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_api_tokens',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                },
                {
                    'name': 'strapi_transfer_token_permissions_token_lnk',
                    'columns': [
                        {
                            'args': [
                                {
                                    'primary': true,
                                    'primaryKey': true
                                }
                            ],
                            'name': 'id',
                            'type': 'increments',
                            'unsigned': false,
                            'defaultTo': null,
                            'notNullable': true
                        },
                        {
                            'args': [],
                            'name': 'transfer_token_permission_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'transfer_token_id',
                            'type': 'integer',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        },
                        {
                            'args': [],
                            'name': 'transfer_token_permission_ord',
                            'type': 'double',
                            'unsigned': true,
                            'defaultTo': null,
                            'notNullable': false
                        }
                    ],
                    'indexes': [
                        {
                            'name': 'strapi_transfer_token_permissions_token_lnk_fk',
                            'columns': [
                                'transfer_token_permission_id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_token_lnk_ifk',
                            'columns': [
                                'transfer_token_id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_token_lnk_uq',
                            'type': 'unique',
                            'columns': [
                                'transfer_token_permission_id',
                                'transfer_token_id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_token_lnk_oifk',
                            'columns': [
                                'transfer_token_permission_ord'
                            ]
                        }
                    ],
                    'foreignKeys': [
                        {
                            'name': 'strapi_transfer_token_permissions_token_lnk_fk',
                            'columns': [
                                'transfer_token_permission_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_transfer_token_permissions',
                            'referencedColumns': [
                                'id'
                            ]
                        },
                        {
                            'name': 'strapi_transfer_token_permissions_token_lnk_ifk',
                            'columns': [
                                'transfer_token_id'
                            ],
                            'onDelete': 'CASCADE',
                            'referencedTable': 'strapi_transfer_tokens',
                            'referencedColumns': [
                                'id'
                            ]
                        }
                    ]
                }
            ]
        },
        'time': '2025-05-11T15:45:47.000Z',
        'hash': '7ff15ed6fec3d53d0021679ef753e5d1'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng strapi_migrations_internal
  if ((await knex('strapi_migrations_internal').count('* as count'))[0].count === 0) {
    await knex('strapi_migrations_internal').insert([
    {
        'id': 1,
        'name': '5.0.0-rename-identifiers-longer-than-max-length',
        'time': '2025-05-05T09:43:56.000Z'
    },
    {
        'id': 2,
        'name': '5.0.0-02-created-document-id',
        'time': '2025-05-05T09:43:56.000Z'
    },
    {
        'id': 3,
        'name': '5.0.0-03-created-locale',
        'time': '2025-05-05T09:43:56.000Z'
    },
    {
        'id': 4,
        'name': '5.0.0-04-created-published-at',
        'time': '2025-05-05T09:43:56.000Z'
    },
    {
        'id': 5,
        'name': '5.0.0-05-drop-slug-fields-index',
        'time': '2025-05-05T09:43:56.000Z'
    },
    {
        'id': 6,
        'name': 'core::5.0.0-discard-drafts',
        'time': '2025-05-05T09:43:56.000Z'
    }
]);
  }

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

  // Thêm dữ liệu vào bảng up_permissions
  if ((await knex('up_permissions').count('* as count'))[0].count === 0) {
    await knex('up_permissions').insert([
    {
        'id': 1,
        'document_id': 'z47ygghvjvqc3uex1yf4nc0x',
        'action': 'plugin::users-permissions.user.me',
        'created_at': '2025-05-05T09:43:57.664Z',
        'updated_at': '2025-05-05T09:43:57.664Z',
        'published_at': '2025-05-05T09:43:57.665Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'xusjffr26k2sozrzhoejbnle',
        'action': 'plugin::users-permissions.auth.changePassword',
        'created_at': '2025-05-05T09:43:57.664Z',
        'updated_at': '2025-05-05T09:43:57.664Z',
        'published_at': '2025-05-05T09:43:57.665Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 3,
        'document_id': 'ysiouhgma2vnmd3zigmnv0ld',
        'action': 'plugin::users-permissions.auth.callback',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.668Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 4,
        'document_id': 'kcnhrd7wjd5e260m9lw7je37',
        'action': 'plugin::users-permissions.auth.connect',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.668Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 5,
        'document_id': 'a2js4i3vx8lhu84w027z11rd',
        'action': 'plugin::users-permissions.auth.resetPassword',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.669Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 6,
        'document_id': 'k0tmt8ts408ydd6zelygsire',
        'action': 'plugin::users-permissions.auth.register',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.669Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 7,
        'document_id': 'bx25qyolhqix9xv0lkpjgyxj',
        'action': 'plugin::users-permissions.auth.forgotPassword',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.669Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 8,
        'document_id': 'v3w9iyeysefq6732n9d8gtop',
        'action': 'plugin::users-permissions.auth.emailConfirmation',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.669Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 9,
        'document_id': 'ihu90s1k9uzhwjuqpwscc3wf',
        'action': 'plugin::users-permissions.auth.sendEmailConfirmation',
        'created_at': '2025-05-05T09:43:57.668Z',
        'updated_at': '2025-05-05T09:43:57.668Z',
        'published_at': '2025-05-05T09:43:57.669Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 10,
        'document_id': 'qbrbeoez5nmp63ykm4zyamy0',
        'action': 'api::article.article.find',
        'created_at': '2025-05-05T09:43:57.962Z',
        'updated_at': '2025-05-05T09:43:57.962Z',
        'published_at': '2025-05-05T09:43:57.962Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 11,
        'document_id': 'jigo55grrgz1khmukdfmw1gt',
        'action': 'api::article.article.findOne',
        'created_at': '2025-05-05T09:43:57.962Z',
        'updated_at': '2025-05-05T09:43:57.962Z',
        'published_at': '2025-05-05T09:43:57.962Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 15,
        'document_id': 'd4l5fqmnkvx5dbe0mimoahxw',
        'action': 'api::global.global.find',
        'created_at': '2025-05-05T09:43:57.962Z',
        'updated_at': '2025-05-05T09:43:57.962Z',
        'published_at': '2025-05-05T09:43:57.962Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 20,
        'document_id': 'gswvlhfwqine2iqo1gnpeqra',
        'action': 'plugin::tree-menus.menu.find',
        'created_at': '2025-05-10T04:55:19.608Z',
        'updated_at': '2025-05-10T04:55:19.608Z',
        'published_at': '2025-05-10T04:55:19.609Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 21,
        'document_id': 'uu0079fh9pudcywbgedpzm6o',
        'action': 'plugin::tree-menus.menu.create',
        'created_at': '2025-05-10T04:55:19.608Z',
        'updated_at': '2025-05-10T04:55:19.608Z',
        'published_at': '2025-05-10T04:55:19.610Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 22,
        'document_id': 'tsiz7rw2itkwa1ou295uawq9',
        'action': 'plugin::tree-menus.menu.update',
        'created_at': '2025-05-10T04:55:19.608Z',
        'updated_at': '2025-05-10T04:55:19.608Z',
        'published_at': '2025-05-10T04:55:19.610Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 23,
        'document_id': 'g9bdcnniecivm3j7xyt1ix35',
        'action': 'plugin::tree-menus.menu.findOne',
        'created_at': '2025-05-10T04:55:19.608Z',
        'updated_at': '2025-05-10T04:55:19.608Z',
        'published_at': '2025-05-10T04:55:19.609Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 24,
        'document_id': 'gvxrktboo4tjez1b1m9m30yc',
        'action': 'plugin::tree-menus.menu.delete',
        'created_at': '2025-05-10T04:55:19.608Z',
        'updated_at': '2025-05-10T04:55:19.608Z',
        'published_at': '2025-05-10T04:55:19.611Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 25,
        'document_id': 'eebtq7w86vxhewdz8fcux99u',
        'action': 'plugin::tree-menus.menu.deleteMany',
        'created_at': '2025-05-10T04:55:19.608Z',
        'updated_at': '2025-05-10T04:55:19.608Z',
        'published_at': '2025-05-10T04:55:19.611Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng up_permissions_role_lnk
  if ((await knex('up_permissions_role_lnk').count('* as count'))[0].count === 0) {
    await knex('up_permissions_role_lnk').insert([
    {
        'id': 1,
        'permission_id': 2,
        'role_id': 1,
        'permission_ord': 1
    },
    {
        'id': 2,
        'permission_id': 1,
        'role_id': 1,
        'permission_ord': 1
    },
    {
        'id': 3,
        'permission_id': 5,
        'role_id': 2,
        'permission_ord': 1
    },
    {
        'id': 4,
        'permission_id': 3,
        'role_id': 2,
        'permission_ord': 1
    },
    {
        'id': 5,
        'permission_id': 7,
        'role_id': 2,
        'permission_ord': 1
    },
    {
        'id': 6,
        'permission_id': 4,
        'role_id': 2,
        'permission_ord': 1
    },
    {
        'id': 7,
        'permission_id': 9,
        'role_id': 2,
        'permission_ord': 2
    },
    {
        'id': 8,
        'permission_id': 8,
        'role_id': 2,
        'permission_ord': 1
    },
    {
        'id': 9,
        'permission_id': 6,
        'role_id': 2,
        'permission_ord': 1
    },
    {
        'id': 10,
        'permission_id': 10,
        'role_id': 2,
        'permission_ord': 3
    },
    {
        'id': 12,
        'permission_id': 11,
        'role_id': 2,
        'permission_ord': 3
    },
    {
        'id': 15,
        'permission_id': 15,
        'role_id': 2,
        'permission_ord': 3
    },
    {
        'id': 20,
        'permission_id': 21,
        'role_id': 1,
        'permission_ord': 2
    },
    {
        'id': 21,
        'permission_id': 20,
        'role_id': 1,
        'permission_ord': 2
    },
    {
        'id': 22,
        'permission_id': 22,
        'role_id': 1,
        'permission_ord': 2
    },
    {
        'id': 23,
        'permission_id': 23,
        'role_id': 1,
        'permission_ord': 3
    },
    {
        'id': 24,
        'permission_id': 24,
        'role_id': 1,
        'permission_ord': 3
    },
    {
        'id': 25,
        'permission_id': 25,
        'role_id': 1,
        'permission_ord': 2
    }
]);
  }

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

  // Thêm dữ liệu vào bảng up_roles
  if ((await knex('up_roles').count('* as count'))[0].count === 0) {
    await knex('up_roles').insert([
    {
        'id': 1,
        'document_id': 'fvgrvaaxj342ubni2wfpdfzy',
        'name': 'Authenticated',
        'description': 'Default role given to authenticated user.',
        'type': 'authenticated',
        'created_at': '2025-05-05T09:43:57.660Z',
        'updated_at': '2025-05-10T04:55:19.602Z',
        'published_at': '2025-05-05T09:43:57.660Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    },
    {
        'id': 2,
        'document_id': 'ciaybxwdpbciirz9jfg9v462',
        'name': 'Public',
        'description': 'Default role given to unauthenticated user.',
        'type': 'public',
        'created_at': '2025-05-05T09:43:57.662Z',
        'updated_at': '2025-05-05T09:43:57.662Z',
        'published_at': '2025-05-05T09:43:57.662Z',
        'created_by_id': null,
        'updated_by_id': null,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng up_users
  if ((await knex('up_users').count('* as count'))[0].count === 0) {
    await knex('up_users').insert([
    {
        'id': 1,
        'document_id': 'ukgqcqwleg45omv7pt1590iq',
        'username': 'tranngocthang8x@gmail.com',
        'email': 'tranngocthang8x@gmail.com',
        'provider': 'local',
        'password': '$2a$10$A43x5j0fJ3.JO3I9MOjJ7uNrUnmsHsiWjV2IY9tIBHIpUWsvK6Udq',
        'reset_password_token': null,
        'confirmation_token': null,
        'confirmed': 1,
        'blocked': 0,
        'created_at': '2025-05-09T15:55:12.115Z',
        'updated_at': '2025-05-10T04:56:12.920Z',
        'published_at': '2025-05-10T04:56:12.903Z',
        'created_by_id': 1,
        'updated_by_id': 1,
        'locale': null
    }
]);
  }

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

  // Thêm dữ liệu vào bảng up_users_role_lnk
  if ((await knex('up_users_role_lnk').count('* as count'))[0].count === 0) {
    await knex('up_users_role_lnk').insert([
    {
        'id': 4,
        'user_id': 1,
        'role_id': 2,
        'user_ord': 1
    }
]);
  }

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
