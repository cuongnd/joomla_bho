-- SELECT CONCAT('ALTER TABLE `',TABLE_NAME,'` CHANGE `',COLUMN_NAME,'` `',COLUMN_NAME,'` ',COLUMN_TYPE,' ',IF(CHARACTER_SET_NAME IS NOT NULL,'CHARACTER SET utf8 COLLATE utf8_unicode_ci ',''),IF(IS_NULLABLE = "YES",'NULL','NOT NULL'),' ',IF(EXTRA NOT LIKE "", EXTRA, CONCAT(' DEFAULT ',IF(COLUMN_DEFAULT IS NOT NULL,CONCAT('"',COLUMN_DEFAULT,'"'),IF(IS_NULLABLE = "YES",'NULL','""')))),';') AS `SQLS` 
-- FROM information_schema.COLUMNS 
-- WHERE TABLE_SCHEMA != 'information_schema' AND TABLE_NAME LIKE '%_quiz%'
-- LIMIT 10;

ALTER TABLE `#__quiz_cert_fields` CHANGE `f_text` `f_text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_cert_fields` CHANGE `font` `font` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT "arial.ttf";
ALTER TABLE `#__quiz_certificates` CHANGE `cert_name` `cert_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_certificates` CHANGE `cert_file` `cert_file` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_certificates` CHANGE `crtf_align` `crtf_align` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_certificates` CHANGE `crtf_text` `crtf_text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_certificates` CHANGE `text_font` `text_font` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_configuration` CHANGE `config_var` `config_var` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_configuration` CHANGE `config_value` `config_value` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_constants` CHANGE `key_value` `key_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_constants` CHANGE `default_value` `default_value` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_dashboard_items` CHANGE `title` `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_dashboard_items` CHANGE `url` `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_dashboard_items` CHANGE `icon` `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_export` CHANGE `e_filename` `e_filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_export` CHANGE `e_quizes` `e_quizes` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_feed_option` CHANGE `from_percent` `from_percent` char(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_feed_option` CHANGE `to_percent` `to_percent` char(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_feed_option` CHANGE `fmessage` `fmessage` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_languages` CHANGE `lang_file` `lang_file` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_lpath` CHANGE `title` `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_lpath` CHANGE `short_descr` `short_descr` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_lpath` CHANGE `lp_access_message` `lp_access_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_lpath_quiz` CHANGE `type` `type` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_lpath_stage` CHANGE `type` `type` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_payments` CHANGE `processor` `processor` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_payments` CHANGE `status` `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_payments` CHANGE `cur_code` `cur_code` char(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_payments` CHANGE `pid` `pid` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_product_info` CHANGE `name` `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_product_info` CHANGE `quiz_sku` `quiz_sku` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_products` CHANGE `pid` `pid` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_products` CHANGE `type` `type` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_q_cat` CHANGE `qc_category` `qc_category` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_q_cat` CHANGE `qc_instruction` `qc_instruction` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_q_cat` CHANGE `qc_tag` `qc_tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_q_chain` CHANGE `q_chain` `q_chain` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_q_chain` CHANGE `s_unique_id` `s_unique_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_blank` CHANGE `c_answer` `c_answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_matching` CHANGE `c_sel_text` `c_sel_text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_question` CHANGE `remark` `remark` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_quiz` CHANGE `unique_id` `unique_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_quiz` CHANGE `unique_pass_id` `unique_pass_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_quiz` CHANGE `user_email` `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_quiz` CHANGE `user_name` `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_quiz` CHANGE `user_surname` `user_surname` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_quiz` CHANGE `params` `params` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "{}";
ALTER TABLE `#__quiz_r_student_share` CHANGE `c_share_id` `c_share_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_r_student_survey` CHANGE `c_answer` `c_answer` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_setup` CHANGE `c_par_name` `c_par_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_setup` CHANGE `c_par_value` `c_par_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_blank` CHANGE `css_class` `css_class` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_category` CHANGE `c_category` `c_category` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_category` CHANGE `c_instruction` `c_instruction` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_choice` CHANGE `c_choice` `c_choice` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_choice` CHANGE `c_right` `c_right` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_t_choice` CHANGE `c_incorrect_feed` `c_incorrect_feed` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_dalliclick` CHANGE `c_choice` `c_choice` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_dalliclick` CHANGE `c_right` `c_right` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_dalliclick` CHANGE `c_incorrect_feed` `c_incorrect_feed` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_ext_hotspot` CHANGE `c_paths` `c_paths` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_faketext` CHANGE `c_text` `c_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_matching` CHANGE `c_left_text` `c_left_text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_matching` CHANGE `c_right_text` `c_right_text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_memory` CHANGE `c_img` `c_img` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_qtypes` CHANGE `c_qtype` `c_qtype` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_qtypes` CHANGE `c_type` `c_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_question` CHANGE `c_question` `c_question` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_question` CHANGE `c_image` `c_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_question` CHANGE `c_right_message` `c_right_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_t_question` CHANGE `c_wrong_message` `c_wrong_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_t_question` CHANGE `c_random` `c_random` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_t_question` CHANGE `c_partially_message` `c_partially_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_question` CHANGE `c_title_true` `c_title_true` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_t_question` CHANGE `c_title_false` `c_title_false` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_t_question` CHANGE `report_name` `report_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_question` CHANGE `c_detailed_feedback` `c_detailed_feedback` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_author` `c_author` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_title` `c_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_description` `c_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_short_description` `c_short_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL  DEFAULT NULL;
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_image` `c_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_published` `c_published` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_right_message` `c_right_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_wrong_message` `c_wrong_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_pass_message` `c_pass_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_unpass_message` `c_unpass_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_enable_review` `c_enable_review` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_enable_print` `c_enable_print` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_enable_sertif` `c_enable_sertif` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_resbycat` `c_resbycat` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_feed_option` `c_feed_option` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "0";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_emails` `c_emails` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_metadescr` `c_metadescr` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_keywords` `c_keywords` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_metatitle` `c_metatitle` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `paid_check_descr` `paid_check_descr` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_redirect_link` `c_redirect_link` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_quiz_access_message` `c_quiz_access_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_quiz` CHANGE `c_quiz_certificate_access_message` `c_quiz_certificate_access_message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_t_text` CHANGE `c_text` `c_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";
ALTER TABLE `#__quiz_templates` CHANGE `template_name` `template_name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL  DEFAULT "";